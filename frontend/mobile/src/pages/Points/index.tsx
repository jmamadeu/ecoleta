import React, { useEffect, useState } from 'react';

import Constants from 'expo-constants';
import { SvgUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import * as ExpoLocation from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';

import { useRoute } from '@react-navigation/native';

import api from '../../services/api';

interface ItemDTO {
  id: number;
  image: string;
  title: string;
  image_url: string;
}

export interface IPointDTO {
  id: number;
  image: string;
  latitude: number;
  name: string;
  longitude: number;

  items: {
    title: string;
  }[];
}

interface IParams {
  uf: string;
  city: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { uf, city } = route.params as IParams;

  const [items, setItems] = useState<ItemDTO[]>([]);
  const [points, setPoints] = useState<IPointDTO[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitalPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get<ItemDTO[]>('/items');

      setItems(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoLocation.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ops...',
          'Precisamos da sua permissão para obter a localiação!'
        );
      }
      const location = await ExpoLocation.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitalPosition([latitude, longitude]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get<IPointDTO[]>('/points', {
        params: {
          city,
          uf,
          items: selectedItems,
        },
      });

      setPoints(data);
    })();
  }, [selectedItems]);

  function handleSelectItem(item: number) {
    const alreadySelected = selectedItems.findIndex(
      (item_id) => item_id === item
    );

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item_id) => item_id !== item);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Feather name='arrow-left' color='#34bc79' size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.14,
              }}
              style={styles.map}>
              {points.map((point) => (
                <Marker
                  key={point.id}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => {
                    navigation.navigate('Detail', { point_id: point.id });
                  }}>
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.id)}>
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    color: '#322153',
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;

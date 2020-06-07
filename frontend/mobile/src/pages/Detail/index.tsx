import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Linking,
} from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons';

import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import * as MailCompose from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface ItemDTO {
  title: string;
}

interface IPointDTO {
  image: string;
  name: string;
  whatsapp: string;
  email: string;
  city: string;
  uf: string;
  items: ItemDTO[];
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [point, setPoint] = useState<IPointDTO>({} as IPointDTO);

  const params = route.params as Params;

  useEffect(() => {
    (async () => {
      const { data } = await api.get<IPointDTO>(`/points/${params.point_id}`);

      console.log(data);
      setPoint(data);
    })();
  }, [params.point_id]);

  async function handleMailCompose(email: string) {
    await MailCompose.composeAsync({
      subject: 'Interese na coleta de resíduos',
      recipients: [email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${point.whatsapp}&text=Tenho interese na coleta de resíduos!`
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name='arrow-left' color='#34bc79' size={20} />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: point.image,
          }}
        />

        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {point.items ? point.items.map((item) => item.title).join(', ') : ''}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {point.city}, {point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={() => {
            handleWhatsapp();
          }}>
          <FontAwesome name='whatsapp' size={20} color='#fff' />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton
          style={styles.button}
          onPress={() => {
            handleMailCompose(point.email);
          }}>
          <Feather name='mail' size={20} color='#fff' />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;

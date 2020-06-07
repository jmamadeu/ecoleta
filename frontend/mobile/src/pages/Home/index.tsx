import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import {
  Container,
  Logo,
  Description,
  Title,
  Slogan,
  Button,
  Icon,
  ButtonText,
  Content,
} from './styles';
import { TextInput } from 'react-native-gesture-handler';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container source={require('../../assets/home-background.png')}>
        <Content>
          <Logo source={require('../../assets/logo.png')} />
          <Description>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Slogan>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Slogan>
          </Description>
        </Content>

        <TextInput
          onChangeText={setUf}
          value={uf}
          style={styles.input}
          placeholder='UF'
          autoCapitalize='characters'
        />
        <TextInput
          style={styles.input}
          placeholder='Cidade'
          value={city}
          onChangeText={setCity}
        />

        <Button
          onPress={() => {
            navigation.navigate('Points', { uf, city });
          }}>
          <Icon>
            <AntDesign name='arrowright' size={24} color='#fff' />
          </Icon>

          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;

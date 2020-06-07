import styled from 'styled-components/native';

import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f0f0f5;
  padding: 0 30px;
  padding-top: ${20 + Constants.statusBarHeight}px;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  color: #322153;
  font-size: 25px;
`;
export const Description = styled.Text`
  color: #6c6c80;
  font-size: 15px;
`;
export const MapContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 16px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
`;

export const FooterContainer = styled.View`
  height: 100px;
  background: #fff;
  margin-top: 30px;
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 20px;
  padding-left: 20px;
`;

export const ButtonItem = styled.TouchableOpacity`
  flex: 1;
  background: #e1faec;
  margin-left: 10px;
  border-radius: 8px;
  width: 100px;
`;

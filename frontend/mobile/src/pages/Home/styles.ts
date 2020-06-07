import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ImageBackground.attrs({
  imageStyle: { width: 274, height: 368 },
})`
  flex: 1;
  background: #f5f5f5;
  padding: 32px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Logo = styled.Image``;

export const Description = styled.View``;

export const Title = styled.Text`
  color: #322153;
  font-size: 30px;
  font-weight: bold;
`;

export const Slogan = styled.Text`
  font-size: 16px;
`;

export const Inputs = styled.View`
  flex: 1;
`;

export const Select = styled.Picker`
  background: #fff;

  border-radius: 8px;
  height: 40px;
`;

export const Button = styled(RectButton)`
  background: #34cb79;
  height: 50px;

  overflow: hidden;
  border-radius: 8px;
  flex-direction: row;
`;
export const Icon = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #2fb86e;
`;
export const ButtonText = styled.Text`
  align-self: center;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-align: center;

  flex: 1;
`;

import React from 'react';
import { ButtonProps } from 'react-native';

import { 
  Container,
  Title
} from "./styles";

interface Props extends ButtonProps{
  title: string;
  onPress: ()=> void;
}

export function Button({title, onPress, ...rest}: Props){
  return(
    <Container onPress={onPress} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}
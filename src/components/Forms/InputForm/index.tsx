import React from 'react';
import { Container, Error } from "./styles";
import { Control, Controller } from 'react-hook-form';

import {Input} from '../Input';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({control, name, error,...rest}: Props){
  return(
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
              onChangeText={onChange}
              value={value}
              {...rest}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
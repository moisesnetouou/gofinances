import React from 'react';
import { Text } from 'react-native';
import {
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName
} 
from './styles';

export function Dashboard(){
  return(
    <Container>
      <Header>
        
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{uri: 'https://avatars.githubusercontent.com/u/39030702?v=4'}} 
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Moisés</UserName>
            </User>
          </UserInfo>
        </UserWrapper>

      </Header>
    </Container>
  );
}

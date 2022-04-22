import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

export function SignIn(){
  const {signInWithGoogle} = useAuth();

  async function handleSignInWithGoogle(){
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
    }
  };

  // async function handleSignInWithApple(){
  //   try {
  //     await signInWithApple();
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Não foi possível conectar a conta Google.');
  //   }
  // };

  function AlertDeveloper(){
    Alert.alert("Em desenvolvimento");
  }

  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton 
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={AlertDeveloper}
          />
        </FooterWrapper>

      </Footer>
    </Container>
  );
}
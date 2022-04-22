import React, {
  createContext, 
  ReactNode, 
  useContext, 
  useState,
  useEffect
} from 'react';

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

import * as Google from 'expo-auth-session';
// import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
  // signInWithApple: ()=> Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle(){
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      // endpoint de autenticação da google

      const {type, params} = await Google
      .startAsync({authUrl}) as AuthorizationResponse;
     

      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

        console.log('logado', userLogged)
      }

    } catch (error) {
      //@ts-ignore
      throw new Error(error);
    }
  }

  async function signOut(){
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(()=> {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if(userStorage){
        const userLogged = JSON.parse(userStorage) as User;

        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }
    loadUserStorageData();
  }, [])

  // Não funcional
  // async function signInWithApple(){
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ]
  //     })

      // if(credential){
      //   const name = credential.fullName!.givenName!;
      //   const photo = `https://ui-avatars.com/api/name=${name}&length=1`;
      //   const userLogged = {
      //     id: String(credential.user),
  //         email: credential.email!,
  //         name,
  //         photo
  //       }

  //       setUser(userLogged);

  //       console.log(userLogged)
  //     }
  //   } catch (error) {
  //     //@ts-ignore
  //     throw new Error(error);
  //   }
  // }
  

  return(
    <AuthContext.Provider value={{
      user: user,
      signInWithGoogle,
      signOut,
      userStorageLoading
      // signInWithApple
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth };


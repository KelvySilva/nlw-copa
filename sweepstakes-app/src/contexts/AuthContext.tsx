import { createContext, ReactNode, useState, useEffect } from "react";

import * as Google from 'expo-auth-session/providers/google'

import * as AuthSession from 'expo-auth-session'

import * as WebBrowser from 'expo-web-browser'

import { credentials } from '../../credentials'
import { api } from "../services/api";


WebBrowser.maybeCompleteAuthSession();

interface UserProps  {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}
export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthProviderProps) {  
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: credentials.client_id,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true}),
    scopes: ['profile', 'email']
  })

  const [isUserLoading, setIsUserLoading] = useState(false)

  

  async function signInWithGoogle(access_token: string) {  
    try {  
       setIsUserLoading(true)
      const response = await api.post('/users', {access_token})
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user);
       
    } catch (error) {
      debugger;
      console.log('error access_token: ',JSON.stringify(error)); 
      throw error
    }  finally {
      setIsUserLoading(false)
    }
  }



  async function signIn() {
      try {
        setIsUserLoading(true)
        await promptAsync()
      } catch (error) {
        console.log("Deu erro: ", error);
        throw error
      }finally {
        setIsUserLoading(false)
      }
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  },[response])
  return (
    <AuthContext.Provider 
      value={{
        signIn,
        isUserLoading,
        user,
      }}>
        {children}  
    </AuthContext.Provider>
  )
}
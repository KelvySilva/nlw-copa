import { 
  NativeBaseProvider,
  StatusBar
} from 'native-base';

import { THEME } from './src/styles/theme';   

import { 
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';

import { AuthContextProvider } from './src/contexts/AuthContext';

import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>      
      <AuthContextProvider>

      
          <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent 
          /> 
          { fontsLoaded ? <Routes/> : <Loading/>  }        
      </AuthContextProvider> 
    </NativeBaseProvider>  
  );
}
// ya29.a0AeTM1ifKwFnEqLasOlOJPAYHaID-VVVeSRMWfRYPawMwN0JVWBlUspSxsvoF_3n_i-0_G_YFXMxSvWh-BwRHLNfbC4EZTE0OlUA7m2Tw_W5pMnMyK3vf6ol_i-K2LJsumhTFMzENgOuPI_IHy1qmnHzLqygxmAaCgYKAT0SARASFQHWtWOmXC94Oms_feLssZvAfci77w0165
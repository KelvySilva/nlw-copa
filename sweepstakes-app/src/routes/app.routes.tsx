
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { ListPools } from '../screens/ListPools'
import { NewPool } from '../screens/NewPool'
import { Platform } from 'react-native'
import { FindPool } from '../screens/FindPool'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {

  const { colors, sizes } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[500],
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800],        
      },
      tabBarIconStyle: {
        marginTop: 20,
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0
      }
    }}>
      <Screen
      name="newPool"
      component={NewPool}
      options={{
        tabBarIcon: ({color}) => <PlusCircle size={iconSize} color={color}/>,
        tabBarLabel: 'Novo Bolão'
      }}
      />
      <Screen
      name="listPools"
      component={ListPools}
      options={{
        tabBarIcon: ({color}) => <SoccerBall size={iconSize} color={color} />,
        tabBarLabel: 'Meus Bolões'
      }}
      />
      <Screen
      name="findPool"
      component={FindPool}      
      options={{
        tabBarButton: () => null
      }}
      />
    </Navigator>
  )
}
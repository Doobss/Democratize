
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './Screens/HomeScreen'
import DiscoverScreen from './Screens/DiscoverScreen'
import LoginScreen from './Screens/Login'
import SenatorScreen from './Screens/SenatorScreen';
import RegisterScreen from './Screens/RegisterScreen'
import CongressScreen from './Screens/CongressScreen'
import PostEditScreen from './Screens/PostEdit'
import SettingsScreen from './Screens/SettingsScreen'
import AuthScreen from './Screens/AuthScreen'


const InitAuthStack = createStackNavigator(
    {
        AuthScreen: { screen: AuthScreen },

    },
    {
        initialRouteName: 'AuthScreen',
        headerMode: 'none',
        mode: 'modal',
    }


)

const HomeTabStack = createStackNavigator(
    {
        HomeScreen: { screen: HomeScreen },
        SenatorScreen: { screen: SenatorScreen },
        CongressScreen: { screen: CongressScreen },
        PostEditScreen: { screen: PostEditScreen },
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',
    }

)
const SettingsTabStack = createStackNavigator(
    { SettingsHome: { screen: SettingsScreen } },
    {
        initialRouteName: 'SettingsHome',
        headerMode: 'none'
    }
)

const DiscoverTabStack = createStackNavigator(
    { DiscoverHome: { screen: DiscoverScreen } },
    {
        initialRouteName: 'DiscoverHome',
        headerMode: 'none'
    }
)

const LoginStack = createStackNavigator(
    {
        LoginScreen: { screen: LoginScreen },
        RegisterScreen: { screen: RegisterScreen },
    },
    {
        initialRouteName: 'LoginScreen',
        headerMode: 'none'
    }

)

const TabNavigatior = createBottomTabNavigator(

    {
        Home: {
            screen: HomeTabStack,
            navigationOptions: {
                tabBarLabel: 'Home'
            }
        },
        Discover: {
            screen: DiscoverTabStack,
            navigationOptions: {
                tabBarLabel: 'Discover'
            }
        },
        Settings: {
            screen: SettingsTabStack,
            navigationOptions: {
                tabBarLabel: 'Settings'
            }
        },
    },
    {
        order: ['Home', 'Discover', 'Settings'],
        headerMode: 'none',
        tabBarOptions: {
            // activeBackgroundColor: 'rgba(0, 0, 0, .25)',
            // inactiveBackgroundColor: 'rgba(0, 0, 0, .25)',
            style: {
                backgroundColor: 'rgba(0, 0, 0, .75)',
                backgroundColor: '#171A27',
            },
            labelStyle: {
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                // color: '#171A27',
                color: 'white',
            },

        }

    })

const RootStack = createStackNavigator(
    {
        Init: { screen: InitAuthStack },
        Login: { screen: LoginStack },
        App: { screen: TabNavigatior }
    },
    {
        initialRouteName: 'Init',

        headerMode: 'none',
    }

)

export default AppStack = createAppContainer(RootStack)




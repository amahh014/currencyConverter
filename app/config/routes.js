import { createStackNavigator } from 'react-navigation';


import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    },
  },
  Options: {
    screen: Options,
    navigationOptions: {
      headerTitle: 'Options',
    }
  },
  Themes: {
    screen: Themes,
    navigationOptions: {
      headerTitle: 'Themes',
    },
  }, 
}, {
  headerMode: 'screen'
});

export default createStackNavigator(
  {
    Home: {
      screen: HomeStack
    },
    CurrencyList: {
      screen: CurrencyList,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title,
      })
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

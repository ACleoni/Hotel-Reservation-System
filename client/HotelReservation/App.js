import {createStackNavigator} from 'react-navigation';
import {Login, Home} from './src/scenes';

export default App = createStackNavigator({
    Login: {screen: Login},
    Home: {screen: Home}
});
import {createStackNavigator} from 'react-navigation';
import {Home, Dashboard} from './screens';

export default App = createStackNavigator({
    Home: {screen: Home},
    Dashboard: {screen: Dashboard}
});
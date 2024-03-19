import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './Views/ResetPasswordScreen';
import LoginScreen from './Views/LoginScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />

        <Stack.Screen name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
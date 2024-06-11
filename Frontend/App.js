import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Platform, Text } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { LoginPage, RegistrationPage } from './screens/LoginPage';
import WarehouseScreen from './screens/WarehouseScreen';
import UserList from './screens/UserList';
import SettingsScreen from './screens/SettingsScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import AddProductScreen from './screens/AddProductScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeProvider, useThemeContext } from './screens/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage

const Tab = createMaterialTopTabNavigator();
const WarehouseStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

function WarehouseStackScreen() {
  return (
    <WarehouseStack.Navigator screenOptions={{ headerShown: false }}>
      <WarehouseStack.Screen name="WarehouseScreen" component={WarehouseScreen} />
      <WarehouseStack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} />
      <WarehouseStack.Screen name="AddProductScreen" component={AddProductScreen} />
    </WarehouseStack.Navigator>
  );
}

function MainApp({ route }) {
  const { theme } = useThemeContext();
  const [userRole, setUserRole] = React.useState(null);

  // Получаем данные о пользователе из AsyncStorage
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          setUserRole(userData.position);
        }
      } catch (error) {
        console.error('Error getting user data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  if (userRole === null) {
    // Если роль еще не получена, отображаем текст о загрузке
    return <Text>Loading user data...</Text>;
  }

  // Проверяем роль пользователя и отображаем соответствующий контент
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#c0c0c0',
        ...Platform.select({
          android: {
            tabBarStyle: { backgroundColor: '#474747', paddingTop: 40 },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
          },
          ios: {
            tabBarStyle: { backgroundColor: '#474747', paddingTop: 40 },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
          }
        }),
      }}
    >
      <Tab.Screen name="Warehouse" component={WarehouseStackScreen} />
      {userRole === 'Admin' && <Tab.Screen name="Admin">{props => <UserList {...props} userRole={userRole} />}</Tab.Screen>}
      <Tab.Screen name="Settings">
        {props => <SettingsScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginPage} />
      <AuthStack.Screen name="Register" component={RegistrationPage} />
    </AuthStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <PaperProvider theme={DefaultTheme}>
          <LinearGradient
            colors={['#474747', 'transparent']}
            style={styles.safeArea}
          >
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
              <MainStack.Screen name="Auth" component={AuthStackScreen} />
              <MainStack.Screen name="MainApp" component={MainApp} />
            </MainStack.Navigator>
          </LinearGradient>
        </PaperProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

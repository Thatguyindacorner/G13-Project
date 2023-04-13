import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isLoggedIn, setLoginState] = useState(false)

  const logout = (navigation) => {

    setLoginState(false)
  }

  const login = (navigation) => {
    navigation.goBack()
    setLoginState(true)
  }

  function NowPlayingStackNavigator({navigation}){
    return(
      <Stack.Navigator initialRouteName={'Now Playing'}>
        <Stack.Screen
          name="Now Playing"
          component={NowPlayingScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Movie Details"
          component={DetailsScreen}
        />
        <Stack.Screen
          name="Buy Tickets"
          component={BuyTicketsScreen}
        />
      </Stack.Navigator>
    )
  }

  function PurchaseStackNavigator({navigation}){
    return(
      <Stack.Navigator initialRouteName={'Purchases'}>
        <Stack.Screen
          name="My Purchases"
          component={PurchaseScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    )
  }

  function PurchaseScreen ({ navigation })  {
    //setTab2('Purchases')
    return (
    <View style={styles.container}>
      {isLoggedIn &&
      <View>
        <Text>Your Purchases</Text>
      </View>
      }
      {!isLoggedIn &&
      <View>
        <Text>You need to be logged in</Text>
        <Button
          title="Log In"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      }
    </View>
    )
  }

  function LoginScreen ({navigation}) {
    return(
    <View style={styles.container}>
      {isLoggedIn &&
      <View>
        <Text>You are logged in</Text>
        <Button
        title='Go Back'
        onPress={ () => navigation.goBack()}
      />
      </View>
      }
      {!isLoggedIn &&
      <View>
        <Text>
        Login Screen
       </Text>
      <Button
        title='Login'
        onPress={ () => login(navigation)}
      />
      </View>
      }
    </View>
    )
  }



  function NowPlayingScreen ({navigation}){
    //setTab1('Playing')
    return(
      <View style={styles.container}>
        <Text>API DATA</Text>
        <Button
          title="Simulate clicking list item"
          onPress={() => navigation.navigate("Movie Details")}
        />
      </View>
    )
  }

  function DetailsScreen ({navigation}) {
    //setTab1('Details')
    return(
    <View style={styles.container}>
      <Text>
        Details Screen
      </Text>
      {!isLoggedIn &&
      <View>
        <Text>You must be logged in to use this feature</Text>
      </View>
      }
      <Button
          title="Buy Tickets"
          onPress={() => navigation.navigate("Buy Tickets")}
          disabled={!isLoggedIn}
        />
      {!isLoggedIn &&
      <View>
        <Button
          title="Login or Create new Account"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      }
    </View>
    )
  }

  function BuyTicketsScreen ({ navigation })  {
    //setTab1('Buy')
    return (
    <View style={styles.container}>
      <Text>Buy Tickets</Text>
    </View>
    )
  }

  
  function LogoutScreen ({navigation}) {
    return(
    <View style={styles.container}>
      <Text>
        Logout Screen
      </Text>
      <Button
          title="Log Out"
          onPress={() => 
            logout(navigation)
          }
        />
    </View>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        name="NowPlaying"
        component={NowPlayingStackNavigator}
        options={{ headerShown: false }}
        />
        <Tab.Screen
        name="MyPurchases"
        component={PurchaseStackNavigator}
        options={{ headerShown: false }}
        />
        {isLoggedIn &&
          <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        />
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

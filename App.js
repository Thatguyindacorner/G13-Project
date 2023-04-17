import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext, useState } from 'react';
import GetNowPlayingComponent from './src/components/GetNowPlayingComponent';
import MovieDetailComponent from './src/components/MovieDetailComponent';
import SignUpComponent from './src/components/SignUpComponent';
import LoginComponent from './src/components/LoginComponent';
import { getAuth, signOut } from "firebase/auth";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const LogContext = createContext()

export default function App() {

  const [isLoggedIn, setLoginState] = useState(false)
  const [user, setUser] = useState("")
  var uid = ""

  const updateUser = (newID) => {
    console.log("also here")
    setUser(newID)
    uid = newID
    setLoginState(true)
}

  const logout = (navigation) => {
    const auth = getAuth()
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signed out")
      setUser("")
      uid = ""
      setLoginState(false)
    })
    .catch((error) => {
    // An error happened.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode}: ${errorMessage}`)
    })
    
  }

  // const login = (navigation) => {
  //   navigation.goBack()
  //   setLoginState(true)
  // }

  function NowPlayingStackNavigator({ navigation }) {
    return (
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
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
        />
      </Stack.Navigator>
    )
  }

  function PurchaseStackNavigator({ navigation }) {
    return (
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

  function PurchaseScreen({ navigation }) {
    //setTab2('Purchases')
    return (
      <View style={styles.container}>
        {user != "" &&
          <View>
            <Text>Your Purchases</Text>
          </View>
        }
        {user == "" &&
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

  function LoginScreen({ navigation }) {
    return (
      <View style={styles.loginContainer}>
        {user != "" &&
          <View>
            <Text>You are logged in</Text>
            <Button
              title='Go Back'
              onPress={() => navigation.goBack()}
            />
          </View>
        }
        {user == "" &&
          <LoginComponent
            updateUser={updateUser}

          />

          // <View>
          //   <Text>
          //     Login Screen
          //   </Text>
          //   <Button
          //     title='Login'
          //     onPress={() => login(navigation)}
          //   />
          //   <Button
          //     title='Sign Up'

          //     onPress={() => navigation.navigate('SignUp')}
          //   />
          // </View>
        }
      </View>
    )
  }



  function NowPlayingScreen({ navigation }) {
    //setTab1('Playing')

    const movieTileClicked = (movie) => {
      console.log('movieTileClicked function invoked');
      console.log(`Movie details: Name: ${movie.title}`);
      navigation.navigate('Movie Details', { movie })
    }

    return (

      <View style={styles.nowPlayingStyle}>

        <GetNowPlayingComponent movieClickedCallBk={(movie) => movieTileClicked(movie)} />
        {/* <Button
          title="Simulate clicking list item"
          onPress={() => navigation.navigate("Movie Details")}
        /> */}


      </View>


    )
  }

  function DetailsScreen({ navigation, route }) {
    //setTab1('Details')

    const { movie } = route.params;

    const signInSignUpButtonPressed = () => {

    }

    return (
      <ScrollView style={styles.movieDetailsStyle}>
        <View >
          {/* <Text>
          Details Screen. Movie Name : {movie.title}
        </Text> */}

          <MovieDetailComponent
            movieDetailObj={movie}
            userLoggedIn={user}
            onSignInOutButtonPressed={() => signInSignUpButtonPressed()} />

          {/* {!isLoggedIn &&
          <View>
            <Text>You must be logged in to use this feature</Text>
          </View>
        } */}
          {/* <Button
          title="Buy Tickets"
          onPress={() => navigation.navigate("Buy Tickets")}
          disabled={!isLoggedIn}
        /> */}
          {/* {!isLoggedIn &&
          <View>
            <Button
              title="Login or Create new Account"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        } */}
        </View>
      </ScrollView>
    )
  }

  function SignUpScreen({ navigation, route }) {
    return (
      <View>
        <SignUpComponent navigation={navigation} route={route} />
      </View>
    )
  }

  function BuyTicketsScreen({ navigation }) {
    //setTab1('Buy')
    return (
      <View style={styles.container}>
        {user != "" &&
        <Text>Buy Tickets</Text>
        }
        {user == "" &&
        <Text>Must be logged in to buy tickets</Text>
        }
        
      </View>
    )
  }


  function LogoutScreen({ navigation }) {
    return (
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
<LogContext.Provider value={{user, setUser}}>
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
        {user != "" &&
          <Tab.Screen
            name="Logout"
            component={LogoutScreen}
          />
        }
      </Tab.Navigator>
      </LogContext.Provider>
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

  nowPlayingStyle: {
    flex: 1,

  },

  movieDetailsStyle: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'black'
  },
  contentContainer: {
    paddingVertical: 20
  },

  loginContainer: {
    flex: 1
  }

});

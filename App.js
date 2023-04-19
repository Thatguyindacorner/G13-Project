import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from "react-native-paper";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createContext, useState } from 'react';
import GetNowPlayingComponent from './src/components/GetNowPlayingComponent';
import MovieDetailComponent from './src/components/MovieDetailComponent';
import SignUpComponent from './src/components/SignUpComponent';
import LoginComponent from './src/components/LoginComponent';
import { getAuth, signOut } from "firebase/auth";
import BuyTicketsComponent from './src/components/BuyTicketsComponent';
import MyPurchasesComponent from './src/components/MyPurchasesComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const LogContext = createContext()

export default function App() {

  const [isLoggedIn, setLoginState] = useState(false)
  const [user, setUser] = useState("")
  const [userDetails, setUserDetails] = useState(null);
  var uid = ""

  const updateUser = (user) => {
    console.log("also here")
    //setUser(newID)
    setUser(user.uid);
    setUserDetails(user);
    //uid = newID
    setLoginState(true)
  }

  const logout = (navigation) => {
    navigation.navigate("Now Playing")
    const auth = getAuth()
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signed out")
      setUser("")
      setUserDetails(null)
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
            <MyPurchasesComponent
              uid={user}
            />
          </View>
        }
        {user == "" &&
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.titles}>Your Tickets</Text>
              <Text>You must be logged in to use the feature.</Text>
              <Button
                style={styles.buttonStyles}
                mode='elevated'
                buttonColor='orangered'
                textColor="white"
                onPress={() => {
                    navigation.navigate('Login')
                }}
            >
                Login or Create New Account
            </Button>
            </View>
          </View>
        }
      </View>
    )
  }

  function LoginScreen({ navigation, route }) {

    const goToHomeScreenCallBk = () => {
      console.log('-------------goToHomeScreenCallBk called-----------');
      //navigation.dispatch(StackActions.popToTop());
      //navigation.navigate('Now Playing');
      // navigation.navigate('NowPlaying');
      navigation.goBack();

    }

    return (
      <View style={styles.loginContainer}>
        <View style={styles.sectionLogIn}>
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
            homeScreenCallBk={() => goToHomeScreenCallBk()}
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
          <MovieDetailComponent
            movieDetailObj={movie}
            userLoggedIn={user}
            userDetails={userDetails}
            onSignInOutButtonPressed={() => signInSignUpButtonPressed()
            } />
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

  function BuyTicketsScreen({ navigation, route }) {
    //setTab1('Buy')

    const userEmail = route.params.userEmail;

    const movieTitle = route.params.movieTitle;

    const movieId = route.params.movieId;

    const userId = route.params.userId;


    console.log(`User Email: ${JSON.stringify(userEmail)}`);
    console.log(`User ID: ${userId}`);
    console.log(`Movie ID: ${JSON.stringify(movieId)}`);
    console.log(`Movie Title: ${movieTitle}`);

    //buyTicketsCallBack={(movieDetailsObj, userDetails) => buyTicketsCallBack(movieDetailsObj, userDetails)}

    const goToHomeScreenCallBk = () => {
      navigation.dispatch(StackActions.popToTop());
    }


    return (
      <ScrollView>
        <View style={styles.buyTicketsContainer}>
          {user != "" &&
            <BuyTicketsComponent
              userEmail={userEmail}
              movieTitle={movieTitle}
              movieId={movieId}
              userId={userId}
              homeScreenCallBk={() => goToHomeScreenCallBk()}
            />
          }
          {user == "" &&
            <Text>Must be logged in to buy tickets</Text>
          }

        </View>
      </ScrollView>
    )
  }

  function LogoutStackNavigator({ navigation }) {
    return (
      <Stack.Navigator initialRouteName={'Logout'}>
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
        />
      </Stack.Navigator>
    )
  }


  function LogoutScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titles}>Log Out</Text>
          <Text>
            Are you ready to logout?
          </Text>
          <Button
            style={styles.buttonStyles}
            mode='elevated'
            buttonColor='orangered'
            textColor="white"
            onPress={() =>
              logout(navigation)
            }
        >Logout
        </Button>
        </View>
      </View>
    )
  }

  return (


    <NavigationContainer>
      <LogContext.Provider value={{ user, setUser }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            'tabBarIcon': ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'MyPurchases') {
                iconName = 'ticket'
              } else if (route.name === 'NowPlaying') {
                iconName = 'film'
              } else if (route.name === 'LogoutScreen') {
                iconName = 'share'
                //return <FontAwesomeIcon icon={faArrowRightFromBracket} />
              }
              return <Icon name={iconName} size={22} color={focused ? 'red' : '#62b2ff'} />
            }
          }
          )
          }
        >
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
              name="LogoutScreen"
              component={LogoutStackNavigator}
              options={{ headerShown: false }}
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
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  section: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    padding: 25,
    backgroundColor: "white",
    alignItems: "center"
  },

  sectionLogIn: {
    //borderWidth: 1,
    //borderColor: 'black',
    //borderRadius: 6,
    //padding: 25,
    //backgroundColor: "white",
    //alignItems: "center"
  },

  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },

  nowPlayingStyle: {
    flex: 1,

  },

  buttonStyles: {
    marginVertical: 8,
    width: 300,
    alignContent: "center"
},

movieTitleStyle: {
  fontSize: 16,
  fontWeight: 'bold',
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
  },

  buyTicketsContainer: {
    flex: 1
  }

});

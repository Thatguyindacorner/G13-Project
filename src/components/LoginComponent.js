import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
//import App, { LogContext } from "../../App";
import { db, auth } from "../config/firebaseconfig";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


const LoginComponent = ({ updateUser, homeScreenCallBk }) => {

    //const {isLoggedIn, setLoginState} = useContext(LogContext)
    const navigation = useNavigation();

    const [makingNewAccount, setLoginType] = useState(false)

    const [isError, setError] = useState("")
    var errorMsg = ""

    const clearError = () => {
        errorMsg = ""
        setError(errorMsg)
    }

    const signIn = async(userEmail, userPassword) => {
        console.log(`${userEmail}`)
        console.log(`${userPassword}`)

        //const auths = getAuth()
        await signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                //signed in
                const user = userCredential.user
                console.log("signed in")
                //updateUser(user.uid)
                updateUser(user);
                //navigation.dispatch(StackActions.pop(1));
                
                clearError()
                //homeScreenCallBk();
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(`${errorCode}: ${errorMessage}`)
                
                errorMsg = `Error Signing In. Email/Password might be incorrect.`
                setError(errorMsg)
                console.log(`msg: ${errorMsg}`)
            })
            //.onfinally(() => {})
            if (errorMsg == ""){
                navigation.goBack()
            }
            console.log(errorMsg)
    }

    const signUp = async(userEmail, userPassword) => {
        //const auths = getAuth()
        await createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("signed up")
                //updateUser(user.uid)
                updateUser(user)
                //navigation.dispatch(StackActions.pop(1));
                
                clearError()
                //homeScreenCallBk();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}: ${errorMessage}`)

                errorMsg = `Error Signing Up. Email might already be in use.`
                setError(errorMsg)
                console.log(`msg: ${errorMsg}`)
            });
            if (errorMsg == ""){
                navigation.goBack()
            }
            console.log(errorMsg)
    }

    const validate = () => {

    }


    const SignInComponent = () => {
        const [userEmail, setUserEmail] = useState('')
        const [userPassword, setUserPassword] = useState('');
        return (
            <View style={styles.signUpMainContainer}>
                <Text style={styles.signUpMainHeading}>Sign In</Text>

                <TextInput

                    style={styles.textInputStyle}

                    autoCorrect={false}

                    autoCapitalize='none'

                    placeholder="Enter Email"

                    keyboardType='email-address'

                    value={userEmail}

                    onChangeText={(newValue) => {
                        setUserEmail(newValue)
                        //clearError()
                    }}

                />


                <TextInput
                    style={styles.textInputStyle}

                    placeholder="Enter Password"

                    keyboardType='name-phone-pad'

                    autoCorrect={false}

                    autoCapitalize='none'

                    secureTextEntry={true}

                    value={userPassword}

                    onChangeText={(newValue) => {
                        setUserPassword(newValue)
                        //clearError()
                    }}
                />

                <View style={styles.buttonViewContainer}>
                    <Button

                        style={styles.buttonStyleLogin}

                        mode='elevated'

                        buttonColor='#62b1ff'

                        textColor='white'

                        onPress={() => signIn(userEmail, userPassword)}
                    >
                        Login
                    </Button>

                    <Button

                        style={styles.buttonStyleSignUp}

                        mode='elevated'

                        buttonColor='orangered'

                        textColor='white'

                        onPress={() => {
                            console.log('Sign Up Button pressed. Go to Sign Up Screen')
                            //navigation.navigate('SignUp', { updateUser })
                            clearError()
                            setLoginType(true)
                        }}
                    >
                        Sign Up
                    </Button>

                </View>

            </View>

        )
    }

    const SignUpComponent = () => {
        const [userEmail, setUserEmail] = useState('')
        const [userPassword, setUserPassword] = useState('');


        return (
            <View style={styles.signUpMainContainer}>
                <Text style={styles.signUpMainHeading}>Sign Up</Text>

                <TextInput

                    style={styles.textInputStyle}

                    autoCorrect={false}

                    autoCapitalize='none'

                    placeholder="Enter Email"

                    keyboardType='email-address'

                    value={userEmail}

                    onChangeText={(newValue) => {
                        setUserEmail(newValue)
                        //clearError()
                    }}

                />


                <TextInput
                    style={styles.textInputStyle}

                    autoCorrect={false}

                    autoCapitalize='none'

                    placeholder="Enter Password"

                    keyboardType='name-phone-pad'

                    secureTextEntry={true}

                    value={userPassword}

                    onChangeText={(newValue) => {
                        setUserPassword(newValue)
                        //clearError()
                    }}
                />

                <Button

                    style={styles.buttonStyle}

                    mode='elevated'

                    buttonColor='orangered'

                    textColor='white'

                    onPress={() => signUp(userEmail, userPassword)}
                >
                    Sign Up
                </Button>
            </View>
        )
    }

    return (

        <View>
            {!makingNewAccount &&
                <SignInComponent />
            }
            {makingNewAccount &&
                <SignUpComponent />}
            {isError != "" &&
            <View >
                 <Text style={styles.error}>{isError}</Text>
            </View>
            
            }
        </View>


    )

}

const styles = StyleSheet.create({
    signUpMainContainer: {
        margin: 8,
        padding: 30
    },

    error: {
        textAlign: "center",
        color: "red",
        paddingHorizontal: 20,
        fontWeight: "bold"
    },

    textInputStyle: {
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 6,
        padding: 10,
        marginVertical: 10
    },

    buttonStyleLogin: {
        //alignSelf: 'center',

        flex: 1,
        marginHorizontal: 5
    },

    buttonStyleSignUp: {
        flex: 1,
        marginHorizontal: 5
    },

    signUpMainHeading: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    buttonViewContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        marginTop: 15,

    }

})

export default LoginComponent;
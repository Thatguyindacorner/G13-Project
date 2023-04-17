import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import App, { LogContext } from "../../App";
import auth from "../config/firebaseconfig"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const LoginComponent = ({ updateUser }) => {

    //const {isLoggedIn, setLoginState} = useContext(LogContext)
    //const navigation = useNavigation();

    const [makingNewAccount, setLoginType] = useState(false)

    const updateState = () => {
        console.log("here")
        updateUser()
    }

    const signIn = (userEmail, userPassword) => {
        console.log(`${userEmail}`)
        console.log(`${userPassword}`)
        const auths = getAuth()
        signInWithEmailAndPassword(auths, userEmail, userPassword)
        .then((userCredential) => {
            //signed in
            const user = userCredential.user
            console.log("signed in")
            updateUser(user.uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(`${errorCode}: ${errorMessage}`)
        })
    }

    const signUp = (userEmail, userPassword) => {
        const auths = getAuth()
        createUserWithEmailAndPassword(auths, userEmail, userPassword)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("signed up")
        updateUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`)
        });
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
    
                    placeholder="Enter Email"
    
                    keyboardType='email-address'
    
                    value={userEmail}
    
                    onChangeText={(newValue) => setUserEmail(newValue)}
    
                />
    
    
                <TextInput
                    style={styles.textInputStyle}
    
                    placeholder="Enter Password"
    
                    keyboardType='name-phone-pad'
    
                    secureTextEntry={true}
    
                    value={userPassword}
    
                    onChangeText={(newValue) => setUserPassword(newValue)}
                />
    
                <View style={styles.buttonViewContainer}>
                    <Button
    
                        style={styles.buttonStyleLogin}
    
                        mode='elevated'
    
                        buttonColor='#62b1ff'
    
                        textColor='white'
    
                        onPress={ () => signIn(userEmail, userPassword) }
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
    
                    placeholder="Enter Email"
    
                    keyboardType='email-address'
    
                    value={userEmail}
    
                    onChangeText={(newValue) => setUserEmail(newValue)}
    
                />
    
    
                <TextInput
                    style={styles.textInputStyle}
    
                    placeholder="Enter Password"
    
                    keyboardType='name-phone-pad'
    
                    secureTextEntry={true}
    
                    value={userPassword}
    
                    onChangeText={(newValue) => setUserPassword(newValue)}
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
            <SignInComponent/>
            }
            {makingNewAccount &&
            <SignUpComponent/>}
        </View>


    )

}

const styles = StyleSheet.create({
    signUpMainContainer: {
        margin: 8,
        padding: 30
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
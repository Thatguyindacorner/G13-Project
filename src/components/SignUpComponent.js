import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

//unused

const SignUpComponent = ({ updateUser, navigation, route }) => {

    const [userEmail, setUserEmail] = useState('')

    const [userPassword, setUserPassword] = useState('');

    const signUp = () => {
        auth = getAuth()
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
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

                onPress={() => signUp()}
            >
                Sign Up
            </Button>



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

    buttonStyle: {
        alignSelf: 'center',
        marginTop: 15
    },

    signUpMainHeading: {
        fontSize: 22,
        fontWeight: 'bold'
    }


});

export default SignUpComponent;
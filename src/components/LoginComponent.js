import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const LoginComponent = ({ isLoggedIn }) => {

    const navigation = useNavigation();

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

                    onPress={() => console.log('Login Button pressed')}
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
                        navigation.navigate('SignUp', { isLoggedIn })
                    }}
                >
                    Sign Up
                </Button>


            </View>

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
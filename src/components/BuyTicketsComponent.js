import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { db } from "../config/firebaseconfig";
import { setDoc, addDoc, collection } from "firebase/firestore";

// userEmail = { userEmail }
// movieTitle = { movieTitle }
// movieId = { movieId }
// userId = { userId }

const TAX_RATE = 0.13;

const PER_TICKET_PRICE = 12;

const BuyTicketsComponent = ({ userEmail, movieTitle, movieId, userId, homeScreenCallBk }) => {

    const [email, setEmail] = useState(userEmail);
    const [name, setName] = useState('');
    const [counter, setCounter] = useState(1);

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => {
        setVisible(false);
        homeScreenCallBk();
    }

    const incrementCounter = () => {
        setCounter(counter + 1);
    }

    const decrementCounter = () => {
        if (counter - 1 <= 0) {
            setCounter(1)
        } else {
            setCounter(counter - 1)
        }
    }

    const calculateTicketPrice = () => {

        const total = PER_TICKET_PRICE * counter;

        const tax = total * TAX_RATE;

        const netSum = total + tax;

        return netSum.toFixed(2);

    }

    const onPurchaseTickets = async () => {

        try {
            var collRef = collection(db, "Purchases");

            var ticketPrice = calculateTicketPrice();

            var docToInsert = {
                movieId,
                movieName: movieTitle,
                nameOnPurchase: name,
                numTickets: counter,
                total: ticketPrice,
                userId: userId
            };

            const docInserted = await addDoc(collRef, docToInsert);

            console.log(`Document Added successfully to collection, DOCID: ${docInserted.id}`);

            //Alert.alert('Success', 'Purchase Successful');
            showDialog();
            // homeScreenCallBk();
        } catch (err) {
            console.log(`Error While Adding Document: ${err}`);
        }

    }//onPurchaseTickets


    return (
        <Provider>
            <View style={styles.mainContainer}>
                <Text style={styles.movieNameStyle}>Buy Tickets</Text>

                <Text style={styles.movieNameStyle}>{movieTitle}</Text>

                <Text style={styles.labelStyle}>Your Email Address</Text>
                <TextInput

                    style={styles.textInputStyle}

                    autoCorrect={false}

                    autoCapitalize='none'

                    placeholder="Enter Email Address"

                    value={email}

                    onChangeText={(newValue) => setEmail(newValue)}

                />

                <Text style={styles.labelStyle}>Your Name</Text>
                <TextInput
                    style={styles.textInputStyle}

                    placeholder="Enter Name"

                    autoCorrect={false}

                    autoCapitalize='none'

                    value={name}

                    onChangeText={(newValue) => setName(newValue)}

                />

                <Text style={styles.labelStyle}>Select Number of Tickets</Text>
                <View style={styles.incDecContainer}>
                    <Button
                        mode='elevated'

                        buttonColor='#ff8000'

                        textColor='white'

                        onPress={decrementCounter}

                    >
                        -
                    </Button>

                    <Text style={styles.valueStyle}>{counter}</Text>

                    <Button
                        mode='elevated'

                        buttonColor='#62b1ff'

                        textColor='white'

                        onPress={incrementCounter}
                    >

                        +

                    </Button>

                </View>

                <Button
                    style={styles.purchaseButtonStyle}
                    mode='elevated'
                    buttonColor='#6263ff'
                    textColor='white'
                    onPress={onPurchaseTickets}
                >
                    Purchase Tickets
                </Button>

                {
                    visible ? (<Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Success</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Purchase Successful</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>OK</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>) : null
                }



            </View>
        </Provider>

    )
}

const styles = StyleSheet.create({

    mainContainer: {
        margin: 8
    },

    screenNameStyle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },

    movieNameStyle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10
    },

    labelStyle: {
        fontWeight: '400',
        marginTop: 10
    },
    textInputStyle: {
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 6,
        padding: 10,
        marginVertical: 10
    },

    incDecContainer: {
        flexDirection: 'row',
        height: 40,
        marginVertical: 8
    },

    valueStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal: 6
    },
    purchaseButtonStyle: {
        alignSelf: 'center',
        marginVertical: 30
    }
});

export default BuyTicketsComponent;
import React, { useEffect, useState } from "react";
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
    const [counter, setCounter] = useState(0);

    const [visible, setVisible] = useState(false);

    const [state, setState] = useState({
        title: '',
        numOfTickets: 0,
        subtotal: 0,
        tax: 0,
        netTotal: 0,
        showSummary: false
    })

    const [errorMessage, setErrorMessage] = useState('');

    // const [showState, setShowState] = useState(false);



    const showMovieSummary = (updateCounter) => {

        const total = PER_TICKET_PRICE * updateCounter;

        const tax = total * TAX_RATE;

        const netSum = total + tax;

        setState({
            ...state,
            title: movieTitle,
            numOfTickets: updateCounter,
            subtotal: total,
            tax: tax.toFixed(2),
            netTotal: netSum.toFixed(2),
            showSummary: true
        });

        //setShowState(true)
    }

    const showDialog = () => setVisible(true);

    const hideDialog = () => {
        setVisible(false);
        homeScreenCallBk();
    }

    const incrementCounter = () => {
        if (errorMessage) {
            setErrorMessage('')
        }
        const updateCounter = counter + 1;
        setCounter(updateCounter);
        showMovieSummary(updateCounter);
    }

    const decrementCounter = () => {
        if (counter - 1 <= 0) {
            setCounter(0);
            // setShowState(false)
            setState({
                ...state,
                showSummary: false
            })

        } else {
            const updateCounter = counter - 1
            if (errorMessage) {
                setErrorMessage('')
            }
            setCounter(updateCounter)
            showMovieSummary(updateCounter);
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

            if (email.length <= 0) {
                setErrorMessage('Email cannot be empty');
                return;
            }
            setErrorMessage('');

            if (name.length <= 0) {
                setErrorMessage('Name Cannot be empty');
                return;
            }
            setErrorMessage('')

            if (counter <= 0) {
                setErrorMessage('Please select at least 1 Ticket');
                return
            }
            setErrorMessage('');

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
            setErrorMessage('Error Creating Document on Firestore');

        }

    }//onPurchaseTickets

    useEffect(() => {
        console.log('Error Message updated');
    }, [errorMessage]);

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
                    errorMessage ? <Text style={{ alignSelf: 'center', color: 'red', fontSize: 15 }}>{errorMessage}</Text> : null
                }

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

                {state.showSummary &&
                    <View style={{
                        borderWidth: 0.3,
                        borderColor: 'gray',
                        borderRadius: 2,
                        paddingLeft: 10,
                        paddingTop: 20,
                        paddingBottom: 20,
                        gap: 8,

                    }}>
                        <Text style={{ fontSize: 16 }}>{state.title}</Text>
                        <Text style={{ fontSize: 16 }}>Number of Tickets: {state.numOfTickets}</Text>
                        <Text style={{ fontSize: 16 }}>Subtotal: ${state.subtotal}</Text>
                        <Text style={{ fontSize: 16 }}>Tax: ${state.tax}</Text>
                        <Text style={{
                            fontSize: 16,
                            padding: 8,
                            borderWidth: 0.1,
                            borderColor: '#e6e600',
                            borderRadius: 2,
                            backgroundColor: '#e6e600',
                            marginRight: 10,
                            shadowColor: 'gray',
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            shadowOffset: {
                                height: 1,
                                width: 1
                            }
                        }}>Total: ${state.netTotal}</Text>
                    </View>
                }

                {!state.showSummary &&
                    null
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
    },

    orderSummaryContainer: {
        borderWidth: 0.3,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        gap: 8
    },

    orderSummaryTextStyle: {
        fontSize: 16
    },

    netTotalStyle: {
        fontSize: 16,
        borderWidth: 0.1,
        borderColor: 'yellow'
    }

});

export default BuyTicketsComponent;
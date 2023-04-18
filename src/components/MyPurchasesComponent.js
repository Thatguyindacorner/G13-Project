import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native'
import findPurchases from "../hooks/findPurchases";
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';


//import TicketDetailedIcon from "react-native-bootstrap-icons/icons/ticket-detailed";

const MyPurchasesComponent = ({ uid }) => {

    console.log(`In Component: ${uid}`)

    const [DoQuery, purchases, errorMessage] = findPurchases(uid)

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);

        await DoQuery();

        setRefreshing(false);

    }

    return (

        <View style={styles.mainContainer}>
            <Text style={styles.textHeadingStyle}>Your Tickets</Text>

            <FlatList
                style={styles.flatListStyle}
                data={purchases}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor='red'
                    />
                }

                renderItem={({ item }) => {
                    return (



                        <Card mode='elevated' style={{ marginVertical: 8, padding: 15, marginHorizontal: 5 }}>

                            {errorMessage == "No Results Found" &&
                                <Text style={styles.empty}>No Purchases Yet</Text>
                            }

                            {errorMessage != "No Results Found" &&
                                <View style={styles.HStack}>
                                    <View style={styles.HStackContent}>

                                        <Icon name='ticket' size={24} color={'red'} />

                                    </View>
                                    <View style={styles.HStackContent}>
                                        <Text style={{ fontWeight: "bold", paddingBottom: 2 }}>{item.movieName}</Text>
                                        <Text >Number of Tickets: {item.numTickets}</Text>
                                        <Text style={{ color: "red", paddingTop: 2 }}>Total Paid: ${item.total}</Text>
                                    </View>
                                </View>
                            }




                        </Card>
                    )
                }}

            />




        </View>

    )
}

const styles = StyleSheet.create({

    mainContainer: {
        // flex: 1,
        margin: 10,
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center'
    },

    empty: {
        fontSize: 18,
        textAlign: "center",
        padding: 2,
        width: 200
    },

    HStack: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 2,
        //margin: 10
    },

    HStackContent: {
        alignItems: "stretch",
        paddingLeft: 10,
        paddingRight: 10,
    },


    textHeadingStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 5
    },

    flatListStyle: {
        //alignSelf: 'flex-start',
        width: '96%',
        //marginVertical: 10
        marginTop: 10,
        marginBottom: 25
    },

    movieContainer: {
        flex: 1,
        padding: 10,
        paddingVertical: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
        marginVertical: 5
    },

    movieTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default MyPurchasesComponent;
import React from "react";
import { Text, View, StyleSheet, FlatList, ScrollView, Pressable } from "react-native";
import useResults from "../hooks/useResults";
import { Card, TouchableRipple } from "react-native-paper";

const GetNowPlayingComponent = ({ movieClickedCallBk }) => {

    const [getAllMoviesFromApi, movieResults, errorMessage] = useResults();

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.textHeadingStyle}>Now Playing</Text>

            <FlatList
                style={styles.flatListStyle}
                data={movieResults}

                keyExtractor={(movie) => {
                    return movie.id
                }}

                renderItem={({ item }) => {
                    return (
                        <Card mode='elevated' style={{ marginVertical: 8, padding: 15, marginHorizontal: 5 }}>
                            <Pressable

                                onPress={() => {
                                    console.log('View Item Pressed')
                                    movieClickedCallBk(item)
                                }}
                            >

                                <View >
                                    <Text style={styles.movieTitleStyle}>{item.title}</Text>
                                    <Text>Release Date: {item.release_date}</Text>
                                </View>

                            </Pressable>
                        </Card>
                    )
                }}

            />
        </View>

    );

}

const styles = StyleSheet.create({

    mainContainer: {
        // flex: 1,
        margin: 10,
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center'
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

export default GetNowPlayingComponent;

/*
 return (
                        
                        <Pressable
                            onPress={() => {
                                console.log('View Item Pressed')
                                movieClickedCallBk(item)
                            }}
                        >
                            <View style={styles.movieContainer}>
                                <Text style={styles.movieTitleStyle}>{item.title}</Text>
                                <Text>Release Date: {item.release_date}</Text>
                            </View>
                        </Pressable>
                    )
*/
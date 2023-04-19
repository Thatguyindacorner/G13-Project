import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";


//https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg

const MovieDetailComponent = ({ movieDetailObj, userLoggedIn, userDetails }) => {

    const navigation = useNavigation();

    const getMovieRatings = (movieAverage) => {
        let rating = (movieAverage / 10) * 100;

        return parseInt(rating);
    }

    //userLoggedIn is the uid of the logged in user
    //(will be "" if user not logged in)


    return (

        <View style={styles.movieDetailMainContainer}>

            <Image
                style={styles.imageStyle}
                resizeMode='contain'
                //resizeMethod='scale'
                source={{ uri: `http://image.tmdb.org/t/p/w780${movieDetailObj.poster_path}` }}
            />
            <View style={styles.movieTitleSubView}>
                <Text style={styles.movieTitleStyle}>{movieDetailObj.title}</Text>
                <Text style={styles.movieRatingStyle}>{getMovieRatings(movieDetailObj.vote_average)}%
                    {
                        getMovieRatings(movieDetailObj.vote_average) <= 50 ?
                            <Icon name='star-half' size={20} color={'red'} /> :
                            <Icon name='star' size={20} color={'red'} />
                    }
                </Text>
            </View>



            <Text style={styles.releaseDateStyle}>Release Date: {movieDetailObj.release_date}</Text>

            <Text style={styles.plotSummaryStyle}>Plot Summary</Text>
            <Text style={styles.movieOverViewStyle}>{movieDetailObj.overview}</Text>

            <View style={styles.buttonViewContainer}>
                {userLoggedIn == "" &&
                    <View>
                        <Text>You must be logged in to use this feature</Text>
                    </View>
                }

                <Button

                    style={styles.buttonStyles}

                    mode='contained'

                    disabled={userLoggedIn == ""}

                    onPress={() => {
                        navigation.navigate('Buy Tickets', {
                            userEmail: userDetails.email,
                            movieTitle: movieDetailObj.title,
                            movieId: movieDetailObj.id,
                            userId: userLoggedIn

                        })
                    }}
                >
                    Buy Tickets
                </Button>

                {userLoggedIn == "" &&

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

                }

            </View>




            {/* <Card mode='elevated' style={{ padding: 20 }}>

                <Card.Cover source={{ uri: `http://image.tmdb.org/t/p/w780${movieDetailObj.poster_path}` }} />

                <Card.Title
                    title={movieDetailObj.title}
                    subtitle={`Release Date: ${movieDetailObj.release_date}`}
                />

                <Card.Content>
                    <Text>
                        {movieDetailObj.overview}
                    </Text>

                </Card.Content>


            </Card> */}
        </View>
    )

}

const styles = StyleSheet.create({

    movieDetailMainContainer: {
        marginHorizontal: 8,
        marginTop: 4,
        flex: 1
    },

    imageStyle: {
        width: '90%',
        height: 400,
        borderRadius: 6,
        marginVertical: 8,
        alignSelf: 'center'
    },

    movieTitleSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    movieTitleStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 8
    },

    movieRatingStyle: {
        fontSize: 16,
        flex: 2
    },

    buttonViewContainer: {
        marginTop: 25,
        marginBottom: 15,
        alignItems: 'center'
    },

    scrollViewStyle: {
        flex: 1
    },

    buttonStyles: {
        marginVertical: 8,
        width: 300,
        alignContent: "center"
    },

    releaseDateStyle: {
        fontSize: 15,
        marginVertical: 6
    },

    plotSummaryStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    movieOverViewStyle: {
        fontSize: 16
    }
});

export default MovieDetailComponent;


/*
<Card mode='elevated' style={{ padding: 20 }}>

                <Card.Cover source={{ uri: `http://image.tmdb.org/t/p/w780${movieDetailObj.poster_path}` }} />

                <Card.Title
                    title={movieDetailObj.title}
                    subtitle={`Release Date: ${movieDetailObj.release_date}`}
                />

                <Card.Content>
                    <Text>
                        {movieDetailObj.overview}
                    </Text>

                </Card.Content>


            </Card>

*/
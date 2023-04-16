import React, { useEffect, useState } from "react";
import tmdb from "../api/tmdb";

export default () => {

    const [movieResults, setMovieResults] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');


    const getAllMoviesFromApi = async () => {

        console.log('Making request to get all Movies');

        try {

            const response = await tmdb.get('/movie/now_playing', {
                params: {
                    language: 'en-US',
                    page: 1,
                    region: 'CA'
                }
            });

            console.log(response);

            setMovieResults(response.data.results);



        } catch (err) {
            console.log(`Error Getting all Movies ${err}`);
            setErrorMessage("Error performing search request");
        }
    }//getAllMoviesFromApi

    useEffect(() => {
        getAllMoviesFromApi();
    }, [])

    return [getAllMoviesFromApi, movieResults, errorMessage]
}
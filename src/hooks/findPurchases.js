import React, { useEffect, useState } from "react";
import {collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import firebaseApp from "../config/firebaseconfig"

export default (uid) => {

//const uid = uid

    // class Purchase {
    //     constructor (movieName, numTickets, total ) {
    //         this.movieName = movieName;
    //         this.numTickets = numTickets;
    //         this.total = total;
    //     }
    //     toString() {
    //         return this.movieName + ', ' + this.numTickets + ', ' + this.total;
    //     }
    // }

    // // Firestore data converter
    // const dbConverter = {
    //     fromFirestore: (snapshot, options) => {
    //         const data = snapshot.data(options);
    //         return new City(data.movieName, data.numTickets, data.total);
    //     }
    // };
    

    const [dbResults, setdbResults] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const DoQuery = async() =>{

        try{
            const purchasesRef = collection(getFirestore(firebaseApp), "Purchases");
            const q = query(purchasesRef, where("userId", "==", `${uid}`))//.withConverter(dbConverter)
            
            console.log(`UID: ${uid}`)
            console.log(`query: ${q}`)
    
            const querySnapshot = await getDocs(q)
            console.log(`snapshot: ${querySnapshot}`)
            var temp = []
            console.log(querySnapshot.empty)

            if (querySnapshot.empty){
                setErrorMessage("No Results Found")
                setdbResults(["No Purchases Yet"])
                console.log(errorMessage)
                return
            }

            querySnapshot.forEach((doc) => {
                console.log("here")
                console.log(doc.data)
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                temp.push(doc.data())
            })

            //setdbResults(querySnapshot.docs.data())

            console.log("success")
            console.log(dbResults)
            setErrorMessage("")
            setdbResults(temp)
            console.log(`results: ${temp.length}`)
        }
        catch{
            console.log("error")
            setErrorMessage("No Results Found")
            setdbResults(["No Purchases Yet"])

            console.log(errorMessage)
        }
        
        

    }

    useEffect(() => {
        console.log(`useEffect uid: ${uid}`)
        DoQuery();
    }, [])

    return [DoQuery, dbResults, errorMessage]
}
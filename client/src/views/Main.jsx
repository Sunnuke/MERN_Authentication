import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Form from "../components/Form";
// import ItemList from "../components/ItemList";

export default () => {
    const [message, setMessage] = useState("Connecting...");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [ load, setLoad ] = useState(false);
    const [ errors, setErrors ] = useState(false);
    const [ login, setLogin ] = useState(false);

    if (login) {
        useEffect(()=>{
            axios.get('http://localhost:8000/api/users', { withCredentials: true })
                .then(res=>{
                    setUsers(res.data);
                    setLoaded(true);
                });
        },[])
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => setMessage(res.data.message))
    }, []);

    const createUser = (user) => {
        setUsers([...users, user]);
        axios.post("http://localhost:8000/api/register", user,{ withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/");
                setLogin(true);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
                setLoad(true);
            });
    }

    const getUser = (user) => {
        axios.get("http://localhost:8000/api/login", user,{ withCredentials: true })
            .then(res => {
                console.log(res);
                setUser(res.data);
                setLogin(true);
                navigate("/");
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
                setLoad(true);
            });
    }

    const removingDOM = (id) => {
        setUsers(users.filter(user => user._id != id));
    }

    return(
        <>
            <h1>Connection status: {message}</h1>
            <h2> Logged In Status: {
                login ?
                "No One!" :
                user.firstName, user.lastName
            } </h2>
            
            {
                login ?
                <Form logged={login} submitInput={createUser} /> :
                <Form logged={login} submitInput={getUser} />
            }
            {
                load ?
                <p style={{color: "red"}}>{errors}</p> :
                ''
            }
            <hr/>
            {/* {loaded && <ItemList EXAMPLEs={EXAMPLEs} removingDOM={removingDOM}/>} */}
        </>
    )
}
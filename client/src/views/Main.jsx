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
    const [ errors, setErrors ] = useState([]);
    const [ login, setLogin ] = useState(false);
    const [ log, setLog ] = useState(false);
    const [ inputForm, setInputForm ] = useState(true);
    // console.log("User:");
    // console.log(user);
    // console.log("Users:");
    // console.log(users);
    // if (login) {
        useEffect(()=>{
            axios.get('http://localhost:8000/api/users', { withCredentials: true })
                .then(res=>{
                    setUsers(res.data);
                    setLoaded(true);
                });
        },[])
    // }
    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => setMessage(res.data.message))
    }, []);

    const createUser = (user) => {
        console.log("Creating User:");
        console.log(user);
        axios.post("http://localhost:8000/api/register", user)
            .then(res => {
                console.log("Post Response:");
                console.log(res);
                setLogin(true);
                setUser(user);
                setUsers([...users, user]);
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

    const getUser = (user) => {
        console.log("Getting User:");
        console.log(user);
        const errorArr = []; // Define a temp error array to push the messages in
        // Validating object before sending to server
        if (user.email == "") {
            errorArr.push("No email was entered!");
        }
        if (user.password == "") {
            errorArr.push("No password was entered!");
        }
        // Return if any errors
        if (errorArr.length > 0) {
            // Set Errors
            setErrors(errorArr);
            return;
        }
        axios.post("http://localhost:8000/api/login", user, { withCredentials: true })
            .then(res => {
                console.log("Get Response:");
                console.log(res);
                setUser(res.data);
                setLogin(true);
                setErrors([]);
                setInputForm(!inputForm)
                navigate("/");
            })
            .catch(err => {
                console.log(err.response);
                    errorArr.push("Invalid email or password!")
                    // Set Errors
                    setErrors(errorArr);
            });
    }

    const removingDOM = (id) => {
        setUsers(users.filter(user => user._id !== id));
    }

    return(
        <>
            <h1>Connection status: {message}</h1>
            <h2> Logged In Status: {
                login ?
                (user.user.firstName + " " + user.user.lastName) :
                "No One!"
            } </h2>
            {
                login ?
                <p style={{color: "green"}}>Success!</p> :
                ''
            }
            {
                inputForm ?
                <>
                    <button onClick={ e => {setLog(!log)} }>Click to {
                            log ? 
                            "Register" :
                            "Login"
                        }</button>
                    {
                        log ?
                        <Form logged={log} submitInput={getUser} /> :
                        <Form logged={log} submitInput={createUser} />
                    }
                    {
                        errors.map(error => {
                            return(
                                <p style={{color: "red"}}>{error}</p>
                            )
                        })
                    }
                </> :
                ''
            }
            <hr/>
            {/* {loaded && <ItemList EXAMPLEs={EXAMPLEs} removingDOM={removingDOM}/>} */}
        </>
    )
}
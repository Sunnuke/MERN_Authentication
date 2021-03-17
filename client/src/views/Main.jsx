import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Form from "../components/Form";
import ItemList from "../components/ItemList";

export default () => {
    const [message, setMessage] = useState("Connecting...");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [ sync, setSync ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ login, setLogin ] = useState(false);
    const [ log, setLog ] = useState(false);
    const [ inputForm, setInputForm ] = useState(true);
    
    // User List Request
    const allUsers = () => {
    // useEffect(()=>{  
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then(res=>{ 
                console.log("Getting All Response:");
                console.log(res.data);
                setUsers(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                // setUsers();
            });
    // },[])
    }
    
    if (sync == false) {
        setSync(true);
        allUsers();
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api")
            .then(res => {
                setMessage(res.data.message);
                // allUsers();
            })
    }, []);

    const createUser = (user) => {
        console.log("Creating User:");
        console.log(user);
        const errorArr = []; // Define a temp error array to push the messages in

        // Validating object before sending to server
        if (user.firstName === "") {
            errorArr.push("Must enter first name!");
        }
        if (user.lastName === "") {
            errorArr.push("Must enter last name!");
        }
        if (user.email === "") {
            errorArr.push("Must enter email!");
        }
        if (user.password === "") {
            errorArr.push("Must enter password!");
        }
        if (user.confirmPassword === "") {
            errorArr.push("Did not confirm password!");
        }
        if (user.confirmPassword !== user.password) {
            errorArr.push("Passwords Must Match!");
        }
        
        // Return if any errors
        if (errorArr.length > 0) {
            // Set Errors
            setErrors(errorArr);
            return;
        }
        axios.post("http://localhost:8000/api/register", user, { withCredentials: true })
            .then(res => {
                console.log("Post Response:");
                console.log(res);
                setUser(res.data);
                setLogin(true);
                setErrors([]);
                allUsers();
                setInputForm(!inputForm)
                setUsers([...users, user]);
                setLoaded(true);
            })
            .catch(err => {
                console.log("F HERE");
                console.log(err.response.data.errors);
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });
    }

    const getUser = (user) => {
        console.log("Getting User:");
        console.log(user);
        const errorArr = []; // Define a temp error array to push the messages in
        // Validating object before sending to server
        if (user.email === "") {
            errorArr.push("No email was entered!");
        }
        if (user.password === "") {
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
                allUsers();
                setInputForm(!inputForm)
                setLoaded(true);
            })
            .catch(err => {
                console.log(err.response);
                    errorArr.push("Invalid email or password!")
                    // Set Errors
                    setErrors(errorArr);
            });
    }

    const loggingOut = () => {
        setUser({});
        setUsers([]);
        setLogin(false);
        setLoaded(false);
        setErrors([]);
        setInputForm(!inputForm)
        axios.get("http://localhost:8000/api/logout")
            .then(res => {
                console.log("Logging Out:");
                console.log(res);
                setSync(false);
            })
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
                <>
                    <p style={{color: "green"}}>Success!</p>
                    <button onClick={ e => {loggingOut()} }>Log Out</button>
                </> :
                ''
            }
            {
                inputForm ?
                <>
                    <button onClick={ e => {
                        setLog(!log)
                        setErrors([]);
                        } }>Click to {
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
                        errors.map((error, i) => {
                            return(
                                <p key={i} style={{color: "red"}}>{error}</p>
                            )
                        })
                    }
                </> :
                ''
            }
            <hr/>
            {/* { */}
                {/* loaded ? */}
                <ItemList items={users} removingDOM={removingDOM}/>
                {/* 'Loading users... (must login to view list)' */}
            {/* } */}
        </>
    )
}
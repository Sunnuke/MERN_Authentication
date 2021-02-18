import React, { useState } from "react";

export default (props) => {
    const { logged,  submitInput } = props;
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const Process = (e) => {
        e.preventDefault();
        { 
            logged ?
            submitInput({ email, password, confirmPassword }) :
            submitInput({ firstName, lastName, email, password, confirmPassword })
        }
    }

    return(
        <div>
            <form onSubmit={Process}>
                { 
                    logged ?
                    "" :
                    <>
                        <label>First Name:</label>
                        <input type="text" 
                        name="firstName"
                        value={firstName}
                        onChange={ e => { setFirstName(e.target.value) } } /><br/>

                        <label>Last Name:</label>
                        <input type="text" 
                        name="lastName"
                        value={lastName}
                        onChange={ e => { setLastName(e.target.value) } } /><br/>
                    </>
                }

                <label>Email:</label>
                <input type="text" 
                name="email"
                value={email}
                onChange={ e => { setEmail(e.target.value) } } /><br/>
                
                <label>Password:</label>
                <input type="text" 
                name="password"
                value={password}
                onChange={ e => { setPassword(e.target.value) } } /><br/>
                
                { 
                    logged ?
                    "" :
                    <>
                        <label>Confirm Password:</label>
                        <input type="text" 
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={ e => { setConfirmPassword(e.target.value) } } /><br/>
                    </>
                }

                <input type="submit" />
            </form>
        </div>
    )
}
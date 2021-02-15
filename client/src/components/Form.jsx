import React, { useState } from "react";

export default (props) => {
    const { EXAMPLEIn,  submitInput } = props;
    const [ EXAMPLE, setEXAMPLE ] = useState(EXAMPLEIn);

    const Process = (e) => {
        e.preventDefault();
        submitInput({ EXAMPLE });
    }

    return(
        <div>
            <form onSubmit={Process}>
                <label>EXAMPLE:</label>
                <input type="text" 
                name="EXAMPLE"
                value={EXAMPLE}
                onChange={ e => { setEXAMPLE(e.target.value) } } /><br/>
                <input type="submit" />
            </form>
        </div>
    )
}
import React from "react";
// import DeleteButton from "./DeleteButton";

export default (props) => {
    const { removingDOM } = props;
    console.log("Item List");
    console.log(props);
    return(
        <div>
            {
                props.items.map((item, i) => {
                    return(
                        <div key={i} id={i}>
                            <div style={{width: "50%", display: "flex", justifyContent: "space-between", margin: "10px auto"}}>
                                <p>{item.firstName} {item.lastName}</p>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                {/* <DeleteButton id={item._id} removingDOM={() => removingDOM(item._id)} /> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
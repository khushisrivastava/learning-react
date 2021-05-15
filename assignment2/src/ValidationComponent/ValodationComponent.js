import React from 'react';

const validationComponent = (props) => {
    let text = ""
    if (props.length < 5) text = "Text too Short"
    else text = "Text Long Enough"
    return (
        <p>{text}</p>
    )
}

export default validationComponent;

import React from 'react';
import './UserOutput.css';

const useroutput = (props) => {
    return (
        <div className='UserOutput'>
            <p>Username is:</p>
            <p>{props.username}</p>
        </div>
    )
}

export default useroutput
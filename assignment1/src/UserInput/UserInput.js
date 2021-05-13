import React from 'react';

const userinput = (props) => {
    const style = {
        border: '2px solid purple'
    }
    return (
        <div>
            <input style={style} onChange={props.change} type='text' value={props.username}/>
        </div>
    )
}

export default userinput
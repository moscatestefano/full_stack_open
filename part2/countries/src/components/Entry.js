import React, {useState} from 'react'
import SingleState from './SingleState'

const Entry = ({state}) => {

    const [ visible, setVisible ] = useState(false)
    
    const handleClick = () => {
        setVisible(!visible)
    }

    return (
        <div>
            {state.name}
            <button onClick={handleClick}>{visible? "Hide" : "Show"}</button>
            {visible? <SingleState key={state.name} state={state} /> : <></>}
        </div>
    )
}

export default Entry
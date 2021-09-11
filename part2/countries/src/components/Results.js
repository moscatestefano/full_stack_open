import React from 'react'
import SingleState from './SingleState'
import Entry from './Entry'

const Results = ({pool}) => {

    if (pool.length === 0)
        return <p>No such state found.</p>
    else if (pool.length > 10)
        return <p>Please refine your research.</p>
    else if (pool.length === 1)
        return (
            <div>
                <SingleState state={pool[0]}/>
            </div>
        )
    else
        return (
            pool.map(state => <Entry key={state.name} state={state}/>)
        )
}

export default Results
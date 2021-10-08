import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = ({filterChange}) => {

    const handleChange = (event) => {
        const actualFilter = event.target.value
        filterChange(actualFilter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter: <input onChange={handleChange} />
        </div>
    )
}

const ConnectedFilter = connect(null, { filterChange })(Filter)

export default ConnectedFilter
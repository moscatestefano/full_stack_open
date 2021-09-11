import React from 'react'

const AddForm = ({onSubmit, nameValue, nameHandle, phoneValue, phoneHandle}) => {
    return (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={nameValue} onChange={nameHandle} />
        </div>
        <div>
            phone: <input value={phoneValue} onChange={phoneHandle} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default AddForm
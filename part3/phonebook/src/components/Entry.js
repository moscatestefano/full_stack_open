import React from 'react'

const Entry = ({name, number, id, delref}) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {number}
            </td>
            <td>
                <button onClick={delref} idref={id}>delete</button>
            </td>
        </tr>
    )
}

export default Entry
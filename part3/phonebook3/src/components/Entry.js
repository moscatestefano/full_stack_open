import React from 'react'

const Entry = ({name, number, delref}) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {number}
            </td>
            <td>
                <button onClick={delref} idref={name}>delete</button>
            </td>
        </tr>
    )
}

export default Entry
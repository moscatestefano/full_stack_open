import React from 'react'
import Entry from './Entry'

const PeopleList = ({peopleToShow, delref})  => {
    return (
        <table>
            <tbody>
                {peopleToShow.map(person => <Entry key={person.name} name={person.name} number={person.number} delref={delref}/>)}
            </tbody>
        </table>
    )
}

export default PeopleList
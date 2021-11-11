import React from 'react'
import { CoursePart } from '../types' 
import Part from './Part'
import { assertNever } from '../utils'

interface CourseProps {
    courseParts: CoursePart[]
}

const Content = ({courseParts}: CourseProps) => {

    const fragments = courseParts.map((part) => {
        switch (part.type) {
            case "normal": return <Part key={part.name} coursePart={part}/>
            case "groupProject": return <Part key={part.name} coursePart={part}/>
            case "submission": return <Part key={part.name} coursePart={part}/>
            case "special": return <Part key={part.name} coursePart={part}/>
            default: assertNever(part)
        }
    })
    return (
        <div>
            {fragments}
        </div>
    )
}

export default Content
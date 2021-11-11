import React from 'react'
import { CoursePart } from '../types'

interface TotalProps {
    courseParts: CoursePart[]
}

const Total = ({courseParts}: TotalProps) => {
    return (
        <div>
            Total of exercises: {courseParts.reduce((stay, course) => stay + course.exerciseCount, 0)}
        </div>
    )
}

export default Total
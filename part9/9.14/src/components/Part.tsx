import React from 'react'
import { CoursePart } from '../types'

interface PartProps {
    coursePart: CoursePart
}

const Part = ({coursePart}: PartProps) => {
    if (coursePart.type === "normal") {
        return (
          <div>
            <h2>
              {coursePart.name}
            </h2>
            <div>
              Number of exercises: {coursePart.exerciseCount}
            </div>
            <div>
              Course description: {coursePart.description}
            </div>
          </div>
        );
      } else if (coursePart.type === "groupProject") {
        return (
          <div>
            <h2>
              {coursePart.name}
            </h2>
            <div>
              Number of exercises: {coursePart.exerciseCount}
            </div>
            <div>
              Number of group projects: {coursePart.groupProjectCount}
            </div>
          </div>
        );
      } else if (coursePart.type === "submission") {
        return (
          <>
            <h2>
              {coursePart.name}
            </h2>
            <div>
              Number of exercises: {coursePart.exerciseCount}
            </div>
            <div>
              Course description: {coursePart.description}
            </div>
            <div>
              Exercise submission link: <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
            </div>
          </>
        )
      } else if (coursePart.type === "special") {
      return (
      <>
        <h2>
          {coursePart.name}
        </h2>
        <div>
          Number of exercises: {coursePart.exerciseCount}
        </div>
        <div>
          Course description: {coursePart.description}
        </div>
        <div>
          Requirements: <ul>{coursePart.requirements.map(r => <li key={r}>{r}</li>)}</ul>
        </div>
      </>
      )}
      return null;
    }

export default Part
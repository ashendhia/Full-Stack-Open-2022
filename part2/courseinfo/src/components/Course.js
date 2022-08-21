import React from 'react'

const Header = ({ head }) => {
    return (
        <h2>{head}</h2>
    )
}

const Part = ({ part, exercises }) =>
    <p>
        {part} {exercises}
    </p>


const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )
            }
            <p><strong>total of {total} exercises</strong></p>
        </>
    )
}

const Course = ({ course }) =>
    <>
        <Header head={course.name} />
        <Content parts={course.parts} />
    </>
const Courses = ({ courses }) =>
    <>
        <h1>Web development curriculum</h1>
        {courses.map(course =>
            <Course key={course.id} course={course} />
        )
        }
    </>
export default Courses
import React from 'react'
import ReactDOM from 'react-dom/client'
import unicafeReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(unicafeReducer)

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    )
}

const Feedback = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
        </>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good + neutral + bad === 0) {
        return (
            <>
                <h1>statistics</h1>
                <p>
                    No feedback given
                </p>
            </>
        )
    }
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='all' value={good + neutral + bad} />
                    <StatisticLine text='average' value={(good + bad * (-1)) / (good + neutral + bad)} />
                    <StatisticLine text='positive' value={good * 100 / (good + neutral + bad) + ' %'} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state

    const handleGoodClick = () => store.dispatch({ type: 'GOOD' })
    const handleNeutralClick = () => store.dispatch({ type: 'OK' })
    const handleBadClick = () => store.dispatch({ type: 'BAD' })

    return (
        <div>
            <Feedback handleGoodClick={handleGoodClick} handleNeutralClick={handleNeutralClick} handleBadClick={handleBadClick} />
            <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)
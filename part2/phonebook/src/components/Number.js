import React from "react"
import personService from '../services/Person'

const Number = ({ name, phoneNumber, id, persons, setPersons, notification, setNotification }) => {

    return (
        <>{name} {phoneNumber} <button onClick={
            () => {
                if (window.confirm(`Delete from ${name}`)) {
                    personService.deleteNumber(id).catch(error => {
                        setNotification({
                            type: 'red',
                            message: `Information of ${name} has already been deleted from server`
                        })
                        setTimeout(() => {
                            setNotification({
                                type: null,
                                message: ''
                            })
                        }, 5000)
                    })
                    setPersons(persons.filter(n => n.id !== id))
                    setNotification({
                        type: 'red',
                        message: `Deleted ${name}`
                    })
                    setTimeout(() => {
                        setNotification({
                            type: null,
                            message: ''
                        })
                    }, 5000)
                }
            }
        }>delete
        </button>
            <br />
        </>
    )
}
const Numbers = ({ personsToShow, persons, setPersons, notification, setNotification }) => {

    return (
        <>
            <h3>Numbers</h3>
            {personsToShow.map((person) =>
                <Number key={person.id} id={person.id} name={person.name} phoneNumber={person.phoneNumber} persons={persons} setPersons={setPersons} notification={notification} setNotification={setNotification} />
            )}
        </>
    )
}


export default Numbers
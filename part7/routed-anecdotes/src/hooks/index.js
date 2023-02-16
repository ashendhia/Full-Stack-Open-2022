import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return ({
        field: {
            type: type,
            value: value,
            onChange: onChange
        },
        setValue: setValue,
    }
    )
}
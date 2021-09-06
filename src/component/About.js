import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

export const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1>This is About {a.state.name}</h1>
        </div>
    )
}

export default About
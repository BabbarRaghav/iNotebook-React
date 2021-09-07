import React, {useContext, useEffect} from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, fetchNote} = context
    useEffect(() => {
        fetchNote()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="row my-3">
            <h1>Your Note</h1>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
    )
}

export default Notes

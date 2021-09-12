import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext"
import { useState } from "react";

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note, setnote] = useState({title: "", description: "", tag: "General"})
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setnote({title: "", description: "", tag: "General"})
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1>Add Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} required value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<3 || note.description.length<5}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNote

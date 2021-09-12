import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, fetchNote, editNote } = context
    const [note, setnote] = useState({title: "", description: "", tag: "General"})
    useEffect(() => {
        fetchNote()
        // eslint-disable-next-line
    }, [])
    const handleClick = (e)=>{
        console.log("updateing note..... "+note)
        e.preventDefault()
        editNote(note._id, note.title, note.description, note.tag)
        props.showAlert("Updated Successfully", "success")
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    const updatenote = (currentnote) => {
        ref.current.click()
        setnote(currentnote)
    }
    const ref = useRef('')
    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal" disabled={note.title.length<3 || note.description.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Note</h1>
                {notes.length===0 && <h5>No Notes to show!!!</h5>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes

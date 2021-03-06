import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const { note, updatenote } = props
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <button type="button" className="btn btn-primary m-1" onClick={()=>{updatenote(note)}}>
                        <i className="far fa-edit mx-1"></i>Update
                    </button>
                    <button type="button" className="btn btn-primary m-1" onClick={()=>{
                        deleteNote(note._id)
                        props.showAlert("Deleted Successfully", "success")
                        }}>
                        <i className="far fa-trash-alt mx-1"></i>Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

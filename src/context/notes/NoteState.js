import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  let note = []
  const [notes, setNotes] = useState(note)
  //Get all notes
  const fetchNote = async () => {
    //Calling API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
    return json
  }
  //Add note
  const addNote = async (title, description, tag) => {
    //Calling API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("Adding new note")
    note = json
    setNotes(notes.concat(note))
    console.log(json)
  }
  //Delete note
  const deleteNote = async (id) => {
    //Calling API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    console.log(json)
  }
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //Calling API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
        break
      }
    }
    setNotes(newNotes)
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNote}}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState
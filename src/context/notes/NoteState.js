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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzkxNTQzMDU0YWViYzc4YjU0YjA5In0sImlhdCI6MTYzMTAwMDg2Nn0.dbGeIQOX8RJa4z-N3U50RlIkDr2lk_ve0zyhsR7uhKE'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzkxNTQzMDU0YWViYzc4YjU0YjA5In0sImlhdCI6MTYzMDc3NjYxMX0.A057nDsfO_1ANrm2_m45vNIQqMHOn1Rof44-3WPM7l0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("Adding new note")
    note = {
      "_id": "6135ff3da0c4e27c2343f4a287",
      "user": "613391543054aebc78b54b09",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-06T11:45:01.109Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
    return json
  }
  //Delete note
  const deleteNote = (id) => {
    console.log("deleting with id=" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //Calling API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzkxNTQzMDU0YWViYzc4YjU0YjA5In0sImlhdCI6MTYzMDc3NjYxMX0.A057nDsfO_1ANrm2_m45vNIQqMHOn1Rof44-3WPM7l0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }

    }
    return json
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNote }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState
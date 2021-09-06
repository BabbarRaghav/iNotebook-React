import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const note = [
        {
          "_id": "6133b8ebea3e06c43dd555c1",
          "user": "613391543054aebc78b54b09",
          "title": "Test",
          "description": "hello this is a test",
          "tag": "General",
          "date": "2021-09-04T18:20:27.123Z",
          "__v": 0
        },
        {
          "_id": "6135ff3da0c4e2c2343fa287",
          "user": "613391543054aebc78b54b09",
          "title": "Sleep",
          "description": "Go for a sleep",
          "tag": "night",
          "date": "2021-09-06T11:45:01.109Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(note)
    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState
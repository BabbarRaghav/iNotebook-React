import noteContext from "./NoteContext";
// import { useState } from "react";

const NoteState = (props)=>{
    return (
        <noteContext.Provider value={{}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState
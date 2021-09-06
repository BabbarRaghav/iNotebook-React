import React from 'react'
import Notes from './Notes'

export const Home = () => {
    return (
        <div className="container my-3">
            <h1>Add Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Notes/>
        </div>
    )
}

export default Home
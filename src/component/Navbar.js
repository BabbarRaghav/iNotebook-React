import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'


export const Navbar = (props) => {
    let location = useLocation();
    let history = useHistory()
    let user = []
    const [users, setusers] = useState(user)
    const logout = () => {
        localStorage.removeItem('auth-token')
        history.push("/login")
        props.showAlert("Logout Successfully", "success")
    }
    const fetchUser = async () => {
        //Calling API
        const response = await fetch('http://localhost:5000/api/auth/getUser', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json();
        setusers(JSON.parse(JSON.stringify(json)))
        console.log(users)
        return json
    }
    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line
    }, [1])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('auth-token') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form> : <form className="d-flex">
                            <ul className="navbar-nav btn-group dropstart">
                                <li className="nav-item dropdown">
                                    <button type="button" className="btn btn-danger dropdown-toggle me-3" data-bs-toggle="dropdown" aria-expanded="false">
                                        {users.name}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><Link className="dropdown-item" to="/">{users.email}</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <button className="btn btn-primary" onClick={logout}>Logout</button>
                        </form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar


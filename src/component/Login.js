import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [auth, setauth] = useState({email: "", password: ""})
    let history = useHistory()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: auth.email, password: auth.password})
        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            localStorage.setItem('auth-token', json.jwtData)
            history.push("/")
        }
    }
    const onChange = (e)=>{
        setauth({...auth, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={auth.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={auth.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

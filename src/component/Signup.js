import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [auth, setauth] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (auth.cpassword === auth.password) {
            const response = await fetch("http://localhost:5000/api/auth/createUser", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: auth.name, email: auth.email, password: auth.password })
            });
            const json = await response.json()
            console.log(json)
            if (json.success){
                localStorage.setItem('auth-token', json.jwtData)
                history.push("/login")
            }
        }
        else{
            alert("Invalid Password! Password and conform password not match")
        }
    }
    const onChange = (e) => {
        setauth({ ...auth, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

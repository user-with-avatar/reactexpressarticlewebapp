import { useState } from "react"

const Login = ()=>{
    const [uname, c_uname] = useState('')
    const [upass, c_upass] = useState('')
    const C_uname = (event) =>{ c_uname(event.target.value) }
    const C_upass = (event) =>{ c_upass(event.target.value) }
    const [message, c_message] = useState('')

    const RegUser = async (event)=>{
        event.preventDefault()
        const ans = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: uname,
                password: upass
            })
        })
        console.log(ans.status)
        if (ans.status === 200){
            const data = await ans.json()
            if (data.err){
                c_message(data.err)
            } else {
                c_message('')
                localStorage.setItem('token', data.token)
                window.location.reload()
            }
        } else { console.error(ans)}
    }
    
    return (
        <div className="logreg">
            <a>name</a><br/><p/><input onChange={C_uname}></input><br/><p/>
            <a>password</a><br/><p/><input onChange={C_upass}></input><br/><p/>
            <button onClick={RegUser}>login</button>
            <a>{message}</a>
        </div>
    )
}

export default Login
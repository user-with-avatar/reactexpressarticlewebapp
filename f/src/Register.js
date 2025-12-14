import { useState } from "react"

const Register = ()=>{
    const [name, c_name] = useState('')
    const [pass, c_pass] = useState('')
    const changeName = (event) =>{ c_name(event.target.value) }
    const changePass = (event) =>{ c_pass(event.target.value) }
    const [message, c_message] = useState('')
    
    const regAcc = async ()=>{
        const existsans = await fetch(`http://127.0.0.1:8000/username/${name}`).catch((err)=>{console.log(err); c_message('Error occured')})
        if (existsans){
            const existsdata = await existsans.json()
            if (!existsdata.err) {
                c_message('User already exists')
                return
            }
        }

        await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'name': name,
                'password': pass
            })
        }).catch((err)=>{console.log(err); c_message('Error occured')})
    }

    return (
        <div className="logreg">
            <a>name</a><br/><p/><input type="text" onChange={changeName}></input><br/><p/>
            <a>password</a><br/><p/><input type="text" onChange={changePass}></input><br/><p/>
            <button onClick={regAcc}>Register new account</button>
            <a>{message}</a>
        </div>
    )
}

export default Register
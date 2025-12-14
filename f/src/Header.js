import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Header = ()=>{
    const [logged, c_logged] = useState(false)
    const [user, c_user] = useState()
    const [avatar, c_avatar] = useState('http://127.0.0.1:8000/useravatar/-1')

    useEffect(()=>{
        const G = async ()=>{
            const ans = await fetch('http://127.0.0.1:8000/auth/getuser', {
                headers: {Authorization: "Bearer "+localStorage.getItem('token')}
            })
            if (ans.status === 401) {
                c_user('Not Logged In');
                c_logged(false)
                return
            }
            const data = await ans.json()
            c_user(data)
            c_logged(true)
            if (data.avatar){ c_avatar(`http://127.0.0.1:8000/useravatar/${data.id}`) }
        }
        G()
    }, [])
    
    const changeAvatarPressed = ()=>{
        if (!logged){return}
        const inp = document.getElementById('inputavatar')
        inp.click()
    }
    const setAvatar = (event)=>{
        if (event.target.files[0] == undefined){return}
        const G = async ()=>{
            const file = event.target.files[0]
            var formData = new FormData()
            formData.append('file', file)
            console.log(user.id)
            const blobbbeduserid = new Blob([user.id], { type: "text/plain" });
            formData.append("something", blobbbeduserid)
            const ans = await fetch(`http://127.0.0.1:8000/setavatar`, {method: 'POST', body: formData})
            const data = await ans.json()
            console.log(data)
        }
        G()
        window.location.reload()
    }

    return (
        <div className="header">
            <Link to="/"><button>Home</button></Link>
            <img src={avatar} onClick={changeAvatarPressed}></img>
            <input id='inputavatar' type="file" accept="image/*" hidden={true} onChange={setAvatar}></input>
            <div className="headernameholder"><a>{logged && user.name}</a></div>
            <div className="headerrightside">
                {logged && <Link to="/create"><button>Create article</button></Link>}
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Register</button></Link>
            </div>
        </div>
    )
}

export default Header
import { useEffect, useState } from "react"
import Comment from "./Comment"


const Comments = ({articleid})=>{
    const [coms, c_coms] = useState([])

    useEffect(()=>{
        const G = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/comments/${articleid}`)
            const data = await ans.json()
            c_coms(data)
        }
        G()
    }, [])

    const addComment = ()=>{
        const G = async ()=>{
            const text = document.getElementById('inputtextfield').value
        
            const uans = await fetch('http://127.0.0.1:8000/auth/getuser', { headers: {Authorization: "Bearer "+localStorage.getItem('token')} })
            if (uans.status === 401) { console.log("Error in getting user"); return }
            const udata = await uans.json()
            if (!udata.id) { console.log("Error in getting user"); return }

            await fetch('http://127.0.0.1:8000/comment', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "text": text,
                    "author": udata.id,
                    "article": parseInt(articleid), // idk where it became string, but anyways
                    "parent": -1
                })
            })
            window.location.reload()
        }
        G()
    }


    return (
        <div>
            <input id="inputtextfield" placeholder="New comment..."></input>
            <button onClick={addComment}>Add comment</button>
            {coms.map((com, i)=><Comment key={i} authorid={com.user} text={com.text} comid={com.id} articleid={articleid}/>)}
        </div>
    )
}

export default Comments
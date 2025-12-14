import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Edit = ()=>{
    const {id} = useParams()
    const [cantedit, c_cantedit] = useState()
    const [redirectnode, c_redirectnode] = useState(<></>)

    useEffect(()=>{
        const G = async ()=>{
            const uans = await fetch('http://127.0.0.1:8000/auth/getuser', { headers: {Authorization: "Bearer "+localStorage.getItem('token')} })
            if (uans.status === 401) { console.log("Error in getting user"); return }
            const udata = await uans.json()
            if (!udata.id) { console.log("Error in getting user"); return }

            const aans = await fetch(`http://127.0.0.1:8000/${id}`)
            const adata = await aans.json()
            if (!adata.id) { console.log("Error in getting article"); return }
            
            if (udata.id != adata.author) { c_cantedit(true); return }
            document.getElementById('articletitleinput').value = adata.title
            document.getElementById('articletextarea').value = adata.text
        }
        G()
    }, [])

    const changeArticle = ()=>{
        const title = document.getElementById('articletitleinput').value
        const text = document.getElementById('articletextarea').value

        const G = async ()=>{
            const aans = await fetch(`http://127.0.0.1:8000/${id}`)
            const adata = await aans.json()
            if (!adata.id) { console.log("Error in getting article"); return }
            
            await fetch('http://127.0.0.1:8000/edit',
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        title: title,
                        text: text,
                        articleid: adata.id
                    })
                }
            )
        }
        G()
    }
    
    const deleteArticle = ()=>{
        const G = async ()=>{
            const aans = await fetch(`http://127.0.0.1:8000/${id}`)
            const adata = await aans.json()
            if (!adata.id) { console.log("Error in getting article"); return }
            await fetch('http://127.0.0.1:8000/delete',
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer "+localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        articleid: adata.id
                    })
                }
            )
        }
        G()
    }

    return (
        <div className="createedit">
            {redirectnode}
            {cantedit && <div><a>Can't edit others article</a></div>}
            {!cantedit &&
                <div>
                    <input id='articletitleinput' placeholder="title"></input><br/>
                    <textarea id='articletextarea' rows='20' cols='50'></textarea><br/>
                    <button onClick={changeArticle}>Change</button>
                    <button onClick={deleteArticle}>Delete Article</button>
                </div>
            }
        </div>
    )
}

export default Edit
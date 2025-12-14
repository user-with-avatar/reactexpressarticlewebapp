import { useEffect, useState } from "react"

const AnswerField = (props)=>{
    const c_yourans = props.c_yourans
    const articleid = props.articleid
    const curcomid = props.curcomid

    const [text, c_text] = useState('')
    const C_text = (event)=>{c_text(event.target.value)}
    const answerSend = ()=>{
        const G = async ()=>{
            const ans = await fetch('http://127.0.0.1:8000/auth/getuser', { headers: {Authorization: "Bearer "+localStorage.getItem('token')} })
            if (ans.status === 401) { console.log("Error in getting user"); return }
            const data = await ans.json()
            console.log(articleid)
            c_yourans(undefined)
            if (!data.id) { console.log("Error in getting user"); return }
            console.log(JSON.stringify({
                    "text": text,
                    "author": data.id,
                    "article": parseInt(articleid), // idk where it became string, but anyways
                    "parent": curcomid
                })) // without this print it can't handle deep comment answering smw
            await fetch('http://127.0.0.1:8000/comment', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "text": text,
                    "author": data.id,
                    "article": parseInt(articleid), // idk where it became string, but anyways
                    "parent": curcomid
                })
            })
        }
        G()
        // window.location.reload()
        // TODO: call showmore on prevous element (nah, not this project)
    }

    return (
        <div>
            <input type="text" onChange={C_text}></input><button onClick={answerSend}>send</button>
        </div>
    )
}

const Comment = (props)=>{
    const authorid = props.authorid
    const text = props.text
    const comid = props.comid
    const articleid = props.articleid

    const [hasnested, c_hasnested] = useState(false)

    const [authorname, c_authorname] = useState('')
    const [authorimagesrc, c_authorimagesrc] = useState('http://127.0.0.1:8000/useravatar/-1')
    useEffect(()=>{
        const G = async ()=>{
            if (authorid != null) {
                const author_ans = await fetch(`http://127.0.0.1:8000/user/${authorid}`)
                const author_data = await author_ans.json()
                c_authorname(author_data.name)
                
                if (author_data.avatar != null) { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/${authorid}`) }
                else { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/-1`) }
            }
            else { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/-1`);  }

            // nested
            const ans = await fetch(`http://127.0.0.1:8000/comment_childs/${comid}`)
            const data = await ans.json()
            c_hasnested(data.length > 0)
        }
        G()
    }, [])

    const [coms, c_coms] = useState([])

    const showmore = ()=>{
        const G = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/comment_childs/${comid}`)
            const data = await ans.json()
            const out = data.map((com, i)=><Comment key={i} articleid={articleid} authorid={com.user} text={com.text} comid={com.id} children={[]}/>)
            c_coms(out)
        }
        G()
    }

    const [yourans, c_yourans] = useState(undefined)
    const answerClick = ()=>{
        c_yourans(<AnswerField c_yourans={c_yourans} curcomid={comid} articleid={articleid}/>)
    }

    return (
        <div className='comment'>
            <img src={authorimagesrc}></img><a>{authorname}</a><br/>
            <a>{text}</a><br/>
            {yourans || <button onClick={answerClick}>Answer</button>}
            {hasnested && !coms[0] && <button onClick={showmore}>Show more</button>}
            {coms}
        </div>
    )
}
export default Comment
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Navigation from "./Navigation"
import Comments from "./Comments"

const Article = ()=>{
    const {id} = useParams()
    const [title, c_title] = useState('loading')
    const [text, c_text] = useState('')
    const [textonpage, c_textonpage] = useState('loading')
    const [authorname, c_authorname] = useState('/anonymous\\')
    const [authorimagesrc, c_authorimagesrc] = useState(null)

    const [ownart, c_ownart] = useState(false)

    const MAX_CHARACTERS_PER_PAGE = 2000;
    const [page, c_page] = useState(0);
    
    const nextpage = ()=>{
        c_textonpage(text.slice((page+1)*MAX_CHARACTERS_PER_PAGE, (page+2)*MAX_CHARACTERS_PER_PAGE))
        c_page(page+1) // updates late, c_textonpage calls first
        console.log((page+1)*MAX_CHARACTERS_PER_PAGE, (page+2)*MAX_CHARACTERS_PER_PAGE)
    }
    const prevpage = ()=>{
        c_textonpage(text.slice((page-1)*MAX_CHARACTERS_PER_PAGE, (page)*MAX_CHARACTERS_PER_PAGE))
        c_page(page-1) // updates late, c_textonpage calls first
        console.log((page-1)*MAX_CHARACTERS_PER_PAGE, (page)*MAX_CHARACTERS_PER_PAGE)
    }

    useEffect(()=>{
        const G = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/${id}`)
            const data = await ans.json()
            c_title(data.title)
            c_text(data.text)
            c_textonpage(data.text.slice(0, MAX_CHARACTERS_PER_PAGE))
            
            if (data.author != null) {
                const author_ans = await fetch(`http://127.0.0.1:8000/user/${data.author}`)
                const author_data = await author_ans.json()
                c_authorname(author_data.name)
                
                if (author_data.avatar != null) { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/${data.author}`) }
                else { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/-1`) }
            }
            else { c_authorimagesrc(`http://127.0.0.1:8000/useravatar/-1`) }

            const uans = await fetch('http://127.0.0.1:8000/auth/getuser', { headers: {Authorization: "Bearer "+localStorage.getItem('token')} })
            if (uans.status === 401) { console.log("Error in getting user"); return }
            const udata = await uans.json()
            if (udata.id && udata.id == data.author) {c_ownart(true)}
            else {c_ownart(false)}
        }
        G()
    }, [])

    return (
        <div>
            {ownart && <div><img src={authorimagesrc}></img><Link to={`/edit/${id}`}><button>Edit</button></Link></div>}
            <p>{authorname} : {title}</p>
            <Navigation prevpage={()=>{prevpage()}} number={page} nextpage={()=>{nextpage()}}/>
            <textarea className="articletext" readOnly='true' value={textonpage}></textarea>
            <Comments articleid={id}/>
        </div>
    )
}

export default Article

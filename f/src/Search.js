import { useEffect, useState } from "react"

const ArticleButton = (props)=>{
    const title = props.title
    const id = props.id
    const thehref = `/${id}`
    return (
        <div>
            <a href={thehref}>{title}</a><br/>
        </div>
    )
}

const Search = ()=>{
    const [arts, c_arts] = useState([])

    useEffect(()=>{
        const H = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/articles`)
            const data = await ans.json()
            c_arts(data)
        }
        H()
    }, [])

    const FetchArticles = (event)=>{
        const H = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/articles`)
            const data = await ans.json()
            c_arts(data)
        }
        const G = async ()=>{
            const ans = await fetch(`http://127.0.0.1:8000/articlefind/${event.target.value}`)
            const data = await ans.json()
            c_arts(data)
        }

        if (event.target.value == '') { H() }
        else { G() }
    }

    return (
        <div className="search">
            <input onChange={FetchArticles} placeholder="Search for titles..."></input>
            {arts.map((art, i) =><ArticleButton key={i} id={art.id} title={art.title} />)}
        </div>
    )
}

export default Search
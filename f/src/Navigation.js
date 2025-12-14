const Navigation = (props)=>{    
    const prevpage = props.prevpage
    const number = props.number
    const nextpage = props.nextpage
    return (
        <div>
            <button onClick={prevpage}>Prev</button>
            <a>{number}</a>
            <button onClick={nextpage}>Next</button>
        </div>
    )
}

export default Navigation
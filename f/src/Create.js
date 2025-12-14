const Create = ()=>{
    const createArticle = ()=>{
        const title = document.getElementById('articletitleinput').value
        const text = document.getElementById('articletextarea').value

        const G = async ()=>{
            const ans = await fetch('http://127.0.0.1:8000/auth/getuser', { headers: {Authorization: "Bearer "+localStorage.getItem('token')} })
            if (ans.status === 401) { console.log("Error in getting user"); return }
            const data = await ans.json()
            if (!data.id) { console.log("Error in getting user"); return }

            await fetch('http://127.0.0.1:8000/create',
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        title: title,
                        text: text,
                        userid: data.id
                    })
                }
            )
        }
        G()
    }

    return (
        <div className="createedit">
            <input id='articletitleinput' placeholder="title"></input><br/>
            <textarea id='articletextarea' rows='20' cols='50'></textarea><br/>
            <button onClick={createArticle}>Create</button>
        </div>
    )
}

export default Create
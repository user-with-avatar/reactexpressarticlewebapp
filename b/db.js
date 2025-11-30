import mysql2 from 'mysql2'

const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'thething'
}).promise()

export const GetArticleById = async (id) =>{
    const [ans] = await pool.query('select * from articles where id=?', id)
    return ans[0]
}
export const GetUserById = async (id) =>{
    const [ans] = await pool.query('select * from users where id=?', id)
    return ans[0]
}
export const GetAvatarByUserId = async (id) =>{
    const [ans] = await pool.query('select avatar from users where id=?', id)
    return ans[0]
}
export const GetCommentsByArticleId = async (id) =>{
    const [ans] = await pool.query('select * from comments where article=? and parent=-1', id)
    return ans
}
export const GetCommentsByParentId = async (id) =>{
    const [ans] = await pool.query('select * from comments where parent=?', id)
    return ans
}
export const GetArticleByTitleLike = async (text) =>{
    const [ans] = await pool.query(`select id, title from articles where title like "%${text}%"`)
    return ans
}
export const GetUserByName = async (name) =>{
    const [ans] = await pool.query('select * from users where name=?', name)
    if (ans[0] == undefined) { return {"err": "No user found"} }
    return ans[0]
}
export const Hash = async (text) =>{
    const [ans] = await pool.query('select sha1(?)', [text])
    return Object.values(ans[0])
}
export const CreateUser = async (name, password) =>{
    const [ans] = await pool.query('insert into users (name, password) values (?, sha1(?))', [name, password])
    return ans.insertId
}
export const SetAvatar = async (image, id) =>{
    pool.query('update users set avatar=? where id=?', [image, id])
}
export const AddComment = async (text, user, article, parent) =>{
    await pool.query('insert into comments (text, user, article, parent) values (?, ?, ?, ?)', [text, user, article, parent])
}
export const CreateArticle = async (title, text, userid) =>{
    await pool.query('insert into articles (title, text, author) values (?, ?, ?)', [title, text, userid])
}
export const EditArticle = async (title, text, articleid) =>{
    await pool.query('update articles set title=?, text=? where id=?', [title, text, articleid])
}
export const DeleteArticle = async (articleid) =>{
    await pool.query('delete from articles where id=?', articleid)
}
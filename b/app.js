import express from 'express'
import { AddComment, CreateArticle, CreateUser, DeleteArticle, EditArticle, GetArticleById, GetArticleByTitleLike, GetAvatarByUserId, GetCommentsByArticleId, GetCommentsByParentId, GetUserById, GetUserByName, Hash, SetAvatar } from './db.js'
import cors from 'cors'
import multer from 'multer'
const upload = multer()

const app = express()
app.use(express.json())

app.use( cors( {origin: "*", methods: ["GET", "POST"]} ) )

// auth thing
import passport from 'passport'
import LocalStrategy from 'passport-local'
import passportJWT from 'passport-jwt'

const JWTStrategy = passportJWT.Strategy
app.use(passport.initialize())

passport.use(new LocalStrategy({ usernameField: 'name' }, async (name, password, done) =>{
    const compareduser = await GetUserByName(name);
    const hpass = await Hash(password)
    if (compareduser && name == compareduser.name && hpass == compareduser.password){ return done(null, compareduser) }
    else { return done(null, false) }
} ))

passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), // token out of header
    secretOrKey: "jwt_secret" // en/de-cryptor seed
}, async (jwt_payload, done) =>{
    const compareduser = await GetUserByName(jwt_payload.user.name)
    if (compareduser.id==jwt_payload.user._id) { return done(null, compareduser) } // compare jwt body to user
    else { return done(null, false, {message: 'token not mathed'}) }
}))

import jwt from 'jsonwebtoken'

app.post('/auth/login', (req, res, next) =>{
    passport.authenticate('local', (err, user) =>{
        if (err){ return next(err) }
        if (!user){ res.send({"err": "Wrong password or name"}); return }
        req.login(user, () =>{
            const body = {_id: user.id, name: user.name}
            const token = jwt.sign({user: body}, 'jwt_secret')
            return res.json({token})
        })
    })(req, res, next)
})
app.get('/auth/getuser', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    if (!req.user){ req.json({username: "nobody"}) }
    else { res.json(req.user) }
})

app.post('/auth/register', async (req, res) =>{
    const {name, password} = req.body
    const userId = await CreateUser(name, password)
    res.status(201).send(userId)
})
// eo auth thing

app.get('/articles', async (req, res) =>{
    const ans = await GetArticleByTitleLike('')
    res.send(ans)
})
app.get('/:articleid', async (req, res) =>{
    const ans = await GetArticleById(req.params.articleid)
    res.send(ans)
})
app.get('/user/:userid', async (req, res) =>{
    const ans = await GetUserById(req.params.userid)
    res.send(ans)
})
app.get('/username/:username', async (req, res) =>{
    const ans = await GetUserByName(req.params.username)
    res.send(ans)
})
app.get('/useravatar/:userid', async (req, res) =>{
    if (req.params.userid == -1){ res.sendFile(`${process.cwd()}/avatar-empty.png`); return }
    const ans = await GetAvatarByUserId(req.params.userid)
    res.setHeader('Content-Type', 'image/png')
    res.send(ans.avatar)
})
app.get('/comments/:articleid', async (req, res) =>{
    const ans = await GetCommentsByArticleId(req.params.articleid)
    res.send(ans)
})
app.get('/comment_childs/:parentid', async (req, res) =>{
    const ans = await GetCommentsByParentId(req.params.parentid)
    res.send(ans)
})
app.get('/articlefind/:text', async (req, res) =>{
    const ans = await GetArticleByTitleLike(req.params.text)
    res.send(ans)
})

app.post('/setavatar', upload.any(), async (req, res) =>{
    await SetAvatar(req.files[0].buffer, parseInt(req.files[1].buffer.toString('utf8')))
})
app.post('/comment', async (req, res) =>{
    await AddComment(req.body.text, req.body.author, req.body.article, req.body.parent);
    res.send('ok')
})
app.post('/create', async (req, res) =>{
    await CreateArticle(req.body.title, req.body.text, req.body.userid)
})
app.post('/edit', async (req, res) =>{
    await EditArticle(req.body.title, req.body.text, req.body.articleid)
})
app.post('/delete', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    if (!req.user){ req.json({err: 'rejected'}) }
    else { await DeleteArticle(req.body.articleid) }
})

app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).send('SERVER ERROR')
})
app.listen(8000, ()=>{ console.log('yup,go.') })
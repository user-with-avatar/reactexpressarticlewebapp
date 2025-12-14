### Excalidraw
- [clean plan](https://excalidraw.com/#json=GPqbFYny6MOM0xrPjd0tl,d4RnEcDl3iPxVmpiMpKmXw)
- [article page](https://excalidraw.com/#json=yBrs-5Nr9R1w5Llf0OWt5,WmrcbBvCbGemAtU5rYyXYg)
- [article page+](https://excalidraw.com/#json=YMMTzNQHHSKFuMSTrbdjG,cXWjGODkhNY2BZQEsW3EWQ)
- [title search && header](https://excalidraw.com/#json=aecw-LX2Fbwkp4mivLSps,j7O_LiIRkhMUnnyAb3dEoA)
- [login and registration](https://excalidraw.com/#json=fU9lMITzpCwpLw5xswb3u,CKNPrttpbPNfh-wwPmopeQ)
- [commenting](https://excalidraw.com/#json=lQLkj_AqK5EqTx1UWhPoH,hlYGvksZtokE0o9Vg36pkg)
- [article creation, deletion and edit](https://excalidraw.com/#json=uKnHV5rspqbdXVfwuu0vz,FQC1O5lMRoZyrmV1HSM7Tg)
- [fin](https://excalidraw.com/#json=tJPwyUFGX6La3SEY2WhAF,Vrydbk149sMn8C7kS3Vrug)

**TODO (maybe):**
- make some things with `dotenv`

---
### Backend

>**start**
- `npm init`
- `npm i express mysql2` *server and sql handling*
- `npm i passport passport-local passport-jwt jsonwebtoken` *login and registration*
- `npm i cors` *cross-port fetch*

+ specified `"type": "module",` in `package.json`
+ removed `"main"` script in `package.json`
+ created `app.js` and `db.js`
+ `app.js` error handle, listen port

- `mysql2` pool init in `db.js`
<br />

>**article page**
- created `GetArticleById` in `db.js`
- created `get` page `/:articleid'` with output of article by id in `app.js`
- created `cors` avoidance
- created `GetUserById` in `db.js`
- created `get` page `/user/:userid` with output of user by id in `app.js`
- created `GetAvatarByUserId` in `db.js`
- created `get` page `/useravatar/:userid` with output of avatar image in `app.js`
- changed `/useravatar/:userid` with `userid` of `-1` for empty user image in `app.js`
- created `GetCommentsByArticleId` with output list of comments for selected article in `db.js`
- created `get` page `/comments/:articleid` with output of `GetCommentsByArticleId` (`db.js`) in `app.js`
- created `GetCommentsByParentId` with output list of comments with selected `parent` in `db.js`
- created `get` page `/comment_childs/:parentid` with output of `GetCommentsByParentId` (`db.js`) in `app.js`

>**title search**
- created `GetArticleByTitleLike` with output of articles where title `like "%?%"` in `db.js`
- created `get` page `/articlefind/:text` with output of `GetArticleByTitleLike` (`db.js`) in `app.js`
- created `get` page `/articles` with output of all articles in `app.js`
- noticed that pages `/smth` must be initialized before any ids like `/smthels/:id`

>**login and registration**
- created `GetUserByName`, `Hash`, `CreateUser` in `db.js`
- initialised `jwt` strategy with `passport` and `jwt` in `app.js`
- created `/auth/login`, `/auth/getuser`, `/auth/register` in `app.js`
- created `get` page `/username/:username` with output of user with selected name in `app.js`

>**avatar upload**
- `npm i multer --save`
- include `multer` in `app.js`
- created `post` page `/setavatar` with input of `FormData` with image `file` and `userid`, handled by `multer` and get files by `res.files` instead of `res.body`
- created `SetAvatar` in `db.js`
- `/setavatar` in `app.js` now calls `SetAvatar` of `db.js` with input of recived image buffer

>**comment answer**
- created `AddComment` with input of `text, author, article, parent` in `db.js`
- created `post` page `/comment` in `app.js`

>**article creation, deletion and edit**
- created `CreateArticle` with inputs of `title` `text` `userid` in `db.js`
- created `EditArticle` with inputs of `title` `text` `articleid` in `db.js`
- created `DeleteArticle` with inputs of `article` in `db.js`
- connected `CreateArticle` `EditArticle` `DeleteArticle` (`db.js`) to `/create` `/edit` `/delete` respectively in `app.js`
- created auth controll for `/delete` in `app.js`

---
### Frontend

>**start**
- `npx create-react-app f`
- `npm i react-router-dom` *for multiple pages*
+ removed `App.css`, `App.test.js`, `index.css`, `logo.svg`, `setupTests.js`, `reportWebVitals.js`
+ cleared `App.js` and `index.js`
+ renamed `App.js` to `Home.js`
+ created `<Routes>` and `<Route>` for `index.js`: `/` as `<Home />` page
<br />

>**article page**
- created `Article.js` page
- `fetch` article title and text
- `fetch` article author name if not `null`
- `fetch` article author avatar if not `null`
- set article author avatar to `empty-avatar` (avatar `-1`) if not exists author or avatar

+ created `page`, `MAX_CHARACTERS_PER_PAGE` and divided `c_text` to `c_textonpage` and `c_text`
+ now `c_text` contains all text, `c_textonpage` contains cropped text using `page`
+ created `Navigation.js` as child of `Article.js`, with `prev`ous page, page `number` and `next` page inputs

- created childs `Article.js->Comments.js->Comment.js`
- `Comments.js` `fetch`es comments for that article `id` and throws comment `user` and `text` to `Comment.js`
- `Comment.js` `fetch`es author `name` and `avatar`, returns avatar, name, text. Contains buttons to answer and show child comments
- `Comment.js` creates its copy with new comment for nested comment on "Show more" press
- `Comment.js` renders button "Show more" only if nested comments exist

>**title search**
- created `Search.js` page and connected to `Route` `/`
- `Search.js` ouputs list of article `title` links on load and on search `input` change
- `Search.js` if  `input` is empty, `fetch`es all the `title`s

>**header**
- created `Header.js` and inserted before `Routes` in `index.js`
- `Header.js` contains `Link` button "Home" to `/`, logged user avatar (or `-1`), user name (or 'Not logged in'), `Link` buttons 'Log In' and 'Register'
- in `Header.js` created `Link` button "Create article" to `/create`, shown only if `logged` (logged not specified yet)

>**login and registration**
- created `Register.js`, registers by name and password, works
- created `Login.js`, inserted code from prevous project, works
- created "Wrong password or name" error output in `Login.js`
- registration now can't create user with existing name
- `Header.js` now contains actual user name and avatar if logged in

>**avatar upload**
- `Header.js` `image` now has `onClick` with function `changeAvatarPressed` witch gets `input` and clicks on it
- `Header.js` `input` `fetch`es `/setavatar` with data of selected image and reloads the page
- `Header.js` `changeAvatarPressed` works only if logged in
- `Header.js` `setAvatar` `fetch` throws in `body` `FormReader` with image and user id

>**comment answer**
- noticed `useState` changer function is `async` and must be `await`ed for desired result
- `Comment.js` on "Answer" click, change button "Answer" to `<AnswerField/>` which contains `input` field and `button` "Send"
- `Comment.js` throwed parameters into `<AnswerField/>`: `c_yourans` `curcomid` `articleid` (swap between "Answer" and "Send", current comment id (parent), article id)
- `Comment.js` on "Send" click, check is user logged in, if yes, fetch `/comment` with values of `input` text, logged user id, current article id, parent comment id.

>**article creation, deletion and edit**
- noticed that `c_smth` not working as expected with `fetch`es at all, so better avoid
- created `Create.js`, contains `input` field for title, `textarea` for text and `button` "Create"
- created `Edit.js`, contains `input` field for title, `textarea` for text and `button`s "Change" and "Delete"
- `Edit.js` loads title and text from server if logged `user` id equals to editing article `author` id, else prevents editing

>**styles**
- created `styles.css` and imported in `index.css`, works
- styleizd all the pages
- rewritten all css, cleared some text
- created dark theme overrides
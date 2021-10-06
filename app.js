const express = require("express")
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json());

app.get('/api', (req,res) => {
  res.json({
    message: 'Welcome to my API'
  })
})


//verify token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ')
    req.token = bearer[1]
    next()
  } else {
    res.status(403).send()
  }
}


app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'eugy',
    email: 'eugy@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s'}, (err, token) => {
    res.json({
      token,
      user
    })
  })
})


//create a post
app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403)
    } else{
    res.json({
      message: 'Post Created',
      authData
    })
    }
  })
})


app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

module.exports = app

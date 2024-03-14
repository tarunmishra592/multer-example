const express = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })

const upload = multer({ storage: storage })

const app = express()

const PORT = 3030

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())



app.get('/', (req, res) => {
    return res.render('fileupload')
})


app.post('/upload', upload.single('profileimage'), (req, res) => {
    console.log(req.file)
    return res.redirect('/')
})


app.listen(PORT, () => {
    console.log('Server Running on', PORT)
})
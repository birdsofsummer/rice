const express = require('express')
const multer  = require('multer')

const app = express()

const SAVE_DIR="/tmp/"



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, SAVE_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //let name=file.fieldname + '-' + uniqueSuffix
    let name=file.originalname
    cb(null, name)
  }
})



const upload = multer({ dest: SAVE_DIR ,storage}) // file 与前端一致

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('/upload',upload.single('file'), (req, res) => {
  console.log('req body', req.body)
  console.log('req file', req.file)
  if (req.file.fieldname) {
      res.status(200).send({
          message: 'ok',
          status: 200,
          data: {
              url:req.file.path
          }
      })
  }
})

app.post('/upload1', multer({ dest: SAVE_DIR}).array('files', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log('req body', req.body)
  console.log('req file', req.files)
  res.status(200).send({
      message: 'ok',
      status: 200,
      data: {
      //url:req.file.path
      }
  })
})


app.listen(3036, function () {
  console.log('app is listening at port 3036')
})



/*
https://github.com/expressjs/multer
app is listening at port 3036
req body [Object: null prototype] {
  name: 'logo-65.png',
  size: '27346',
  type: 'image/png'
}
req file {
  fieldname: 'file',
  originalname: 'logo-65.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/tmp/',
  filename: 'logo-65.png',
  path: 'upload/logo-65.png',
  size: 27346
}
*/

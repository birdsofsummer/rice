'use strict';

// require('dotenv').config();



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _=require("lodash")
const createError = require('http-errors')
const PassThrough = require('stream').PassThrough;
const qs = require('qs')
const qs1=require('querystring')





const mix=async (req, res,next)=>{
   req.mix={
       ...req.query, // ?x=1&y=2 ->{x:1,y:2}
       ...req.params, //"/a/:b" -> "/a/123" {b:123}
       ...req.body
   }
   res.body={
       ok:false,
       code:1,
       data:req.mix,
       message:"ok",
   }

//   var ipStr = req.headers['x-forwarded-for'] ||
//        req.ip ||
//        req.connection.remoteAddress ||
//        req.socket.remoteAddress ||
//        req.connection.socket.remoteAddress || '';
//
//    console.log('ip',ipStr)
    console.log("raw:",req.body1)
    console.log('mix--->',req.method,req.url,req.mix,req.headers)

   //  req._readableState,
   //  req.readable,
   //  req._events,
   //  req._eventsCount,
   //  req._maxListeners,
   //  req.socket,
   //  req.httpVersionMajor,
   //  req.httpVersionMinor,
   //  req.httpVersion,
   //  req.complete,
   //  req.headers,
   //  req.rawHeaders,
   //  req.trailers,
   //  req.rawTrailers,
   //  req.aborted,
   //  req.upgrade,
   //  req.url,
   //  req.method,
   //  req.statusCode,
   //  req.statusMessage,
   //  req.client,
   //  req._consuming,
   //  req._dumped,
   //  req.next,
   //  req.baseUrl,
   //  req.originalUrl,
   //  req._parsedUrl,
   //  req.params,
   //  req.query,
   //  req.res,
   //  req.body,
   //  req._body,
   //  req.mix
   next()
}





// "content-type: application/json"
const to_json=(x="{}")=>{
        try {
            return JSON.parse(x)
        }catch(e){
            return {}
        }
}

// 'application/x-www-form-urlencoded'



const raw_body=async (req,res,next)=>{
    req.body1 = ""
    req.body = {}
    const debug=console.log
    var encoding = (req.headers['content-encoding'] || 'utf-8').toLowerCase()
    var length = req.headers['content-length']
    var stream=new PassThrough()
    switch (encoding) {
      case 'deflate':
        stream = zlib.createInflate()
        debug('inflate body')
        req.pipe(stream)
        break
      case 'gzip':
        stream = zlib.createGunzip()
        debug('gunzip body')
        req.pipe(stream)
        break
      case 'identity':
        req.pipe(stream)
        stream.length = length
        break
      case 'utf-8':
        req.pipe(stream)
        console.log('8888888888888888888')
        stream.length = length
        break
      default:
        throw createError(415, 'unsupported content encoding "' + encoding + '"', {
          encoding: encoding,
          type: 'encoding.unsupported'
        })
    }
    var getBody = require('raw-body')
    var iconv = require('iconv-lite')
    let body=await getBody(stream)
    let str = typeof body !== 'string' && encoding !== null
      ? iconv.decode(body, encoding)
      : body
    let is_form=/form/.test(req.headers["content-type"])
    const parse=is_form ? qs.parse :to_json
    let o=parse(str)
    req.body1 = str
    req.body = o
    //console.log("zzzzzzzzzzzzzzzz",str,o)
    next()
}




const HEADERS={
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
       'Access-Control-Allow-Credentials':  true,
       'Content-Type': 'application/json',
}

const json=async (req, res,next)=>{

    _.forEach(HEADERS,(v,k)=>{
        res.header(k,v)
    })

  let d=JSON.stringify(res.body)
  res.send(d)
  //console.log(res)
  //console.log('--->',req)

  console.log('--->',req.body)
  console.log('<---',res.body)
  //next()
}

const app = express();

app.use(raw_body)
//app.use(bodyParser.json());
app.use(cors());
app.use(mix);
const router=require("./src/router")

for (let k in router) {
    app.use("/"+k,router[k])
}

app.use(json)


module.exports = app;

'use strict';

// require('dotenv').config();



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _=require("lodash")

const mix=async (req, res,next)=>{
   req.mix={
       ...req.query, // ?x=1&y=2 ->{x:1,y:2}
       ...req.params, //"/a/:b" -> "/a/123" {b:123}
       ...req.body
   }
   res.body={
       ok:false,
       code:1,
       data:{},
       message:"ok",
   }
   console.log('mix--->',req.mix)
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
app.use(bodyParser.json());
app.use(cors());
app.use(mix);
const router=require("./src/router")

for (let k in router) {
    app.use("/"+k,router[k])
}

app.use(json)


module.exports = app;

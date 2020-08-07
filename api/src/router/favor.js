const express = require('express');

//const { UserController, }= require('./src/controller');
const controller=require('../controller')
const {
    user,
    doc,
    reply,
    like,
    dislike,
    report,
    favor,
    sequelize,
}=controller


const r=express.Router()

const m=favor


r.get('/', async (req, res,next) => {
      //const data = await UserController.getUserList();
      console.log(req.body)
      const data=await m.list()
      res.body.data=data
      res.body.ok=true
      next()
});


r.post('/', async (req, res,next) => {
  const u = req.body;
  console.log("uuuuuuuuuuuu",u)
  try {
    //const data = await UserController.createUser(user);
      const data=await m.create(u)
      res.body.data=data
      res.body.ok=true
  } catch (e) {
      res.body.message=e.message
  }
  next()
});


r.delete('/', async (req, res,next) => {
    let ids=req.body.ids || []
    try {
        const data=await m.del({id:ids})
        res.body.data=data
        res.body.ok=true
    } catch (e) {
        res.body.message=e
    }finally{
        console.log('ddddd',ids)
    }
    next()
});


module.exports=r

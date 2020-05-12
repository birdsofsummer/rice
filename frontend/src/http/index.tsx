// require('../env');
// const HOST = window.env.apiUrl


import _ from "lodash"
import Taro, { Component, Config } from '@tarojs/taro'
import superagent from "superagent"

const HOST="https://service-ack2xrtt-1252957949.bj.apigw.tencentcs.com/release"

const  html2text=(t="")=>{
    if (/<\//.test(t)){
        let a=document.createElement('div')
        a.innerHTML=t
        return a.innerText
    }
    return t
}


const find_tag1=(x="")=>[...x.matchAll(/#(\S+)#/ig)].map(x=>x[1])
const find_tag=(...d)=>Array.from(d.map(find_tag1).reduce((x,y)=>(y.forEach(x.add.bind(x)),x),new Set()))
const find_tag2=(...a)=>[...new Set(a.flatMap(find_tag1))]

const qs=(u="/",d={})=>{
    if (/^http/.test(u)){
        let u1=new URL(u)
        for (let k in d){
            u1.searchParams.set(k,d[k])
        }
        return u1
    }else{
        let q=new URLSearchParams()
        for (let k in d){
            q.set(k,d[k])
        }
        let q1=q.toString()
        let sep=/\?/.test(u) ? "&" : "?"

        return q1.length ? sep : u   
    }
}


const say=(d={})=> {
    console.log("----->",d)
    let {ok,data,code}=d
    if (!ok) {
      Taro.showToast({
        title: " 🌾 🌾 🌾 🌾失败",
        icon: 'none',
        duration: 1000
      })
    }else{
      Taro.showToast({
        title: " 🌾 🌾 🌾 🌾成功",
        icon: 'none',
        duration: 1000
      })
    }
    //return {ok,data,code}
    return data
}


const post1=(u="/",d={})=>fetch(HOST+u,{
    headers:{
        "content-type": "application/json",
    },
    method:"POST",
    body:JSON.stringify(d)
    }).then(x=>x.json()).then(say)

const get1=(u="/",d={})=>fetch(qs(HOST+u,d),{
        headers:{
            "content-type": "application/json",
        },

    })
    .then(x=>x.json()).then(say)


const post=async (u="/",d={}) =>{
        let u1=HOST+u
        console.log(u1,d)
        let r=await superagent
        .post(HOST+u)
        .send(d)
        .type('json')
        return say(r.body)
}

const get=async (u="/",d={}) =>{
        let u1=HOST+u
        console.log(u1,d)
         let r=await superagent
        .get(u1)
        .query(d)
        .type('json')
        return say(r.body)
}

const put=async (u="/",d={}) =>{
        let u1=HOST+u
        console.log(u1,d)
         let r=await superagent
        .put(u1)
        .send(d)
        .type('json')
        return say(r.body)
}


const remove=async (u="/",d={}) =>{
        let u1=HOST+u
        console.log(u1,d)
         let r=await superagent
        .delete(u1)
        .send(d)
        .type('json')
        return say(r.body)
}







///........................................

const login=(d={})=>post("/login",d)

const list_doc=(q={})=>get("/doc",q)
const show_doc=async (id="0") =>get("/doc",{id})

const create_doc=(d={}) =>{
     let tag=find_tag(d.title,d.content)
     d.tag=tag
     return post("/doc",d)
}

const create_reply=(d={})=>post("/reply",d)
const remove_reply=(d={})=>remove("/like",d)
const like_reply=(d={})=>post("/like_reply",d)
const remove_like_reply=(d={})=>remove("like_reply",d)

const create_like=(d={})=>post("/like",d)
const remove_like=(d=[])=>remove("/like",d)

export {
    qs,
    get,
    post,
    html2text,

    login,

    list_doc,
    show_doc,
    create_doc,

    create_reply,
    remove_reply,
    like_reply,
    remove_like_reply,

    create_like,
    remove_like,
}

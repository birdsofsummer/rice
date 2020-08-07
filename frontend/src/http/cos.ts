// cos-js-sdk-v5
// cos-wx-sdk-v5 

import _ from "lodash"
import COS from "cos-js-sdk-v5"
import localforage from "localforage"
import moment from "moment"





const CONFIG={
    Prefix : "/music/",
    Bucket : 'zzz-1252957949',
    Region : 'ap-hongkong',
    TK_SERVER:"https://service-75ph8ybo-1252957949.ap-hongkong.apigateway.myqcloud.com/release/weibo/upload_tk",
}


export interface  CosToken{
    expiredTime: number;
    expiration:  Date;
    credentials: Credentials;
    requestId:   string;
    startTime:   number;
}
export interface Credentials {
    sessionToken: string;
    tmpSecretId:  string;
    tmpSecretKey: string;
}

/*
{
  "expiredTime": 1588230776,
  "expiration": "2020-04-30T07:12:56Z",
  "credentials": {
    "sessionToken": "2U4iQVSpfP674fBEyNXlBLxgGkjKnyAE2fe2485bfa803b2e067aba100cedd137eXPuNydmEAxhjixrTQXjPOxqPUWtFL5kGbzqns11lLvDCA9Jep6kUwYY8Kp8VF0ctLrrm7vA9RAbtYZWHFNDAK5TvaXZ64OD7XAw5QUI8KeGABAFcGKZz6ogig01N6QYh_J3SXCNTMWW3iJJcvyFwIB1mbhVM38pQfynoaZwbjo",
    "tmpSecretId": "AKIDTlR0IDs_pqTC93_P4pycOo6fZoyXtStT0ZuQzhE-mhA1t1mt6hPDSmBp7F9OjsqJ",
    "tmpSecretKey": "8q7cTac7+gVRtJ0gM5cose6jOQGFdNdJtDkGErqOMCg="
  },
  "requestId": "ee632c46-d9ab-4a29-a97d-b2f7e924d289",
  "startTime": 1588228976
}
*/



export interface UploadResult {
    Bucket:         string;
    ETag:           string;
    Key:            string;
    Location:       string;
    headers:        Headers;
    connection:     string;
    "content-type": string;
    statusCode:     number;
}

export interface Headers {
    connection:     string;
    "content-type": string;
}



/*
{
  "Bucket": "zzz-1252957949",
  "ETag": "\"90c9c46a4ff9bde52e7b30808504ddc7-1\"",
  "Key": "music/64.jpg",
  "Location": "zzz-1252957949.cos.ap-hongkong.myqcloud.com/music/64.jpg",
  "headers": {
    "connection": "keep-alive",
    "content-type": "application/xml"
  },
  "connection": "keep-alive",
  "content-type": "application/xml",
  "statusCode": 200
}

*/



const now=()=>moment.now()/1000
const say=(x)=>(...y)=>console.log(x,...y)
const sleep=(n=1)=>new Promise((f1,f2)=>setTimeout(f1,n*1000))
const to_promise=fn=>(...args)=>new Promise((resolve,reject)=>fn(...args,(err,data)=>err? reject(err) : resolve(data)))
const forEach=f=>o=> Object.entries(o).map(f)
const cb2promise=(cos)=>{
    const p=cos.constructor.prototype
    const pc=cos.__proto__
  //promiseify=([x,y])=>p["_"+x]=to_promise(y.bind(cos))
    const promiseify=([x,y])=>pc["_"+x]=to_promise(y.bind(cos))
    forEach(promiseify)(p)
    return cos
}
const get_json=(u="")=>fetch(u).then(x=>x.json())
const key_formator=({ credentials: { sessionToken, tmpSecretId, tmpSecretKey}, expiredTime, startTime,})=>({
        TmpSecretId: tmpSecretId,
        TmpSecretKey: tmpSecretKey,
        XCosSecurityToken: sessionToken,
        ExpiredTime: expiredTime,
        StartTime: startTime, 
})


var getAuthorization = (k)=>(options, f)=>f(k)
var get_auth=(a={})=>cb2promise(new COS({ getAuthorization: getAuthorization(key_formator(a)) }))

const sign=()=>get_json(CONFIG.TK_SERVER)

const refresh_token=async()=>{
   let {ok:ok0,data:{ok,data}}=await sign()
   if (!ok0 || !ok) {
        return
   }
   localforage.setItem('token',data)
   return data
}

//{expiredTime,expiration,credentials,requestId,startTime}
const check_token=(tk={expiredTime:0})=>_.isNil(tk)? false : tk.expiredTime-now()>30

const get_token=async ()=>{
    let tk=await localforage.getItem('token')
    return check_token(tk||{}) ? tk : await refresh_token()
    //return refresh_token()
}



const get_cos=async (token,{Bucket,Region,Prefix}=CONFIG)=>{
       if (!token){
            return
       }
       var cos=get_auth(token)
      // path ="img/2019/12/01/"
       const upload=(file,path="")=> cos._sliceUploadFile({
                   Body: file,
                   Key: Prefix + path + file.name,
                   Bucket: Bucket,
                   Region: Region,
                   onHashProgress: say('...'),
                   onProgress: say('p'),
             })
       const list=()=>cos._getBucket({Bucket ,Region,})
       const get=(Key)=>cos._getObject({Bucket ,Region,Key})
       return {cos,list,upload,get}
}


const get_cos1=async (config=CONFIG)=>{
   let token=await get_token()
   if (!token){
       throw "稍后重试"
   }
   return get_cos(token,config)
}


//{Location,Bucket,Key,ETag,statusCode,headers}
const upload_cos=async (file,path="")=>{
       let {cos,list,upload,get}=await get_cos1(CONFIG)
       return upload(file,path)
}

const test_cos=async ()=>{
        const input = document.getElementById('file');
        const onSelectFile =() =>upload_cos(input.files[0],"")
        input.addEventListener('change', onSelectFile, false);
}

export {
    get_token,
    upload_cos,
}




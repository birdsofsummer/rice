const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

let CERTS=[
         "rsa_private_key.pem",
         "rsa_public_key.pem"
]

let [privateKey ,publicKey] = CERTS.map( x=> fs.readFileSync(__dirname+"/"+x))

const now=()=>Math.floor(Date.now() / 1000)

const create=(data={},expiresIn="1d")=>{
  let t = jwt.sign({
          data,
          iat:now(),
          //exp: Math.floor(Date.now() / 1000) + (60 * 60 *24),
        },
        privateKey,
        {
          algorithm: 'RS256',
          expiresIn,
        }
  )
  return t
}
const verify=(s="")=>jwt.verify(s,publicKey)
const refresh=(s="")=>{
    const  {data,iat,exp} = verify(s)
    let l=exp-iat
    return create(data,l)
}

module.exports={
    create,
    verify,
    refresh,
}

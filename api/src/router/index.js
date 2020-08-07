
const fs=require("fs")
const init=()=>{
    let dir=fs.readdirSync(__dirname).filter(x=>!/index/.test(x))
    let o={}
    for (let i of dir){
        let n=i.split(".")[0]
        o[n]=require("./"+n)
    }
    console.log(o)
    return o
}

module.exports=init()

// module.exports={
//      user:require("./user"),
//      doc:require("./doc"),
//      like:require("./like"),
// }


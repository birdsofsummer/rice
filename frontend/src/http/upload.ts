//len<12
const upload_multi=async (files=[])=>{
       try{
         let d=new FormData()
         d.append("name","files")  
         d.append("files",files)  
         let SERVER="http://localhost:3036/upload1"
         let r=await fetch(SERVER,{method:"POST",body:d})
         let t=await r.text()
         console.log(t)
      }catch(e){
          console.log(e)
      }
 
}

//缩略图
//const image = document.createElement('img');
//image.src = URL.createObjectURL(file);

const upload_single=async (file={})=>{
      let { 
          lastModified,
          name,
          size, 
          type, // "application/x-desktop"
          webkitRelativePath
       } =file

       console.log("wait to upload",name,size,type)
       let d=new FormData()
       d.append("name",name)
       d.append("size",size)
       d.append("type",type)
       d.append("file",file)
       // let b= await file.arrayBuffer()
       let SERVER="http://localhost:3036/upload"
       let r=await fetch(SERVER,{method:"POST",body:d})
       let t=await r.json()
       console.log(t)
       return  t.data

}


export {
    upload_multi,
    upload_single,
}



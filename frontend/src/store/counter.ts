import { observable } from 'mobx'

import {
    qs,
    get,
    post,
    html2text,
    list_doc,
    create_doc,
    
} from "../http"



const counterStore = observable({
  counter: 0,
  data:{},

  counterStore() {
  this.counter++
  

  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  async incrementAsync() {

      this.counter+=10
      let d1=await list_doc({
          offset:0,
          limit:100,
          tag:'zzz',
      })
      console.log(33333333333333,d1)

      return 123

  }
})

export default counterStore

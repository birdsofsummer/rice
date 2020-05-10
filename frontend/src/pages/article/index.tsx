import Taro, { Component, Config } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import _ from "lodash"
import { fromEvent, } from "rxjs"
import { upload_cos, } from "../../http/cos.ts"
import 'taro-ui/dist/style/index.scss'




const cos2ck=({Location})=>{
       // let u=new URL(location.href).protocol  +"//" + Location
       // console.log("uuu",u)
        return {
                default: '//'+Location
        } 
}



class UploadAdapter{
    constructor(loader,cb) {
        this.loader = loader;
        this.cb=cb
    }

    async upload() {
        let f=await this.loader.file 
        let d=await upload_cos(f)
        let d1=cos2ck(d)
        this.cb(d1)
        return d1
    }
    abort() {
        console.log('abort upload')
    }
}



import { 
    View,
    Block,
    Image,
    Text,
    Switch,
    Button,
    Icon,
    Radio,
    Input,
    ScrollView,
    Swiper,
    SwiperItem,
    Checkbox,
    Picker,
    Label,
    Textarea,
    Slider,
    Video,
    Audio,
    Camera,
    Progress,
    RichText,
    Form,
    RadioGroup,
    CheckboxGroup,
    Tabbar,
    TabbarContainer,
    TabbarPanel,
    Navigator,
    WebView,
    OpenData,
    Canvas,
    MovableArea ,
    MovableView,
    CoverImage ,
    CoverView,
    PickerView,
    PickerViewColumn,
    PullDownRefresh,
} from "@tarojs/components";


import { 
    AtActionSheet ,
    AtActionSheetItem ,
    AtActivityIndicator ,
    AtAvatar ,
    AtBadge ,
    AtButton ,
    AtCard ,
    AtCheckbox ,
    AtDrawer ,
    AtFloatLayout ,
    AtForm ,
    AtGrid ,
    AtIcon ,
    AtInput ,
    AtInputNumber ,
    AtList ,
    AtListItem ,
    AtModal ,
    AtModalHeader ,
    AtModalContent ,
    AtModalAction ,
    AtNavBar ,
    AtNoticebar ,
    AtPagination ,
    AtProgress ,
    AtRadio ,
    AtRate ,
    AtSegmentedControl ,
    AtSwitch ,
    AtTabBar ,
    AtTabs ,
    AtTabsPane ,
    AtTag ,
    AtTextarea ,
    AtTimeline ,
    AtToast ,
    AtAccordion ,
    AtSlider ,
    AtSwipeAction ,
    AtSearchBar ,
    AtLoadMore ,
    AtDivider ,
    AtCountdown ,
    AtSteps ,
    AtCurtain ,
    AtMessage ,
    AtImagePicker ,
    AtRange ,
    AtIndexes ,
    AtCalendar ,
    AtFab ,
    AtLoading ,
    AtComponent ,
} from 'taro-ui'



import {
    show_doc,
    create_reply,
} from "../../http"




const Reply=({
              id=1,
              type=0,
              content="<p> 明月别枝惊鹊 </p>",
              createdAt,
              updatedAt,
              UserId=1,
              User:{
                  user_name="西江月",
                  avatar="",
              }={},
              i=0,
            })=>(
                <AtCard
                  note=''
                  extra={"#"+(i+1)}
                  title={user_name + new Date(createdAt).toLocaleDateString()}
                  thumb={avatar}
                >
                     <AtAvatar circle text={user_name}></AtAvatar> 
                     <article dangerouslySetInnerHTML={{__html:content}} />
                     <AtDivider content='' />
                     <View className='at-row at-row__justify--end'>
                          <View className='at-col at-col-1'><AtButton size='small'  onClick={()=>console.log('like',id)} >赞</AtButton></View>
                          <View className='at-col at-col-1'><AtButton size='small'  onClick={()=>console.log('reply',id)}>回应</AtButton></View>
                     </View>
                </AtCard>
                )



const Article1=({
        b=console.log

        id= 1,
        UserId= 1,
        title= '',
        content= '',
        status= 0,
        img= [],
        files= [],
        tag= [],
        createdAt,
        updatedAt,
        User={
          user_name:"西江月",
          avatar:"",
        },
        Replies=[],
        Favors=[],
        Likes=[],
        Dislikes=[],
        Reports=[],
}) =>(

        <AtCard
          title={title}
          note={""}
          extra={ new Date(updatedAt).toLocaleDateString()}
          thumb={img.length>0 ? img[0]:""}
        >

            {User && <AtAvatar circle image={User.avatar} /> } 

            <View className='at-article'>

              <View className='at-article__info'>

                {User && User.user_name} 
                
                {tag.map(x=>(
                    <a href={"/?tag="+x}> <AtTag size='small'>{x}</AtTag> </a>
                ))}

              </View>

              <AtDivider content='' />
              <View className='at-article__content'>
                <View className='at-article__section'>

                  <View >
                       <article dangerouslySetInnerHTML={{__html:content}}  onClick={b}/>
                  </View> 

             </View>
              </View>
            </View>

           <AtDivider content='' />


            <View>
                <AtBadge value={Likes.length} >
                    <AtButton size='small'>
                            <View className='at-icon at-icon-heart'></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={Favors.length} >
                    <AtButton size='small'>
                            <View className='at-icon at-icon-star'></View>
                    </AtButton>
                </AtBadge>


                <AtBadge value={Dislikes.length} >
                    <AtButton size='small'>
                            <View className='at-icon at-icon-trash'></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={Favors.length} >
                    <AtButton size='small'>
                        <View className='at-icon at-icon-share'></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={Reports.length} >
                    <AtButton size='small'>
                        <View className='at-icon at-icon-streaming'></View>
                    </AtButton>
                </AtBadge>

            </View>

</AtCard>
)


export default class Index extends Component {
  super(...arguments);
  state = {
        title: ' 🌾 🌾花香里说丰年',
        loaded: true,
        loading: false,
        lastItemId: 0,
        hasMore: true,
        params:{},
        current_tab:0,
        parent:0,
        img:[],
        content:"zzz",
        User:{
            "id": 1,
             user_name:"🌾学家",
            "avatar": "//tvax3.sinaimg.cn/crop.0.0.512.512.180/00842TLkly8gef53f2n6qj30e80e80t2.jpg",
            "password": "123456",
            "status": 0,
            "email": "",
            "phone": "",
            "job": "",
            "birthday": "2020-05-08T08:52:33.617Z",
            "createdAt": "2020-05-08T08:52:49.584Z",
            "updatedAt": "2020-05-08T08:52:49.584Z"
        },
        data:{
              id: 1,
              title: '',
              content: '',
              status: 0,
              img: [],
              files: [],
              tag: [],
              createdAt: "2020-05-08T11:58:10.843Z",
              updatedAt: "2020-05-08T11:58:10.843Z",
              UserId: 1,
              User:{
                    id: 1,
                    user_name: 'u5788412446106221',
                    avatar: '//photocdn.sohu.com/20150823/Img419517118.jpg',
                    password: '123456',
                    status: 0,
                    email: '',
                    phone: '',
                    job: '',
                    birthday: "2020-05-08T11:57:52.142Z",
                    createdAt:"2020-05-08T11:57:59.352Z",
                    updatedAt:"2020-05-08T11:57:59.352Z",
              },
             Replies:[],
             Favors:[],
             Likes:[],
             Dislikes:[],
             Reports:[],
        },
  }

  componentWillMount () {
          console.log(this.$router)
          this.setState({
                params:this.$router.params
          })
  }

  async componentDidMount () {
        Taro.showToast({
          title: this.state.title,
          icon: 'none',
          duration: 1000
        })
        this.init_doc()
        this.init_editor()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Config = {
        navigationBarTitleText: '🌾花香里说丰年🌾 🌾🌾 🌾'
  }

  say=e=>{
      console.log(e)
      //console.log(e?.target?.value)
      console.log("cccc",this.state)
  }

  init_editor=async(d0="")=>{
        console.log("2222222222222")
        let {onUpload,onChange}=this

        //let dom=document.querySelector( '#editor' )
        let dom=this.refs.editor
        editor=await ClassicEditor.create(dom)
        editor.setData(d0)
        this.setState({editor})
        editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>new UploadAdapter(loader,onUpload.bind(this))
        let e1= document.querySelector('[contenteditable="true"]')
        e1.addEventListener('blur',()=>onChange.call(this,editor.getData()))
        console.log("zzzzzzzzzz",editor)
  }

 async init_doc(){
    let id=this.$router.params.id
    let d=await show_doc(id)
    console.log('ddddd',d)
    this.setState({data:d})
  }


  handleClick (value) {
    this.setState({
      current_tab: value
    })
  }


  onUpload(u){
      let s=this.state
      console.log("---zzz",u)
      s.img.push(u.default)
      this.setState(s)
  }

  onChange(c=""){
      console.log("change--->",c)
      let s=this.state
      s.content=c
      this.setState(s)
      //this.state.editor.setData(c)
  }

  async reply_doc(){
      let s=this.state
//      let e1= document.querySelector('[contenteditable="true"]')
//      let c=e1.innerHTML
      let d={ 
           parent:s.parent,
           DocId:s.data.id,
           UserId:s.User.id,
           content:s.editor.getData(),
      }
      console.log('reply',d)
      let r=await create_reply(d)

 
      s.data.Replies.push(r)
      s.content=""
      this.setState(s)
      s.editor.setData("")
      console.log('reply result',r)
      
  }

  render () {

    const tabList = [
        { title: '回应' , name:"reply"},
        { title: '转发' ,name:"forward", },
        { title: '赞'   ,name:"like"},
        { title: '收藏' ,name:"fav" }
    ]

    let d=this.state.data
    return (
      <View className="index">
          <View className="title" onClick={()=>{ Taro.navigateTo({ url: '/pages/index/index' }) }}>🌾</View>

           <Article1 {...d} />

           <AtTabs 
                 current={this.state.current_tab} 
                 tabList={tabList} 
                 onClick={this.handleClick.bind(this)}
           >
                  <AtTabsPane current={this.state.current_tab} index={0} >
                            <br />

                            <article id="reply">
                                { 
                                   d.Replies.map((x,i)=>(<Reply  {...{...x,i}}/>)) 
                                }
                            </article>

                            <br />

                            <figure class="editor-container">
                                <div id="editor" ref="editor" > </div>            
                            </figure>  

                           <AtButton type='primary' onClick={this.reply_doc.bind(this)}>发送</AtButton>
                   </AtTabsPane>

                  <AtTabsPane current={this.state.current_tab} index={1} >
                      <View id="t1">1</View>

                  </AtTabsPane>

                  <AtTabsPane current={this.state.current_tab}  index={2} >
                      <View id="t2">2</View>
                  </AtTabsPane>

                  <AtTabsPane current={this.state.current_tab} index={3} >
                      <View id="t3">3</View>
                  </AtTabsPane>

      </AtTabs>        

     </View>
    )
  }
}

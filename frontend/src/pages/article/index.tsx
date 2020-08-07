import React, { 
    Component ,
    useContext,              //(Context, unstable_observedBits)
    useImperativeHandle,     //(ref, create, deps)
    useDebugValue,           //(value, formatterFn)
    useReducer,              //(reducer, initialArg, init)

    useRef,                  //(initialValue)
    useState,                //(initialValue)

    useCallback,             //(create, deps)
    useEffect,               //(create, deps)
    useLayoutEffect,         //(create, deps)
    useMemo,                 //(create, deps)
    version,
} from 'react'


import { 
  Observer,
  isObserverBatched,
  isUsingStaticRendering,
  observerBatching,
  observerBatchingOptOut,
  useAsObservableSource,
  useLocalStore,
  useObserver,
  useStaticRendering,
  MobXProviderContext,
  PropTypes,
  Provider,
  disposeOnUnmount,
  inject,
  observer,
} from 'mobx-react'


import Taro, {
   // Current ,
   // CurrentReconciler ,
   // Events ,
   // FormElement ,
   // Style ,
   // TaroElement ,
   // TaroEvent ,
   // TaroNode ,
   // TaroRootElement ,
   // TaroText ,
   // cancelAnimationFrame ,
   // connectReactPage ,
   // connectVuePage ,
   // createComponentConfig ,
   // createDocument ,
   // createEvent ,
   // createPageConfig ,
   // createReactApp ,
   // createRecursiveComponentConfig ,
   // createVue3App ,
   // createVueApp ,
   getCurrentInstance , //this.$router
   // hydrate ,
   // injectPageInstance ,
   // navigator ,
   // nextTick ,
   // options ,
   // requestAnimationFrame ,
   // stringify ,
    useAddToFavorites ,
    useDidHide ,
    useDidShow ,
    useOptionMenuClick ,
    usePageScroll ,
    usePullDownRefresh ,
    usePullIntercept ,
    useReachBottom ,
    useReady ,
    useResize ,
    useRouter ,
    useScope ,
    useShareAppMessage ,
    useShareTimeline ,
    useTabItemTap ,
    useTitleClick ,
   // window,
   // document ,
} from '@tarojs/taro'


import _ from "lodash"
import { fromEvent, } from "rxjs"
import { upload_cos, } from "../../http/cos.ts"


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
    like_reply,
    remove_like_reply,

    create_like,
    remove_like,
} from "../../http"


const Reply=({
              id=1,
              type=0,
              content="<p> 明月别枝惊鹊 </p>",
              createdAt,
              updatedAt,
              UserId=1,
              like=[],
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
                     <View className='at-row at-row__justify--start'>
                        <View className='at-icon at-icon-heart'
                            style={{ color: like.length ? "#ca3232" : "grey" }}
                            onClick={
                            async (e)=>{

                                let d={id,UserId,}
                                console.log('like',d)
                                let r=await like_reply(d)
                                console.log('lllllllll',r)
                            }
                        }
                        >{ like.length || "" }</View>
                     </View>
                </AtCard>
                )





function Article1({
        b=console.log,

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
}) {

 //  const [like,setlike]=useReducer(({
 //          status=true,
 //          data=[],
 //          id=0,
 //      },action)=> {
 //      switch(action.status){
 //          case true:
 //               return {
 //                   status:false,
 //                   data,
 //                   id,
 //              }
 //          default:
 //               return {
 //                   status:true,
 //                   data,
 //                   id,
 //               }
 //      }
 //   }, {
 //       status:true,
 //       data:Likes,
 //       id:0,
 //   })




    const [like, setlike] = useState({ status:true, data:Likes, id:0, });
    const [dislike, setdislike] = useState(Dislikes);
    const [fav, setfav] = useState(Favors);
    const [report, setreport] = useState(Reports);

    useEffect(()=> {
        console.log('加载了…',Likes,like)
        if (Likes.length>0){
            let is_like=Likes.filter(x=>x.UserId==UserId) 
            let lid=is_like ? Likes.find(x=>x.UserId==UserId).id : 0
            setlike({ 
                status:lid ? false : true, 
                data:Likes, 
                id:lid, 
            })
        }
        return () => {
            console.log('解绑了…',Likes,like)
        }
    },[Likes])


    return (
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
                <AtBadge value={like.data.length}>
                    <AtButton 

                    size='small' 
                    onClick={
                        async (e)=>{
                            let d={DocId:id,UserId}
                            console.log("like",id,like) 

                            if (like.status==true) {
                                let r=await create_like(d)
                                if (!r.id) return 
                                setlike({
                                    data:[...like.data,r],
                                    id:r.id,
                                    status:false
                                })
                            }else{
                                let l=like.id
                                let r=await remove_like({ids:[l]})
                                if (r!=1) return
                                setlike({
                                    //data:like.data.filter(x=>x.UserId!=UserId),
                                    data:like.data.filter(x=>x.id!=l),
                                    id:0,
                                    status:true,
                               })
                            }
                        }
                    }
                    >
                        <View className='at-icon at-icon-heart'
                            style={{ color: like.status ? "grey" : "#ca3232" }}
                        ></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={fav.length} >
                    <AtButton size='small'
                     onClick={
                        ()=>{ 
                            setfav([...fav,UserId])
                            console.log("favor",id,fav) }
                     }
                    >
                            <View className='at-icon at-icon-star'></View>
                    </AtButton>
                </AtBadge>


                <AtBadge value={dislike.length}>
                    <AtButton size='small'
                       onClick={
                        ()=>{ 
                            setdislike([...dislike,UserId])
                            console.log("dislike",id,dislike) 
                        }
                    }
                    >
                            <View className='at-icon at-icon-trash'></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={fav.length} >
                    <AtButton size='small'
                      onClick={
                        ()=>{ 
                            setfav([...fav,UserId])
                            console.log("share",id,fav) 
                        }
                     }
                    >
                        <View className='at-icon at-icon-share'></View>
                    </AtButton>
                </AtBadge>

                <AtBadge value={report.length} >
                    <AtButton size='small'
                       onClick={
                        ()=>{ 
                            setreport([...report,UserId])
                            console.log("report",id,report) 
                        }
                     }
                    >
                        <View className='at-icon at-icon-streaming'></View>
                    </AtButton>
                </AtBadge>
            </View>

</AtCard>
)
}




@inject('store')
@observer
export default class Index extends Component {
  //super(...arguments);
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
      let r=getCurrentInstance().router
      console.log(r)
      this.setState({
            params:r.params
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
        let id=getCurrentInstance().router.params.id
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

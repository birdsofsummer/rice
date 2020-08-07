import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'


import{
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

    version
} from "react";


import {
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
}from "@tarojs/taro"












//import 'taro-ui/dist/style/index.scss'
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





import './index.scss'



import _ from "lodash"

import { fromEvent, } from "rxjs"



import {
    qs,
    get,
    post,
    html2text,
    list_doc,
    create_doc,
    
} from "../../http"

import {
    upload_multi,
    upload_single,
} from "../../http/upload.ts"

import {
    upload_cos,
} from "../../http/cos.ts"


class UploadAdapter{
    constructor(loader) {
        this.loader = loader;
    }
    async upload() {
        let f=await this.loader.file 
        console.log('ffff',f)
        let d=await upload_cos(f)
        console.log("dddd",d)
        let u=new URL(location.href).protocol  +"//"+d.Location
        console.log("uuu",u)
        return {
                default: '//'+d.Location
        } 
    }
    abort() {
   }
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
        imgs:[],
        imgs1:[],
        editor:null,
        post:{
            title:"#🌾学#",
            content:"#🌾学# \n #牛排品鉴# \n #猫色识别#",
            img:[],
            tag: [],
            files:[],
            UserId:1,
        },
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
        current_tab:0,
        tabs:[
              { title: '表情包' ,dot: true,iconType: 'bullet-list',text: '100', max: 99  },
              { title: '入门教材' , text: 8 ,iconType: 'camera',max:10},
              { title: '进阶教材', iconType: 'folder' },
              { title: '诗歌鉴赏',iconType: 'camera',text: '100', max: 99 },
              { title: '根据地' ,iconType: 'camera',text: '2', max: 10 },
        ],
        list: [ ],
        list1: [[]],
        pageSize:10,
        current_page:0,
        tags:[{name:"🌾学",active:false},{name:"空气动力学",active:false}],
        timeline:[
            { title: '猫色识别', content: ['黑猫黄猫'], icon: 'check-circle', color: 'green'  }, 
            { title: '牛排品鉴', content: ['法国空运','5分熟' ], icon: 'clock' , color: 'red'}, 
            { title: '🌾田空气动力学', content: [], icon: 'clock' ,color: 'yellow'}, 
            { title: '摸石头', content: [], icon: 'clock' ,color: 'yellow'}, 
        ],
        swipe_img:[
          "//img.pconline.com.cn/images/photoblog/7/4/5/8/7458254/20089/12/1221229833987_mthumb.jpg",
          "//img.pconline.com.cn/images/photoblog/7/4/5/8/7458254/20089/12/1221229833155_mthumb.jpg",
          "//img.pconline.com.cn/images/photoblog/7/4/5/8/7458254/20089/12/1221229833078_mthumb.jpg",
          '//photocdn.sohu.com/20150823/Img419517118.jpg',
        ],
        params:{},
        search_value:"",
  }

  componentWillMount () {
      let r=getCurrentInstance().router
      console.log(r)
      this.setState({
            params:r.params
      })
  }

  async componentDidMount () {
    let r=getCurrentInstance().router
    let t=r.params.tag;
    let t1=t? decodeURI(t) :""
    console.log('11111111',t1)
    let s=this.state
    s.tags.forEach(x=>{
       if (x.name==t1){
          x.active=true
    } })

    this.setState(s)

    let d1=await list_doc({offset:0,limit:100,tag:t1})
    console.log(33333333333333,d1)
    this.setState({
       list:d1,
       list1: _.chunk(d1,this.state.pageSize)
    })

    Taro.showToast({
      title: this.state.title,
      icon: 'none',
      duration: 1000
    })
    this.init_editor(this.state.post.content)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

      say=e=>{
          console.log(e)
          //console.log(e?.target?.value)
          console.log("cccc",this.state)
      }

      change_edit_title=e=>{
          console.log(e)
          console.log(e)
          this.state.post.title=e
          console.log("cccc",this.state)
      }

      edit=e=>{
          console.log(e)
          //let t=e.target.value
          this.state.post.content=e
          //console.log("cccc",this.state)
      }

      reset_editor=()=>{

          let s=this.state
          s.post={
            title:"#🌾学#",
            content:"#🌾学# \n",
            img:[],
            //tag: [],
            files:[],
          }
          s.imgs=[]
          s.img1=[]

          this.setState(s)
          this.state.editor.setData(s.post.content)
      }
      after_upload(result=[],key="url"){
          let files1=result
              .filter(x=>x.status=="fulfilled")
              .map(x=>"//" + x.value[key])

          console.log("zzzzzzzzz",files1)

          if (files1.length== result.length){
              Taro.showToast({
                   title: 'all ok🌾 🌾🌾 🌾',
                   icon: 'none',
                   duration: 1000
              })
          }else{
              Taro.showToast({
                   title: 'some ok,some fail🌾 🌾🌾 🌾',
                   icon: 'none',
                   duration: 1000
              })
          }

          let s=this.state


          let [a,b]=_.partition(files1,x=>/svg|jpg|jpeg|png|gif/.test(x))

          s.post.img.push(...a)
          s.post.files.push(...b)

          let c1="\n"
          c1+=a.map(x=> `
           <img src="${x}">
           `).join("\n") +"\n"
          c1+="\n"
          c1+=b.map(x=> `<p>
           <a href="${x}"> ${x}</a>
          </p>`).join("\n<br/>\n") +"\n"

          s.post.content+=c1

          s.imgs=[]
          s.imgs1=[]

          this.setState(s,()=>{ console.log("upload result",this.state)})
          this.state.editor.setData(s.post.content)
      }

      //原生
      upload=async e=>{
          let files=e.target.files
          console.log(files) 
          //upload_multi(files)

          this.setState({loading:true})
          //let result=await Promise.allSettled([...files].map(x=>upload_single(x)))
          let result=await Promise.allSettled([...files].map(x=>upload_cos(x)))
          console.log("zzzzzzzzzzz",result)
          this.after_upload(result,"Location")   
          this.setState({loading:false})

      }

      //taro
      //+-都会重复上传...
        async add_img(d=[]){
            this.setState({
              imgs:d
            })
            console.log("ddd",d)



           // 传图片

           let img=d

           // let result=await Promise.allSettled(img
           //           .filter(x=>/^blob/.test(x.url))
           //           .map(x=>upload_single(x.file.originalFileObj))
           // )
           // this.after_upload(result)   
           // console.log("zzzzzzzzzzz",result)

            this.setState({loading:true})
            let result1=await Promise.allSettled(img
                      .filter(x=>/^blob/.test(x.url))
                      .map(x=>upload_cos(x.file.originalFileObj))
            )
            console.log("cccccccccc",result1)
            this.after_upload(result1,"Location")   
            this.setState({loading:false})
        }

        add_img_fail(e){
            console.log(e)
        }
        add_img_click(i,f){
            console.log(i,f)
        }

        submit_post=async e=>{

             let d=this.state.post
             console.log("post",d)

             if (d.title=="" || d.content == ""){
                 Taro.showToast({
                      title: 'title + content ????🌾 🌾🌾 🌾',
                      icon: 'none',
                      duration: 1000
                 })
                 return
             }

            try{
                 let r1=await create_doc(d)
                 let User=this.state.User
                 let d1=[
                     { ...d, ...r1 ,User},
                    ...this.state.list,
                 ]
                 let s=this.state
                 s.list=d1
                 s.list1=_.chunk(d1,this.state.pageSize)
                 this.setState(s,()=>{ console.log(this.state)})
                 this.reset_editor()

              }catch(e){
                 console.log(e)
                 Taro.showToast({
                      title: "🌾 🌾🌾 🌾失败",
                      icon: 'none',
                      duration: 2000
                 })
              }
          }

          viewDetail=async e=>{
                console.log(e)
             //   Taro.navigateTo({
             //     url: '/pages/index/index?x=1&y=2'
             //   })
          }

          //{ name: "🌾学", active: true }
          view_tag=({name,active})=>{
              console.log({name,active})
              let s=this.state
              s.tags.forEach(x=>{
                 if (x.name==name){
                    x.active=!x.active
                 }
              })
              this.setState(s)
                Taro.navigateTo({
                  url: '/pages/index/index?tag='+name
              })
          }

          handleClick (value) {
            this.setState({
              current_tab: value
            })
          }

          check_tag(e){
                console.log("ccc",e)
                let s=this.state
                s.post.tag=e
                this.setState(s)   
          }

          change_page({ type,current }){
                //{ type: "prev", current: 1 }
                //{ type: "next", current: 2 }
               console.log({ type,current })

               let s=this.state
               let s1={...s,current_page:current-1}
               this.setState(s1)
          }

          search(name,value){
              let s=this.state
              console.log('sssss',name,value)
              let l1=this.state.list
              s.search_value=value

              if(value == "") {
                  s.list1= _.chunk(l1,this.state.pageSize)

              }else {
                  let l2=l1.filter(x=> new RegExp(value,'ig').test(x.title))
                  let c= _.chunk(l2,this.state.pageSize)
                  s.list1=c.length  ? c : [[]] 
                  s.current_page=0
                  console.log(name,value,s.current_page)


              }

              this.setState(s)
          }
        init_editor=async(d0="")=>{
               //let dom=document.querySelector( '#editor' )
               let dom=this.refs.editor
               let editor=await ClassicEditor.create(dom)
               //editor=await BalloonEditor.create(dom)
               editor.setData(d0)
               this.setState({editor})
               editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>new UploadAdapter(loader)
               const save_editor=(e)=>{
                   console.log('1111',e)
                   let d=editor.getData()
                   console.log('2222',d)
                   let s=this.state
                   s.post.content=d
                   this.setState(s)
               }
             let e1= document.querySelector('[contenteditable="true"]')
             e1.addEventListener('blur',save_editor)
        }
                 
  render () {

    return (
      <View className="index">

      <View className="title" 
            onClick={()=>{
                Taro.navigateTo({
                  url: '/pages/index/index'
            })
      }}>{this.state.title}</View>


        <View className="content">

            <AtActionSheet
                cancelText='取消'
                title='sss'
                isOpened={false}
                onCancel={ this.say }
                onClose={ this.say }
            >
              <AtActionSheetItem 
                  onClick={ this.say }
              >
                  zzz
              </AtActionSheetItem>

            </AtActionSheet>







          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {
                this.state.swipe_img.map(x=>(
                    <SwiperItem>
                      <View className='demo-text-1'>
                         <Image
                          style='width: 80%;height: 500px;'
                          src={x}
                        />
                      </View>
                    </SwiperItem>))
            }
          </Swiper>


        <AtDivider content='' />

        {
           this.state.tags.map(x=>(
               <AtTag 
                 name={x.name}
                 active={x.active}
                 onClick={this.view_tag.bind(this)}
                 type='primary' 
              >
                {x.name}
              </AtTag>
           ))
        }

        <AtDivider content='' />







  {/*
        <AtInput 
          name='search_value' 
          title='search' 
          type='text' 
          placeholder='搜索' 
          value={this.state.search_value} 
          onChange={this.search.bind(this, 'search_value')} 
        />
  */}
      <AtSearchBar
        actionName='搜一下'
        value={this.state.search_value} 
        onChange={this.search.bind(this, 'search_value')} 
        onActionClick={this.say.bind(this)}
      />

        <AtList>
         {
            this.state.list1?.length>0 && this.state.list1[this.state.current_page].map(({

                  id=1,
                  title="",
                  content="",
                  status=0,
                  createdAt,
                  updatedAt,
                  UserId,
                  img=[],
                  files=[],
                  tag=[],
                  Replies= [],
                  Likes= [],
                  Dislikes= [],
                  Favors= [],
                  Reports= [],
                  User,
                }) => (
            <AtListItem
                isSwitch
                onSwitchChange={this.viewDetail}
                onClick={
                    ()=>{
                        console.log('kkkkk',title,User)
                        Taro.navigateTo({
                          url: '/pages/article/index?id='+id
                        })
                    }
                }
                title={title}
                note={
                        [
                           Replies.length, 
                           Likes.length,
                           new Date(updatedAt).toLocaleDateString(),
                            ...tag,
                        ].join(' ')
                            //html2text(content).length>40 ? html2text(content).slice(0,40)+"..." : html2text(content) 
                }
                extraText={[User? User.user_name : this.state.User.avatar].join('|')}
                thumb={User ? User.avatar: this.state.User.avatar }
                hasBorder={true}
                arrow='right'
            />
            ))
         }
        </AtList>
        <AtPagination 
          icon 
          current={this.state.current_page+1}
          pageSize={this.state.pageSize}
          total={this.state.list.length} 
          onPageChange={this.change_page.bind(this)}
        >
        </AtPagination>

        <AtDivider content='' />

        <Text> 你的回应  </Text>


        <form enctype="multipart/form-data">

            <AtInput
                title="标题"
                type='text' 
                placeholder='添加标题' 
                onChange={this.change_edit_title}
                value={this.state.post.title}
            />

            <Input type="file" multiple onChange={this.upload} value={this.state.imgs1}/> 

            <AtImagePicker
              multiple
              mode='top'
              files={this.state.imgs}
              onChange={this.add_img.bind(this)}
              onFail={this.add_img_fail.bind(this)}
              onImageClick={this.add_img_click.bind(this)}
            />

            {this.state.loading && <AtActivityIndicator content='loading...' /> }

            <View className='components-page'>


 {/*
 
 
 
              <AtTextarea 
                  count={false}
                  maxLength={2e4}
                  onChange={this.edit}
                  value={this.state.post.content}
                  height={500}
                  style='background:#ddd;width:85%;padding:0 30rpx;' 
                  placeholder='...'
                  autoHeight 
              />

 */}


            <figure class="editor-container">
                <div id="editor" ref="editor" > </div>            
            </figure>  


{/*
              <AtCheckbox
                    options={this.state.tags.map(x=>({
                                    value: x.name,
                                    label: x.name,
                                    desc: '',
                                    //disabled:false, 
                    }))}
                    selectedList={this.state.post.tag}
                    onChange={this.check_tag.bind(this)}
              />

*/}
              </View>


        </form>




        <AtButton type='primary' onClick={this.submit_post}>发送</AtButton>


        <AtDivider content='' />


        <AtTabBar
            tabList={this.state.tabs}
            onClick={this.handleClick.bind(this)}
            current={this.state.current_tab}
        />

        <AtDivider content='' />
        {
            this.state.tabs.map((x,i)=>(
                <AtTabsPane current={this.state.current_tab} index={i} >
                  <View style='padding: 1rem 1rem;background-color: #FAFBFC;text-align: center;' > {x.title}</View>
                  <AtTimeline pending items={this.state.timeline} /> 
                </AtTabsPane>
            ))
        }


        <AtCalendar />


        </View>
      </View>
    )
  }
}

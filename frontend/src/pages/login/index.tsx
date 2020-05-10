import Taro, { Component, Config } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import _ from "lodash"

import {login} from "../../http"

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


export default class Index extends Component {
  super(...arguments);
  state = {
        title: ' 🌾 🌾花香里说丰年',
        loaded: true,
        loading: false,
        lastItemId: 0,
        hasMore: true,
        params:{},
        is_login:false,
        user:{
            username:"",
            password:"",
        },
        user1:{

      }
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

  submit_post=async (e={})=>{
     let d=this.state.user
     console.log("post",d)
     let is_e=_.some(d,(v,k)=>v=="")
     if (is_e){
         Taro.showToast({
              title: '????🌾 🌾🌾 🌾',
              icon: 'none',
              duration: 1000
         })
         return
     }

     try{
         let user=await login(d)
         Taro.showToast({
              title: '成功🌾 🌾🌾 🌾',
              icon: 'none',
              duration: 1000
         })

         let s=this.state

         s.is_login=true
         s.user1=user
         this.setState(s,()=>{ console.log(this.state)})


         ///dispatch()...
         Taro.navigateTo({
              url: '/pages/index/index?x=1&y=2'
         })

      }catch(e){

         console.log(e)
         Taro.showToast({
              title: '失败🌾 🌾🌾 🌾',
              icon: 'none',
              duration: 1000
         })

      }
  }

  handleChange (k,v) {
    console.log('zzzz',k,v)
    let s=this.state
    s.user[k]=v
    this.setState(s)
  }


  onReset (event) {
    this.setState({
        user:{
            username:"",
            password:"",
        }
    })
  }

  render () {

    return (
      <View className="index">

          <View className="title" onClick={()=>{ Taro.navigateTo({ url: '/pages/index/index' }) }}>🌾</View>

        <AtForm
            onSubmit={this.submit_post.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtInput 
              name='username' 
              title='username' 
              type='text' 
              placeholder='username' 
              value={this.state.user.username} 
              onChange={this.handleChange.bind(this, 'username')} 
            />

            <AtInput 
              name='password' 
              title='password' 
              type='text' 
              placeholder='password' 
              value={this.state.user.password} 
              onChange={this.handleChange.bind(this, 'password')} 
            />

            <AtButton formType='submit'>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>

          </AtForm>

     </View>
    )
  }
}

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



import Taro from '@tarojs/taro'

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

} from '@tarojs/components'

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

import './index.scss'



type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}


@inject('store')
@observer
class Index extends Component {
  state={
       params:{},
  }
  componentWillMount () { }

  componentDidMount () { 

      let r=getCurrentInstance().router
      console.log(r)
      this.setState({
           params:r.params
      },()=>console.log('rrrrrrrr',this.state))

      this.incrementAsync()
      window.z=this
      window.p=this.props
      window.r=r
      console.log(p)

  }

  componentWillUnmount () { }

  componentDidShow (x) {

      console.log('ssssssssss',x)
  }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()

    Taro.showToast({
      title: " 🌾 🌾 🌾 🌾",
      icon: 'none',
      duration: 1000
    })

  }
  onTap=()=>{
    Taro.showToast({
      title: " 🌾 🌾 🌾 🌾",
      icon: 'none',
      duration: 1000
    })
  }
  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()

    Taro.showToast({
      title: " 🌾 🌾 🌾 🌾",
      icon: 'none',
      duration: 1000
    })

  }

  incrementAsync = async () => {
        const { counterStore } = this.props.store
        let z=await counterStore.incrementAsync()
        console.log("zzzzzzz",z)
  }

  render () {
    const { counterStore: { counter,data } } = this.props.store
    return (
      <View className='index'>
           <AtCalendar />
           <AtDivider />
           <AtCard>
            <AtForm>
                <AtButton onClick={this.increment}>+</AtButton>
                <AtButton onClick={this.decrement}>-</AtButton>
                <AtButton onClick={this.incrementAsync}>++</AtButton>
                <Text>{counter}</Text>
                <AtImagePicker />
            </AtForm>
           </AtCard>
           <AtDivider />
      </View>
    )
  }
}




export default Index

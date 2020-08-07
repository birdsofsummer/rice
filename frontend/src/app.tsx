import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import 'taro-ui/dist/style/index.scss'
import './app.scss'




import counterStore from './store/counter'
const store = {
  counterStore
}



class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}


  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

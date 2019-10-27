import Vue from 'vue'
import App from './App'
import {store} from '../store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

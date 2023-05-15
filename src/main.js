import Vue from 'vue'
import { add } from './tools/add.js'
import './styles/index.scss'
import App from './app.vue'

console.log(add(1, 2))
console.log('我是main.js')

new Vue({
  render: (h) => h(App)
}).$mount('#app')
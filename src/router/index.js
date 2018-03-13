import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import showInfo from '@/components/showInfo'
import Chat from '@/components/chat'
import updateInfo from '@/components/updateInfo'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
    	path:'/show',
    	name:'showInfo',
    	component:showInfo
    },
    {
    	path:'/chat',
    	name:'chat',
    	component:Chat
    },
    {
    	path:'/update',
    	name:'update',
    	component:updateInfo
    }
  ]
})

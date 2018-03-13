// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import axios from 'axios'
import './assets/public/css/bootstrap.min.css'

Vue.use(vuex);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
//vuex配置
const store = new vuex.Store({
   state:{
      domain:'http://localhost',      //方便修改请求的url
     // loginFlag:false,  
      UserInfo:{  
            "name":"",   
            "age":"",   
            "img":"/static/default.jpg",   
            "sex":"",  
            "sign":"",     
            "oldName":""
      }
   },
   mutations:{
      //修改用户信息
      updateUserInfo(state,newUserInfo){
         console.log("触发了修改/设置用户信息");
         console.dir(newUserInfo.oldName);
         
         console.log(newUserInfo.name);
         //向后台发送请求更改信息的请求
         $.ajax({
         	method:'post',
         	url:this.state.domain+":2000/update",
         	data:newUserInfo,
         	dataType:'json',
         	xhrFields:{
              withCredentials:true
          }, 
         	success:function(res){
         		console.dir(res);
         		this.state.UserInfo = newUserInfo;
         	},
         	error:function(err){
         		console.log(err.text);
         	}
         });
      }
   },
   actions:{
      req(context,callback){
        //在后台更新用户的信息
        //context.commit('')
        axios({
           method:'post',
           url:this.state.domain+":2000/robots",
           withCredentials: true
        }).then((response) => {
        	console.dir(response);
        	callback(response);
        })
      },
      show(context,callback){
      console.log('进入actions!!')
      axios({
        method: 'post',
        url: this.state.domain + ':2000/show',
        withCredentials: true
         }).then((response) => {       
        response.data.name? this.state.UserInfo.name=response.data.name:'';
        response.data.age?  this.state.UserInfo.age=response.data.age:'';
        response.data.img?  this.state.UserInfo.img=response.data.img:'';
        response.data.sex?  this.state.UserInfo.sex=response.data.sex:'';
        response.data.sign?  this.state.UserInfo.sign=response.data.sign:'';
        callback();
        console.log("此时的name是:"+this.state.UserInfo.name+","+response.data.name)
          console.log("此时的性别是:"+this.state.UserInfo.sex+","+response.data.sex)
            console.log("此时的年龄是:"+this.state.UserInfo.age+","+response.data.age)
            console.log("此时的图像url是:"+this.state.UserInfo.age+","+response.data.img)
         })
      },
      checkLogin(context,succ){
       //检查是否存在session
       $.ajax({
          url:this.state.domain+":2000/",
          type:'post',
          dataType:'json',
          xhrFields:{
              withCredentials:true
          }, 
          crossDomain:true,
          success:obj=>{
             succ(obj);
          },
          error:function(jq,err,text){
            alert(err.message+text);
          }
       })
     }
   }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

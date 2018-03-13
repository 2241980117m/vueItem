<template>
<div class="container">
  <div class="row">
  	   <div class="chat">
        <header>
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true" @click="back"></span>
          <label for="">{{robotName}}</label>
        </header>
  	   	 <ul class="showMsg">   
  	   	 	 <li v-for="item in items" :todo="item" :key="item.code" :class="item.class">
             <div class="img"  :style="{backgroundImage:'url('+item.img+')'}"></div>
              <span>{{item.content}}</span> 
           </li>
  	   	 </ul> 
		 <div class="footer">
		     	<input class="sendMsg" type="text" v-model="msg"  @keyup.enter="send">
		     	<button  type="submit" class="send" @click="send">发送</button>	    
		 </div>
  	   </div>
  </div>
</div>
</template>
<script>
  /* import {checkName,checkPass,objURL} from '../handler.js';*/
   import io from "socket.io-client/dist/socket.io.js";
   export default{
   	 data(){
   	 	return {
   	 		msg:"",
   	 		key:"",
   	 		item:{},
   	 		items:[],
        saySelf:true,
        selfImg:"",
        robotImg:"",
        robotName:""
   	 	}
   	 },
   	 //刚刚创建了vm实例调用的方法
   	 created:function(){
   	 	  this.$store.dispatch('checkLogin',(obj)=>{
            console.dir("检查状态请求接收到返回"+obj.status);
            if(obj.status == 0){
              console.log("应该调回login");
               this.$router.push('/login');
               return;
            }else{
               //请求对应的用户信息
               console.log("已经登录！！");
               this.key = localStorage.key;
               this.robotName = localStorage.name;
               this.selfImg = localStorage.self;
               this.robotImg = localStorage.img;
            }
        });
   	 },
   	 methods:{
        send(){
          
           //将现在的数据显示在页面上
           this.showSelf({"text":this.msg});
           let socket = io.connect(this.$store.state.domain+":3000");
           //向后台发送数据
           let obj = {"key":this.key,"info":encodeURI(this.msg)};
          
           socket.emit('receive',obj);
           socket.on('chat',this.response);
           this.msg="";
        },
        back(){
          this.$router.go(-1);
        },
        show(){
           this.items=[];
           this.handler(this.$store.state.domain+":2000/show",{"key":this.key,"info":this.msg},function(){
           	  alert("发送信息展示请求成功！！");
           });
        },
        handler(URL,dataObj,callback){
        	$.ajax({
        		url:URL,
        		type:'POST',
        		data:dataObj,
        		dataType:"json",
        		success:callback,
        		error:function(){
        			alert("发送出错！！");
        		}
        	})
        },
        showSelf(obj){				//显示自己发送的信息
        	//增加一个div,后期添加头像
        	//let ele = "<div class='saySelf'><img src=''><div class='sayContent'>"+obj.text+"</div></div>";
        	//$(".showMsg").append(ele);
         //let ele="<saySelf :content="+obj.text+"></saySelf>";
           // $(".showMsg").append(ele);
           
           this.items.push({content:obj.text,code:Math.random(),class:"saySelf",img:localStorage.self});
        	//this.msg="";
        },
        showOther(obj){			//显示机器人发送的信息
        	//后期添加头像
        	//let ele = "<div class='sayOther'><img src=''><div class='sayContent'>"+obj.text+"</div></div>";
          //let ele="<sayOther :content="+obj.text+"></sayOther>";
        	//$(".showMsg").append(ele);
          this.saySelf=false;
          this.items.push({content:obj.text,code:Math.random(),class:"sayOther",img:localStorage.img});
        },
        response(obj){
           		//将返回来的数据显示在页面上       	        		
           		this.showOther(obj);
           
        }
   	 }
   }
</script>
<style lang="scss" scoped>
header {
    background-color:rgb(33, 150, 243);
    height: 10vh;
}
.glyphicon{
  color: white;
  line-height: 2.2;
  font-size: 25px;
  padding-left: 1vw;
}
ul.showMsg {
    list-style: none;
    margin: 0px;
    padding: 0px;
    height: 80vh;
    margin-top: 1vh;
    overflow: scroll;
    padding: 0 10px;
}
.saySelf {
    float: right;
    clear: both;
    max-width: 80%;
}
.sayOther {
    float: left;
    clear: both;
    max-width: 80%;
}
.footer {
    position: fixed;
    bottom: 10px;
    width: 100%;
    padding: 10px;
}
button.send {
    cursor: pointer;
    float: left;
    border-radius: 4px;
    padding: 1px;
    background: rgb(33, 150, 243);
    width: 15%;
    height: 30px;
    margin-left: 1%;
    margin-top: -2px;
    outline: 0;
}
input.sendMsg {
    float: left;
    width: 82%;
    border-radius: 3px;
    padding: 3px;
    outline: 0;
}
.empty{
  background: #eee;
}
.img {
    width: 45px;
    height: 45px;
    background-size: cover;
    border-radius: 50%;
}
.saySelf{
  margin-top: 1vh;
    span{
       float: right;
       display: inline-block;
       padding: 2px;
       border:1px solid rgba(33, 150, 243, 0.6392156862745098);
       border-radius: 3px;
       position: relative;
       margin-right: 10px;
       margin-top: 3px;
       max-width: 50vw;
    }
    span:after{
      content:'';
      position: absolute;
      width: 10px;
      height: 10px;
      border: 1px solid rgba(33, 150, 243, 0.6392156862745098);
      top: 4px;
      width: 4px;
      height: 4px;
      right: -3px;
      border-radius: 3px;
      border-left: 0;
      border-bottom: 0;
      transform: rotate(45deg);
      background-image: linear-gradient(to right,white);
    }
    .img{
      float: right;
      border: 1px solid #eee;
    }
}
.sayOther{
  margin-top: 1vh;
  .img{
    float: left;
    border: 1px solid #eee;
    
  }
  span{
     display: inline-block;
     float: left;
     position: relative;
    padding: 2px;
    border:1px solid rgba(33, 150, 243, 0.6392156862745098);
    border-radius: 3px;
    margin-left: 10px;
    margin-top: 3px;
  }
   span:after{
      content:'';
      position: absolute;
      width: 10px;
      height: 10px;
      border: 1px solid rgba(33, 150, 243, 0.6392156862745098);
      top: 4px;
      width: 4px;
      height: 4px;
      left: -3px;
      border-radius: 3px;
      border-left: 0;
      border-bottom: 0;
      transform: rotate(245deg);
      background-image: linear-gradient(to right,white);
      
    }
}
</style>
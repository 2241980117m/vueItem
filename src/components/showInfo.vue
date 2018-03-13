<template>
            <div class="body">       
               <div class="main">
                   <div class="header">
                   <router-link to="/update">
                      <div id="photo" :style="{backgroundImage:'url('+src+')'}"></div> 
                   </router-link>  
                   <div id="info">
                       <span id="name" :key="name">{{name}}</span>
                       <span id="person">{{sign}}</span>
                       <ul id="link">
                          <li>
                            <span>空间</span>
                            <label for=""></label>
                          </li>
                          <li>
                            <span>邮件</span>
                            <label for=""></label>
                          </li>
                          <li id="more">&gt;&gt;</li>
                       </ul>
                   </div>
                   </div><!--end of header-->
                   <input id="search" placeholder="搜索">
                   <div class="flexible">
                      <div class="nav">
                        <div class="nav_left" :class="{active:active}"  @click="chatClick">
                           <span>聊天</span>                      
                        </div>                      
                        <div class="nav_right" :class="{active:!active}"  @click="funClick">
                           <span>游戏</span>
                       </div>                    
                      </div>
                       <div class="nav_content">
                           <chatItem v-if="active"></chatItem>
                       </div>
                   </div><!--end of flexible-->
               </div><!-- end of main -->
            </div> <!-- end of body -->
</template>
<script>
  import chatItem from "@/components/chatItem";
  export default{
       name:"showInfo",
       data(){
          return{
          	 msg:"",
             show:false,
             name:'',
             src:'default.jpg',
             sign:'',
             sex:'',
             age:'',
             tudos:[],
             active:true,
             activeSrc:''
          }
       },
       components:{
            chatItem
       },
      created:function(){
        console.log("created开始执行！！");
        this.$store.dispatch('checkLogin',(obj)=>{
            console.dir("检查状态请求接收到返回"+obj.status);
            if(obj.status == 0){
              console.log("应该调回login");
               this.$router.push('/login');
               return;
            }else{
               //请求对应的用户信息
               console.log("已经登录！！");
            }
        });
          //this.router.push("/login");
      },
      mounted:function(){
  	        console.log("beforeM开始执行");
  	        //利用store向后台请求数据
            console.log(this.$store.state.UserInfo.name);
            this.$store.dispatch('show',()=>{
               this.name=this.$store.state.UserInfo.name;
               this.src=this.$store.state.UserInfo.img;
               this.sign=this.$store.state.UserInfo.sign;
               this.sex=this.$store.state.UserInfo.sex;
               this.age=this.$store.state.UserInfo.age;
            });
           
  		},
  		methods:{
         chatClick(){
            this.active=true;
            //渲染各个聊天
           // this.activeSrc="./chat.html";
         },
         funClick(){
            this.active=false;
         },
         //使用vue resource进行查询
         acquireItem(){
           this.$http.jsonp(this.$store.state.domain+':2000/getItem').then((res)=>{
                //响应成功回调
                if(res.ok>=200&&res.ok<300){
                    this.tudos=res.json();
                }      
           },(res)=>{
               //响应错误回调
               console.log(res.statusText);
           })
         },
         animate(){
           this.$router.push("updateInfo");
         }
  		}
  }
</script>
<style lang="scss" scoped>
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}
.body{
  height: auto;
  display: flex;
  flex-direction:column;
  overflow: hidden;
  border: 1px solid black;
  position: relative;
}
.header {
    
    height: 120px;
    background: #03A9F4;
    overflow: hidden;
    padding-top: 6vh;
    padding-left: 5vw;
}
#photo{
    width: 20vw;
    height: 20vw;
    background-size: cover;
    border-radius: 50%;
    float: left;
}
#photo:hover{
  border: 1px solid #099bea;
}
#info{
  float: left;
  float: left;
  margin-left: 3vw;
  margin-top: 1vh;
}
ul#link{
    margin: 0;
    padding: 0;
    list-style: none;
}
ul#link > li{
     display: inline-block;
     margin-right: 1vw;
}

#name{
  font-size: 20px;
  padding-left: 1vw;
}
#person{
  font-size: 10px;
}
#info > span{
  display: block;
}
#search{
  background: #eee;
  width: 100%;
  padding-left: 1vw;
  outline: 0;
}
#search:focus{
 background: white;
}
.nav{
   display: flex;
   flex-direction: row;
}
.nav_left,.nav_right{
    width: 50%;
    text-align: center;
    height: 7vh;
    line-height: 7vh;
    span{
      line-height: 50px;
      font-size: 16px;
    }
}
.nav_content {
    min-height: 700px;
}
/* .showInfo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 70%;
    position: absolute;
    top: 0;
    margin-left: 0%;
}
.showInfo img{
  width: 40%;
}

.item span{
    font-size: 20px;  
}
.item span.name{
      font-size: 40px;
}
.sign,.sex,.age{
  height: 40px;
  line-height: 40px;
}
.sign label{
  margin-left: 20px;
}
.info{
  margin-left: 20px;
}
.active{
  border-bottom: 2px solid #139ce6;
  color: #099bea;
} */
</style>
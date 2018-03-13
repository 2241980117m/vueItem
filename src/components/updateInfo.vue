<template>
	             <div class="showInfo">
                    <div class="item">
                        <section>
                        	<header>
	                        	<img :src="img" alt="" class="personalImg">
	                        	<span class="name">{{name}}</span>
                        	</header>
                        </section>
                        <section>
                        	<div class="">
	                           <span>姓名</span>
	                           <input type="text" :value="name" :disabled="state" id="name">
                           </div>
                           <div class="sign">
	                           <span>个性签名</span>
	                           <input type="text" :value="sign" :disabled="state" id="sign">
                           </div>
	                        <div class="sex">
	                          <span>性别</span>
	                          <input type="text" :value="sex" :disabled="state" id="sex">
	                        </div>
	                        <div class="age">
	                          <span>年龄</span>
	                          <input type="text" :value="age" :disabled="state" id="age">
	                        </div>
                        </section>
                    </div><!-- end of item -->
                    <div class="item">
                    	<button class="edit" @click="active">修改</button>
                    	<button class="save" @click="send">保存</button>
                    	<router-link to="/show">
                    		<button>返回主页面</button>
                    	</router-link>
                    </div>
                  </div><!--end of showInfo-->
</template>
<script>
	export default{
		name:'update',
		data(){
			return{
				name:'',
				sign:'',
				sex:'',
				age:'',
				state:'disabled',
				oldName:''
			}
		},
		created(){		
			 this.name=this.$store.state.UserInfo.name;
			 this.oldName=this.$store.state.UserInfo.name;
			 this.img = this.$store.state.UserInfo.img;
			 this.sex=this.$store.state.UserInfo.sex;
			 this.age=this.$store.state.UserInfo.age;
			 this.sign=this.$store.state.UserInfo.sign;
		},
		methods:{
			active(){
				this.state=!this.state;
				var oinput=document.getElementsByTagName("input");
				for(var i=0;i<oinput.length;i++){
					oinput[i].className="active";
				}
			},
			send(){
				var newInfo ={
					img:this.img,
					name:document.getElementById("name").value,
					sex:document.getElementById("sex").value,
					age:document.getElementById("age").value,
					sign:document.getElementById("sign").value,
					oldName:this.oldName
				}

				this.$store.commit('updateUserInfo',newInfo);
			}
		}
	}
</script>
<style lang="scss" scoped>
*{
	margin: 0;
	padding: 0;
}
.showInfo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 0px 10px;
}
header{
	background-color:rgb(33, 150, 243);
	padding: 10px 0px 10px;
	margin: 0 -10px;
}
.showInfo img{
  width: 40%;
}

.item span{
    font-size: 16px;  
}
.item span.name{
      font-size: 18px;
}
.sign,.sex,.age{
  height: 40px;
  line-height: 40px;
}
.sign label{
  margin-left: 20px;
}
.info{
  margin-left: 18px;
}
.active{
  border-bottom: 2px solid #139ce6;
  color: #099bea;
}
input[type="text"]{
	 width: 105px;
     height: 20px;
     border: 0;
     outline:0;
}
input[type="text"]:disabled{
	background: white;
	border: 0;
}
.active{
	border-bottom: 1px solid #eee;
}
.showInfo img{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #eeee;
    clear: both;
    display: block;
    margin: 0 auto;
}
header{
	text-align: center;
}
section+section{
	margin-top: 10px;
}
</style>
<template>
	<div id="chat">
		<section>
			<header>
				<span @click="click1=!click1;" :class="{click:click1}"></span>
				<span>机器人</span>
			</header>
			<!-- 向后台请求机器人数据-->
			<ul v-if="click1">		
				<li v-for="robot in robots" :todo="robot" :key="robot.name" class="robot" @click="chat">
					 <div class="img" :style="{backgroundImage:'url('+robot.img+')'}"></div>
					<span>{{robot.name}}</span>
				</li>
			</ul>
		</section>
		<section>	
			<header>
				<span @click="click2=!click2" :class="{click:click2}"></span>
				<span>朋友</span>
			</header>
			<!-- 向后台请求朋友数据-->
			<ul v-if="click2">
				<li v-for="friend in friends"></li>
			</ul>
		</section>
	</div>
</template>
<script>
	export default{
		name:"chatItem",
		data(){
			return{
              click1:false,
              click2:false,
              robots:[],
              friends:[]
			}
		},
		mounted(){
			console.log("chatItem页面开始加了！！");
		},
		methods:{
			getRobots(){
				this.$store.dispatch('req',(rows)=>{
					console.dir(rows.data);
					console.log("成功接收到返回");
					this.robots = rows.data;
				});
			},
			chat(event){
				console.log("执行点击！！");
				localStorage.self = this.$store.state.UserInfo.img;
				console.log(event.target.tagName);
				if(event.target.tagName.toUpperCase() == 'LI'){
						localStorage.img = event.target.getElementsByClassName("img")[0].style.backgroundImage;
						localStorage.name = event.target.getElementsByTagName("span")[0].innerHTML;

				}else if(event.target.tagName.toUpperCase() == 'DIV'){
						localStorage.name = event.target.parentNode.getElementsByTagName("span")[0].innerHTML
						;
						localStorage.img = event.target.style.backgroundImage;
				}else if(event.target.tagName.toUpperCase() == 'SPAN'){
						localStorage.name = event.target.innerHTML;
						localStorage.img = event.target.parentNode.getElementsByClassName("img")[0].style.backgroundImage;
				}
				console.log("length::"+this.robots.length);
				for(let i=0;i<this.robots.length;i++){
					console.log(localStorage.img+"   "+this.robots[i].img);
					if(localStorage.img.indexOf(this.robots[i].url)){    //因为url(src) != src
						localStorage.img = this.robots[i].img;   //将机器人的url路将改为src路径
						localStorage.key = this.robots[i].url;
					}
				}		
				this.$router.push("/chat");
			}
		},
		watch:{
			click1:function(){
				this.click1&&this.getRobots();
			}
		}
	}
</script>
<style lang="scss" scoped>
	#chat{
		width: 100%;
		margin-top: 10px;
	}
	section{
		padding-left: 2px;
	}
	section > header{
		position: relative;
	}
	section span:first-child{
		display: inline-block;
		opacity: 0.9;
		filter:alpha(opacity=90);
		margin-right: 10px;
		width: 10px;
		height: 10px;
		background-color:gray;
		background-image: linear-gradient(45deg,white 50%,transparent 0);
        transform:rotate(45deg);
        transition:all 0.2s linear;
        border: 0;
	}
	.click{
		transform: rotate(135deg) !important;
	}
	section > ul{
		margin: 0;
		padding: 0;
	}
	.robot > .img{
	   float: left;
       width: 50px;
       height: 50px;
       background-size: cover;
       border-radius: 50%;
	}
	.robot{
		overflow: hidden;
		padding: 5px 10px;
		margin-top: 10px;
	}
	.robot > span{
		margin-left: 10px;
	} 
	.robot:hover{
		background-color: #c5bfbf85;
	}
</style>

<template>
	<div class="container">
		<router-view></router-view>	
	</div>
</template>
<script>
	export default{
		name:'app',
		mounted(){
           //this.getUserInfo();
		},
		methods:{
		   getUserInfo(){
		   	  this.userInfo={
		   	  	name:'',    //姓名
		   	    age:'',		//年龄
		   	    img:'',		//图像
		   	    sex:'',		//性别
		   	    sign:''     //个性签名
		   	  }

		   }

		}
	}
</script>
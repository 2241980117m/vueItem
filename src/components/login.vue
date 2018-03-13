<template>     
       <div class="container-fluid">
        <div class="row">
           <div class="col-md-8 col-sm-8  col-xs-12 col-md-offset-2 col-sm-offset-2">
           		  <div class="header">
				      <div v-if="show" class="header_item" :class="{active:isActive}">
				      	<span>登录</span>
				      </div>
				   	  <div v-else class="header_item" :class="{active:!isActive}">
				   	  	<span>注册</span>
				   	  </div>
		   		  </div>
		   		     <div class="form-horizontal">
				   		<div class="form_control has-feedback">
				   	   	
				   	   			<label class="control-label col-sm-3" for="inputSuccess1">用户名</label>
					   	   		<div class="col-sm-9">
					   	   			<input class="form-control" id="inputSuccess1" aria-describedby="inputSuccess3Status" v-model.trim="user" type="text" @input="userCheck">
						   	   		<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
		      						<span id="inputSuccess3Status" class="sr-only">(success)</span>
		      						<span id="helpBlock1" class="help-block"></span>
						   	   		</div>
					   	   		
				   	   		
				   	    </div>
				   	  
				   	   <div class="form_control has-feedback">
				   	   	
				   	   			<label class="control-label col-sm-3" for="inputSuccess2">密码</label>	
					   	   		<div class="col-sm-9">
					   	   			<input class="form-control" id="inputSuccess2" aria-describedby="inputSuccess3Status" v-model.trim="pass" type="password" @input="passCheck">
						   	   		<span class="glyphicon form-control-feedback" aria-hidden="true"></span>
		      						<span id="inputSuccess3Status" class="sr-only">(success)</span>
		      						<span id="helpBlock2" class="help-block"></span>
					   	   		</div>
					   	   		
				   	   		
				   	   </div>
				   	 
				   </div>
			   <div class="footer">
			        <button class="btn btn-block btn-info submit" @click="submit">登录</button>
			        <button class="btn btn-block btn-warning signin" @click="signin">注册</button>
			   </div> 
           </div>
	   </div>
	  </div>
</template>

<script>
/*import {checkName,checkPass,objURL} from "../handler.js";*/
    export default {
       name: 'Login',
      
       data(){
          return {
              show:true,
	          isActive:true,
	          user:"",
	          pass:"",
	          infoMsg:{
	            name:"输入的用户名不符合格式。用户名需要四个字符以上",
	            info:"用户名已经存在",
	            error:"请求失败",
	           /* pass:[
	            
	            	"密码中缺少英文字符",
	            	"缺少数字",
	            	"缺少中文字符",
	            	"缺少特殊字符. *"
	            ]*/
	            pass:"密码至少8位"
	            
	          },
	          fonts:["glyphicon-ok","glyphicon-remove"],
	           checkName:{
   			 		pattern:/\w{4,}/
				},
				checkPass:{
					pattern:/\w{8,}/
				}
          }
       },
       methods:{
       	  userCheck:function(){
       	  	 if(!this.checkName.pattern.test(this.user)){
       	  	 		console.log(this.user);
       	  	 		this.change(0,this.infoMsg.name);
       	  	 }else{
 				    this.reset(0);
 				    if($("span").eq(0).html()=="注册"){
 				    	this.isExist();
 				    }
       	  	 }
       	  },
       	  isExist:function(){
       	  		  $.ajax({
			       	 	url:this.$state.domain+":2000/check",
			       	 	type:"post",
			       	 	data:{
			       	 		user:this.user,
			       	 	},
			       	 	dataType:"json",
			       	 	success:this.success,
			       	 	error:this.error
	       		  });
       	  },
       	  passCheck:function(){
       	  	console.log(this.pass);
       	  	 if(!this.checkPass.pattern.test(this.pass)){
       	  	 	this.change(1,this.infoMsg.pass);
       	  	 }else{
       	  	 	this.reset(1);
       	  	 }
       	  },
       	 submit:function(){
       	 	console.log("请求地址是"+this.$store.state.domain+":2000/login");
       	//查询
        	$("span").eq(0).html("登录");
	       	 $.ajax({
	       	 	url:this.$store.state.domain+":2000/login",
	       	 	type:"post",
	       	 	data:{
	       	 		user:this.user,
	       	 		pass:this.pass
	       	 		//pass:hex_sha1(hex_sha1(this.password))   //对密码进行加密处理
	       	 	},
	       	 	dataType:"json",
	       	 	xhrFields: { withCredentials: true }, crossDomain: true,  
	       	 	success:obj=>{          //之前this有问题，指代的不是vue实例
	       	 		if(obj.status == 1){
	       	 			this.$router.push("/show");
	       	 		}else{
	       	 			alert("登陆失败");
	       	 		}
	       	 	},
	       	 	error:function(jq,text,err){
	       	 		alert("请求失败"+err+text);
	       	 	}
	       	 })
       },
       signin:function(){
       	 if($("span").eq(0).html()=="登录"){
       	 	$("span").eq(0).html("注册");
       	 }else{
       	 	//注册
       	   if(!this.user||!this.pass){
       	   		alert("请填写完整信息");
       	   }else{
       	   	   console.log(this.$state);
       	   		$.ajax({
       			url:this.$store.state.domain+":2000/signin",
       			type:"post",
       			data:{
       				user:this.user,
       	 			pass:this.pass
       			},
       			dataType:"json",
       			success:function(obj){
       				if(obj.status == 1){
       					alert("注册成功,请登录");
       					this.user="";
       					this.pass="";
       				}else{
       					alert("注册失败！");
       				}
       			},
       			error:function(){
       				alert("注册失败");
       			}
       		});
       	   }
       	 }
       	
       	
       },
       change:function(i,value){
       	//错误信息
       		$(".help-block").eq(i).html(value);
       		$(".form_control").eq(i).removeClass("has-success");
       		$(".form_control").eq(i).addClass("has-error");
       		$(".glyphicon").eq(i).removeClass(this.fonts[0]);
       		$(".glyphicon").eq(i).addClass(this.fonts[1]);
       	  	$(".submit").attr("disabled",true);
       	  	$(".signin").attr("disabled",true);
       },
       reset:function(i){
       	//正确信息
       	  $(".help-block").eq(i).html("");
       	  $(".form_control").eq(i).addClass("has-success");
       	  $(".form_control").eq(i).removeClass("has-error");
       	  $(".glyphicon").eq(i).addClass(this.fonts[0]);
       	  $(".glyphicon").eq(i).removeClass(this.fonts[1]);
       	  $(".submit").attr("disabled",false);
       	  $(".signin").attr("disabled",false);

       },
       success(obj){
       	console.log(obj);
		if(obj.status == 1){
			this.change(0,this.infoMsg.info);
		}else{
			this.reset(0);
		}
			       	 
       },
       error(){
       	 this.change(0,this.infoMsg.error);
       }
      }
  

    }
</script>
<style lang="scss" scoped>
$bgColor:"red";
.active{
	border-bottom:1px solid $bgColor;
}
.header{
	width:50%;
	height:10vh;
    margin: 0 auto;
}
.header_item {
    width: 100%;
    float: left;
    font-size: 2rem;
    text-align: center;
    line-height: 10vh;
}
input[type="text"],input[type="password"]{
	width:80%;
	height: 5vh;
	margin-left: 5%;
}
.col-sm-9 span{
	margin-left: 5%;
}
.form_control{
     height:18vh;
}
.form-horizontal {
    margin-top: 3vh;
}

.footer{
	.submit{
		margin-top: 4vh;
		width: 100%;
	}
	.signin{
		margin-top: 2vh !important;;
		width: 100%;

	}
}
@media(min-width: 399px){
	.form_control{
     	height:15vh;
	}
}
@media(min-width: 768px){
	.form-horizontal {
	    margin-top: 8vh;
	}
}

</style>
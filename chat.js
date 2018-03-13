let request = require("request");
let http = require("http");
let events = require("./events");

//调用图灵机器人后台接口，用socket实现服务器向前端发送数据。并将聊天消息存储在数据库中
module.exports=function(app){

	let server = http.createServer(app);
	server.listen(3000);
	let io = require("socket.io").listen(server);
    //查询聊天记录的数据库文件
	/*app.post('/show',function(req,res){
		 
	});*/

	//如果session不存在,则此页面不显示
/*	app.post('/chat',function(req,res){
		

	});*/

	//处理前端发送来的数据，调用图灵机器人的接口
	io.on('connection',function(socket){
			console.log("建立了socket连接");
			socket.on('receive',function(msg){
				console.log(msg);
				let reqUrl = "http://www.tuling123.com/openapi/api?key="+msg.key+"&info="+msg.info;
				console.log(reqUrl);
				request(reqUrl,function(error,request,response){
					if(error){
						console.log("请求出错！！"+error.message);
					}

					if(!error){
						console.log("向图灵机器人后台发送了请求！！");
						//将数据存储在数据库
						console.log(response);
						socket.emit('chat',JSON.parse(response));
					}
				});
			});
	});
}
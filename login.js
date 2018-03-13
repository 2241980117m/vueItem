let events = require("./events");
module.exports=function(app){	
		app.post('/login',function(req,res,next){
			let param = [req.body.user];
			console.log("接收到来自客户端登陆的请求");
			events.Conn(req,events.queryObj.login,param,function(){
				res.json({"status":0});				
			},function(){
				req.session.code = 1;      //此时生成session,标记登陆成功
				req.session.name = req.body.user;	
				res.json({"status":1});			
				console.log("已经设置了session");	
				console.log("此时的session id是："+req.sessionID);	
				console.log(req.session);
				console.log("数据发送完毕");
			});
	});
}
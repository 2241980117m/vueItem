let events = require("./events");
module.exports=function(app){
	app.post('/signin',function(req,res){	
		//let param = {"pass":req.body.pass,"user":req.body.user};
		let param = [req.body.pass,req.body.user];
		console.log("接收到来自客户端注册的请求！");
		events.Conn(req,events.queryObj.signin,param,function(){
			res.end(JSON.stringify({"status":0}));
		},function(){
			res.end(JSON.stringify({"status":1}));
		});
  });
}
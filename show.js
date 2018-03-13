let events = require("./events");
module.exports=function(app){
	app.post('/show',function(req,res){
		console.log("展示界面收到请求");
		
		if(req.session.code){
			//连接数据库
			let param = req.session.name;
			console.log("name是:"+param);
			events.Conn(req,events.queryObj.check,param,function(){

			},function(arr){
				console.log("得到的arr的length是:"+arr.length);
				console.log(arr[0]);
				res.json(arr[0]);
				console.log("show页面收到的请求的响应已经发送！！");
			})
		}else{
			console.log("session不存在！！");
			res.json({status:1});
		}
	});
}
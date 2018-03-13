let event = require("./events");
module.exports=function(app){
	app.post('/robots',function(req,res){	
		console.log("啦啦啦啦啦");
		event.Conn(req,event.queryObj.robots,'',function(){console.log("执行查找机器人数据库失败")},function(rows){
				console.log("robots已经得到结果,"+rows[0].name);
				res.json(rows);
		});
	})
}
let events = require("./events");
module.exports=function(app){
   app.post('/update',function(req,res){

   		
   		let name  = [req.body.oldName];
   		console.log(req.body.oldName);
   		let param = [];
   		
   		param.push(req.body.name,req.body.age,req.body.img,req.body.sex,req.body.sign);
   		
   		//查找对应的id
   		events.Conn(req,events.queryObj.login,name,function(rows){
			console.log("没有找到！！");
		},function(rows){
			console.log(rows.length);
			param.push(rows[0].id);
			events.Conn(req,events.queryObj.update,param,function(rows){
	  			res.json({status:0});
		  		},function(){
		  			//修改name,防止name改变造成req.session.name不可用
		  			console.log(rows[0].name);
		  			req.session.name = req.body.name;
				     console.log("sign"+rows[0].sign);

		  			res.json({status:1});
		  	})
		});
   })
} 

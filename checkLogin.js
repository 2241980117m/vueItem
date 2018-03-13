let events = require("./events");
module.exports = function(app){
	app.post('/',function(req,res){
		console.log("checkLogin接收到的session id是:"+req.sessionID );
		console.log("checkLogin接收到的session code是:"+req.session.code);
		 if(req.session&&req.session.code == 1){
		 	 res.json({status:1});
		 }else{
		 	 res.json({status:0});
		 }
	});
}
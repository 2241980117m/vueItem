let config = require("./configbase");
let mysql = require("mysql");

function Conn(req,query,parm,error,callback){
	let con = mysql.createConnection(config);
	con.connect(function(err){
		if(err){
			console.log("连接数据库失败！");
		}else{
			console.log("连接数据库成功!");
		}
	});
	con.query(query,parm,function(err,rows,fields){
		if(err){
			console.log("执行数据库操作失败！");
			console.log(err.message);
			error();
			con.end();

		}else{
			//处理登录
		    if(req.url=="/login"){
		    	
		    	if(rows.length!=0 && rows[0].pass == req.body.pass){
					console.log("执行到登录");
					callback(rows);
						
				}else{
					console.log("执行到登录");
					error();
				}
		    }else if(req.url=="/signin"){
		    	//处理注册
				console.log("执行到注册");
				callback();
		
		    }else if(req.url=="/show"){   //处理检查用户名是否重复
				console.log("执行到检察!!");
				
				if(rows.length){
					console.log("show查找到数据！！！");
					callback(rows);
				}else{  
					console.log("此时的re name:"+req.session.name);
					error();
				}
			}else if(req.url == '/update'){
				 console.log("执行到更新信息！！");
				 callback(rows);
			}else if(req.url == '/robots'){
			     callback(rows);	
			}
			con.end();
		}
	});
}

let queryObj = {
	login:`SELECT * FROM chat WHERE name=?`,
	signin:`INSERT INTO chat (pass,name) VALUES (?,?)`,
	check:`SELECT * FROM chat WHERE name=?`,
	update:`UPDATE chat SET name=?,age=?,img=?,sex=?,sign=? WHERE id=?`,
    robots:`SELECT * FROM robots`,
    friends:`SELECT * FROM chat`
}
module.exports={Conn,queryObj};
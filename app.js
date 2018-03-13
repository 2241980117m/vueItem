//处理前端传来的数据  后台处理跨域请求
let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let ejs = require('ejs');
let cookieParser = require("cookie-parser");
let session = require("express-session");
let FileStore = require('session-file-store')(session);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());
app.use(session({
    secret: '1234',
   // store:new FileStore(),// 本地存储session文本文件，也可以选择其他store
    cookie: {
        maxAge: 60000 * 60 * 2,
        secure: false
    },    //设置有效时间是2小时
    resave: false,  // 是否每次都重新保存会话，建议false
    saveUninitialized: false			// 是否自动保存未初始化的会话，建议false 用着就没有set-cookie字段    //
}));

app.set('views', path.join(__dirname, 'src/views')); 
//app.engine('.html', require('ejs').__express);   //以ejs结尾的以html结尾
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//跨域请求


let login = require("./login");
let signin = require("./signin");
let check = require("./check");
let chat = require("./chat");
let show = require("./show");
let checkLogin = require("./checkLogin");
let robots = require("./robots");
let update = require("./update");

app.all('*',function(req,res,next){
	 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');    //跨域发送凭证信息时，必须指明域名
     res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE');
     res.setHeader('Access-Control-Allow-Credentials', 'true');		//跨域发送凭证信息
    // res.setHeader('Access-Control-Allow-Headers',"Content-Type");
    // checkLogin(app);
     next();
});


//路由处理程序
login(app);
signin(app);
check(app);
show(app);
chat(app);
checkLogin(app);
robots(app);
update(app);



app.listen(2000,function(){
	console.log("服务器开始启动");
});

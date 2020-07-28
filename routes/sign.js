var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.local();


router.get('/',function(req,res,next){
    res.render('login_register',{title : "login_register form"});
});

router.post('/signin',function(req,res,next){
    console.log("req = ",req.body);
    var id = req.body.id;
    var passwd = req.body.passwd;
    var sql = "select id,password,name from membertb where id=? and password = ?";
    var datas = [id,passwd];
    console.log("data : ",id, passwd);
    conn.query(sql,datas,function(err,rows,field){
        console.log(rows);
        if(err) throw err;
        if(rows == false )
        {
            res.send("<script>alert('계정정보를 확인해주세요!!!'); window.location.href='/sign'</script>");
        }
        else{
            console.log(rows[0].id);
            console.log(rows[0].name);
            res.render('profile',{title :"ProFile",ID:rows[0].id,NAME:rows[0].name});
        }
        
    });

});

router.post('/signup',function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var passwd = req.body.password;

    var sql = "select id from membertb where id = ?";
    var sql2 = "insert into membertb(name,id,password) values(?,?,?);";

    var datas = [name,id,passwd];
    console.log("datas : ",datas);
    conn.query(sql,id,function(err,rows){
        if(err) throw err;
        if(rows == false){
            console.log(rows);
            conn.query(sql2,datas,function(err,rows){
                if(err) console.err("err : ",err);
                res.send("<script>alert('가입해주셔서 감사합니다!!!'); window.location.href='/sign'</script>");
            });
        }
        else{
            res.send("<script>alert('이미 가입된 아이디 입니다');history.back();</script>");
        }
    });
});

module.exports = router;



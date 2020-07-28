var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.local();

router.get('/page/:page',function(req,res,next){
    var page = req.params.page;
    console.log("page : " ,page);
    var sql = "select num, name, title," + "date_format(regdate,'%m-%d') regdate,hit from boardtb;";
    conn.query(sql,function(err,rows){
        console.log(rows);
        if(err) console.error(err);
        //res.render('page',{rows:rows, page:page, async:true});
        res.render('page',{rows:rows,page:page,length:rows.length-1,page_num:10,pass:true});
        console.log("rows.length : ",rows.length-1);
    });
});


router.get('/page',function(req,res,next){
    res.redirect('/board/page/1');
});



router.get('/write',function(req,res,next){
    res.render('write',{title:"글쓰기"});
});

router.post('/write',function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var dates = [name,title,content,passwd];

    var sql = "insert into boardtb(name,title,contents,regdate,passwd,hit) values(?,?,?,now(),?,0);";

    conn.query(sql,dates,function(err,rows){
        if(err) console.error("err : ",err);
        res.redirect('/board/page');
    });
});


router.get('/read/:num',function(req,res,next){
    var num = req.params.num;
    console.log("num : ",num);
    var sql = "select num, name, title, contents, " +
    "date_format(regdate,'%m-%d') regdate,hit from boardtb where num=?;";
    
    conn.query(sql,num, function(err,rows){
        if(err) console.error(err);
        res.render('read',{title : "read contents",rows:rows[0]});
    });
});


router.post('/update',function(req,res,next){

    var name = req.body.name;
    var title = req.body.title;
    var contents = req.body.contents;
    var passwd = req.body.passwd;
    var num = req.body.num;
    var dates = [name,title,contents,num,passwd];

    var sql = 'update boardtb set name=?, title=?, contents=? where num=? and passwd=?;';
    conn.query(sql,dates,function(err,rows){
        if(err) console.error(err);
        if(rows == false)
        {
            res.send("<script>alert('Wrong Password');history.back();</script>");
        }
        else{
            res.redirect('/board/read/'+num);
        }

    });
});

router.post('/delete',function(req,res,next){
    var num = req.body.num;
    var passwd = req.body.passwd;
    var datas = [num,passwd];

    var sql = 'delete from boardtb where num=? and passwd=?;';
    conn.query(sql,datas,function(err,rows){
        if(err) console.error(err);
        if(rows == false)
        {
            res.send("<script>alert('Wrong Password');history.back();</script>");
        }
        else{
            res.redirect('/board/page/');
        }
    });
});





module.exports = router;

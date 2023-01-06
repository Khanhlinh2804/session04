const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
// cau hinh ket noi csdl mysql 
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'qlsv7',
    charset:'utf8_general_ci'
});

// mo ket noi
conn.connect((err)=>{
    if(err) throw err.stack;
    console.log('connected as id ' + conn.threadId);
});


app.get('/lop-hoc',(req,res)=>{
    // truy van lay ra danh sach lop hoc 
    conn.query("SELECT * FROM lop_hoc",(err,results)=>{

        if(err){
            res.send(err);
        } else {
            // chuyen du lieu sang view hien thi
           res.render('index',{results});
        }
    })
});

app.get('/them-moi',(req,res)=>{
    res.render('add');
});

app.post('/them-moi',(req,res)=>{
    conn.query(`INSERT INTO lop_hoc(ten_lop,status) VALUES ('${req.body.ten_lop}','${req.body.status}')`,(err,results)=>{

        if(err){
            res.send(err);
        } else {
            // chuyen du lieu sang view hien thi
           res.redirect('/lop-hoc');
        }
    })
});

app.get('/edit/:id',(req,res)=>{

    let id = req.params.id;
    conn.query(`SELECT * FROM lop_hoc WHERE id = ${id}`,(err,results)=>{

        if(err){
            res.send(err);
        } else {
            // console.log(results[0]);
            // chuyen du lieu sang view hien thi
            let lop = results[0];
           res.render('edit',{lop});
        }
    });


});

app.post('/edit/:id',(req,res)=>{

    let id = req.params.id;
    let sql = `UPDATE lop_hoc SET ten_lop = '${req.body.ten_lop}', status = ${req.body.status} WHERE id = ${id}`;
    conn.query(sql,(err,results)=>{

        if(err){
            res.send(err);
        } else {
            // console.log(results[0]);
            // chuyen du lieu sang view hien thi
           
            res.redirect('/lop-hoc');
        }
    });


});
// dong ket noi
// conn.end((err)=>{
//     if(err) throw err.stack;
//     console.log('dong ket noii');
// });

app.listen(3000,()=>{
    console.log("ok cong 3000 yeu em");
});

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employer'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 
 
//set views file
app.set('views','./views');
 
//set view engine

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
 
 
app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM employees";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            employees : rows
        });
    });
});
 
 
app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});
 
app.post('/save',(req, res) => { 
    let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
    let sql = "INSERT INTO employees SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});



app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from employees where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : " API REST avec NodeJS / ExpressJS / MySQL",
            user : result[0]
        });
    });
});
 
 
app.post('/update',(req, res) => {
    const userId = req.body.id;
    let sql = "update employees SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
 
app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from employees where id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});
 
 
// Server Listening
const port=8080
app.listen(port, () => {
    console.log('le serveur est executer a port '+port);
});
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const conn=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node'
});

conn.connect((err) => {
  if(err) {
    throw err;
  }

  console.log('Connection Successfully!');

});

// Routes
app.get('/',(req,res) => {
  res.render('insert');
});

// Insert data
app.post('/insert', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const sql = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${password}')`;

  conn.query(sql, (err, results) => {
    if(err) {
      throw err;
    }
    res.send("<h1>Data Sent Successfully...</h1>")

  });
});

// Show data
app.get('/show', (req, res) => {
  const sql = "SELECT * FROM users";
  conn.query(sql, (err, results) => {
    if(err){
      throw err;
    }
    res.render('show', {users:results});
});

});

// Delete Data
app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users where id='${id}'`;
  conn.query(sql, (err,results) => {
    if(err){
      throw err;
   
    }
    res.redirect('/show');
  });

});

// Edit data
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users where id='${id}'`;
  
  conn.query(sql, (err, results) => {
    if(err){
      throw err;
      
    }
    res.render('edit',{users:results});
});

});

// Update data

app.post('/update/:id',(req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const sql = `UPDATE users SET name='${name}',email='${email}', password='${password}' where id='${id}'`;

  conn.query(sql, (err, results) => {
    if(err){
      throw err;
  }
    res.redirect('/show');
  });

});

const server = app.listen(4000,function(){
   console.log("App running on 4000");
});
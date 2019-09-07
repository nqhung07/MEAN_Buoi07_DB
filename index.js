var express = require('express');
var app = express();

//set view pages in views
//set public floder as root
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))

//setting
//body-paser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-qkovx.mongodb.net/buoi01?retryWrites=true&w=majority', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("connect err", err)
    } else {
        console.log("connect success")
    }
}
);

//port 
app.listen(3000)

//variable
// var sinhvienSchema = new mongoose.Schema({
//     HoTen: String,
//     NamSinh: Number
// });

// create model
// var SinhVien = mongoose.model("SinhVien",sinhvienSchema)
var SinhVien = require('./models/sinhvien')

//save to mongoDB
app.get("/save",function(req,res){
    var teo = new SinhVien({
        HoTen: "Nguyen Hung",
        NamSinh: 1985
    })
    console.log("teo: ", teo);
    teo.save(function(err){
        if (err) {
            console.log("save err",err);
            res.json({"kq":0})
        } else {
            console.log("save success");
            res.json({"kq":1})
        }      
    })
    
})

//
app.get("/sv",function(req,res){
    SinhVien.find(function(err,ds){
        if (err){
            console.log("find sv",err);
            res.json({"kq":0})
        } else {
            console.log("find sv success");
            res.json(ds)
        }
    })
})

app.get('/', function (req, res) {
    // res.send('hello')
    res.render('home')
})
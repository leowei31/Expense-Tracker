// Requring packages and setting up
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// Setting the localhost default 3000
const normalizePort = require('normalize-port');
var port = normalizePort(process.env.PORT || '3000');

// temporary database
var data = []; 

// Setting default viewing as embedded javascript rather than html
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
	res.render("home",{data:data});
});

app.post("/",(req,res)=>{
    var newExpense = {name:req.body.name, cost:req.body.cost, category:req.body.category};
    data.push(newExpense);
    res.redirect("/");
});

app.post("/delete", (req,res)=>{
    var deleteID = parseInt(req.body.name);
    data.splice(deleteID , 1);
    res.redirect("/");
});

app.post("/sortbyname",(req,res)=>{
    data.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    res.redirect("/");
})

app.post("/sortbycost",(req,res)=>{
    data.sort(function(a, b){
        return a.cost-b.cost
    })
    res.redirect("/");
})

app.post("/sortbycategory",(req,res)=>{
    data.sort(function(a, b){
        var nameA=a.category.toLowerCase(), nameB=b.category.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
    })
    res.redirect("/");
})

app.listen(port,process.env.IP, ()=> console.log("Server is live now"));
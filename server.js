const express=require('express');
const app=express();
const hbs=require('hbs');
const fs=require('fs');

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log =`${now}: ${req.method},${req.url}`
  console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use(express.static(__dirname+'/public'));

// app.use((req,res,next)=>{
//   res.render('maintenence.hbs');
// });


// app.use(express.static(__dirname));

// app.get('/',(req,res)=>{
//   //res.send("helloo world");
//   res.send({
//     name:'sneha',
//     age:2
//   })
// });
app.get('/',(req,res)=>{
  //res.send("helloo world");
  res.render('home.hbs',{
    pageTitle :'welcome page',
    welcomeMsg:'hello this is home page'
  });

});

app.get('/about',(req,res)=>{
  //res.send("about page");
  res.render('about.hbs',{
    pageTitle :'about page',
  });
});


app.listen(3000,()=>{
  console.log("server started on port 3000");
});

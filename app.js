// const express= require('express');
// const bodyParser=require('body-parser');
// const request=require('request');
// const path = require('path');
// const https=require('https');

// const { json } = require('body-parser');
// const { url } = require('inspector');
// const { post } = require('request');
// const { response } = require('express');

// const app=express();

// const PORT=process.env.PORT || 4000;

// app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname,'public')));
// // app.get('/',function(req,res){
// //     res.sendFile(__dirname+"/signup.html");
// // });

// // app.post('/',function(req,res){

// //     const fname=req.body.fname;
// //     const lname=req.body.lname;
// //     const email=req.body.email;
// //     console.log(fname+" "+lname+" "+email);
// //   
// // const jsonData=JSON.stringify(data);
// // const url="https://us1.api.mailchimp.com/3.0/lists/"
// // const options={
// //     method: "POST",
// //     auth: "navneet:"
// // }
// // const request = https.request(url,options,function(response){
// //     response.on("data",function(data){
// //         console.log(JSON.parse(data));
// //     })
// // })

// // request.write(jsonData);
// // request.end();
// // })

// app.post('/signup',(req,res) => {
//   const{fname, lname, email} = req.body;

// // construct request data
//   const data={
//     members: [
//       {
//         email_address: email,
//         status: 'subscribed',
//         merge_feilds: {
//           FNAME: fname,
//           LNAME: lname,
//         }
//       }
//     ]
//   }

//   const postData=JSON.stringify(data);
//   const url="https://us1.api.mailchimp.com/3.0/lists/"
//   const options={
//       method: "POST",
//       auth: "navneet:"
//   }
//   const request = https.request(url,options,function(response){
//       response.on("data",function(data){
//           console.log(JSON.parse(data));
//       })
//   })
  
//   request.write(postData);
//   request.end();

//   // const options = {
//   //   url:'https://us1.api.mailchimp.com/3.0/lists/',
//   //   method: 'POST',
//   //   headers:{
//   //     Authorization:'auth '
//   //   },
//   //   body: postData

//   // }
//   // request(options, (err,response,body)=>{
//   //   if(err){
//   //     res.redirect('/faliure.html');
//   //   }else{
//   //     if(Response.statusCode===200){
//   //       res.redirect('/success.html');
//   //     }else{
//   //       res.redirect('/faliure.html');
//   //     }
//   //   }

//   // })
// })





// // });

// // apikey
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const { env } = require('process');

const app = express();
require('dotenv').config();

app.get('/',function(req,res){
      res.sendFile(__dirname+"/signup.html");
  });
// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/failure.html');
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var mykey = process.env.MY_API_TOKEN;
  var mykey2 = process.env.KEY_1;
  const postData = JSON.stringify(data);

  fetch('https://us1.api.mailchimp.com/3.0/lists/'+mykey2, {
    method: 'POST',
    headers: {
      Authorization: 'auth '+mykey
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/failure.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 4000;


app.listen(PORT, console.log(`Server started on ${PORT}`));

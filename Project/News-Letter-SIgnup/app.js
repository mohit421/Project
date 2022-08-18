// jshint esversion:6


// API key:- 20e9512221b28c07e0ac1262404f3ba3-us14

// audience id/list id :- 664d390487



const express = require("express");
// const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extented: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName, lastName, email);

  const data = {

    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
};

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/664d390487/members"

  const options = {

    method: "POST",
    auth: "Mohit:20e9512221b28c07e0ac1262404f3ba3-us14"

  };

  const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
    })

  });
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {

  console.log("Server started on port 3000");

});
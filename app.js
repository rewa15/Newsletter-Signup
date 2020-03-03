const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public")); // to include all the static files in our server like style.css, images etc which are static in our folders
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res)
{
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var mail=req.body.email;

    var data = {
        
        members: [
          {
          email_address: mail,
          status: "subscribed",
          merge_fields:
          {
          	 FNAME: firstName,
          	 LNAME: lastName
          }
          }

        ]
    }

    var jsonData=JSON.stringify(data);

    const url= "https://us19.api.mailchimp.com/3.0/lists/28114fad7d";

    const options =
    {
    	method: "POST",
    	auth: "rewa:985dc29d4e916e905a4a2333fa9f82a9-us19"
    }
    const request = https.request(url, options, function(response)    // https request used for sending request to external server mailchimp
    {
    	  if(response.statusCode === 200)
    	  {
    	  	 res.sendFile(__dirname+"/success.html");
    	  }

    	  else
    	  {
    	  	 res.sendFile(__dirname+"/failure.html");
    	  }

          response.on("data", function(data)
          {
          	console.log(JSON.parse(data));
          })
    })

    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000); // process.env.PORT is for 

//api key
//985dc29d4e916e905a4a2333fa9f82a9-us19

//audience id
//28114fad7d

//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}

// App deployed on Heroku Server: link
//https://tranquil-peak-60218.herokuapp.com/
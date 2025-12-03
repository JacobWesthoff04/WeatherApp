const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const PORT = 3010;
const User = require("./models/user");
const app = express();
const router = express.Router();

app.use(cors())
app.use("/api", router);
router.use(express.json());

//Used for Authenticator API, Checks if User exists in system.
router.post("/auth", async (req, res) => {
  console.log(req.body)
  let checkEmail = req.body._id
  let checkPass = req.body.password

  console.log("Checking if user exists")

  //Check if User exists
  try {
      const responded = await 
      User.findOne( { $and: [ 
        { _id: { $eq: checkEmail } }, 
        {password: { $eq: checkPass } } 
      ] } );

      console.log(responded)
      if (responded === null) {
          res.sendStatus(404)
      }
      else {
        //Updating Last Login Time:
        await User.findOneAndUpdate(
        { _id: { $eq: checkEmail } },
        { $set: { lastLogin: Date.now()} }
        )
        res.sendStatus(201)
      }
      
  } catch(err) {console.log(err)}
});

//Used for WeatherReturn API, gets and returns the weather JSON.
router.get("/weather", async (req, res) => {
console.log(req.query.zip)
let userZip = req.query.zip
let urlStart = "https://api.openweathermap.org/data/2.5/weather";
let APIkey = "76b4b33ef3305218819b6eb032521f1a";
let query = `zip=${userZip},US&units=imperial&appid`
let url = `${urlStart}?${query}=${APIkey}`
console.log(url)
let response = await fetch(url)
let results = await response.json();
res.send(results);
});

 //Port Listener with error Check
app.listen(PORT, (err)=>{
    if (err)
      console.log(`Server failed to start on port ${PORT}.`);
    else
      console.log(`Server started on port ${PORT}`);
});
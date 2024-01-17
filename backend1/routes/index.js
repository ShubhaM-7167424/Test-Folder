var express = require("express");
var router = express.Router();
const userModel = require("./users");

router.get("/", (req, res) => {
  res.render("index", {
    Home: "Ghar",
    Order: "Place Your Order",
    Doorstep: "Home",
  });
});

router.get("/error", (req, res) => {
  res.render("error", { Home: "Ghar", lost: "Bhatak gaya hu" });
});

router.get("/createusers", async (req, res) => {
  const userscreated = await userModel.create(
    {
      username: "Shubham831",
      name: "Shubham",
      age: 20,
    },
    {
      username: "Rahul482",
      name: "Rahul",
      age: 21,
    },
    {
      username: "Nivedita482",
      name: "Nivedita",
      age: 25,
    }
  );
  res.send("userscreated");
});

router.get("/findall", async (req, res) => {
  const allusers = await userModel.find({});
  res.send(allusers);
});

router.get("/findbyname", async (req, res) => {
  const singleuser = await userModel.find({ name: "Shubham" });
  res.send(singleuser);
});

router.get("/findbyage", async (req, res) => {
  const singleuser = await  userModel.find({age: 21})
  res.send(singleuser);
})

router.get('/findone', async (req, res)=> {
  const singleuser = await userModel.findOne({
    _id: "65a640d07b9792515b084fe5",
  });
  res.send(singleuser)
})

router.get('/deleteone', async (req, res)=>{
  const deleteduser = await userModel.findOneAndDelete({name: 'Nivedita'})
  res.send(deleteduser);
})

router.get('/createsession', (req, res)=>{
  req.session.ban = true;
  res.send('session created')
})

router.get('/readsession', (req, res)=>{
  console.log(req.session);
  res.send('read session')
})

router.get('/deletesession', (req, res)=>{
  req.session.destroy((err)=>{
    if(err) throw err ;
    res.send('session deleted')
  })
})

router.get('/createcookie', (req, res)=>{
  res.cookie('age', 25)
  res.cookie('name', 'Shubham')
  res.send('cookie created')
})

router.get('/readcookie', (req, res)=>{
  console.log(req.cookies.age);
  console.log(req.cookies.name);
  res.send('cookie read')
})

router.get('/deletecookie', (req, res)=>{
  res.clearCookie('age');
  res.clearCookie('name');
  res.send('cookie deleted')
})

module.exports = router;

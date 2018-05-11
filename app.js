var express 	= require("express"),
	nodemailer 	= require("nodemailer"),
	bodyParser 	= require("body-parser"),
	flash       = require("connect-flash"),
	session		= require("express-session"),
	app 		= express()

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set('trust proxy', 1); //Remove when site is live on HTTPS
app.use(session({
    secret: "woot",
    resave: false,
    saveUninitialized: false, 
    cookie: {secure: true}
}));
app.use(flash());
app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.get("/", function(req, res){
    res.render("portfolio");
});

// POST route from contact form
app.post("/contact", function (req, res) {
  let mailOpts, transporter;
  transporter = nodemailer.createTransport({
  	host: "smtp.gmail.com",
  	port: 465,
  	secure: "true",
    auth: {
        type: "OAuth2",
        clientId: clientId,
        clientSecret: clientSecret
    }
  });
  mailOpts = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: "nissacjg@gmail.com",
    subject: "New message from contact form at garethcassin.co.uk",
    text: "Name: " + req.body.name +". " + "\n" +
    "Email: " + req.body.email +". " + "\n" +
    "Number: " + req.body.number +". " + "\n" +
    "Message: " + req.body.message +".", 
    auth: {
		user: "nissacjg@gmail.com",
        refreshToken: refreshToken,
        accessToken: accessToken,
        expires: 1484314697598
    }
  };
  transporter.sendMail(mailOpts, function (error, response) {
    if (error) {
    	console.log(error);
    	res.render("portfolio", {error: "Sorry, there has been an error. Please contact directly via email."});
    }
    else {
      	// req.flash("success", "Thanks for getting in touch! I will respond as soon as I can.");
      	res.render("portfolio", {success: "Thanks for getting in touch! I will respond as soon as I can."});
    }
  });
});



// app.listen(5000, function(){
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("New Portfolio Server Started!");
});
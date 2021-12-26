const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); //Incoming request as json
app.use(express.urlencoded({ extended: true })); //Incoming request as String or Array
app.use(express.static("public"));

//MONGOOSE CONNECTION
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/social-network",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

mongoose.set("debug", true);

app.use(require("./routes"));
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

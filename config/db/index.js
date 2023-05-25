require("dotenv").config();
function connect() {
	try {
		const mongoose = require("mongoose");
		mongoose.connect(process.env.DB_CONNECTION).then(() => console.log("Success"));
	} catch (error) {
		console.log(error);
	}
}

module.exports = { connect };

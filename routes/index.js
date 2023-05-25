const authRouter = require("./auth");
const postRouter = require("./post");

function route(app) {
	app.use("/api/auth", authRouter);
	app.get("/api/", function (req, res) {
		res.send("Hello");
	});
	app.get("/favicon.ico", function (req, res) {
		res.status(204);
		res.end();
	});
	app.use("/api/posts", postRouter);
}

module.exports = route;

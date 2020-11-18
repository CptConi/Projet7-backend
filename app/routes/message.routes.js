module.exports = (app) => {
	const message = require("../controllers/message.controller.js");
	var router = require("express").Router();
	const auth = require("../middleware/auth.js");

	router.post("/", auth, message.create);

	// router.get("/:id", message.getmessage);

	router.get("/", auth, message.getMessages);

	router.get("/fromfirepit/:id", auth, message.getMessagesFromFirepit);

	app.use("/message", router);
};

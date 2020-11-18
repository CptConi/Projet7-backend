module.exports = (app) => {
	const thumbUp = require("../controllers/thumbup.controller.js");

	var router = require("express").Router();

	// router.get("/:id", thumbUp.getLikes);

	// router.post("/:id", thumbUp.setLikes);

	app.use("/thumbup", router);
};

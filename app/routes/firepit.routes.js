module.exports = (app) => {
	const firepit = require("../controllers/firepit.controller.js");
	const auth = require("../middleware/auth.js");

	var router = require("express").Router();

	router.post("/",auth, firepit.create);

	router.get("/:id",auth, firepit.getFirepit);

	router.get("/",auth, firepit.getAll);

	router.put("/:id",auth, firepit.update);

	router.delete("/:id",auth, firepit.delete);

	app.use("/firepit", router);
};

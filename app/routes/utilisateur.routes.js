module.exports = (app) => {
	const utilisateur = require("../controllers/utilisateur.controller");
	const auth = require("../middleware/auth.js");

	var router = require("express").Router();

	router.post("/signup", utilisateur.signUp);

	router.post("/login", utilisateur.logIn);

	// router.get("/:id", utilisateur.getUser);

	router.get("/", utilisateur.getUser);

	router.put("/:id", auth, utilisateur.update);

	router.delete("/:id", auth, utilisateur.delete);

	//Test create users route
	router.post("/create", utilisateur.createTestUser);

	app.use("/user", router);
};

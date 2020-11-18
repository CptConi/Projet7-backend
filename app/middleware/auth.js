const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, "0F63B0D55976EEDCD6ED195A53000F570A161762");
		const email = decodedToken.email;
		if (req.body.email && req.body.email !== email) {
			throw "Utilisateur non valable > Mauvaise adresse email";
		} else {
			// Utilisateur authentifié, on peut lancer la suite des middleware
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée" });
	}
};

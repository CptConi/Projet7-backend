const db = require("../models");
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign up
exports.signUp = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = {
				email: req.body.email,
				password: hash,
			};
			Utilisateur.create(user)
				.then(() =>
					res.status(201).json({
						message: "Utilisateur créé !",
						email: user.email,
					})
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Log in
exports.logIn = (req, res) => {
	Utilisateur.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						email: user.email,
						id: user.id,
						prenom: user.prenom,
						nom: user.nom,
						poste: user.poste,
						token: jwt.sign({ email: user.email }, "0F63B0D55976EEDCD6ED195A53000F570A161762", {
							expiresIn: "12h",
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Get User informations
exports.getUser = (req, res) => {
	Utilisateur.findOne({ where: { token: req.body.token } })
		.then((data) => res.send(data))
		.catch((err) => {
			err.message || "Error while retrieving user with id= " + token;
		});
};

// Get User list
exports.getUsers = (req, res) => {
	Utilisateur.findAll()
		.then((data) => res.send(data))
		.catch((err) => {
			err.message || "Error while retrieving users list from Database";
		});
};

// Update User informations / profile
exports.update = (req, res) => {
	Utilisateur.update(req.body, { where: { id: req.params.id } })
		.then((code) => {
			if (code == 1) {
				res.send({
					message: "User was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update User with email=${email}. Maybe User was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating User with email=" + email + "|| Error:" + err,
			});
		});
};

// Delete User
exports.delete = (req, res) => {
	Utilisateur.destroy({ where: { id: req.params.id } })
		.then((code) => {
			if (code == 1) {
				res.send({
					message: "User was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete User with id=${id}. Maybe User was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete User with id=" + id + " || Error:" + err,
			});
		});
};


//TEST method:

exports.createTestUser = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const randomUser = {
				email: req.body.email,
				password: hash,
				prenom: req.body.prenom,
				nom: req.body.nom,
				poste: req.body.poste,
			};
			Utilisateur.create(randomUser)
				.then(() =>
					res.status(201).json({
						message: "Utilisateur créé :" + req.body.email,
					})
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

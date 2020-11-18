const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;

// create a Message
exports.create = (req, res) => {
	// Validate request
	if (!req.body.content) {
		res.status(400).send({
			message: "Request content must not be empty",
		});
		return;
	}
	// Create a Message
	const message = {
		content: req.body.content,
		firepitId: req.body.firepitId,
		utilisateurId: req.body.utilisateurId,
	};
	// Save Message in the database
	Message.create(message)
		.then((data) => {
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Message.",
			});
		});
};

// Get Messages list
exports.getMessages = (req, res) => {
	Message.findAll({
		include: ["utilisateur", "firepit"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Message.",
			});
		});
};

// Get Messages list from specified firepit
exports.getMessagesFromFirepit = (req, res) => {
	const id = req.params.id;
	Message.findAll({
		where: { firepitId: id },
		include: ["utilisateur"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Message.",
			});
		});
};

// Get Messagefrom id
exports.getMessage = (req, res) => {};

// ----------------------After this line, function may not be implemented
// // Update Message
// exports.update = (req, res) => {};

// // Delete Message
// exports.delete = (req, res) => {};

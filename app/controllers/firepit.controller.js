const db = require("../models");
const Firepit = db.firepit;
const Op = db.Sequelize.Op;

// Create new Firepit
exports.create = (req, res) => {
	// Validate request
	if (!req.body.sujet) {
		res.status(400).send({
			message: "Request content must not be empty",
		});
		return;
	}
	// Create a Firepit
	const firepit = {
		sujet: req.body.sujet,
		portee: req.body.portee,
		utilisateurId: req.body.utilisateurId,
	};
	// Save Firepit in the database
	Firepit.create(firepit)
		.then((data) => {
			res.status(201).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Tutorial.",
			});
		});
};

// Get Firepit from id
exports.getFirepit = (req, res) => {
	const id = req.params.id;

	Firepit.findByPk(id, { include: ["utilisateur"] })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err + " Error retrieving Firepit with id=" + id,
			});
		});
};

// Get entire Firepit List:
exports.getAll = (req, res) => {
	Firepit.findAll({ include: ["message","utilisateur"] })
		.then((data) => res.send(data))
		.catch((err) => {
			err.message || "Error while retrieving Firepit list from Database";
		});
};

// Update Firepit informations: sujet, portee
exports.update = (req, res) => {
	const id = req.params.id;

	Firepit.update(req.body, {
		where: { firepitId: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Firepit was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Firepit with id=${id}. Maybe Firepit was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Firepit with id=" + id,
			});
		});
};

// Delete existing Firepit
exports.delete = (req, res) => {
	const id = req.params.id;

	Firepit.destroy({
		where: { firepitId: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Firepit was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Firepit with id=${id}. Maybe Firepit was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Firepit with id=" + id,
			});
		});
};

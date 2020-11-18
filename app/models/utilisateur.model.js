module.exports = (sequelize, Sequelize) => {
	const Utilisateur = sequelize.define(
		"utilisateur",
		{
			//-----------------------------------
			// PK
			// utilisateurId: {
			// 	type: Sequelize.INTEGER,
			// 	primaryKey: true,
			// 	autoIncrement: true,
			// },
			//-----------------------------------
			// Standard Cols
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			prenom: {
				type: Sequelize.STRING,
			},
			nom: {
				type: Sequelize.STRING,
			},
			poste: {
				type: Sequelize.STRING,
			},
			isAdmin: {
				type: Sequelize.BOOLEAN,
			},
			//-----------------------------------
			// FK
			//-----------------------------------
		},
		{
			freezeTableName: true,
		}
	);

	return Utilisateur;
};

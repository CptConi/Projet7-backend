module.exports = (sequelize, Sequelize) => {
	const ThumbUp = sequelize.define(
		"thumbup",
		{
			//-----------------------------------
			//PK
			messageId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				// references: {
				// 	model: Message,
				// 	key: "message_id",
				// },
			},
			//-----------------------------------
			// Standard Cols

			//-----------------------------------
			// FK
			// user_id: {
			// 	type: Sequelize.INTEGER,
			// 	references: {
			// 		model: Utilisateur,
			// 		key: "id",
			// 	},
			// },

			//-----------------------------------
		},
		{
			freezeTableName: true,
		}
	);

	return ThumbUp;
};

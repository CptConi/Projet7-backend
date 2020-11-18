module.exports = {
	HOST: "localhost",
	USER: "Groupomania_db",
	PASSWORD: "PasswordGroupomania7",
	DB: "Groupomania_firepits",
	dialect: "postgres",
	pool: {
		max: 50,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

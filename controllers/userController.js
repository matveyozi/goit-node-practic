const uuid = require('uuid').v4;
const fs = require('fs').promises;

exports.createUser = async (req, res) => {

	try {
		const { name, year } = req.body;

		//	:TODO validation

		// create new User object
		const newUser = {
			name,
			year,
			id: uuid(),
		}

		// save user data to DB (TEMPORARY SOLUTION!!)
		const usersDB = await fs.readFile('./modals.json');

		const users = JSON.parse(usersDB);

		users.push(newUser);

		await fs.writeFile('./modals.json', JSON.stringify(users));

		// send response to the frontend
		res.status(201).json({
			msg: 'User created',
			user: newUser
		})
	} catch (error) {
		console.log(error);

		res.sendStatus(500);
	}
}


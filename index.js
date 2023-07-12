const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const fs = require('fs').promises;
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const envPath = process.env.NODE_ENV === 'production' ? './enviroments/production.env' : './enviroments/development.env'
dotenv.config({ path: envPath });
const userController = require('./controllers/userController');

const userRoutes = require('./routes/userRoutes')

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARE
app.use(express.json());
app.use(cors())
// example
/**
 * custom general midleware to sign time string to req object
 */
app.use(async (req, res, next) => {
	req.time = new Date().toLocaleString('uk-UA');
	next();
});

/**
 * Custom midldleware to find user by id
 */

app.use('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const users = await JSON.parse(await fs.readFile('modals.json'));

		const user = users.find(item => item.id === id);
		if (!user) {
			return res.status(404).json({
				msg: 'User does not exist...'
			});
		}

		req.user = user;

		next();
	} catch (error) {
		console.log(error);

		res.sendStatus(500);
	}
});

/**
 * CRUD - create read update delete
 * 
 * HTTP methods
 * GET
 * POST
 * PUT
 * PUTCH
 * DELETE
 * 
 * REST API ==================================
 * POST			/users			- create user
 * GET			/users			- get all users
 * GET			/users/<userID> - get one user by id
 * PUT/PATCH 	/users/<userID> - update user by id
 * DELETE		/users/<userID> - delete user by id
 */

// ROUTES ===========================

app.use('/users', )



app.get('/ping', (request, response) => {

	// response.status(404).send('<h1>HELLO EXPRESS SERVER</h1>');

	// throw new Error('Bad bad error!!');

	response.status(200).json({
		msg: 'pong!',
	});
});

/**
 * Not found request handler
 */
app.all('*', (req, res) => {
	res.status(404).json({
		msg: 'Ooops! Resourse not found...'
	})
});

/**
 * Global error handler. Four arguments REQUIRED!!!
 */
app.use((err, req, res, next) => {
	res.status(500).json({
		msg: err.message
	});
});

// SERVER INIT
const port = process.env.PORT || 3000;


app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});

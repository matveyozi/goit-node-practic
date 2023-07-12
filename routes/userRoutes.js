const { Router } = require('express');

const router = Router();

router.post('/', userController.createUser);

/**
 * Get users list 
 */
router.get('/', async (req, res) => {
	try {
		const users = await JSON.parse(await fs.readFile('modals.json'));

		res.status(200).json({
			msg: 'Success',
			users
		})
	} catch (error) {
		console.log(error);

		res.sendStatus(500);
	}
})

/**
 * Get user by id
 */
router.get('/:id', async (req, res) => {
	try {
		const { user } = req;
		res.status(200).json({
			msg: 'Success',
			user
		})
	} catch (error) {
		console.log(error);

		res.sendStatus(500);
	}

})

/**
 * Update user by id
 */
router.patch('/user/:id', async (req, res) => {
	const { user } = req;
	const { name, year } = req.body;
	// update user data
	// get all users from db
	// overwrite user with new data
	res.status(200).json({
		msg: 'Success',
		// user:updatedUser
	})
})
/**
 * DELETE user by id
 */
router.delete('/user/:id', async (req, res) => {
	const { user } = req;
	// update user data
	// get all users from db
	// delete user by id
	res.sendStatus(204);
	// res.status(200).json({
	// 	msg: 'Success'
	// })
})



router.get('/ping', (request, response) => {

	// response.status(404).send('<h1>HELLO EXPRESS SERVER</h1>');

	// throw new Error('Bad bad error!!');

	response.status(200).json({
		msg: 'pong!',
	});
});

/**
 * Not found request handler
 */
router.all('*', (req, res) => {
	res.status(404).json({
		msg: 'Ooops! Resourse not found...'
	})
});


module.exports = router;
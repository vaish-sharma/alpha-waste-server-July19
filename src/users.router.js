const usersRouter = require('express').Router();
const usersController = require('./users.controller');
const ordersController = require('./orders.controller');
const bodyParser = require('body-parser');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
	destination: '/public/alpha-waste/',
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '.txt');
	},
}); //multer.memoryStorage();
const upload = multer({ storage });

usersRouter.use(bodyParser.json());

usersRouter.route('/').get(usersController.getUser);

usersRouter.route('/:userId').get(usersController.getUserById);

usersRouter
	.route('/:userId/address')
	.get(usersController.getAddresses)
	.post(usersController.createAddress)
	.delete(usersController.deleteAddresses);

usersRouter
	.route('/:userId/address/:addressId')
	.get(usersController.getAddressById)
	.put(usersController.updateAddressbyId)
	.delete(usersController.deleteAddressById);

usersRouter.route('/:userId/orders').get(ordersController.getOrdersByUser);

usersRouter
	.route('/:userId/reportIssue')
	.post(upload.single('file'), usersController.reportIssue);

module.exports = usersRouter;

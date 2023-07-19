var { City, Country } = require('country-state-city');
const Config = require('./shared/config');
var PaymentRequest = require('../models/paymentRequest');

function getCitiesOfCountry(req, res, next) {
	var countries = Config.SERVICEABLE_CITIES.filter(
		(obj) => obj.country === req.params.country,
	);
	console.log('countries', countries);
	var cityNames = countries.map((el) => el.cities).flat();
	if (cityNames) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		console.log('res cityNames', cityNames);
		res.json(cityNames);
	} else {
		City.getCitiesOfCountry('IN')
			.then((cities) => {
				var cityNames = cities.map((city) => city.name);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				console.log('res cityNames', cityNames);
				res.json(cityNames);
			})
			.catch((err) => {
				console.log(err);
				let error = new Error(err);
				error.status = 500;
				next(error);
			});
	}
}

function getCountries(req, res, next) {
	var countryNames = Config.SERVICEABLE_COUNTRIES;
	console.log('country names', countryNames);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	console.log('res countryNames', countryNames);
	res.json(countryNames);
}

function addPaymentRequest(req, res, next) {
	console.log('inside add Payment Request');
	if (req.session.agentId) {
		PaymentRequest.create(req.body)
			.then((payRequest) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(payRequest);
			})
			.catch((err) => {
				console.log('addPaymentRequest', err);
				let error = new Error(err);
				error.status = 500;
				next(error);
			});
	} else {
		var err = new Error('You are not authenticated!');
		err.status = 403;
		next(err);
	}
}

module.exports = {
	getCitiesOfCountry,
	getCountries,
	addPaymentRequest,
};

module.exports.BASE_URL = 'https://udi8pw.sse.codesandbox.io/';
module.exports.ORDER_LEAD_TIME = 0;
module.exports.SERVICEABLE_COUNTRIES = ['India'];
module.exports.SERVICEABLE_CITIES = [
	{
		country: 'India',
		cities: ['Guwahati'],
	},
];

//Feature flags
module.exports.GEOCODE_FOR_ORDERS_ALLOCATION = false;

//PASSWORD
module.exports.PASSWORD_RESET_TOKEN_EXPIRY = 10 * 60 * 1000;

//PAYMENT GATEWAY DATA
module.exports.WHITELISTED_IPS_FOR_TXN_CALLBACK = [];
module.exports.API_KEY_FOR_TXN_CALLBACK = '';

module.exports.PASSWORD_RGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

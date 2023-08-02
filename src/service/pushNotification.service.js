var admin = require("firebase-admin");

var serviceAccount = require("../shared/resources/alphawasteagent-firebase-adminsdk-n0154-8d6ad624ed.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function sendPushNotification(deviceToken, msg) {
    const message = {
        "token": deviceToken,
        "notification": {
            "title": msg?.title,
            "body": msg?.body
        },
        data: {
            "title": msg?.title,
            "message": msg?.body
        }
    };
    console.log('message', message);
    return admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            return Promise.reject(error);
        });

}

module.exports = {
    sendPushNotification
}
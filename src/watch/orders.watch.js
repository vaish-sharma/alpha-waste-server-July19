const mongoose = require('mongoose');
const Order = require('./../../models/order');
const User = require('./../../models/user');
const { Agent } = require('./../../models/agent');
const { sendPushNotification } = require('./../service/pushNotification.service');
const connection = mongoose.connection;

const ordersWatch = () => {
    if (connection) {
        connection.once("open", () => {
            console.log('== watch == DB connected');
            const orderCollection = connection.collection('orders');
            const changeStream = orderCollection.watch();

            changeStream.on("change", (change) => {
                console.log('change in orders', change);
                if (change.ns.coll === 'orders') {
                    const update = change.updateDescription.updatedFields?.status;
                    if (update === "COMPLETED") {
                        const docId = change.documentKey._id;
                        //get user token for this docId
                        Order.findById(docId)
                            .then((order) => {
                                if (order) {
                                    let userId = order.user;
                                    let agentId = order.agent;

                                    User.User.findById(userId)
                                        .then((user) => {
                                            if (user) {
                                                const userDeviceToken = user.pushToken;
                                                //trigger notification
                                                const msg = {
                                                    title: 'Payment completed',
                                                    body: 'Payment for orderId #' + docId + ' completed'
                                                }
                                                sendPushNotification(userDeviceToken, msg)
                                                    .then((res) => {
                                                        console.log('notification sent', res);
                                                    })
                                                    .catch((err) => {
                                                        console.log('failed to send notification', err);
                                                    });
                                            }
                                        })
                                        .catch((err) => {
                                            console.log('unable to fetch user by id', userId, '. Got error ', err);
                                        })

                                    Agent.findById(agentId)
                                        .then((agent) => {
                                            if (agent) {
                                                const agentDeviceToken = agent.pushToken;
                                                //trigger notification
                                                const msg = {
                                                    title: 'Payment completed',
                                                    body: 'Payment for orderId #' + docId + ' completed'
                                                }
                                                sendPushNotification(agentDeviceToken, msg)
                                                    .then((res) => {
                                                        console.log('notification sent', res);
                                                    })
                                                    .catch((err) => {
                                                        console.log('failed to send notification', err);
                                                    });
                                            }
                                        })
                                        .catch((err) => {
                                            console.log('unable to fetch agent by id', agentId, '. Got error ', err);
                                        })
                                }
                            })

                        //get agent token for this docId
                    }
                }
                else {
                    console.log('event for NOT orders collection', change.operationDescription.ns.coll);
                }
            })

            changeStream.on("error", (err) => {
                console.log('error event', err);
            })
        })
    }
    else {
        console.log('DB not connected');
    }
}

module.exports = {
    ordersWatch
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.onNewUserCreate = functions.auth.user().onCreate((user, context) => {
    const usersRef = admin.database().ref('users');
    let role = 'user';
    //console.log(user);
    return usersRef.once('value', function (snapshot) {
        if (snapshot.numChildren() === 0) {
            role = 'admin';
        }
    }).then(() => {
        usersRef.child(user.uid).set({
            email: user.email,
            role: role
        }).catch(error => {
            console.log(error);
        });
    });
});
//# sourceMappingURL=index.js.map
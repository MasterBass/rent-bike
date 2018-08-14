import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();


export const onNewUserCreate = functions.auth.user().onCreate((user, context) => {
    const usersRef = admin.database().ref('users');
    let role = 'user';
    //console.log(user);

    return usersRef.once('value', function(snapshot) {
        if(snapshot.numChildren() === 0) {
            role = 'admin';
        }
    }).then(() => {
        usersRef.child(user.uid).set({
            email: user.email,
            name: user.displayName,
            role: role,
            isActive: true
        }).catch(error => {
            console.log(error);
        });
    })
});
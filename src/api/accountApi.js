import {auth, database} from './database';

class AccountApi {

    static login(account) {
        return auth.signInWithEmailAndPassword(account.email, account.password);
    }

    static logOut() {
        return auth.signOut();
    }

    static currentUser() {
        return auth.currentUser;
    }

    static getUserData(uid) {
        return database.ref('/users/' + uid + '/').once('value');
    }

    static getAllUsersData() {
        return database.ref('/users/').once('value');
    }


    static register(user) {
        user = Object.assign({}, user); // to avoid manipulating object passed in.
        return auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    static saveUser(user, userId) {

        return database.ref('/users/' + userId).update(user);
    }

}

export default AccountApi;

import {database, storage} from './database';

class BikeApi {

    static getAllBikes() {
        return database.ref('/bikes/').once('value');
    }

    static saveBike(bike, id) {
        if(id) {
            return database.ref('/bikes/' + id).update(bike);
        } else {
            return database.ref('/bikes/').push(bike);
        }
    }

    static uploadFile(file, fileName, progress, error, complete) {
        return storage.ref('bikes/' + fileName)
            .put(file).on('state_changed', progress, error, complete);
    }

    static getFileUrl(fileName) {
        return storage.ref('bikes/' + fileName).getDownloadURL();
    }

    static getNewKey() {
        return database.ref('apps').push();
    }
}

export default BikeApi;

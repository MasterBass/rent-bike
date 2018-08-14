import {database} from './database';

class ColorApi {

    static getAllColors() {
        return database.ref('/colors/').once('value');
    }

    static saveColor(color) {
        return database.ref('/colors/').push(color);
    }

    static deleteColor(colorId) {
        return database.ref('/colors/' + colorId).remove();
    }
}

export default ColorApi;

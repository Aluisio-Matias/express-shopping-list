//fake DB with items from the sopping list
const items = require('./fakeDb');

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        items.push(this);
    }

    static findAll() {
        return items;
    }

    //Find & return item with matching name.
    static find(name) {
        const foundItem = items.find(i => i.name === name);
        if (foundItem === undefined) {
            throw {
                message: "Item not found",
                status: 404
            }
        }
        return foundItem;
    }

    //Update the found item with matching name to the data.
    static update(name, data) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw {
                message: "Item not found",
                status: 404
            }
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    //Remove the item with the matching id
    static remove(name) {
        let foundIndex = items.findIndex(i => i.name === name);
        if (foundIndex === -1) {
            throw {
                message: "Item not found",
                status: 404
            }
        }
        items.splice(foundIndex, 1);
    }

};

module.exports = Item;
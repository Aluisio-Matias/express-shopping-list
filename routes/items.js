const Item = require("../helpers");
const express = require('express');
const router = express.Router();

//Get the items from the list
router.get('/', (req, res, next) => {
    try {
        return res.json({
            items: Item.findAll()
        });
    } catch (err) {
        return next(err)
    }
});

//Create a new item and add to the list
router.post('/', (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({
            item: newItem
        });
    } catch (err) {
        return next(err);
    }
});

//Get an item from the list by name
router.get('/:name', (req, res, next) => {
    try {
        let foundItem = Item.find(req.params.name);
        return res.json({
            item: foundItem
        });
    } catch (err) {
        return next(err);
    }
});

//Edit an item from the list
router.patch('/:name', (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({
            item: foundItem
        });
    } catch (err) {
        return next(err);
    }
});

//Delete an item from the list
router.delete('/name:', (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({
            message: "Item deleted"
        })
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
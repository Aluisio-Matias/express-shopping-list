process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
let item = {
    name: "cookie",
    price: 10.99
}

beforeEach(async () => {
    items.push(item);
});

afterEach(async () => {
    items = [];
});

describe("GET /items", () => {
    test("Get the list of all items in the array", async () => {
        const res = await request(app).get(`/items`);
        const {
            items
        } = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe("GET /items/:name", () => {
    test("Get a single item (by name) from the array", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });
    test("Respond with 404 if can't find the item", async () => {
        const res = await request(app).get(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", () => {
    test("Create a new item and add to array", async () => {
        const res = await request(app)
            .post(`/items`)
            .send({
                name: "Burger",
                price: 14.99
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("Burger");
        expect(res.body.item.price).toEqual(14.99);
    });
});

describe("PATCH /items/:name", () => {
    test("Update a single item from the array", async () => {
        const res = await request(app)
            .patch(`/items/${item.name}`)
            .send({
                name: "Updated"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual({
            name: "Updated"
        });
    });
    test("Respond with 404 if can't find the item", async () => {
        const res = await request(app).patch(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("Delete an item (by name) from the array", async () => {
        const res = await request(app)
            .delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: "Deleted"
        });
    });
});
import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product API", () => {
    beforeEach(async () => {
        console.log("beforeAll")
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        console.log("afterAll")
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = 
            await request(app)
                .post("/product")
                .send({
                    name: "Product 1",
                    price: 10
                  });
            
                expect(response.status).toBe(200);
                expect(response.body.name).toBe("Product 1");
                expect(response.body.price).toBe(10);
    });

    it("should update a product", async () => {
        const response = 
            await request(app)
                .post("/product")
                .send({
                    name: "Product 1",
                    price: 10
                  });
            
                expect(response.status).toBe(200);
                expect(response.body.name).toBe("Product 1");
                expect(response.body.price).toBe(10);

        const updatedData = {
            id: response.body.id,
            name: "Product 1 Updated",
            price: 20
        }
        const responseUpdate = 
            await request(app)
                .put("/product")
                .send({
                    id: updatedData.id,
                    name: updatedData.name,
                    price: updatedData.price
                });
            
            expect(responseUpdate.status).toBe(200);
            expect(responseUpdate.body.id).toBe(updatedData.id);
            expect(responseUpdate.body.name).toBe(updatedData.name);
            expect(responseUpdate.body.price).toBe(updatedData.price);        
    });

    it("should find a product", async () => {
        const createProduct = {
            name: "Product 1",
            price: 10
        }
        const response = 
            await request(app)
                .post("/product")
                .send({
                    name: createProduct.name,
                    price: createProduct.price
                  });
            
                expect(response.status).toBe(200);
                expect(response.body.name).toBe(createProduct.name);
                expect(response.body.price).toBe(createProduct.price);

    
        const output = 
            await request(app)
                .get(`/product/${response.body.id}`)
                .send({
                });
            
            expect(output.status).toBe(200);
            expect(output.body.id).toBe(response.body.id);
            expect(output.body.name).toBe(createProduct.name);
            expect(output.body.price).toBe(createProduct.price);        
    });

    it("should list a product", async () => {
        const createProduct1 = {
            name: "Product 1",
            price: 10
        }

        const createProduct2 = {
            name: "Product 2",
            price: 20
        }

        const response1 = 
            await request(app)
                .post("/product")
                .send({
                    name: createProduct1.name,
                    price: createProduct1.price
                  });
            
                expect(response1.status).toBe(200);
                expect(response1.body.name).toBe(createProduct1.name);
                expect(response1.body.price).toBe(createProduct1.price);
        const response2 = 
            await request(app)
                .post("/product")
                .send({
                    name: createProduct2.name,
                    price: createProduct2.price
                  });
            
                expect(response2.status).toBe(200);
                expect(response2.body.name).toBe(createProduct2.name);
                expect(response2.body.price).toBe(createProduct2.price);        

    
        const output = 
            await request(app)
                .get(`/product/`)
                .send({
                });
            
        expect(output.body.products.length).toBe(2)
        expect(output.body.products[0].name).toEqual(createProduct1.name)
        expect(output.body.products[0].price).toEqual(createProduct1.price)
        expect(output.body.products[1].name).toEqual(createProduct2.name)
        expect(output.body.products[1].price).toEqual(createProduct2.price)

    });

    // it("should not create a customer", async () => {
    //     const response = 
    //         await request(app)
    //             .post("/customer")
    //             .send({
    //                 name: "John"
    //               });
            
    //     expect(response.status).toBe(500);
    // });

    // it("should list all customer", async () => {
    //     const response1 = await request(app)
    //             .post("/customer")
    //             .send({
    //                 name: "John",
    //                 address: {
    //                   street: "Street",
    //                   city: "City",
    //                   number: 123,
    //                   zip: "12345",
    //                 },
    //               });
    //     expect(response1.status).toBe(200);
                  
    //     const response2 = await request(app)
    //         .post("/customer")
    //         .send({
    //             name: "Jane",
    //             address: {
    //             street: "Street 2",
    //             city: "City 2",
    //             number: 1234,
    //             zip: "12344",
    //             },
    //         });

    //     expect(response2.status).toBe(200);

    //     const listResponse = await request(app).get("/customer").send();

    //     expect(listResponse.status).toBe(200);
    //     expect(listResponse.body.customers.length).toBe(2);
    //     const customer = listResponse.body.customers[0];
    //     expect(customer.name).toBe("John");
    //     expect(customer.address.street).toBe("Street");
    //     const customer2 = listResponse.body.customers[1];
    //     expect(customer2.name).toBe("Jane");
    //     expect(customer2.address.street).toBe("Street 2");

    //     const listResponseXML = await request(app)
    //     .get("/customer")
    //     .set("Accept", "application/xml")
    //     .send();

    //     expect(listResponseXML.status).toBe(200);
    //     expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    //     expect(listResponseXML.text).toContain(`<customers>`);
    //     expect(listResponseXML.text).toContain(`<customer>`);
    //     expect(listResponseXML.text).toContain(`<name>John</name>`);
    //     expect(listResponseXML.text).toContain(`<address>`);
    //     expect(listResponseXML.text).toContain(`<street>Street</street>`);
    //     expect(listResponseXML.text).toContain(`<city>City</city>`);
    //     expect(listResponseXML.text).toContain(`<number>123</number>`);
    //     expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
    //     expect(listResponseXML.text).toContain(`</address>`);
    //     expect(listResponseXML.text).toContain(`</customer>`);
    //     expect(listResponseXML.text).toContain(`<name>Jane</name>`);
    //     expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
    //     expect(listResponseXML.text).toContain(`</customers>`);
    // });
    
});
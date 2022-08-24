const Employee = require('../lib/Employee');

describe('Employee', () => {
    describe('constructor', () => {
        it("should return an array with the values given", () => {
            const name = "Stephen";
            const email = "a@b.c";
            const id = "79513";
            const result = new Employee(name, id, email);
            expect(result).toEqual({"email": "a@b.c", "id": "79513", "name": "Stephen"})
        })
    })
    describe("getName", () => {
        it("should return a value with the given name", () => {
            const givenName = "Bill";
            const result = new Employee(givenName);
            expect(result).toEqual({"email": undefined, "id": undefined, "name": "Bill"});
        })
    })
    describe("getId", () => {
        it("should return a value with the given name", () => {
            const givenId = "Bill";
            const result = new Employee(givenId);
            console.log(result);
            expect(result).toEqual({"email": undefined, "id": undefined, "givenId": "Bill"});
        })
    })
});
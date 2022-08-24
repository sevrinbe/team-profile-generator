const Manager = require('../lib/Manager');

describe('Manager', () => {
    describe('constructor', () => {
        it("should return an array with the values given", () => {
            const name = "Stephen";
            const email = "a@b.c";
            const title = "Manager"; 
            const id = "79513";
            const officeNumber = "555-555-5555";
            const result = new Manager(name, id, email, officeNumber);
            console.log(result);
            expect(result).toEqual({"email": "a@b.c", "id": "79513", "name": "Stephen", "officeNumber": "555-555-5555"})
        })
    });
});
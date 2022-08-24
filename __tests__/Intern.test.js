const Intern = require('../lib/Intern');

describe('Intern', () => {
    describe('constructor', () => {
        it("should return an array with the values given", () => {
            const name = "Stephen";
            const email = "a@b.c";
            const title = "Intern"; 
            const id = "79513";
            const school = "UCM";
            const result = new Intern(name, id, email, school);
            console.log(result);
            expect(result).toEqual({"email": "a@b.c", "id": "79513", "name": "Stephen", "school": "UCM"})
        })
    });
});
const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    describe('constructor', () => {
        it("should return an array with the values given", () => {
            const name = "Stephen";
            const email = "a@b.c";
            const title = "Engineer"; 
            const id = "79513";
            const github = "githubUserName";
            const result = new Engineer(name, id, email, github);
            console.log(result);
            expect(result).toEqual({"email": "a@b.c", "id": "79513", "name": "Stephen", "github": "githubUserName"})
        })
    });
});
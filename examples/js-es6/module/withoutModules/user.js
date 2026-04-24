// user.js
class User {
    constructor(firstName, lastName, university = "Unistra", city = "Strasbourg") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.university = university;
        this.city = city;
    }

    displayUser() {
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`University: ${this.university}, City: ${this.city}`);
    }

    createLogin() {
        return `${this.firstName[0]}${this.lastName}`.toLowerCase().slice(0, 9);
    }
}

// teacher.js
 
class Teacher extends User {
    constructor(firstName, lastName, university, city, subject) {
        super(firstName, lastName, university, city);
        this.status = "Teacher";
        this.subject = subject;
    }

    displayUser() {
        super.displayUser(); // Call the parent method
        console.log(`Status: ${this.status}, Subject: ${this.subject}`);
    }
}


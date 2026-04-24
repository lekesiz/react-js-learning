// student.js
class Student extends User {
    constructor(firstName, lastName, university, city, speciality) {
        super(firstName, lastName, university, city);
        this.status = "Student";
        this.speciality = speciality;
    }

    displayUser() {
        super.displayUser();
        console.log(`Status: ${this.status}, Speciality: ${this.speciality}`);
    }
}
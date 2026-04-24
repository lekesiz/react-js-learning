// index.js
import { User }  from './user.js';
import { Teacher }  from './teacher.js';
import  { Student }  from './student.js';

// Instances
const user1 = new User("Eric", "Christoffel", "Unistra");
const teacher1 = new Teacher("Eric", "Christoffel", "Unistra", "Strasbourg", "Javascript");
const student1 = new Student("Jules", "Féret", "Unistra", "Strasbourg", "Computer Science");

// Afficher les informations
user1.displayUser();
teacher1.displayUser();
student1.displayUser();

// Afficher les logins
console.log("User login:", user1.createLogin());
console.log("Teacher login:", teacher1.createLogin());
console.log("Student login:", student1.createLogin());

function greeter(person) {
    return "hello" + person.firstName + "," + person.lastName;
}
var Student = /** @class */ (function () {
    function Student(firstName, middleInital, lastName) {
        this.firstName = firstName;
        this.middleInital = middleInital;
        this.lastName = lastName;
        this.fullName = firstName + "" + middleInital + "" + lastName;
    }
    return Student;
}());
var student = new Student("Yang", ".", "Adrian");
var re = greeter(student);
console.log(re);

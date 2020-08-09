interface Person{
    firstName : string;
    lastName : string;
}

function greeter(person:Person){
    return "hello" + person.firstName + "," + person.lastName;
}

class Student{
    fullName : string;
    constructor(public firstName,public middleInital,public lastName){
        this.fullName = firstName + "" + middleInital + "" + lastName;
    }
}

let student = new Student("Yang",".","Adrian");

let re = greeter(student);

console.log(re);


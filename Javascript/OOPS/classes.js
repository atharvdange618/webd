//class
class Person {
    //constructor
    constructor(name) {
        this.name = name
    }

    //method
    hello() {
        return `Hello I'm ${this.name}.`
    }

    //static method
    static greeting() {
        return 'Hello world'
    }
}

//we can call methods on classes also by declaring them static
console.log(Person.greeting())

//inheritance
class Programmer extends Person {
    hello() {
        //use super to override parent method
        return super.hello() + ' I am also a Programmer'
    }
}

//create a Object
const atharv = new Programmer("Atharv")

//call the method
console.log(atharv.hello())
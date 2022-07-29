class Role {
    constructor(title, salary, depName){
        this.title = title;
        this.salary = salary;
        this.depName = depName;
    }
    getTitle(){
        return this.title;
    }
    getSalary(){
        return this.salary;
    }
    getDepName(){
        return this.depName;
    }
}

module.exports = Role
class Employee {
    constructor(first, last, role, manager){
        this.first = first;
        this.last = last;
        this.role = role;
        this.manager = manager;
    }
    getFrist(){
        return this.first;
    }
    getLast(){
        return this.last;
    }
    getRole(){
        return this.role;
    }
    getManager(){
        return this.manager;
    }
}

module.exports = Employee
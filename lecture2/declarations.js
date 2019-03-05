// TODO in REPL

let something = {
    name: "Austin",
    output: function() {
        console.log(this.name);
    }
};

something(); // fails

something.output(); // works

something.output; // returns the function itself

const somethingElse = {
    name: "Austin",
    output: function() { 
        console.log(name); // ! can't find name
    }
};

somethingElse.output(); // undefined

const somethingElseAgain = {
    name: "Austin",
    output: function() {
        console.log(somethingElseAgain.name)
    }
}

somethingElseAgain.output(); // Austin
// undefined


let some = something.output();
some();

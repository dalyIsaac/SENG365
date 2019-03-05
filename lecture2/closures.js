function outerFunction(base) {
    let base_number = base;
    console.log("The base number is: " + base_number);
    function innerFunction(delta) {
        base_number += delta;
        console.log("The new base number is " + base_number);
    }
    return innerFunction;
}

outerFunction(1)(5); // this works

let example = outerFunction(10); // example: (delta: number) => void;

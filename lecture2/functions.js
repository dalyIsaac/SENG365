// result: () => number;
var result1 = function aFunction1() {
    return -1;
}

result1();
// -1

var result2 = function() {
    return 1;
}

result2();
//1

// function () {
//     return 100
// }
// ! Fails - invalid syntax

// function () {
//     return 100;
// } ();
// ! Fails - invalid syntax

(function () {
    return 100;
});
// returns [Function] to REPL

(function () {
    return 100;
}) ();
// 100

+function aFunction3 () {
    return 101;
} ();
// the above is equivalent to:
//
// (function () {
//     return 100;
// });
//

/* ===============================
   SECTION 1 — Variables & Assignment
================================= */

// 1 & 2
let name = "Kaviya";
let age = 20;
let isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);

// 3. Swap without third variable
let a = 5;
let b = 10;

a = a + b;
b = a - b;
a = a - b;

console.log("After Swapping → a:", a, "b:", b);

// 4. Output prediction
let x = 10;
let y = x;
y = 20;
console.log("Value of x:", x); // 10

// 5. Using const
const pi = 3.14;
const radius = 5;
const area = pi * radius * radius;
console.log("Area:", area);


/* ===============================
   SECTION 2 — Operators
================================= */

let num1 = 10;
let num2 = 3;

console.log("Sum:", num1 + num2);
console.log("Difference:", num1 - num2);
console.log("Product:", num1 * num2);
console.log("Quotient:", num1 / num2);
console.log("Remainder:", num1 % num2);

// Type coercion
console.log(5 + "5");    
console.log(5 - "2");    
console.log(true + 1);   

// Compare with 100
let number = 120;

if (number > 100) {
    console.log("Greater than 100");
} else if (number === 100) {
    console.log("Equal to 100");
} else {
    console.log("Less than 100");
}

// == vs ===
console.log(5 == "5");   
console.log(5 === "5");  

// Age eligibility
let checkAge = 25;

if (checkAge >= 18 && checkAge <= 60) {
    console.log("Eligible");
} else {
    console.log("Not Eligible");
}


/* ===============================
   SECTION 3 — Control Statements
================================= */

// Even or Odd
let num = 7;

if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

// FizzBuzz
let fizzNum = 15;

if (fizzNum % 3 === 0 && fizzNum % 5 === 0) {
    console.log("FizzBuzz");
} else if (fizzNum % 3 === 0) {
    console.log("Fizz");
} else if (fizzNum % 5 === 0) {
    console.log("Buzz");
}

// Switch weekday
let day = 3;

switch(day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
    case 4: console.log("Thursday"); break;
    case 5: console.log("Friday"); break;
    case 6: console.log("Saturday"); break;
    case 7: console.log("Sunday"); break;
    default: console.log("Invalid");
}

// For loop 1–20
for (let i = 1; i <= 20; i++) {
    console.log(i);
}

// Even numbers only
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

// While loop sum 1 to N
let N = 5;
let i = 1;
let sum = 0;

while (i <= N) {
    sum += i;
    i++;
}
console.log("Sum 1 to", N, "=", sum);

// Break & Continue
for (let i = 1; i <= 10; i++) {
    if (i === 5) continue;
    if (i === 8) break;
    console.log(i);
}


/* ===============================
   SECTION 4 — Functions
================================= */

// 17. Normal function
function add(a, b) {
    return a + b;
}
console.log("Add:", add(5, 3));

// 18. Arrow function
const addArrow = (a, b) => a + b;
console.log("Arrow Add:", addArrow(4, 6));

// 19. Prime check
function isPrime(num) {
    if (num <= 1) return false;

    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
console.log("Is 7 Prime?", isPrime(7));

// 20. Reverse string
function reverseString(str) {
    return str.split("").reverse().join("");
}
console.log("Reverse:", reverseString("Kaviya"));

// 21. Return behavior
function test() {
    return;
    console.log("Hello");
}
test(); // Nothing prints

// 22. Largest number
function largest(arr) {
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
console.log("Largest:", largest([10, 45, 23, 99, 2]));


/* ===============================
   SECTION 5 — Integrated Challenge
================================= */

function calculateGrade(marks) {
    if (marks >= 90) {
        return "A";
    } else if (marks >= 75) {
        return "B";
    } else if (marks >= 50) {
        return "C";
    } else {
        return "Fail";
    }
}

let studentMarks = 82;
let grade = calculateGrade(studentMarks);

console.log("Student Marks:", studentMarks);
console.log("Grade:", grade);


export const questions = [
  {
    question: "Reverse a String",
    functionName: "reverseString",
    description:
      "Write a function reverseString that takes a string as input and returns the reversed string.",
    testCases: [
      { input: ["Hello"], output: "olleH" },
      { input: ["PHP"], output: "PHP" },
      { input: [""], output: "" },
    ],
  },
  {
    question: "Factorial",
    functionName: "factorial",
    description:
      "Write a function factorial that calculates the factorial of a given non-negative integer.",
    testCases: [
      { input: [5], output: 120 },
      { input: [0], output: 1 },
      { input: [1], output: 1 },
    ],
  },
  {
    question: "Palindrome",
    functionName: "isPalindrome",
    description:
      "Write a function isPalindrome that checks if a given string is a palindrome.",
    testCases: [
      { input: ["racecar"], output: true },
      { input: ["hello"], output: false },
      { input: ["A man a plan a canal Panama"], output: true },
    ],
  },
  {
    question: "Fibonacci Series",
    functionName: "fibonacci",
    description:
      "Write a function fibonacci that generates the Fibonacci series up to a given limit n.",
    testCases: [
      { input: [8], output: [0, 1, 1, 2, 3, 5, 8, 13] },
      { input: [0], output: [] },
      { input: [1], output: [0] },
    ],
  },
  {
    question: "Array Sum",
    functionName: "arraySum",
    decription:
      "Write a function arraySum that calculates the sum of all elements in an array.",
    testCases: [
      { input: [[1, 2, 3, 4, 5]], output: 15 },
      { input: [[]], output: 0 },
      { input: [[-1, -2, 3, 4, -5]], output: -1 },
    ],
  },
  {
    question: "Find Maximum",
    functionName: "findMax",
    decription:
      "Write a function findMax that finds the maximum value in an array.",
    testCases: [
      { input: [[3, 1, 7, 2, 8]], output: 8 },
      { input: [[-5, -2, -8, -1, -3]], output: -1 },
      { input: [[0, 0, 0, 0, 0]], output: 0 },
    ],
  },
  {
    question: "Unique Elements",
    functionName: "uniqueElements",
    description:
      "Write a function uniqueElements that returns an array with only unique elements from the given array.",
    testCases: [
      { input: [[1, 2, 2, 3, 4, 4, 5]], output: [1, 2, 3, 4, 5] },
      { input: [["apple", "orange", "apple"]], output: ["apple", "orange"] },
      { input: [[]], output: [] },
    ],
  },
  {
    question: "String to Uppercase",
    functionName: "toUppercase",
    description:
      "Write a function toUppercase that converts a given string to uppercase.",
    testCases: [
      { input: ["hello"], output: "HELLO" },
      { input: ["php"], output: "PHP" },
      { input: [""], output: "" },
    ],
  },
  {
    question: "Prime Number",
    functionName: "isPrime",
    description:
      "Write a function isPrime that checks if a given number is a prime number.",
    testCases: [
      { input: [7], output: true },
      { input: [10], output: false },
      { input: [1], output: false },
    ],
  },
  {
    question: "Intersection of Arrays",
    functionName: "arrayIntersection",
    description:
      "Write a function arrayIntersection that finds the intersection of two arrays.",
    testCases: [
      {
        input: [
          [1, 2, 3, 4],
          [3, 4, 5, 6],
        ],
        output: [3, 4],
      },
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        output: [],
      },
      {
        input: [
          [1, 2, 3],
          [3, 4, 5],
        ],
        output: [3],
      },
    ],
  },
];

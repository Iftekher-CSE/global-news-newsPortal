const array = [
    { cost: 2, item: "apple" },
    { cost: 8, item: "Banana" },
    { cost: 9, item: "Orange" },
    { cost: 3, item: "jackfruit" },
];

array.sort((a, b) => (a.cost > b.cost ? 1 : -1));

console.log(array);

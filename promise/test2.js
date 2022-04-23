setTimeout(() => {
  console.log(1);
});
new Promise((resolve) => {
  console.log(2);
  resolve(3);
}).then((val) => {
  console.log(val);
});

console.log(4);

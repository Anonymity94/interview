var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)); // [1, 2, 3, 4]

function flatten(arr) {
  const result = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (Array.isArray(element)) {
      result.push(flatten(element));
    } else {
      result.push(item);
    }
  }
  return item;
}

function flatten2(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

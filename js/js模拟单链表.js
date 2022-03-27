Object.defineProperty(Object.prototype, 'next', {
  get() {
    let next = Object.getPrototypeOf(this);
    if (next === Object.prototype) {
      return null;
    }
    return next;
  },
  set(value) {
    return Object.setPrototypeOf(this, value);
  },
});

const a = { value: 'A' };
const b = { value: 'B' };
const c = { value: 'C' };
const d = { value: 'D' };

a.next = b;
b.next = c;
c.next = d;

console.log(a);

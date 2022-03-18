interface Person {
  readonly name: string;
  age: number;
}

interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = [];

interface Colorful {
  color: string;
}

// 继承的方式，重写类型会报错
interface ColorfulSub2 extends Colorful {
  color: number;
}

type ColorfulSub = Colorful & {
  color: number;
};

// type 的继承是取类型的交集
// 此时 color 为 never 类型
let colorMap: ColorfulSub = { color: '2323' };

type Format1 = (id: string) => string;
interface Format2 {
  (id: number): string;
}

const format: Format2 = (id: number) => '23';

type B = typeof format;

interface Box<Type> {
  contents: Type;
}

let box: Box<string>;

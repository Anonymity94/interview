# 设计模式

> - [汤姆大叔的博客](https://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)
> - [常见的设计模式有哪些？](https://refactoringguru.cn/design-patterns)
> - [前端的设计模式系列](https://pattern.windliang.wang/)
## 分类

### 创建型

- 单例模式

> 保证全局对象唯一

```js
// 单例构造器
const FooServiceSingleton = (function () {
  // 隐藏的Class的构造函数
  function FooService() {}

  // 未初始化的单例对象
  let fooService;

  return {
    // 创建/获取单例对象的函数
    getInstance: function () {
      if (!fooService) {
        fooService = new FooService();
      }
      return fooService;
    },
  };
})();

const fooService1 = FooServiceSingleton.getInstance();
const fooService2 = FooServiceSingleton.getInstance();

console.log(fooService1 === fooService2); // true
```

- 建造者模式

### 结构型

- 代理模式
- 装饰器模式
- 适配器模式
- 外观（门面）模式

### 行为类

- 策略模式
- 观察者模式
- 订阅发布模式
- 责任链模式
- 模版方法模式
- 迭代器模式

## 基本原则

- 单一职责原则

定义：一个类或者模块应该有且只有一个改变的原因，在 js 中的话更多的会应用在对象、函数中。

最难的地方就在于结合具体场景对单一职责的判定了，为了应用这个原则把一个模块拆的太细其实也不太好，所以需要我们在方便性和稳定性之间做一个权衡。

- 开闭原则

定义：一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。模块应尽量在不修改原代码的情况下进行扩展。

- 接口隔离原则

定义：客户端不应该依赖它不需要的接口，类间的依赖关系应该建立在最小的接口上。简单来说就是建立单一的接口，不要建立臃肿庞大的接口。也就是接口尽量细化，同时接口中的方法尽量少。

- 最小知道原则

定义：一个软件实体应当尽可能少的与其他实体发生相互作用。每一个软件单位对其他的单位都只有最少的知识，而且局限于那些与本单位密切相关的软件单位。

- KISS 原则

定义： Keep It Simple, Stupid，在设计中应当注重简约的原则。

- YAGNI 原则

定义：You aren't gonna need it，表示暂时不需要的就不要做。

- DRY 原则

定义：Don't Repeat Yourself，不要写重复的代码。

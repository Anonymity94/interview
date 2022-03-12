# 页面显示大量数据

## setTimeout

分组分批次渲染。
一次渲染需要耗时 `16.7ms`(1000/60≈16.7)
所以可以将 `setTimeout` 的定时设置为 `16ms`，每 `16ms` 渲染一组数据。


由于 `setTimeout` 的执行时间不准确，这是由于事件循环机制引发的。在 JS 中， setTimeout 被放置在事件队列中，当前主线程执行完成后才会去检查事件队列中的任务是否需要执行。因此 `setTimeout` 的执行时间并不准确。

此种方案会引发闪屏现象

## requestAnimationFrame

`requestAnimationFrame` 由系统调用，总是在下一次屏幕刷新之前被调用，所以不会有闪屏现象。

## DocumentFragment

由于每次插入 `li` 都会引发回流现象。为了减少回流次数，可以先将一个批次的 `li` 先挂在到 `DocumentFragment` 上，一次性更新到 `Dom` 上。

> DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的 Document 使用，就像标准的document一样，存储由节点（nodes）组成的文档结构。与document相比，最大的区别是DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。

## 虚拟列表

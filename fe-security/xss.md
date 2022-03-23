# 跨站脚本攻击（XSS）

## 简介

英文 `Cross Site Script`，本来缩写是 CSS，但是为了和层叠样式表做区分，所以在安全领域叫做 `XSS`。
本质：恶意代码未经过滤，与网站正常的代码混在一起显示。

## 分类

### 存储型

攻击者将恶意代码提交到数据库 --> 服务器从数据库取出恶意代码 --> 浏览器 --> 解析执行

攻击者将恶意代码提交保存到目标网站的数据库上。
这种攻击常见于保存用户数据的网站功能：发帖、评论、私信等。

### 反射型

恶意 URL --> 服务器从 URL 取出恶意代码，拼接 HTML --> 浏览器 --> 解析执行

简单的把用户输入的数据『反射』给浏览器。攻击者需要构造出特殊的 URL。
常见于通过 URL 传参的功能：网站搜索、跳转等，需要用户主动打开恶意 URL 才能生效。

### Dom 型

通过修改原始的客户端代码，受害者浏览器的 DOM 环境改变，导致有效载荷的执行。也就是说，页面本身并没有变化，但由于 DOM 环境被恶意修改，有客户端代码被包含进了页面，并且意外执行。

## 防御

### 编码

- React 中使用 `textContent`
- cookie 设置为 `HttpOnly` 防客户端盗用 cookie
- 不信任用户输入的任何内容，对提交内容进行校验、过滤
- 富文本使用白名单，只允许 `<a>`、`<img>`、`<div>` 等比较安全的标签存在，内容进行过滤、编码
- 设置 `CSP(Content-Security-Policy)(内容安全策略)`，只允许内容来自于站点的同一个源
```
Content-Security-Policy: default-src 'self'
```

## 参考
- https://tech.meituan.com/2018/09/27/fe-security.html
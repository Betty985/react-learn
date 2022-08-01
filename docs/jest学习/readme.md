# 转译器
Jest 本身不做代码转译工作。 在执行测试时，它会调用已有的 转译器/编译器 来做代码转译。如Babel (opens new window)和 TSC (opens new window)。Babel 做转译的 缺点是无法让 Jest 在运行时做类型检查，所以更推荐使用 ts-jest，利用 tsc 来转译 TypeScript。
## 路径简写
### 路径匹配规则
因为jest 根本不管 tsc，每次写路径匹配规则都在 tsconfig.json 和 jest.config.js 写两份。
解决：用 ts-jest 里的工具函数 pathsToModuleNameMapper 来把 tsconfig.json 里的 paths 配置复制到 jest.config.js 里的 moduleNameMapper
# 测试环境
测试与浏览器强绑定的工具文件
## 全局mock
- jest-setup.ts 文件
- 在 jest.config.js 里添加 setupFilesAfterEnv 配置

> setupFiles [数组]
> 默认：[]
> 
>运行一些代码以配置或设置测试环境的模块的路径列表。每个 setupFile 将在每个测试文件中运行一次。由于每个测试都在自己的环境中运行，因此这些脚本将在执行setupFilesAfterEnv和测试代码本身之前在测试环境中执行。

> setupFilesAfterEnv [数组]
> 默认：[]
> 
> 在执行套件中的每个测试文件之前运行一些代码以配置或设置测试框架的模块的路径列表。由于setupFiles在环境中安装测试框架之前执行，因此该脚本文件为您提供了在环境中安装测试框架之后但在测试代码本身之前立即运行一些代码的机会。
> 换句话说，setupFilesAfterEnv模块适用于在每个测试文件中重复的代码。安装测试框架后，Jest可以在模块中使用全局变量、jest对象和可访问性。

> setupFiles 是在 引入测试环境（比如jsdom）之后 执行的代码
> setupFilesAfterEnv 则是在 安装测试框架之后 执行的代码
> 具体应用场景是：在 setupFiles 可以添加 测试环境 的补充，比如 Mock 全局变量 abcd 等。而在 setupFilesAfterEnv 可以引入和配置 Jest/Jasmine（Jest 内部使用了 Jasmine） 插件。
> 如果你试图在 setupFiles 添加 Jest 的扩展/插件，那么你可能会得到 expect is not defined 报错。
## jsdom
  `testEnvironment: "jsdom",`
  添加 jsdom 测试环境后，全局会自动拥有完整的浏览器标准 API。原理是使用了 jsdom (opens new window)。 这个库用 JS 实现了一套 Node.js 环境下的 Web 标准 API。 由于 Jest 的测试文件也是 Node.js 环境下执行的，所以 Jest 用这个库充当了浏览器环境的 Mock 实现。
# mock 网页地址
直接使用`window.location.href = "https://www.baidu.com?a=1&b=2"`;
报错`Error: Not implemented: navigation (except hash changes)`
解决：
## Object.defineProperty（ Hack 手法，不推荐）
将`window.location.href = "https://www.baidu.com?a=1&b=2"`替换为
```js
  Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: 'https://google.com?a=1&b=2', search: '?a=1&b=2' },
          });
  ```
注意：Mock window.location 对象，而不是 window.location.href 属性。
## 扩展测试环境
- `npm i -D jest-environment-jsdom-global@3.0.0 -w`
- ```js
  // jest.config.js
  module.exports = {
  testEnvironment: 'jest-environment-jsdom-global'
  };
  ```
- ```js
  // 使用全局暴露出来的 jsdom
    global.jsdom.reconfigure({
      url: "https://www.baidu.com?a=1&b=2",
    });
    ```  
- 添加一个全局声明文件 src/types/global.d.ts:
```js
  // src/types/global.d.ts
declare namespace globalThis {
  var jsdom: any;
}
```
所有测试用例均未通过，报错信息：
```

    TypeError: Class extends value #<Object> is not a constructor or 
null

      at Object.<anonymous> (node_modules/.pnpm/jest-environment-jsdom-global@3.0.0_rqqruudttwcdyftgmv7lyajjh4/node_modules/jest-environment-jsdom-global/environment.js:3:55)
```
npm包依赖项与其不兼容
## Mock Location:jest-location-mock@1.0.9
`pnpm i -D jest-location-mock@1.0.9`
# 学习技巧
单测里的每个用例都可以看成一个最小的 example，通过阅读 Test Case 就能马上知道这个函数怎么使用了。
jest测试单个文件：`jest 文件相对路径`
# 注意
- ts-jest 一定要和 jest 的大版本一致！ 否则会有兼容问题！ 
# 参考资料
- [jest实践指南](https://github.yanhaixiang.com/jest-tutorial/intro/why-test/#%E7%94%A8%E4%BE%8B%E5%8D%B3%E4%BE%8B%E5%AD%90)
- [jest官网](https://jestjs.io/zh-Hans/docs/configuration#setupfiles-array)
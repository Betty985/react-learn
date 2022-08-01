# 转译器
Jest 本身不做代码转译工作。 在执行测试时，它会调用已有的 转译器/编译器 来做代码转译。如Babel (opens new window)和 TSC (opens new window)。Babel 做转译的 缺点是无法让 Jest 在运行时做类型检查，所以更推荐使用 ts-jest，利用 tsc 来转译 TypeScript。
## 路径简写
### 路径匹配规则
因为jest 根本不管 tsc，每次写路径匹配规则都在 tsconfig.json 和 jest.config.js 写两份么。
解决：用 ts-jest 里的工具函数 pathsToModuleNameMapper 来把 tsconfig.json 里的 paths 配置复制到 jest.config.js 里的 moduleNameMapper
# 学习技巧
单测里的每个用例都可以看成一个最小的 example，通过阅读 Test Case 就能马上知道这个函数怎么使用了。
# 注意
- ts-jest 一定要和 jest 的大版本一致！ 否则会有兼容问题！ 
# 参考资料
- [jest实践指南](https://github.yanhaixiang.com/jest-tutorial/intro/why-test/#%E7%94%A8%E4%BE%8B%E5%8D%B3%E4%BE%8B%E5%AD%90)
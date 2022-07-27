# 包管理器
npm：
> Npm 是世界上最大的软件注册中心。来自各大洲的开源开发人员使用 npm 来共享和借用包，许多组织也使用 npm 来管理私有开发
cnpm：
> npmmirror 中国镜像站。这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。
pnpm：
> - 速度快、节省磁盘空间的软件包管理器
> - 快速。pnpm 是同类工具速度的将近 2 倍。
> - 高效。node_modules 中的所有文件均链接自单一存储位置。
> - 支持单体仓库。pnpm 内置了对单个源码仓库中包含多个软件包的支持。
> - 权限严格。pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问。

yarn：
> Yarn 是一个软件包管理器，还可以作为项目管理工具。无论你是小型项目还是大型单体仓库（monorepos），无论是业余爱好者还是企业用户，Yarn 都能满足你的需求。

pnpm和yarn支持monorepos。
# package.json
## peerDependencies
插件正确运行的前提是，核心依赖库必须先下载安装，不能脱离核心依赖库而被单独依赖并引用；
插件入口api 的设计必须要符合核心依赖库的规范；
插件的核心逻辑运行在依赖库的调用中；
在项目实践中，同一插件体系下，核心依赖库版本最好是相同的；

插件使用 dependencies 声明依赖库的特点：
如果用户显式依赖了核心库，则可以忽略各插件的 peerDependency 声明；
如果用户没有显式依赖核心库，则按照插件 peerDependencies 中声明的版本将库安装到项目根目录中；
当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复；
# jest
> Jest 是一个 JavaScript 测试框架，旨在确保任何 JavaScript 代码的正确性。它为你提供了。它为你提供了 易于理解、熟悉且功能丰富的 API 来编写测试用例，并快速地反馈结果。

# monorepo
`git submodule`不生效。
提示：`fatal: 'mini-ahooks' already exists in the index`
> Lerna 是一个快速的现代构建系统，用于管理和发布来自同一存储库的多个 JavaScript/TypeScript 包。Lerna 是用于 
> TypeScript/JavaScript的原始monorepo 工具。它已经存在多年，被数以万计的项目使用，包括 React、Jest 和 Babel。

>它解决了 JavaScript monorepos 的三个最大问题：
> - Lerna 在 repo 中链接不同的项目，因此它们可以相互导入，而无需向 NPM 发布任何内容。
> - Lerna 对任意数量的项目运行命令，它以最有效的方式、以正确的顺序执行它，并且可以将其分布在多台机器上。
> - Lerna 管理您的发布过程，从版本管理到发布再到 NPM，它提供了多种选项来确保可以适应任何工作流程。

# 参考资料
- [npm](https://docs.npmjs.com/about-npm)
- [cnpm](https://npmmirror.com/)
- [pnpm](https://www.pnpm.cn/)
- [yarn](https://www.yarnpkg.cn/)
- [一文搞懂peerDependencies](https://juejin.cn/post/6844904134248759309)
- [jest](https://www.jestjs.cn/)
- [lerna](https://lerna.js.org/)
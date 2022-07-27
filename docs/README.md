# 父子组件传值
父传子用props，子传父可以用函数的参数
# input绑定value无法输入
[将value改为defaultValue；
绑定name，name与defaultValue的值一致
添加onChange方法，并绑定this（关键）：bind(this);](https://blog.csdn.net/qq_40012232/article/details/118927991)
# 一个诡异的bug
- 鼠标位置无法显示，图片不能跟随鼠标
- 鼠标移动切换标签页
# [版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)
用`git log`再看看现在版本库的状态;
在Git中，用HEAD表示当前版本.上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
回退到上一个版本` git reset --hard HEAD^ `
Git提供了一个命令`git reflog`用来记录你的每一次命令
[git revert](https://www.51cto.com/article/678497.html)
git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit
git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容
在回滚这一操作上看，效果差不多。但是在日后继续 merge 以前的老版本时有区别
# ahooks
## 查看vs code 已安装的扩展
`code --list-extensions`
可以用于在`.vscode`文件夹下的`extensions.json`中推荐vs code插件。
## monorepo (pnpm)
- `pnpm init`
- 手动创建`pnpm-workspace.yaml`文件进行配置

yaml文件基本语法：
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
## .gitignore文件
列出不被git跟踪的文件
## .npmrc 文件
pnpm 从命令行、环境变量和 .npmrc 文件中获取其配置。
pnpm config 命令可用于更新和编辑 用户和全局 .npmrc 文件的内容。
## .husky文件夹
```
npm install husky --save-dev
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```
特征：
零依赖和轻量级 ( 6 kB)
由现代新的 Git 功能提供支持 ( core.hooksPath)
遵循关于自动安装的npm和Yarn最佳实践
用户友好的消息
可选安装
和哈士奇4一样，支持
macOS、Linux 和 Windows
Git 图形用户界面
自定义目录
单仓库
## prettier
Prettier 使用 cosmiconfig 进行配置文件支持，这意味着你可以通过(优先顺序) :
- 在package.json 文件的 "prettier"键.
- 用JSON 或者 YAML写的.prettierrc文件
- .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, 或者 .prettierrc.json5 文件.
- .prettierrc.js, .prettierrc.cjs, prettier.config.js, 或者prettier.config.cjs 文件使用module.exports导出的对象
- .prettierrc.toml 文件
  
.prettierrc
```
npm install --save-dev --save-exact prettier
```
.prettierignore
从格式化中排除文件
## ts
-  ` "skipLibCheck": true` 跳过声明文件的类型检查。
这可以在编译期间节省时间，但会牺牲类型系统的准确性。
- `allowSyntheticDefaultImports`允许合成默认导入
- `declaration`为项目中的每个 TypeScript 或 JavaScript 文件生成.d.ts文件。这些.d.ts文件是描述模块外部 API 的类型定义文件。借助.d.ts文件，TypeScript 等工具可以为无类型代码提供智能感知和准确类型。
## webpack
### webpack.common.js
development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。

`resolve.extensions`:尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。能够使用户在引入模块时不带扩展。
`externals`：externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。
## jest
```shell
# 全局安装，可以直接使用jest
 pnpm install jest --global
#  生成基础配置文件
 jest init
```
# 参考资料
- [husky](https://typicode.github.io/husky/#/)
- [prettier](https://prettier.io/docs/en/configuration.html#docsNav)
- [ts](https://www.typescriptlang.org/tsconfig#declaration)
- [webpack](https://webpack.docschina.org/guides/production/#setup)
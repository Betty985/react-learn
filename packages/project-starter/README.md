React + MobX + TypeScript + React-router
# 步骤
## 使用Create-React-App来建立TypeScript的环境
```
npm i -g create-react-app
create-react-app name  --template typescript
cd name
npm start
```
## 加入React-Router
```
npm install --save react-router-dom
```
# 笔记
## pwa
PWA：运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。
从Create React App 4开始,您可以将 `src/service-worker.js` 文件添加到项目中，以使用 Workbox 的 `InjectManifest `插件的内置支持，它将编译您的service worker，并向其中注入一个要修改的 URL 列表。
## web-vitals库
web-vitals库是一个小型 (~1K) 模块化库，用于测量真实用户的所有Web Vitals指标，其方式与 Chrome 测量它们的方式以及向其他 Google 工具（例如Chrome 用户体验报告、页面Speed Insights，Search Console 的速度报告）。
# 参考资料
- [React结合TypeScript和Mobx初体验](https://segmentfault.com/a/1190000015002112)
- [progressive-web-app](https://create-react-app.dev/docs/making-a-progressive-web-app/)
- [MDN:PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [web-vitals](https://www.npmjs.com/package/web-vitals)
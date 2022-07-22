# 父子组件传值
父传子用props，子传父可以用函数的参数
# input绑定value无法输入
[将value改为defaultValue；
绑定name，name与defaultValue的值一致
添加onChange方法，并绑定this（关键）：bind(this);](https://blog.csdn.net/qq_40012232/article/details/118927991)
# 一个诡异的bug
- 鼠标位置无法显示，图片不能跟随鼠标
- 鼠标移动切换标签页
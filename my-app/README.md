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
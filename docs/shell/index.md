shell 目的是进行用于人机交互，本质上是命令解释器。只要是人与电脑之间交互的接口，就可以称为 shell。表现为其作用是用户输入一条命令，shell 就立即解释执行一条。不局限于系统、语言等概念、操作方式和表现方式等。
查看当前 Linux或MacOS的默认shell:`echo $SHELL`
系统安装了哪些shell：`cat /etc/shells`
# 类别
## zsh
zsh 有 oh-my-zsh 这个配置集，它兼容 bash，还有自动补全等好用的功能。
## sh
sh 的全称是 Bourne shell，由 AT&T 公司的 Steve Bourne开发，为了纪念他，就用他的名字命名了。sh 是 UNIX 上的标准 shell，很多 UNIX 版本都配有 sh。sh 是第一个流行的 shell。
## csh
sh 之后另一个广为流传的 shell 是由柏克莱大学的 Bill Joy 设计的，这个 shell 的语法有点类似C语言，所以才得名为 C shell ，简称为 csh。
## tcsh
tcsh 是 csh 的增强版，加入了命令补全功能，提供了更加强大的语法支持。
ash一个简单的轻量级的 Shell，占用资源少，适合运行于低内存环境，但是与下面讲到的 bash shell 完全兼容。
## bash
bash由 GNU 组织开发，保持了对 sh shell 的兼容性，是各种 Linux 发行版默认配置的 shell。bash 兼容 sh 意味着，针对 sh 编写的 shell 代码可以不加修改地在 bash 中运行。尽管如此，bash 和 sh 还是有一些不同之处：一方面，bash 扩展了一些命令和参数；另一方面，bash 并不完全和 sh 兼容，它们有些行为并不一致，但在大多数企业运维的情况下区别不大，特殊场景可以使用 bash 代替 sh。

Mac OS 中默认安装了以上所有类型，Windows 需要自行安装
# 区别
- sh是bash的一种特殊模式，sh就是开启了POSIX标准的bash，/bin/sh 相当于 /bin/bash --posix。形象一点的描述就是sh遵循POSIX规范：当某行代码出错时，不继续往下解释，bash就算出错，也会继续向下执行。
- zsh比bash更强大，功能也更加完善，但是配置比较复杂，导致流行度不是很高。但是有优秀的oh-my-zsh加持导致这个事情变得更加的容易。从一个交互式终端的角度来讲，Zsh更为强大，而Bash更加符合posix标准，因此Bash更适合做脚本解释器。
- 可以运行命令`Zsh --emulate sh`来让Zsh模拟sh。
- Bash的数组是从0开始的，而Zsh里是从1开始的
# 参考资料
- [shell有哪些？Zsh和Bash的区别是什么？](https://www.jianshu.com/p/a891af6f87e0)
- [sh、bash和zsh区别](https://dpjeep.com/2020/11/04/sh-bashhe-zshqu-bie/)
- [Mac终端的Zsh与Bash区别](https://blog.tianyichuxin.com/2021/12/61126.html)
- [Zsh和Bash的兼容性问题](https://segmentfault.com/a/1190000011122024)
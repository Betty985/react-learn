[【git】提交到github不显示贡献小绿点问题的解决](https://www.cnblogs.com/zzhangyuhang/p/9896151.html)
```
git filter-branch -f --env-filter '
if [ "$GIT_AUTHOR_NAME" = "oldName" ]
then
export GIT_AUTHOR_NAME="newName"
export GIT_AUTHOR_EMAIL="newEmail"
fi
' HEAD
 
git filter-branch -f --env-filter '
if [ "$GIT_COMMITTER_NAME" = "oldName" ]
then
export GIT_COMMITTER_NAME="newName"
export GIT_COMMITTER_EMAIL="newEmail"
fi
' HEAD
```
```
git filter-branch -f --env-filter "
GIT_AUTHOR_NAME='newName';
GIT_AUTHOR_EMAIL='newEmail';
GIT_COMMITTER_NAME='newName';
GIT_COMMITTER_EMAIL='newEmail'
" HEAD
```
# git修改历史记录

- `git commit --amend` ：修改最近一次的commit信息，修改之后commit id会变。
-` git  rebase -i HEAD~3`可以实现对最近三个commit的修改。（合并commit；修改具体的commit message；删除某个commit）。` git rebase -i  [startpoint]  [endpoint]`其中-i的意思是--interactive，即弹出交互式的界面（vim界面)让用户编辑完成合并操作，[startpoint] [endpoint]则指定了一个编辑区间，如果不指定[endpoint]，则该区间的终点默认是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间)。
```
git  rebase -i HEAD~3 
```
会进入交互界面，第一个commit 保持"pick"，将其他的pick修改为"s"，合并到第一个commit上
按下esc键，输入:wq保存退出
在预览界面按D键两次可以删除一行
按下esc键，输入:wq保存退出

- `git filter --branch`：指定删除所有提交中的某个文件或者全局修改邮箱地址等操作。
修改之后objects中的原来的 commit  object没有删除，而是成为了悬空的objet(没有ref指向的object）
# git stash
`git add .`
暂存文件：`git stash`
弹出文件：`git stash pop` 
- 查看git的用户的邮箱和用户名
`git config user.name`
`git config user.email`
- `git checkout -b` :基于当前分支，检出一个新的分支，并切换到新分支
- `git branch -d <branch>` :删除一个分支
- `git branch --set-upstream-to 远程分支 本地分支`：切换远程分支
# git 多用户
```shell
~$ git config --global user.name "urGitHubUsrName"
~$ git config --global user.email "urGitHubEmail@foobar.com"

~$ git config --local user.name "urGitHubUsrName"
~$ git config --local user.email "urGitHubEmail@foobar.com"

~$ git config --worktree user.name "urGitHubUsrName"
~$ git config --worktree user.email "urGitHubEmail@foobar.com"
```
在git中，我们使用git config 命令用来配置git的配置文件，git配置级别主要有以下3类：

1、仓库级别 local 【优先级最高】

2、用户级别 global【优先级次之】

3、系统级别 system【优先级最低】

`git config --list`:查看配置列表
# 参考资料
- [rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)
- [ubuntu - 我可以在 vscode 中登录两个不同的 github 帐户吗？ - 探索字符串](https://string.quest/read/16878671)
- [git config配置](https://www.cnblogs.com/fireporsche/p/9359130.html)
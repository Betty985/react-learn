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
-` git  rebase -i HEAD~3`可以实现对最近三个commit的修改。（合并commit；修改具体的commit message；删除某个commit）。` git rebase -i  [startpoint]  [endpoint]`其中-i的意思是--interactive，即弹出交互式的界面让用户编辑完成合并操作，[startpoint] [endpoint]则指定了一个编辑区间，如果不指定[endpoint]，则该区间的终点默认是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间)。
- `git filter --branch`：指定删除所有提交中的某个文件或者全局修改邮箱地址等操作。
修改之后objects中的原来的 commit  object没有删除，而是成为了悬空的objet(没有ref指向的object）


# 参考资料
- [rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)

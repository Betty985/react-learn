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
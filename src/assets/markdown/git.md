### 创建一个git版本库
  * 新建一个空白文件目录
  * `git init`将当前目录变成一个git版本库
  * 会创建一个.git文件（默认为隐藏）
### 工作区和暂存区
  * git add 将当前工作区内的修改文件添加到暂存区
    * `git add .` 提交所有修改文件
    * `git add <file>` 提交当前文件
  * git commit 将当前暂存区的内容提交到当前分支上
    * `git commit -m '注释' `
  * `git status` 查看仓库的当前状态，记录当前工作区内的修改内容
  * `git diff <file>` 查看当前文件的修改明细
#### 撤销
  * `git checkout --<file>`将当前暂存区内的某个文件恢复到上次`git commit`的转态
  * git reset 既可以回退版本，也可以把暂存区的修改回退到工作区
    * `git reset HEAD` 回退到最新版本
    * `git reset HEAD <file>` 指定当前文件回退到最新版本

### 分支
  * 查看分支 `git branch`
    * 列出所有分支，当前分支前面会标一个*号
    * `HEAD`表示当前分支
  * 新建分支 `git branch <branchName>`
    * 例：`git branch dev`创建一条dev分支
  * 切换分支 `git checkout <branchName>`
  * 新建分支并切换到当前分支 `git checkout -b <branchName>`
  * 合并分支 `git merge`
    * `git merge <branchName>` 合并指定分支到当前分支
  * 删除分支 `git branch -d <branchName>`
### 版本回退
  * 查看历史记录 `git log`
  * 查看历史记录(简介版) `git log --pretty=oneline`
  * 回退到上一个版本 `git reset --hard HEAD^`
  * 回退到指定版本 `git reset --hard <commitId>`
  * `git reflog` 记录你输入的每一个命令

---
title: "Control git on terminal"
author_profile: ture
comments: true
use_math: true
sitemap :
  changefreq : daily
  priority : 1.0
categories : 
  - Git
  - Ubuntu
tags: 
  - ubuntu
  - git
toc: true
toc_sticky: true
toc_label: "Page Index"
---

이번 포스터에서는 github repository와 local folder를 연동하여 repository를 관리하는 방법에 대하여 알아보겠습니다.

## **Git 설치**

우선 아래 명령어를 통하여 git을 설치하겠습니다.

```bash
sudo apt update
sudo apt-get install git
```

이후 버전 확인은 아래와같이 할 수 있습니다.

```bash
git --version
```

## **Local folder 연동**

git을 설치하셨다면 다음 step은 git repository와 local folder를 연동하는 것 입니다.
(git repository는 생성되어 있다고 가정합니다)

```bash
# local folder로 이동
cd /path/to/local/folder

# git 시작
git init
git remote add origin your/repository/url
git remote -v
```

## **Repository에 push하기**

github repository에 push, 즉 sync되어 있는 repository를 update 하기 위해서는 아래 세 가지 step이 필요합니다.

1. add
2. commit
3. push

간략히 살펴보자면 아래와 같습니다.

- add
    * Repository를 update 하기 위한 파일을 선택합니다

- commit
    * git을 사용하는 이유라고 생각해도 무방한 version을 생성하는 명령어 입니다

- push
    * 선택한 파일들을 생성한 version으로 update 합니다

사용법은 아래와 같습니다

```bash
# 모든 파일 add
git add .

# "First update" 라는 이름으로 commit 진행
git commit -m "First update"

# push
git push origin master
```

## **git status**

하지만 항상 모든 파일을 `git add .` 으로 add를 한다면 원하지 않는 파일을 add 하거나, 변경된 모든 파일을 하나로 commit 할 수 밖에 없는 단점이 있습니다.

이러한 상황에서 유용하게 사용할 수 있는 명령어가 `git status` 입니다.

```bash
git status
```

git sataus를 입력하시면 어떤 파일들에 수정이 있었는지(modified files) 쉽게 알 수 있습니다. 그럼 원하는 파일만 아래와 같이 add 할 수 있겠죠.

```bash
git add file1 file2
```

뿐만 아니라 새로운 파일인 untracked files에 대한 정보도 확인 가능합니다.

## **항상 무시할 파일 지정**

github에는 40M 이상 용량을 차지하는 파일을 올릴 수 없습니다. 그럼 폴더에 데이터가 있으면 어쩌죠? 혹은 .idea나 cache file들 처럼 원하지 않으나 생성되는, 그래서 지저분해 보이는 파일들을 항상 수동으로 관리 해야 할까요?

이와같이 코드에는 필요하나 repository에는 '항상' add 하지 않을 파일들을 지정할 수 있습니다.

`.gitignore` 파일로 말이죠!

```bash
# open .gitignore using your favorite editor
vim .gitignore
```

이후 아래와같이 .gitignore 파일을 원하시는대로 수정해 주시면 됩니다.

```bash
## Ignore files ##

.idea
path/to/large/file
```

만약 commit을 진행 한 후 `.gitignore` file에 내용을 수정하셨다면 `git add .` `git commit` `git push`를 하셔도 지정된 파일이 repository에서 삭제되지 않음을 볼 수 있습니다.

이런 경우에는 아래의 명령어를 입력해 주시면 해결 가능 합니다.

```bash
git rm -r --cached . # remove cache

git add .
git commit -m "Update .gitignore"
git push origin master
```

## **마무리**

이번 포스터에서는 git에 관련된 매우 필수적인, 그리고 유용한 명령어들을 살펴보았습니다.

그럼 다음 포스터로 뵙겠습니다.

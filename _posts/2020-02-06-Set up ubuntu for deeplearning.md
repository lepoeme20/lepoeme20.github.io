---
title: "Setup ubuntu for deeplearning"
classes: wide
author_profile: false
comments: true
sidebar:
  - title: "Ubuntu ver.: 18.04"
  - title: "CUDA: 10.0"
  - title: "cudnn: 7.6.5"
use_math: true
sitemap :
  changefreq : daily
  priority : 1.0
categories : 
  - ubuntu
tags: 
  - ubuntu
  - nvidia
  - cuda
  - cudnn
---

```yaml
본 포스터는 https://www.pytorials.com 를 참조하였습니다.
```

이번 포스터에서는 nvidia graphic driver & CUDA를 설치하는 많은 방법들 중 개인적으로 가장 깔끔하고 사용에 문제가 없다고 생각하는 방법을 소개드릴까 합니다.

### **Step 0: 환경 확인**

이번 포스터에서 타겟으로 삼고있는 OS는 ubuntu 18.04 이며 설치하고자 하는 CUDA version은 10.0 입니다.
CUDA의 경우 사용하시는 deeplearning library에 맞추어 필요한 버전을 설치해 주시면 되겠습니다.

### **Step 1: 기본 library update && 필수 library 설치**

```bash
sudo apt-get update && sudo apt-get upgrade -y
uname -m && cat /etc/*release
sudo apt-get install build-essential 
sudo apt-get install cmake git unzip zip
sudo apt-get install python-dev python3-dev python-pip python3-pip
sudo apt-get install linux-headers-$(uname -r)
```
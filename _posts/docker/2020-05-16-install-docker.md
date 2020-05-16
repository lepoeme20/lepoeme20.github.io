---
title: "Deeplearning을 위한 Docker 설치"
author_profile: true
comments: true
use_math: true
sitemap :
  changefreq : daily
  priority : 1.0
categories : 
  - Docker
tags: 
  - ubuntu
  - Docker
# header:
#   teaser: /assets/images/paper/adv_example/FGSM/adv_exm.jpg
toc: true
toc_sticky: true
toc_label: "Page Index"
---

```yaml
진행 환경
- Ubuntu 18.04
- docker version: 19.03
- CUDA & cuDNN 설치 가정
```

**연구실에서 서버 및 도커를 사용할 기회를 주신 지도교수님께 무한한 감사를 드립니다** [(DSBA lab)](http://dsba.korea.ac.kr/)

Docker와 Nvidia docker 설치하기

## **Install Docker**
OS를 설치한 후 GPU에 맞는 CUDA와 cuDNN만을 설치한 후 Docker 설치를 진행합니다.

- 기존 도커 제거(있는 경우 진행)
```console
sudo apt-get remove docker docker-engine docker.io containerd runc
```

- 라이브러리 업데이트 및 설치
```console
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

- 도커 공식 GPC key 추가
```console
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

- 도커 설치
```console
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## **Install Nvidia Docker**
Docker version 
```console
sudo apt-get remove docker docker-engine docker.io containerd runc
```
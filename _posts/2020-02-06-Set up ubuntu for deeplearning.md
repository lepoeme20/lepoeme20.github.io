---
title: "Setup ubuntu for deeplearning"
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
toc: true
toc_sticky: true
toc_label: "Page Index"
---

```yaml
본 포스터는 https://www.pytorials.com 를 참조하였습니다.
```

이번 포스터에서는 nvidia graphic driver & CUDA를 설치하는 많은 방법들 중 개인적으로 가장 깔끔하고 사용에 문제가 없다고 생각하는 방법을 소개드릴까 합니다.

## **Step 0: 환경 확인**

이번 포스터에서 타겟으로 삼고있는 OS는 ubuntu 18.04 이며 설치하고자 하는 CUDA version은 10.0 입니다.
CUDA의 경우 사용하시는 deeplearning library에 맞추어 필요한 버전을 설치해 주시면 되겠습니다.

## **Step 1: Update & upgrade a system**

우선, system update와 upgrade를 진행합니다.

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

## **Step 2: Install Dependencies**

이후 필수적인 dependencies를 설치하여 줍니다.

```bash
sudo apt-get install build-essential
sudo apt-get install cmake git unzip zip
sudo apt-get install python-dev python3-dev python-pip python3-pip
```

## **Step 3: Install linux kernel header**

```bash
uname -r
```

위의 line을 통하여 linux kernel version을 얻을 수 있습니다.
저는 '4.15.0-76-generic' 이네요.

사용하는 linux kernel에 맞는 linux header를 설치하기 위하여 아래와같이 명령어를 입력해 주시면 됩니다:

```bash
sudo apt-get install linux-headers-$(uname -r)
```

## **Step 4: Install NVIDIA CUDA 10.0**

깔끔한 설치를 위해 기존에 설치되어있던 nvidia driver를 삭제하여줍니다.
(처음 설치하시는 분들은 생략 가능합니다.)

```bash
sudo apt-get purge nvidia*

sudo apt-get autoremove

sudo apt-get autoclean

sudo rm -rf /usr/local/cuda*
```

CUDA 설치는 아래와같이 이루어집니다:

```bash
sudo apt-key adv --fetch-keys http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
echo "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64 /" | sudo tee /etc/apt/sources.list.d/cuda.list
sudo apt-get update
sudo apt-get -o Dpkg::Options::="--force-overwrite" install cuda-10-0 cuda-drivers
```

## **Step 5: Reboot the system**

```bash
sudo init 6
```

## **Step 6: Set environment path**

.bashrc 파일에 path를 잡아준 후 `source` 명령어를 통해 재시행 시켜줍니다.
이후 `nvidia-smi`를 통하여 나의 GPU들이 잘 잡혀있는지, driver는 잘 설치되었는지 확인합니다.

```bash
echo 'export PATH=/usr/local/cuda-10.0/bin${PATH:+:${PATH}}' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-10.0/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}' >> ~/.bashrc

source ~/.bashrc
sudo ldconfig
nvidia-smi
```

## **Step 7: Install cuDNN and NCCL**

마지막 step에서는 cudnn과 nccl을 설치해 보겠습니다.

cudnn은 gpu를 보다 잘 사용할 수 있게 도와주는 library라고 생각해 주시면 되시며,
NVIDIA Collective Communications Library (nccl)는 multi-gpu나 multi-node의 최적화를 시켜주는 library 라고 생각해 주시면 됩니다.

먼저 cudnn 설치부터 알아보겠습니다. 설치를 위해 [Nvidia/cudnn](https://developer.nvidia.com/cudnn) 에 접근하여 cuDNN Download > log-in > Download cuDNN v7.6.5 (November 5th, 2019), for CUDA 10.0 > cuDNN Library for Linux 의 순서를 따라주시면 'cudnn-10.0-linux-x64-v7.6.5.32.tgz' 파일을 다운받을 수 있습니다. 만약 다른 버전의 CUDA를 위한 cuDNN을 설치하시는 분이시라면, 가지고계신 CUDA version에 맞는 cuDNN을 다운받아 주세요!

다운 받은 파일을 설치할 차례입니다:

```bash
tar -xf cudnn-10.0-linux-x64-v7.6.5.32.tgz

sudo cp -R cuda/include/* /usr/local/cuda-10.0/include
sudo cp -R cuda/lib64/* /usr/local/cuda-10.0/lib64
```

끝으로 NCCL 설치를 해보겠습니다. 설치를 위해 [Nvidia/nccl](https://developer.nvidia.com/nccl/nccl-download) 에 접근하시어 log-in > Download NCCL v2.5.6, for CUDA 10.0, Nov 19,2019 > O/S agnostic local installer 의 순서를 따라주시면 'nccl_2.5.6-1+cuda10.0_x86_64.txz' 파일을 다운 받을 수 있습니다. 마찬가지로, 다른 버전의 CUDA를 가지고 계신 분은 해당 버전에 받는 nccl을 받아주시기 바랍니다.

마지막 명령어 입니다:

```bash
tar -xf nccl_2.5.6-1+cuda10.0_x86_64.txz

cd nccl_2.5.6-1+cuda10.0_x86_64

sudo cp -R * /usr/local/cuda-10.0/targets/x86_64-linux/

sudo ldconfig
```

## **마무리**

이로써 deep learning을 위한 nvidia driver 설치와 부수적인 library 설치를 마쳤습니다.
모든 분들이 성공적으로 설치를 마치셨기를 바라면서 글을 마무리 짓겠습니다.

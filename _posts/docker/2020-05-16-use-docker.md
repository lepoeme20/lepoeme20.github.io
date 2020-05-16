---
title: "Deeplearning을 위한 Docker 사용하기"
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
  - container
  - image
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
- CUDA 10.2 & cuDNN 설치 
```

**연구실에서 서버 및 도커를 사용할 기회를 주신 지도교수님께 무한한 감사를 드립니다** [(DSBA lab)](http://dsba.korea.ac.kr/)

Docker에서 image와 container를 생성하고 사용해봅시다.

## **Image**
[Docker Hub](https://hub.docker.com/)에 들어가시면 github에 repository를 관리하는 것 처럼, official하게 또 개인이 개인의 목적을 가지고 생성한 docker image들이 있습니다. Ubuntu, CentOS와 같은 OS는 물론이며 postgresql, mysql, mongoDB와 같은 툴들도 이미지화 되어 업로드 되어 있죠. 본 포스트에서는 deeplearning을 하기 위한 환경을 구축하려 합니다.

Deep learining framework을 사용하기 위한 가장 대표적인 이미지는 [Deepo](https://hub.docker.com/r/ufoym/deepo/) 입니다. 본 이미지에는 pytorch, tensorflow는 물론 keras, theano, 심지어 darknet까지 일반적으로 필요로 하는 라이브러리들을 모두 포함하고 있습니다. Docker hub에 있는 deepo를 사용하기 위해서는 git pull과 같이 `docker pull ufoym/deepo:all-jupyter-py36-cu102`와 같은 명령어를 사용하면 됩니다. 하지만 이와같이 모든 라이브러리가 들어가있는 이미지는 매우 무겁기 때문에(10G 이상) 각자 사용하는 환경에 맞게 custom을 해주시는것을 추천 드립니다. 

### Create Dockerfile
Dockerfile을 사용하여 custom image를 build하는 방법을 살펴보겠습니다.
우선 Dockerfile을 생성할 path로 이동해줍니다.

```console
mkdir docker # 원하는 이름으로 변경 가능
vim Dockerfile # Dockerfile 생성 및 수정
```

위의 라인에서 vim 대신 vi나 nano처럼 편하신 명령어를 사용하셔서 Dockerfile을 아래처럼 생성하겠습니다.
```console
# Dockerfile

# Pull bse image
# - 저는 cuda 10.2에 ubuntu 18.04를 사용하고 있기 때문에 아래의 이미지를 가지고 왔습니다.
# - docker hub에서 nvidia official image를 확인하시고 상황에 맞는 이미지를 가지고 오시면 되겠습니다.
FROM nvidia/cuda:10.2-base-ubuntu18.04
ENV LC_ALL=C.UTF-8

# Install basic utilities
# - ubuntu에 필요한 기본적인 것들을 설치해줍니다.
# - 더 원하시는 util이 있으시면 아래 라인에 추가 혹은 삭제 해주시면 됩니다.
RUN . /etc/os-release; \
                printf "deb http://ppa.launchpad.net/jonathonf/vim/ubuntu %s main" "$UBUNTU_CODENAME" main | tee /etc/apt/sources.list.d/vim-ppa.list && \
                apt-key  adv --keyserver hkps://keyserver.ubuntu.com --recv-key 4AB0F789CBA31744CC7DA76A8CF63AD3F06FC659 && \
                apt-get update --fix-missing && \
                env DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade --autoremove --purge --no-install-recommends -y \
                        build-essential \
                        bzip2 \
                        ca-certificates \
                        curl \
                        git \
                        libcanberra-gtk-module \
                        libgtk2.0-0 \
                        libx11-6 \
                        sudo \
                        graphviz \
                        vim-nox

# Install miniconda
# - python에서 ML/DL을 사용할 것이기 때문에 여러모로 편리한 miniconda를 설치합니다.
# - 환경변수도 함께 지정해줍니다.
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV PATH /opt/conda/bin:$PATH
RUN apt-get install -y wget bzip2 ca-certificates \
    libglib2.0-0 libxext6 libsm6 libxrender1 \
    git mercurial subversion
RUN wget --quiet https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc
RUN apt-get install -y curl grep sed dpkg && \
    TINI_VERSION=`curl https://github.com/krallin/tini/releases/latest | grep -o "/v.*\"" | sed 's:^..\(.*\).$:\1:'` && \
    curl -L "https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini_${TINI_VERSION}.deb" > tini.deb && \
    dpkg -i tini.deb && \
    rm tini.deb && \
    apt-get clean

# Install python packages
# - python에서 사용할 패키지를 설치합니다.
RUN pip install torch torchvision && \
    pip install cython && \
    pip install simplejson && \
    conda install av -c conda-forge && \
    pip install jupyterlab jupyterhub

# 혹시 python 패키지를 설치하실때 원래 사용하시던 패키지에서 생성한 requirements.txt 파일을 가지고 있고,
# 해당 파일을 사용하여 패키지 설치를 하고싶으시다면 아래와 같은 라인들을 추가해주시면 됩니다.

COPY requirements.txt /tmp
WORKDIR /tmp
RUN pip install -r requirements.txt
```

### Build docker image
생성한 Dockerfile을 사용하여 image를 빌드해보겠습니다.

```console
# nvidia-docker를 사용하는 경우
nvidia-docker build -t $image_name .

# nvidia-docker 없이 docker만 사용하는 경우
docker build -t $image_name .
```

일반적으로 docker image 이름은 identity/name 정도로 지정해주시면 됩니다. 예를 들어 제가 가장 많이 사용하는 이미지 이름은 sw/base 이며, 생성한 이미지는 `docker image ls`를 통해 확인할 수 있습니다.

### Create container
빌드한 Image 위에 container를 생성해보겠습니다.

```console
# nvidia-docker를 사용하는 경우
nvidia-docker run -td --ipc=host --name $container_name -v ~/code/and/data/path/on/your/host:/folder/name/on/docker -p 8888:8888 -p 6006:6006 $Image_name

# nvidia-docker 없이 docker만 사용하는 경우
docker run --gpus all -td --ipc=host --name $container_name -v ~/code/and/data/path/on/your/host:/folder/name/on/docker -p 8888:8888 -p 6006:6006 $Image_name
```

option들은 아래와 같습니다:
- --gpus all (docker): nvidia-docker는 자동으로 GPUs를 사용할 수 있지만, docker만 사용하는 경우 본 옵션을 사용해야만 GPU 자원들을 인식합니다.
- -t: tty 입니다.
- -d: detacth 입니다. 저는 컨테이너를 생성하고 후에 따로 실행하는 방식을 선호하기 때문에 해당 옵션을 항상 넣어둡니다.
- --name: 생성 될 container의 이름 입니다.
- -v: mount할 volumn의 이름입니다. Host OS에 code와 data가 담긴 폴더:container에 mount할 volumn이름 으로 지정하시면 됩니다.
- -p: 사용할 port number 입니다.
- 이후 container를 올릴 image의 이름을 지정해주시면 해당 image위에 container가 생성됩니다.

### Run docker container

위에서 생성한 container를 실행해보겠습니다.

```console
# bash
docker exec -it $container_name bash

# jupyterlab
docker exec -it $container_name jupyter lab --no-browser --ip=0.0.0.0 --allow-root --NotebookApp.token= --notebook-dir='/folder/name/on/docker'
```

위의 라인을 실행시키면 생성한 container에 접속할 수 있습니다. 접속을 하신 후 `ls`를 통해 확인해 보시면 일반적인 우분투와 같이 폴더들이 잡혀 있는 것을 확인할 수 있으며, **container를 생성할 때 -v 옵션으로 지정하셨던 volumn이 폴더 형태로 들어 있음을 보실 수 있습니다.** 해당 폴더에 접근하시어 원하시는 code를 실행시켜 주시면 됩니다!

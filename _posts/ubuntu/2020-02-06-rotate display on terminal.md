---
title: "Rotate display on terminal"
author_profile: true
comments: true
use_math: true
sitemap :
  changefreq : daily
  priority : 1.0
categories : 
  - Ubuntu
  - Remote
tags: 
  - ubuntu
  - xrandr
  - display 
  - rotate
# header:
#   teaser: /assets/images/paper/adv_example/FGSM/adv_exm.jpg
toc: true
toc_sticky: true
toc_label: "Page Index"
---

이번 포스터에서는 terminal에서 display를 회전하는 방법에 대하여 살표보겠습니다.

저는 보조 모니터를 세로형으로 사용하고 있습니다. 이런 상황에서 vnc viewer와 같이 원격 viewer를 사용할 때 세로형 모니터를 Landscape (정방향)으로 돌려주지 않으면 매우 불편한 상황들이 많기 때문에 매우 유용하게 사용하는 명령어 중 하나 입니다.

우선 `xrandr` 명령어를 통해 어떤 port (DP-0, DP-1, HDMI-0, and etc)에 screen이 있는지 확인할 수 있습니다.

![xrandr example](/assets/images/ubuntu/rotate_display.png "xrandr example"){: width="650" height="550"}

저의 경우에는 HDMI-0과 DP-2에 연결이 되어 있네요.
HDMI-0을 회전한 후 정렬까지 해보겠습니다:

```bash
xrandr --output HDMI-0 --rotate normal
xrandr --output DP-2 --pos 3840x0
```

이후 다시 세로형 모니터로 전환하기 위해 아래의 명령어를 입력하시면 됩니다:

```bash
xrandr --output HDMI-0 --rotate left
xrandr --output DP-2 --pos 2160x800
```

position같은 경우에는 해상도 별로 둬야하는 위치가 달라지기 때문에 각자 상황에 맞게 변경해 주시면 되겠습니다!


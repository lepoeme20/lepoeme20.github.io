var store = [{
        "title": "Explaining and Harnessing Adversarial Examples",
        "excerpt":"AGENDA 1. What are the adversarial examples 2. Explaining and Harnessing Adversarial Examples 논문 설명   Adversarial example에 대하여 생소하신 분들이 있으실 수 있으니, 우선 간략히 해당 개념에 대하여 영상과 함께 설명 드리겠습니다. 그 후 본 포스트의 주제인 Explaining and Harnessing Adversarial Examples 논문에 대하여 설명 드리겠습니다.   Adversarial example이란 무엇인가?     위의 영상을 보시면 바나나가 있습니다. 바나나가 홀로 있을 때와, 영상 초반에 깨끗해 보이는 이미지 패치 (사람이 들고 있는 작은 이미지)를 바나나 옆에 두었을 때는 학습해둔 모델이 100%에 가까운 confidence로 바나나를 분류 하고 있습니다(초록색 그래프). 하지만 영상 중반부에 나오는 이상하게 생긴 이미지 패치를 바나나 옆에 두게 되면 모델은 이전과 다르게 100%에 가까운 confidence로 바나나를 토스터기로 오분류 하고 있음을 볼 수 있죠. 이와 같이 모델이 오분류를 하게끔 하는 패치를 “Adversarial patch”, 모델이 오분류를 하게끔 noise를 더한 이미지를 adversarial example이라 부릅니다.   Adversarial example의 통상적인 정의는 아래와 같습니다:     Original input에 매우 작은 noise를 더하여(perturbation) 사람의 눈에는 차이가 없어 보이나 분류기는 잘못 분류 하도록 변형된 input    Adversarial example을 만들어 내는 행위를 adversarial attack이라 칭하며, 이를 방어하는 행위는 defense against adversarial attack 이라 부릅니다.  Adversarial attack의 종류와 의미는 다음과 같습니다(여기서 말하는 종류는 세세한 모델이 아니라 큰 흐름을 의미합니다):      White-box attack - 공격자가 target model (e.g. classifier)의 parameters를 알고 있는 상황   Black-box attack - 공격자가 target model (e.g. classifier)의 parameters를 모르는 상황   Targeted attack - Adversarial example이 공격자가 원하는 class로 target classifier가 오분류 하도록 공격하는 방식   Untargeted attack - Adversarial example이 true class가 아닌 어떠한 class로 target classifier가 오분류 하도록 공격하는 방식   한 가지 더 언급할 점은 black-box attack의 경우 공격자가 target model의 parameter를 모르기 때문에 공격이 불가능 합니다. 이에 공격자가 가지고 있는 데이터를 이용하여 target model의 분류 경계면을 근사하는 모델을 하나 만들어 낸 후 해당 모델의 parameter를 이용하여 adversarial example을 생성하는 flow를 가집니다. 이러한 특성상 black-box attack이 방어를 하는 입장에서는 white-box attack보다 쉬운 경향을 띄게 됩니다.         Fig 1. Examples of adversarial examples  Fig 1.에서 위쪽 행은 clean images이며 아래쪽 행은 adversarial examples입니다. 이미지 아래 보이는 숫자와 기호는 모델이 위의 이미지를 보고 분류한 class를 나타내고 있습니다. 자율주행 자동차가 카메라로 사물을 인식하며 움직이다가 위와 같이 adversarial example을 만나 오분류를 하게 된다면 정말 끔찍한 일이 아닐 수 없습니다. 이러한 문제 인식을 통하여 모델 자체(연구) 뿐만 아니라 실생활에서도 본 문제를 꼭 해결해야 한다는 경각심을 가질 수 있습니다.   Explaining and Harnessing Adversarial Examples   Adversarial example이 대략 이런거구나 라고 생각 하셨을테니, 이제 본격적으로 본 논문을 소개 드리도록 하겠습니다.   본 논문에서는 adversarial example을 연구함으로써 엔지니어들의 학습 algoritms에 대한 blind spots을 찾을 수 있다고 언급하고 있습니다. 저에게는 이 말이 보다 사람다운 모델과 사람다운 학습 방식을 찾아야 한다는 의미로 들리더군요. 또한 이전까지는 adversarial example에 대하여 모델은 완전하나 이를 사용하는 engineer가 매우 비선형적인 Deep Neural Network (DNN)을 제대로 이해하지 못하고 모델을 제대로 학습시키지 못했기 때문에 발생하는 특수 케이스라고 여겼습니다. 하지만 본 논문에서는 이러한 추측이 틀렸음을 실험을 통하여 보여주고 있죠.   한 가지 재미 있는 사실은 본 논문에서 activation fuction으로 기존에 사용하던 sigmoid 혹은 ReLU를 사용하지 않고 RBF를 사용하면 adversarial noise에 보다 강건한 모델이 됨을 언급하고 있습니다.     다시 말해 DNN은 우리가 생각하는 것 만큼 non-linear 하지 않습니다.    생각을 해본다면 ReLU의 경우 최적화를 위해 태생이 매우 linear한 구조를 띄고 있습니다. 또한 sigmoid의 경우에도 모델을 학습 하다 보면 선형성을 지닌 부분에 많은 activation이 된다는 언급도 본 논문의 저자들은 잊지 않고 있네요.   하지만 이렇게 말로써 우리가 비선형적이라고 생각했던 모델은 사실 선형적이었어! 라고 한다면 이렇게까지 주목받는 논문이 되지 못했겠죠. 저자들은 매우 선형적인 공격 방식으로 생성한 adversarial example이 ‘비선형적’ 이라고 알려진 DNN (maxout)을 얼마나 잘 속이는지 실험을 통해 보여줍니다. 본 논문에서 사용하는 공격 방식은 Fast Gradient Sign Method (FGSM)이라고 불리며 식은 아래와 같습니다:     FGSM:     ,     where J는 target model의 목적식, $\\theta$는 모델의 파라미터, x와 y는 각각 input과 output 이며 $\\epsilon$은 노이즈의 크기를 결정하는 상수    위에서 구한 $\\eta$를 원본 이미지에 더해주어 나온 이미지가 adversarial example이 되며 식은 아래와 같습니다:        본 포스트의 상단부에서 말씀드린 adversarial example의 통상적인 정의에 따라 공격자는 사람이 인지하지 못할 만큼 작은 $\\eta$를 원본 이미지에 더하여 target model을 속이는 것을 목표로 하고 있습니다.         Fig 2. FGSM   위의 2번 이미지를 보면 57.7%의 confidence를 가지고 팬더를 팬더로 인식하는 모델을 속이기 위하여 FGSM 방식으로 얻은 noise를 원본 이미지에 더해주고 있습니다. 이러한 과정을 거쳐 나온 이미지, adversarial example은 모델이 99.3%의 confidence로 긴팔 원숭이로 분류하고 있음을 확인 할 수 있습니다. 심지어 생성된 노이즈는 8.2%의 confidence로 선형동물로 인식되는 매우 의미 없는 문자 그대로의 nosie인데도 말이죠. 그리고 위에서 노이즈 앞에 보이시는 0.007이라는 수가 위 식에서 보셨던 noise의 크기를 결정하는 $\\epsilon$입니다.   본 논문에서 저자들은 adversarial training이라는 개념을 통하여 이러한 공격을 어느정도 막을 수 있다고 언급하고 있습니다. 하지만 최근 연구 동향은 이러한 adversarial training이 여러 공격 패턴에 robust하지 못하다는 점을 조금 critical하게 생각하고 크게 사용하지 않는 추세 입니다. Adversarial training은 간략히 말해서 생성된 adversarial example을 모델이 학습하는 동안 clean data와 함께 학습시키는 방식 입니다. 직관적으로 생각해봐도 공격 방법이 늘어날수록 모든 공격방법으로 얻은 adversarial example을 획득한 다음 모든 data를 학습에 이용해야 하니 상당히 비효율 적일 것 같네요.   마무리   이로써 첫 번째 포스팅이 마무리 되었습니다. 어떠신가요? 저는 이 분야를 공부하면서 매우 새롭고 신비로웠습니다. 지금도 그렇구요. 여러분들도 조금의 흥미 그리고 믿고 있던 DNN에 대해서 회의를 느끼는 시간이 되셨으면 좋겠습니다.  ","categories": ["adversarial example"],
        "tags": ["adversarial examples","ICLR","Explaining and Harnessing Adversarial Examples","FGSM","fast gradient sign method"],
        "url": "http://localhost:4000/archive/FGSM",
        "teaser":"http://localhost:4000/assets/images/500x300.png"},{
        "title": "Introduction to Deep Learning-MIT 6.S191",
        "excerpt":"Introduction to Deep Learning  AGENDA 1. Introduction of basic concepts for Deep learning   이미 너무 유명하고 우리에게 친숙한 Stanford 에서 제공하는 CS231n 수업 외에도 deep learning을 학습하기 위한 좋은 material이 있지 않을까? 라는 생각에서 시작하여 2019년 MIT에서 제공하는 deep learning 수업을 review 해볼까 합니다. 전반적으로 CS231n보다 범위가 넓고 깊이가 얕은 특성이 있는 듯 합니다.   사족이지만 해당 class의 final project의 결과에 따라 우수한 학생에게는 RTX 2080 Ti를 상으로 제공한다고 하네요…. MIT 만세   Deep learning은 무엇인가?      “An intelligence as the ability to process information to inform future decision.”    수업 진행자가 하는 말을 그대로 가지고 와보았습니다. 이는 결국 데이터의 패턴을 잘 파악하여 미래 데이터에 적용한 후 정보를 추출하는 일련의 과정이 됩니다. 그렇다면 어떠한 점들이 machine learning과의 차이점일까요?         Fig 1. The differences between AI, ML, and DL   위의 그림은 Artificial intelligence (AI), machine learning (ML), 그리고 deep learning (DL)의 차이를 나타내고 있습니다. AI가 가장 큰 범위의 개념으로 기계가 사람과 같이 행동할 수 있는 모든 기술을 의미하고 있으며 ML은 AI에 속하는 개념으로 어느정도 자동화가 되어 학습된 패턴을 통하여 미래 데이터에 대하여 의사결정을 내리는 행위를 의미합니다. 마지막으로 최근 비약적인 속도로 발전하고 있는 DL분야는 ML에 속하는 굉장히 좁은 영역으로 ML에 비해 사람의 손을 덜 타는, 예를 들어 image domain에서 이미지를 잘 표현하기 위하여 여러 방법으로 hand-crafted features를 추출하는 것이 기존 ML의 중요한 이슈였다면 deep learning에서는 모델이 알아서 feature를 뽑도록 합니다, 보다 지능적인 프로세스 라고 표현할 수 있을 것 같습니다.   그렇다면 우리는 왜 deep learning을 해야 할까요?   가장 단순하게 이야기 하면 기존에 사용하던 hand-crafed features에 비하여 우리의 손을 거치지 않고 기계가 직접 중요하다고 판단한 features를 사용하는 것이 많은 분야에서 성능이 ‘훨씬’ 더 좋기 때문일 것입니다.   Feed forward propagation         Fig 2. MLP   일반적인 neural network의 feed forward propagation은 위 그림에서 보이는 와 같은 input들과 와 같은 weight들의 dot product 로 나온 값을 비선형 함수에 input으로 사용하는 과정들을 반복한 후 최종 output이 산출 됩니다. 이 과정에서 추가되는 bias term은 activation function을 shift하는 효과를 준다고 하네요.   Neural network는 사실 Fig 2.에서 가운데 위치하는 hidden layer를 여려층 쌓음으로 매우 복잡한 결합함수 형태를 가집니다. 만약 선형함수를 계속 결합한다면 어떻게 될까요? 최종적인 함수의 형태도 선형 함수가 되겠죠? 그렇다면 힘들게 쌓아올린 hidden layer들이 큰 의미를 갖기 어려울 것입니다. 이러한 문제를 해결하기 위하여 neural network에서는 비선형함수인 activation function을 사용하여 모델에 비선형성을 추가해 줍니다. 이러한 특성 덕분에 neural net은 매우 비선형적인 현실 데이터에서도 높은 성능을 지닐 수 있게 됩니다.   가장 유명하고 오래 쓰인 activation function은 sigmoid 함수 입니다. sigmoid 함수는 인풋을 0-1로 바꾸어주기 때문에 모델을 통하여 확률을 구하고자 하는 경우에 상당히 유용한 함수가 될것이라고 강의자는 말하고 있습니다. 또 하나의 유용하고 유명한 함수는 Rectified Liner Unit (ReLU) 입니다. ReLU의 경우 0보다 작은 input은 무시하고 0보다 큰 값에 대하여서는 인풋이 아웃풋이 되는  형태를 띄고 있습니다. 이러한 특성 때문에 picewise linearity라고 불리죠. 이렇게 단순한 함수로 충분한지 의심이 드실텐데요, ReLU는 굉장히 선형적으로 생겼음에도 불구하고 모든 중요한 속성을 보존함과 동시에 연산이 쉽기 때문에 최근 대부분의 모델에서 사용하고 있습니다.   Building neural network with Perceptrons   그림 2에서 은 inputs과 weights를 사용한 weighted sum 형태가 됩니다. 이렇게 weighted sum이 된 값에 activation function을 거쳐 neuron 하나의 output이 산출되죠. Hidden unit이 많아져도 neuron마다 찬찬히 살펴보면 단순히 하나의 neuron을 가진 perceptron network (그림 2) 와 다를바가 없습니다. 물론 weights들의 값이 다르기 때문에 의 값은 각각 다르겠지요. 이렇게 빽빽하게 weight가 연결된 구조를 우리는 dense layer라고 부릅니다. Deep Neural Network또한 이러한 구조와 크게 다르지 않은데, 단순히 계속적으로 엄청 많이 계속 계속 이러한 dense layer을 stack하게 되면 그것이 DNN이 됩니다.   Applying Neural Networks   굉장히 뜨겁고 모든 것을 해줄것만 같은 deep learning model또한 물론 만능이 아닙니다. 사람이 봤을때도 합리적인 판단을 모델이 하기 위해서 우리는 모델을 ‘잘’ 학습 시켜야만 하죠. 우리는 실제 정답을 ground truth, model이 예측한 정답을 predicted output이라 부르며 이 둘의 차이를 점차 줄여나가는 과정을 학습이라 부릅니다. 이처럼 실제 정답과 모델이 추측한 정답을 줄여나가기 위하여 세우는 함수인 Loss function (NLL, cross-entrophy, MSE와 같은 다양한 방법들이 있습니다)을 정의하는 것은 machine learning의 art에 속합니다.   Training Neural Networks   위에서 우리는 모델을 잘 학습 시켜야 한다고 말하였습니다. 그렇다면 학습을 시킨다는 것은 무엇을 의미하는 것일까요? 모델을 학습 시키는 궁극적인 목표는 모델이 가지고 있는 파라미터 W (weights)를 최적화 하는 것입니다. 여기서 최적화의 의미는 predicted output과 ground truth의 차이를 최소화 하는 것이 됩니다. 하지만 Neural network는 위에서 말한 것 처럼 상당히 많은 layer (function)가 stack되어 있기 때문에 최적해를 closed form으로 구할 수 없는 문제점을 가지고 있습니다. 이러한 어려운 상황에서 해를 구하기 위해서 우리는 gradient descent와 backpropagation을 사용합니다.   Neural Networks in practice   Optimization   DNN은 매우 복잡한 결합함수 형태를 띄고 있기 때문에 구조적으로 매우 많은 local minimum이 존재하고 initial point에 따라 이런 local minimum에 빠질수도, 저런 local minimum에 빠질 수도 있습니다. 이 때문에 optimization (adam, adadelta, RMSprop, …) 연구도 매우 활발히 진행 되었으나 최근에는 주춤하는 모습인것 같습니다. 본인이 선호하는 optimizer를 사용하는 추세이며 ‘local optimum에 빠지더라도 충분히 좋다’ 라는게 학계의 정설 입니다.   Overfitting   Model은 새로운 데이터 (test set)에 대해서도 강건함을 목표로 학습됩니다. 다시 말해, 처음 보는 데이터에 대해서도 학습때의 성능을 보여주길 바라며 모델을 학습 시키죠. 하지만 간혹 학습 데이터를 완전히 외워버리는 모델들이 등장하곤 하는데 이러한 경우 새로운 데이터에 대한 성능은 현저히 떨어질 수 밖에 없습니다. 학습 데이터를 온전히 외워버리기 때문에 새로운 데이터에 대해서 대처하지 못하는 상황이기 때문이죠. 이러한 현상을 우리는 overfitting이라 부릅니다.   Regulaization   이러한 overfitting 현상을 완화하기 위하여 사용하는 방법이 regularization입니다.  가장 유명하고 널리 사용되는 방법은 dropout으로 특정 neuron을 deactivation 시키는 방식입니다. 이러한 방식을 통하여 모델이 특정 witght에 온전히 의존하지 못하게 하는 것이죠.   두 번째 방식은 early stopping이라 불리는 트릭 입니다. 이름과 같이 말 그대로 빠르게 학습을 중단시키는 방식인데 그 기준은 training error는 계속 낮아지지만 validation error가 올라가는 지점입니다. Training set은 학습에 계속 사용 되지만 validation set은 학습에 사용되지 않기 때문에 validation error가 올라간다는 것은 모델이 overfitting되어 test set의 performance도 떨어질 것이라는 가정을 담고 있는 것이죠.   마무리   기본적인 컨셉을 잡는 강의었습니다. 구글이나 유튜브에 ‘MIT 6.S191’를 검색하시면 슬라이드와 강의 영상을 쉽게 찾으실 수 있으니 관심 있으신 분들은 꼭 본 강의를 참고 부탁드립니다!  ","categories": ["lectures","basic"],
        "tags": ["MIT","Deep learning","Lecture","Basic","activation function","Regulaization","overfitting","optimization"],
        "url": "http://localhost:4000/archive/Introduction-to-Deep-Learning-MIT-6.S191",
        "teaser":"http://localhost:4000/assets/images/500x300.png"},{
        "title": "Recurrent Neural Networks-MIT 6.S191",
        "excerpt":"Recurrent Neural Networks-MIT 6.S191  AGENDA 1. Introduction of basic concepts for RNN   움직이는 공을 찍고 있는 동영상을 일시 정지 했다고 상상해 봅시다. 멈춘 화면을 보고 다음 시점에 공이 어느 방향으로 움직일지 예측하는 것은 매우 어려운 일입니다. 하지만 만약 이전 시점들이 주어진다면 어떨까요? 공의 궤적을 통해 다음 시점에 이동할 방향을 예측하기 매우 쉬워질 것입니다. 이처럼 순서에 영향을 받는 데이터를 sequence data라고 부르며 예로는 오디오나 텍스트, 그리고 동영상등이 있습니다.   A sequence Modeling Problem: Predict the Next Word   예를 들어 다음과 같은 문장이 있다고 합시다. “This morning I took my cat for a walk.” 이 문장에서 우리는 앞 부분의 맥락을 통하여 가장 마지막 단어인 walk를 예측하고 싶습니다. 근본적으로 마지막 단어를 예측하기 위하여 우리는 단어를 vectorization할 필요가 있겠죠.   Bag of Words   가장 대표적인 vectorization 방식은 BoW로 불리는 Bag of Words 입니다. 이름 그 대로 단어들의 가방이라는 의미를 지니는데요, 문서(corpus)에 들어 있는 모든 단어의 수를 차원으로 가지는 vector에서 단어가 등장하면 1, 등장하지 않으면 0을 표기하는 방식으로 문장을 embedding(vector화) 하는 방식입니다. 예를 들어보죠. “The food was good, not bad at all.” Vs. “The food was bad, not good at all”라는 두 문장을 보면 다음과 같은 단어들이 등장합니다. [the, food, was, bad, not, good, at, all]. 여기에 보다 직관적인 이해를 위해 apple, eat이라는 단어가 다른 문장에서 등장했다고 가정 하겠습니다(따라서 등장하는 전체 단어는 [the, food, was, bad, not, good, at, all, apple, eat]이 됩니다). 이러한 상황에서 앞의 두 문장을 BoW방식으로 embedding 하면 다음과 같습니다. 첫번째 문장은 [1, 1, 1, 1, 1, 1, 1, 1, 0, 0]와 같이 되겠네요. 그렇다면 두 번째 문장은 어떨까요? 놀랍게도 두 번째 문장 역시 [1, 1, 1, 1, 1, 1, 1, 1, 0, 0]와 같은 형태를 띕니다. “The food was good, not bad at all.”와 “The food was bad, not good at all”는 정 반대의 의미를 가지는데 BoW 방식을 통해 embedding을 하게 되면 두 문장의 벡터가 정확히 동일해지는 크나큰 문제가 생깁니다.   Use a really big fixed window   또 다른 방식이 있습니다. 바로 corpus에 등장하는 모든 단어를 one-hot vector로 encoding 할 수 있지 않을까? 라는 생각에서 나온 방식인데요, 예를 들어 “This morning took the cat … “이라는 문장이 있으면 [1 0 0 0 0 (this), 0 0 0 0 1 (morning), 0 0 1 0 0 (took), 0 1 0 0 0 (the), 0 0 0 1 0 (cat), …]과 같이 vectorization을 하는 것 입니다. 그렇다면 이러한 embedding은 아무런 문제가 없을까요? 학습을 가정해 본다면 위의 문장을 보는 neural network는 무리 없이 this morning을 어떤 특정한 ‘것’으로 인지할 것입니다. 하지만 this morning이 앞 부분이 아니라, 뒷 부분에 등장하는 문장이 있다고 한다면 “This morning took the cat … “이라는 문장으로 학습되고 있는 neural network의 문장 뒤를 담당하는 parameters들은 지금까지 보지 못했던 this morning을 접해야 하기 때문에 this morning을 계속해서 이전과 같은 어떠한 ‘것’ 으로 인지하기는 어렵게 됩니다.   sequence modeling을 위하여 우리는 다음과 같은 사항을 고려해야 합니다 (input이 text라 가정하고 기술하겠습니다)      다양한 길이의 문장을 다루어야 한다   긴 길이의 문장을 다루어야 한다   단어간의 순서 정보를 보존해야 한다   sequence간의 parameters들이 공유 되어야 한다   이러한 특성을 다루기 위하여 RNN이 등장하였습니다.   RNN 구조      One to One  - 전통적인 NN -&gt; sequence를 다루는데 적합하지 않음   Many to One - 감성분석과 같은 분류   Many to Many - 매우 다양하게 활용 가능 : 본 수업의 타겟   위에 기재되어 있는 RNN을 아래 그림과 매칭시켜 보시면 이해가 편하실 것 같습니다.         Fig 1. RNN의 종류   Standard RNN gradient flow   최초에 제안된 RNN은 아래와 같이 생겼습니다.        Fig 2. Vanilla RNN 구조도   최초에 제안된 RNN을 vanilla RNN이라 부르며, cell의 연산은 아래의 식을 따릅니다:            위 식에서 확인할 수 있듯이 vanilla RNN은 이전 state의 hidden vector와 현재 state의 input vector간의 선형 결합으로 이루어져 있습니다. 이러한 재귀적인 구조를 통해 CNN과는 다르게 데이터의 sequence 정보를 보존할 수 있지만 아래와 같은 문제점들을 지닙니다.   Exploding gradients   많은 gradients value가 1보다 큰 경우를 의미하며, 이 경우 gradient가 발산하여 어떠한 optimization도 할 수 없게 됩니다. 이러한 문제는 gradient clipping을 통해 다소 간단하게 해소 가능 합니다. Gradient clipping이란 단순하게 gradient가 계속 커지는 것을 막기 위하여 특정한 값을 곱해주어 크기를 축소시키는 방법 입니다.   Vanishing gradients   사실 이 부분이 해소가 어려워 vanilla RNN이 등장했을 때 많이 환영받지 못하였습니다. Vanishing gradients 문제는 많은 gradients value가 1보다 작은 경우 gradient가 사라지는 문제를 뜻합니다. 이를 해소하기 위하여서는 activation function을 변경하거나, 좋은 Weight 초기화 방법을 사용하는 방식이 있지만 이보다는 근본적으로 모델 구조를 변경하는 것이 가장 강건한 방식 입니다.   vanishing gradient가 왜 문제인가?   Gradient가 계속 작아지는 상황을 상상해보죠. 20단어로 이루어진 문장이 있는데 10단어째 부터 gradient가 매우 작아진다면 결국 첫 번째 단어까지 gradient 전파가 불가능해겠죠? 이런 상황에서는 RNN의 학습이 제대로 이루어질리 만무합니다. 이를 해소하기 위하여 수업에서는 아래와 같은 트릭들을 설명합니다.      Trick 1 : Activation function을 tanh에서 ReLU를 사용하는 것이 도움이 된다   Trick 2 : parameter 초기화를 identity matrix로 하면 도움이 된다   Trick 3 : LSTM, GRU와 같은 gated cell을 사용하는 것이 가장 강건한 해결책이 된다   LSTM에 대하여 알아보자!   vanilla RNN에서 발전한 형태인 LSTM에 대해서 알아보겠습니다. 우선 모델 구조는 아래와 같습니다.        Fig 3. LSTM 구조도   딱 보기에도 RNN보다 훨씬 복잡한 구조임을 확인할 수 있습니다. 수식을 통해 어떤 부분이 추가되었는지 살펴보죠.      LSTM:                         LSTM은 기본적인 RNN이 sequence가 길어짐에 따라 발생하는 gradient descent문제를 해결하고자 등장하였습니다. LSTM은 input gate ($i_t$), output gate ($o_t$), 그리고 forget gate ($f_t$)와 같은 gate unit을 활용합니다. 각 gate들은 sigmoid layer로 구성되어 있으며 output이 1 인 경우 해당 값을 온전히 유지하게 되며, 0인 경우에는 전혀 사용하지 않습니다. 이러한 연산을 통하여 기존에 vanilla RNN에서는 할 수 없었던 sequence의 정보를 얼마나 기억할지와 잊어버릴지를 파라미터를 통하여 학습할 수 있게 된 것이죠! 사실 LSTM이 가지는 가장 큰 특성은 cell state이며 LSTM의 구조를 나타내는 Figure 3의 상단 부분 수평선이 바로 그 cell state입니다. Cell state는 gates들을 통하여 정보를 추가하거나 제거하는 역학을 맡고 있습니다. LSTM는 우선 forget gate를 통하여 버릴 정보를 선택합니다. Forget gate와 input gate는 현 시점의 input과 이전 시점의 hidden state를 받아 0과 1 사이의 output을 가지며, 앞의 두 gates들을 통하여 LSTM cell은 잊을 정보와 기억할 정보를 cell state에 update 하게 되는 것이죠. $\\widetilde{C}_t$는 최종적으로 updated된 cell state를 나타냅니다. LSTM의 output ($h_t$)은 vanilla RNN과 같이 이전 state의 hidden state value와 현재의 output을 통해 산출됩니다.   GRU 대하여 알아보자!   LSTM과 같이 vanishing gradient문제를 해결하면서도 파라미터의 수를 줄여 계산 복잡도를 감소시키기 위해 GRU model이 소개되었습니다.  GRU는 cell state와 hidden state를 결합하여 하나의 hidden state로 나타냄과 동시에 forget gate와 input gate를 결합한 update gate를 제안 합니다. Figure 4에서 확인할 수 있듯이 GRU의 구조는 LSTM에 비해 훨씬 간단합니다.        Fig 4. GRU 구조도  GRU가 가지는 cell들은 아래와 같습니다:      GRU:                    $z_t$는 update gate의 계산 방식입니다. GRU의 reset gate는 모델이 과거 정보의 얼마만큼을 다음 스텝으로 전달해야 하는지 결정하는데 도움을 줍니다. $r_t$가 바로 reset gate이며 이름처럼 지난 정보를 얼마나 사용하지 않을지를 결정하고 있습니다. 나머지 부분은 vinilla RNN과 LSTM에서 보신 것과 매우 흡사 합니다.   RNN application   RNN은 다음과 같이 여러 방면에서 활용되고 있습니다.      Music generation   Sentiment classification   Machine translation   마무리   사실 sentiment classification의 경우 Yoon Kim 님의 textCNN이 나온 이후로 CNN구조에 비해 크게 좋은 성능을 보이고 있지 못하고 있습니다. CNN에서도 text의 감성이나 주제를 분류하기 위하여 많은 연구들이 제안되어 왔었구요. 현재 RNN의 가장 큰 활용 분야는 역시 machine translation과 (visual)Q&amp;A가 아닐까 싶습니다. BERT와 같은 훌륭한 pretrained model도 나왔고 앞으로 계속 더 발전하지 않을까 라는 개인적인 생각이 있습니다.   사실 많은 수업에서 CNN을 RNN보다 먼저 다루고 있는 것으로 알고 있습니다만, 본 강의에서는 RNN을 2강에서, 그리고 CNN을 3강에서 다루고 있습니다. 그럼 3강에서 CNN으로 찾아뵙겠습니다.  ","categories": ["lectures","basic"],
        "tags": ["MIT","Deep learning","Lecture","Basic","RNN","LSTM","GRU"],
        "url": "http://localhost:4000/archive/Recurrent-Neural-Networks-(MIT-6.S191)",
        "teaser":"http://localhost:4000/assets/images/500x300.png"},{
        "title": "Deep Learning for Computer Vision-MIT 6.S191",
        "excerpt":"AGENDA 1. Introduction of basic concepts for CNN   컴퓨터는 사물을 어떻게 인식할까요? 우리가 이미지를 보는 것 처럼 똑같이 인식할 수 있을까요? 인지공학이나 뇌공학을 모르기 때문에 확신할 수는 없지만 아마 그렇지 않을 것 같습니다. 그 이유는 컴퓨터에게 이미지는 숫자들의 나열 그 이상도 그 이하도 아니기 때문이죠. 흑백 사진인 gray scaled image같은 경우는 정말 단순한 2D matrix 이며, color image의 경우에는 3D tensor가 됩니다. 아래와 같이 말이죠.         Images are numbers(Credit:MIT6.S191)   이번 강의는 이러한 이미지를 computer가 보다 잘 분류할 수 있는 Convolutional Neural Network에 대해서 소개하고 있습니다.   Tasks in Computer Vision   Vision domain에서 가장 대표적인 task는 classification입니다. 모델이 input image를 받아서 pattern을 추출한 뒤 해당 pattern이 어떤 class (category)인지를 예측하는 task를 분류라고 합니다. 이러한 분류 문제를 잘 해결하기 위해서는 모델이 각 class의 특징적인 properties를 파악하는 능력이 있어야 할 것입니다. 예를 들어 사람과 자동차를 분류하기 위해서 모델은 사람이 가지고 있는 형태 (edges), 눈, 코, 입과 같은 특징 (feature)를 잘 파악해야 하며 자동차의 edge, 창문, 바퀴과 같은 특징도 잘 파악해야 합니다.   이러한 분류 문제를 풀기 위하여 전통적으로 feature를 manually 추출 하였습니다. 물론 성능이 좋고 지금까지도 여러 분야에서 쓰이는 hand-crafted feature 방식들이 있지만 이러한 방식에서는 occlusion, deformation, illumination과 같은 이미지의 variation에 강건하지 못한 치명적인 한계가 있습니다. 다시 말해, 동일한 class임에도 불구하고 이미지의 단순한 shifting에도 분류 정확도가 매우 떨어지는 문제를 지니죠. 아래는 여러 이미지 variation에 대한 예제 입니다.         Examples of image variation types.   그렇다면 이러한 한계를 어떻게 해결할 수 있을까요? 이에 대해서 연구자들이 내린 답은 classifier (model)에게 직접 중요한 feature를 추출하도록 하면 해결되지 않을까? 였습니다.   Learning Visual Features   Fully Connected Neural Network (FCN)         Fully Connected Neural Network.   위의 이미지에 보이는 구조가 fully connected neural network입니다. FCN는 위에서 보이는 것처럼 모든 neuron이 연결되어 있는 구조입니다. 하지만 FCN은 input image의 위치 정보를 보존할 수 없으며 update해야할 parameter가 매우 많다는 단점이 있습니다.   그렇다면 어떻게 input의 위치 정보를 network에서 사용할 수 있을까요?   Using Spatial Structure   아이디어는 이렇습니다. FCN처럼 모든 layer의 neuron을 연결하는 것이 아니라 filter를 사용하여 특정 patch만 연결하자. 그런 다음 sliding window라는 개념을 통해서 마치 layer 전체가 연결되는 효과를 가져옵니다. 여기서 filter는 set of weights입니다. 즉 모델의 weights들의 집합인 것이죠.   Applying Filters (set of weights)      Filter는 input image 혹은 이전 layer의 local featrues를 추출하기 위하여 사용합니다.   또한 다양한 종류의 featrues를 추출하기 위하여 여러개의 filter를 사용해야 합니다.   각 filter는 weight를 공유합니다.   Feature Extraction with Convolution   만약 filter의 크기가 3x3의 matrix라면 한 filter에 9개의 weight가 있음을 의미합니다. 이 3x3 filter를 stride만큼 옮겨가면서 input image에 적용하게 됩니다.   이러한 연산을 Convolution이라 부릅니다.   아래 gif를 확인해보죠.         Convolution operation.   위의 gif는 3x3 filter가 stride 2인 경우 어떻게 연산이 되는지를 보여줍니다. 순서는 다음과 같습니다. Input image에 pixel값과 filter의 weight 값이 elementwise 곱해집니다. 그 후 연산된 값들을 모두 더 해 feature map의 한 pixel값이 됩니다. Filter는 stride의 크기만큼 image (feature map)을 건너띄며 convolution 연산을 진행합니다. 첫 번째 filter가 image (feature map) 전체에 대한 연산을 마무리 하면 두 번째 filter가, 그 후에는 또 그 다음 filter가 순차적으로 convolution 연산을 진행합니다. 최종적으로 하나의 filter마다 하나의 feature map이 생성되게 됩니다.   Feature Extraction and Convolution A Case Study   그렇다면 이러한 방식은 hand-crafted feature들에 비해 장점을 가질까요?   수업에서 제시하는 예시는 다음과 같습니다. 사람은 아래 두 이미지 모두 x로 판단하겠죠.        하지만 기존의 방식으로는 이러한 variation에 강건하기 힘듭니다.하지만 우리는 shited, shrunk, rotated, deformed와 같은 variation에대해 모델이 강건하기를 바라며 이러한 이유로 convolution 연산을 사용합니다.        위의 figure와 같이 3x3 filter가 stride 1로 움직이며 연산을 하다보면 왜곡된 이미지임에도 불구하고 동일한 featrue를 강건하게 추출할 수 있게 됩니다.   Convolutional Neural Networks (CNNs)   CNN은 아래와 같은 propertise를 가집니다.      convolution : Feature map을 생성하기 위해서 학습된 weights로 이루어진 filter를 적용하여 convolution 연산을 진행   Non-linearity : Convolution 연산 이후에 비선형성을 추가해주기 위한 activation function 진행(일반적으로 ReLU-아래 figure 참조) 사용   Pooling : 각 feature map에 downsampling 진행(max나 average pooling)           ReLU function   Receptive field   Receptive field는 레이어의 각 뉴런이 입력 볼륨의에 연결된 로컬한 영역(local region)을 의미합니다. 결국 filter와 같은 의미가 되겠죠.   Stride가 1인 경우 receptive field 상 넓은 영역이 겹치게 되고, feature map의 크기도 매우 커지게 됩니다. 반대로, 큰 stride를 사용한다면 receptive field끼리 좁은 영역만 겹치게 되고 feature map의 크기도 작아지게 되겠죠.   Class Probabilities   Convolution layers와 pooling layers는 input image의 high-level features를 추출합니다.      Fully connected layer는 상기 features를 사용하여 input image의 class를 분류하는 역할을 맡습니다.   분류의 경우 softmax를 사용하여 input image가 특성 class에 속할 확률을 확률적으로 표현해 줍니다.   Backpropagation   CNN은 수 많은 filter의 weights와 fully connected layers (dense layers)의 weights를 업데이트 하기 위하여 역전파를 시행합니다.   마무리   강의에서는 CNN 구조를 분류 뿐만 아니라 segmentation, object detection, 안면 인식, 자율주행 차와 같이 다양한 분야에서 사용하고 있음을 말하고 있습니다. 물론 어느날 본질적으로 더욱 사람에 가까운, 지금 CNN이 가진 문제들을 해결해주는 brand new architecture가 등장하겠으나 현재는 또 꽤나 오랜 시간 CNN은 범용적인 domain에서 좋은 성능을 보일 것 같습니다.   수업을 듣다보니 아무래도 대상이 1학년 생들이라서 그런지 내용이 굉장히 얕더군요. 큰 그림만 잡아간다는 생각으로 편하게 보시기 좋은 포스팅이 된 것 같습니다.  ","categories": ["lectures","basic"],
        "tags": ["MIT","Deep learning","Lecture","Basic","CNN"],
        "url": "http://localhost:4000/archive/Deep-Learning-for-Computer-Vision-(MIT-6.S191)",
        "teaser":"http://localhost:4000/assets/images/500x300.png"}]

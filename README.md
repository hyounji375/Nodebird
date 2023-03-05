# Nodebird

인프런 제로초 님의 Nodebird 리뉴얼 강의

섹션0-3

1. Next.js
   : pages 폴더는 꼭 pages로 써줘야 next가 인식해서 각 페이지에 맞게 불러올 수 있다.
   react에서는 router 설정을 해줘야 했지만 next는 router 설정을 안 해도 페이지 변경이 가능하다.
   Next의 가장 큰 장점은 SSR이다.
   pages 폴더에 다른 폴더 만드는 것도 가능하다. 이 경우 url은 localhost:3000/폴더 이름/파일 이름
   동적 라우팅을 구현하려면 대괄호로 감싸주면 된다. ex) pages - 폴더 - [파일명].js

섹션0-5

1. prop-types
   : 전달받은 props의 타입을 검사해준다.

2. Link
   : next의 자체적인 라우터인 Link 태그.
   Link에 href를 적고 a 태그 사용.
   ex) <Link href=""><a>내용</a></Link>

섹션0-7

1. eslint
   : 코드 문법 검사.
   설정을 해주고 vscode랑도 연동해주어야 한다.

섹션0-8

1. SSR
   : 브라우저->프론트->백->DB->백->프론트->브라우저.
   브라우저에서 요청을 하면 그 요청을 받아서 위의 경로대로 DB에서 데이터를 가지고 오고 가져온 데이터를 프론트에서 html, css와 합쳐서 한꺼번에 브라우저로 보낸다.
   그래서 로딩이 없다.
   검색 엔진에 노출하기 쉽다.
   next가 SSR을 쉽게 해준다.

   CSR
   : 브라우저에서 요청을 하면 프론트에서 일단 데이터 없이 html, js를 먼저 보내서 로딩창을 화면에 띄우고 그 사이에 브라우저가 백과 DB에 요청해서 데이터를 가져와서 화면에 보여준다.
   첫 화면이 로딩 화면이기 때문에 검색 엔진에 노출되기 어렵다.

2. 코드 스플리트
   : CSR 방식에서 처음에 데이터 없이 html, js를 보낼 때 요청하지 않은 페이지도 다 담아서 보내는데 그러면 너무 비효율적이니까 js 파일을 쪼개서 요청한 페이지만 받아오는 것.
   그렇기 때문에 브라우저가 바로 백엔드로 요청하지 않고 프론트에게도 어떤 페이지를 가져오라고 요청을 보낸다.

섹션1-1
1.emotion
: SSR 할 때 조금 편하다.
styled-components를 할 줄 알면 emotion도 금방 배운다.

섹션1-2

1. Next에서는 html의 head를 수정할 수 있는 Head라는 컴포넌트를 제공한다.
   Head 컴포넌트를 사용하여 title 수정 등이 가능하다.

섹션1-3

1. 적응형 : 모바일, 태블릿, PC 화면을 각각 따로 만듦.
   반응형 : 화면의 변화에 따라 컴포넌트가 재배치되며 화면이 바뀌는 것.
   반응형 디자인 시 모바일 먼저 하고 점점 늘려갈 것.

2. ant Design 그리드
   - xs:모바일
   - sm:태블릿
   - md:작은 데스크탑  
     ...
     => antd는 세로줄(Col)을 24칸으로 나눈다.
     가로부터 나누고 그다음에 세로를 나눈다.
     자세한 건 ant Design에서 그리드 부분 참고

섹션1-4

1. 로그인 폼 같은 거는 react-form과 같은 라이브러리를 사용하면 편하게 만들 수 있다.
2. 컴포넌트에 props로 넘겨주는 함수는 useCallback을 사용해야 최적화가 된다.

섹션1-5

1. div 태그에 인라인 스타일로 css를 주면 리액트에서는 그 부분을 리렌더링 한다.
   왜냐하면 처음의 {{styled : ""}} 이 객체와 새로 만들어진 {{styled : ""}} 객체가 다르기 때문이다.({}==={} => false)
   따라서 최적화에 영향을 주게 된다.

   인라인 css 대신 styled-components를 쓰거나 useMemo를 이용할 수도 있다.
   ex) const style = useMemo(()=>({marginTop : 10}),[]);
   <div style={style}></div>

섹션1-6

1. 리액트에서 배열로 JSX를 쓸 때는 key를 붙여줘야 한다.
   ex) UserProfile.js의 <Card actions=[]> 부분

섹션1-7

1. rel="noreferrer noopener" : 새 창을 누가 어디서 열였는지에 대한 정보를 없애버리는 것.
2. 크롬 웹스토어 -> React Developer Tools, Redux DevTools
3. echarts : 차트 라이브러리

섹션2-1

1. 리덕스 : 중앙 데이터 저장소 같은 느낌.
   여기에 데이터를 저장해 놓고 여러 컴포넌트에서 가져다 쓴다.
   ex) contextAPI, redux, mobx, apollo 등
   - redux : 코드량이 많다.
     에러가 잘 나지 않으며 추적이 쉽다.
   - mobx : 코드량이 적다.
     에러 추적이 어렵다.
   - contextAPI : 서버 비동기 처리 시 요청, 성공, 실패 로직 구현이 어렵다.

섹션 2-7

1. 배열 안에 jsx를 넣을 때는 항상 key를 줘야한다.

섹션 2-8

1. antd에서 지원하는 Comment 컴포넌트 import 하는 방법이 달라짐.
   version.4에서는 import {Comment } from 'antd'; 이렇게 했지만
   version.5에서는 import { Comment } from '@ant-design/compatible' 이렇게 바뀜.
2. antd에서 지원하는 Menu 사용법 달라짐.
   AppLayout.js 참고

섹션 2-9

1. 화면을 꽉 채우려면 top, left, right, bottom을 다 0으로 주면 된다.
2. styled.div`에서 `는 함수를 호출할 때 쓰이는 문법이며 자바스크립트에서도 사용 가능하다.
   foo() 이런 식으로 함수 호출하는 게 foo` 이렇게도 된다는 의미.
따라서 styled.div`는 styled.div 함수를 호출한 것이다.

섹션 2-11

1. 라이브러리에 이미 정해져 있는 css를 수정할 때 styled-components의 global 스타일을 활용하면 편하다.

섹션 2-12

1. 정규표현식
   - regexr.com 사이트 참고
   - g는 모두 포함, g를 빼면 맨 처음의 하나만
   - .은 글자 한 개를 의미. .이 3개면 3글자, .+는 모든 글자
   - []는 [] 안에 들어 있는 글자를 선택. 이 안에 ^를 붙여주면 그 글자를 제외
   - 공백은 \s로 표시

섹션 3-2

1. 제너레이터 함수는 yield가 있는 곳에서 멈춘다.  
   yield 뒤에 값을 넣어주면 그 값이 value로 return 된다.
2. let i = 0;
   const gen = function\*() {
   while (true) {
   yield i++;
   }
   }
   const g = gen();
   g.next() => value = 0;
   g.next() => value = 1;
   g.next() => value = 2;
   ...

섹션 3-3

1. fork : 비동기 함수 호출
   call : 동기 함수 호출
   call(함수, 매개변수들) ex) call(loginAPI, action.data, a, b) => action.data, a, b 모두 매개변수

섹션 3-4

1. take : 액션을 한 번밖에 실행을 안 한다. 그러면 로그인도 딱 한 번밖에 못 하고 게시글도 딱 한 번밖에 못 쓰게 된다.
2. takeEvery : take는 한 번밖에 못 쓰니까 takeEvery 사용.
3. takeLatest : 여러 번 클릭했을 때 마지막 요청만 실행.
   프론트에서 가는 요청을 취소하는 게 아니라 여러 번 클릭한 것에 따른 여러 번의 요청이 가고, 서버에서 오는 여러 번의 응답 중 마지막 것만 남기고 나머지는 취소하는 방식.
4. takeLeading : takeLatest와 반대로 맨 처음 요청만 실행.
5. throttle : throttle("ADD_POST_REQUEST", addPost, 2000) => 2초 동안 ADD_POST_REQUEST를 딱 한 번만 실행할 수 있다.
   요청 보내는 것에 시간 제한을 두는 방식.

섹션 3-5

1. input type="email"을 해주면 html에서 이메일 검사를 해준다.

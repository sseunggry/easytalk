# Project Name

## 폴더 구조
```bash
    * assets
        - css
            - style.css : scss가 렌더링된 파일
        - font
            - Noto Sans Kr
            - Abril Fatface
            - Montserrat
        - img
        - js
            - common.js : 공통 스크립트
        - scss
            - base
                - _basic-rule : 공통 클래스 선언
                - _css_variables : root 내에 css 변수 선언
                - _font : 폰트 선언
                - _reset : css 초기화
            - util
                - _function : scss 함수
                - _mixin : scss 믹스인
                _ _variables : scss 변수 선언
```

## css 속성 작성 규칙
```bash
    * 참고 : https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf
    * 속성 선언 순서
        - 속성을 선언할 때는 그 쓰임새가 레이아웃과 관련이 큰 것에서 시작하여 레이아웃과 무관한 것 순서로 선언한다.


    * 1. 레이아웃 
        - overflow, display, position, top, right, bottom, left, z-index

    * 2. box 
        - margin, padding, width, height, border
      
    * 3. 배경 
        - background

    * 4. 폰트 
        - font, color, letter-spacing, text-align, text-decoration, text-indent, vertical-align, white-space

    * 5. 기타 
        - 위에 언급되지 않은 나머지 속성들, 폰트의 관련 속성 이후에 선언하며, 기타 속성 내의 선언 순서는 무관함
```

## vscode live sass 설정
```bash
    * plugin - live sass compile 설치
    * vscode > code > Preferences > Settings > live sass 검색
    * Live Sass Compile > Settings: Autoprefix > Edit in setting.json 클릭
    * setting.json 파일 내에 아래 내용 추가
    **
      {
        "liveSassCompile.settings.generateMap": false,
        "liveSassCompile.settings.formats":[
            {
                "format": "expanded",
                "extensionName": ".css",
                "savePath": "~/../css"
            }
        ],
        "liveSassCompile.settings.autoprefix": []
    }
    **
```
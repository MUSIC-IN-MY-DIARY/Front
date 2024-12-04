# Music In My Diary - Frontend 🎵
**Music In My Diary**는 사용자의 일기를 기반으로 AI가 음악을 추천하고 가사를 작성해주는 서비스입니다. <br/>
_Cold Start 상태에서도 사용자 맞춤형 노래 추천을 할 순 없을까? A 가수가 커피에 대해 노래하면 어떨까?_ 하는 호기심에서 시작하였습니다. <br/>
**React와 TailwindCSS**를 사용하여 사용자에게 직관적이고 빠른 UI를 제공하는 프론트엔드 애플리케이션입니다.

<br/>

## Stacks 🐱
**Development**  ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)


**Environment**  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

**Communication**  ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white)
![Google Meet](https://img.shields.io/badge/Google%20Meet-00897B?style=flat&logo=googlemeet&logoColor=white)

<br/>

## 화면 구성 📺
<br/>

| ![로그인](https://github.com/user-attachments/assets/290acb13-773e-4633-a016-62e56af30dc8) | ![노래 추천](https://github.com/user-attachments/assets/8c1872ed-eea0-42cb-9cf8-4f417fbafa5a) | ![가사 생성](https://github.com/user-attachments/assets/95b185e7-f3bd-4188-a1aa-98a1e799b6a8) |
|:------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|
| **로그인**                                                                                 | **노래 추천**                                                                                 | **가사 생성**                                                                                 |
| 사용자는 이메일과 비밀번호를 통해 로그인 및 회원가입이 가능합니다.                             | 사용자가 입력한 일기를 기반으로 AI가 3개 이하의 노래를 추천합니다.                               | 사용자가 제공한 일기를 기반으로 AI가 가사를 생성합니다.                                          |

| ![북마크 등록](https://github.com/user-attachments/assets/fb065b6e-4e5d-4b35-b384-4abdabe4e8e8) | ![북마크 조회](https://github.com/user-attachments/assets/b02b7f78-f23e-4b41-b72f-afbddb5bcd50) | ![북마크 상세조회](https://github.com/user-attachments/assets/9e7455a9-44b4-43f2-956f-3a4e1a3014af) |
|:---------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|
| **북마크 등록**                                                                               | **북마크 조회**                                                                                 | **북마크 상세조회**                                                                             |
| 북마크로 노래와 가사를 저장할 수 있습니다.                                                     | 저장한 북마크를 페이지네이션 방식으로 확인할 수 있습니다.                                        | 저장된 북마크의 세부 정보를 확인하고 수정 및 삭제할 수 있습니다.                                |

<br/>

## 주요 기능 💅🏻 

### 🔓 로그인 기능 
- 이메일과 비밀번호를 통해 로그인 및 회원가입  

### 🎶 AI 음악 추천 기능
- 사용자의 일기 내용을 분석하여 감정과 상황에 맞는 음악을 추천  
- 추천된 음악에 대한 상세 정보 제공 (곡명, 아티스트, 장르 등)  

### 📝 AI 가사 생성 기능
- 일기 내용을 바탕으로 사용자의 감정을 담은 가사 생성  

### 🔖 북마크 기능
- 추천받은 음악과 생성된 가사를 북마크로 저장 및 삭제 가능  
- 북마크 목록은 3개씩 페이지네이션 형태로 조회 가능  
  - **노래 추천 북마크**: 노래 제목 및 관련 정보를 조회  
  - **가사 생성 북마크**: 생성된 가사의 내용 및 관련 정보를 조회  

<br/>

## 자세히 보기 🔗

- **유저 플로우**: [Day14 - 프로젝트 기반 음악 추천/작사 애플리케이션 개발 회고](https://velog.io/@ctndl/Day14.-%ED%94%84%EB%A1%AC%ED%94%84%ED%8A%B8-%EA%B8%B0%EB%B0%98-%EC%9D%8C%EC%95%85-%EC%B6%94%EC%B2%9C%EC%9E%91%EC%82%AC-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EA%B0%9C%EB%B0%9C-%ED%9A%8C%EA%B3%A0)  
- **기술적 구현**: [링크](#) <!-- 여기에 기술적 내용을 연결할 링크 추가 -->

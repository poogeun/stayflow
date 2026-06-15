# 🏨 StayFlow

> **호텔 운영 흐름(Customer → PMS → Kiosk)을 통합한 호텔/리조트 운영 플랫폼**

<br />

<p>
  고객 예약 사이트, PMS 관리자 시스템, 키오스크 셀프 체크인을 하나의 흐름으로 연결한 프로젝트입니다.
</p>

<p>
  <sub>
    단순 객실 예약 기능을 넘어, 예약 생성 → 키오스크 체크인 → PMS 객실 상태 관리까지 이어지는 실제 호텔 운영 프로세스를 구현하는 것을 목표로 했습니다.
  </sub>
</p>

---

## 📸 화면 구성

<details>
<summary><strong>예약 화면</strong></summary>

<br />

### Home

<img
  src="./docs/images/customer-home.png"
  width="100%"
/>

### 객실 선택

<img
  src="./docs/images/customer-rooms.png"
  width="100%"
/>

### 예약

<img
  src="./docs/images/customer-reservation.png"
  width="100%"
/>

</details>

<details>
<summary><strong>PMS 화면</strong></summary>

<br />

### Dashboard

<img
  src="./docs/images/pms-dashboard.png"
  width="100%"
/>

### Reservations

<img
  src="./docs/images/pms-reservations.png"
  width="100%"
/>

### Rooms

<img
  src="./docs/images/pms-rooms.png"
  width="100%"
/>

</details>

<details>
<summary><strong>키오스크 화면</strong></summary>

<br />

### main

<p align="center">
  <img
    src="./docs/images/kiosk.png"
    width="45%"
  />
</p>

### check-in

<p align="center">
  <img
    src="./docs/images/kiosk-checkin.png"
    width="45%"
  />
</p>

</details>


---

<details>
<summary><strong>📌 프로젝트 소개</strong></summary>

<br />

StayFlow는 호텔 운영 흐름을 통합 관리하기 위한 웹 기반 호텔 운영 플랫폼입니다.

고객 예약 → PMS 운영 → 키오스크 체크인 흐름을 하나의 시스템으로 연결하여 실제 호텔 운영 프로세스를 구현했습니다.

</details>

---

<details>
<summary><strong>🛠 기술 스택</strong></summary>

<br />

### Frontend

- React
- Vite
- Tailwind CSS
- Material UI (MUI)
- Axios
- React Router

### Backend

- Spring Boot
- Java 21
- Spring Data JPA
- PostgreSQL
- Hibernate

</details>

---

<details>
<summary><strong>✨ 주요 기능</strong></summary>

<br />

### 고객 예약 사이트

- 객실 조회
- 객실 예약
- 예약 조회
- 예약 취소

### PMS 관리자 시스템

- Dashboard 운영 현황
- 예약 관리
- 체크인 / 체크아웃
- 예약 검색 / 상태 필터
- 객실 상태 관리
- 객실 청소 완료 처리
- 객실 상태 변경

### 키오스크

- 예약 조회
- 셀프 체크인
- 체크인 완료 화면

</details>

---

<details>
<summary><strong>🔗 외부 API 및 서비스 연동</strong></summary>

<br />

### Toss Payments

객실 예약 결제 및 승인 처리

<img src="./docs/images/payment2.png" width="100%" />

### OpenWeatherMap

체크인 날짜의 예상 날씨 안내

<img src="./docs/images/weather.png" width="100%" />

### Kakao Maps

호텔 위치 지도 안내

<img src="./docs/images/kakao-map.png" width="100%" />

### Gmail SMTP

예약 완료 정보 이메일 발송

<img src="./docs/images/reservation-email.png" width="100%" />

</details>

---

<details>
<summary><strong>🎬 시연 플로우</strong></summary>

<br />

### 고객 예약

1. 고객이 객실 조회
2. 예약 생성
3. 예약 조회 확인

### 키오스크 체크인

1. 예약번호 + 휴대폰번호 입력
2. 예약 조회
3. 셀프 체크인 진행
4. 체크인 완료 화면 표시

### PMS 운영

1. 예약 상태 확인
2. 체크인 / 체크아웃 처리
3. 객실 상태 변경
4. 청소 완료 처리

</details>

---

## 🎯 프로젝트 목표

<sub>
호텔 운영 흐름 전체를 이해하고, 고객 예약 사이트 / PMS / 키오스크 시스템을 연결하는 실무형 구조를 경험하는 것을 목표로 했습니다.
</sub>

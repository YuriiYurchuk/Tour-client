# **Tour-client**

_Empowering seamless travel experiences, effortlessly connected._

![javascript](https://img.shields.io/badge/javascript-73.9%25-yellow?style=flat-square)
![languages](https://img.shields.io/badge/languages-2-blue?style=flat-square)

---

_Built with the tools and technologies:_

![npm](https://img.shields.io/badge/-npm-red?style=flat-square)
![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square&logo=javascript)
![Leaflet](https://img.shields.io/badge/-Leaflet-green?style=flat-square)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint)
![Swiper](https://img.shields.io/badge/-Swiper-6332F6?style=flat-square)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux)
![CSS](https://img.shields.io/badge/-CSS-264de4?style=flat-square&logo=css3&logoColor=white)
![date-fns](https://img.shields.io/badge/-dateFns-d51d5d?style=flat-square)
![Sass](https://img.shields.io/badge/-Sass-cc6699?style=flat-square&logo=sass)
![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-ec5990?style=flat-square)

---

## 🌍 Description

This is the **frontend** part of a tour booking web app, where users can easily browse, select, and book tours through a clean, multi-step interface. The application features interactive maps, hotel listings, tour reviews, and a user-friendly booking process.

---

## 🔗 Pages and Routes

- `/` — Home
- `/about-us` — About Us
- `/auth` — Authorization (Login / Register)
- `/contacts` — Contact Information
- `/countries` — Browse by Countries
- `/hotels` — List of Hotels
- `/tour-selection/:id/:hotelName` — Hotel Details
- `/maps` — Map View of Hotels/Tours
- `/tour-payment` — Payment Page
- `/profile` — User Profile
- `/reviews` — Reviews and Ratings
- `/hot-tours` — Hot Tours (Special Offers)
- `/tour-selection` — Tour Selection

---

### 🧭 Booking Flow (Stepper-based)

- `/booking/:bookingId/services` — Step 1: Select Services
- `/booking/:bookingId/details` — Step 2: Personal Info
- `/booking/:bookingId/payment` — Step 3: Payment

---

## 🧩 Related Repository

This is the **client-side** of the project.

👉 The **server-side** (API, authentication, database, etc.) is located here:  
[🔗 Tour Booking Server](https://github.com/YuriiYurchuk/Tour-server)

---

## 📦 Installation

```bash
git clone git@github.com:YuriiYurchuk/Tour-client.git
cd Tour-client
npm install
npm run dev
```

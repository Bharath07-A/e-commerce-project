# Full-Stack Shopping Web Application (React + Django)

This is a complete **e-commerce platform** built with **React (frontend)** and **Django REST Framework (backend)**.  
It supports **user authentication, product browsing, cart management, and checkout** with a QR code payment placeholder.

---

##  Features

## Frontend (React)
- User Authentication  
  - Register / Login with JWT  
  - Profile page (`/me`)  
- Product Pages  
  - Homepage with product listing (from API)  
  - Product detail page  
- Cart & Checkout  
  - Add/remove products from cart  
  - Cart page showing selected items  
  - Checkout page with QR payment placeholder + Confirm Order button  
- Responsive UI with clean navigation

## Backend (Django + DRF)
- User Authentication (JWT)  
  - `/api/auth/register/` → Register  
  - `/api/auth/login/` → Login  
  - `/api/auth/me/` → Get logged-in user details  
- Product Management  
  - `/api/products/` → List products  
  - `/api/products/<id>/` → Product details  
- Database  
  - **PostgreSQL** (production-ready)  
  - **SQLite** (development)

---

## Tech Stack
- **Frontend**: React, React Router, Axios  
- **Backend**: Django, Django REST Framework, JWT Authentication  
- **Database**: PostgreSQL (default), SQLite (dev)  

---


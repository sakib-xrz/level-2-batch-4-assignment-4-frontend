# 🚴 [Bicycle Store](https://bicycle-store-three.vercel.app) - Full-Stack E-commerce Application

## 📌 Project Overview

Bicycle Store is a **full-stack e-commerce application** designed for buying, selling, and managing bicycles. It includes **role-based authentication, secure payment processing, product management, and an interactive user experience**. The project is built with **MongoDB, Express.js, React (Vite), and Node.js (MERN Stack)** while ensuring a **responsive, user-friendly UI** with **Tailwind CSS** and **Ant Design**.

---

## 🔥 **Key Features & Functionalities**

### **🌍 Public Features (Accessible to All)**

✅ **User Registration & Authentication**

- Secure **JWT-based login and signup**.
- Passwords are **hashed** for security.
- Users can log in and maintain sessions.

✅ **Home Page**

- **Navbar**: Logo, navigation, login/signup, and dynamic user actions.
- **Banner Section**: A visually appealing section highlighting offers.
- **Featured Bicycles**: Displays up to **6 featured bicycles**.
- **Additional Content**: Sections such as testimonials or store features.
- **Footer**: Includes contact information and social links.

✅ **All Bicycles Page**

- **Search & Filter**: Users can search by **name, category, price, brand, and availability**.
- **Dynamic Results**: Instantly updates based on user filters.
- **Bicycle Cards**: Displays key bicycle details and a "View Details" button.

✅ **Bicycle Details Page**

- Displays **bicycle specifications, price, and stock availability**.
- Includes a **"Buy Now"** button leading to checkout.

✅ **About Us Page**

- Detailed page with **store mission, values, and customer commitment**.

✅ **Contact Us Page**

- Simple form where users can **send inquiries**.
- Includes **business email & phone contact information**.

---

### **🔐 Private Features (Protected Routes)**

✅ **Checkout Page**

- Users can order a bicycle if **in stock**.
- Implements **total price calculation**.
- Integrates **sslcommerz gateway**.
- Secure payment handling with **error prevention**.

✅ **Dashboard (Role-Based)**

- **Customer Dashboard**:
  - View **order history**.
  - Manage **profile & password updates**.
- **Admin Dashboard**:
  - **Manage Users** (Update roles, deactivate accounts).
  - **CRUD Operations** on **Bicycles** (Add, update, delete).
  - **Order Management** (View & process orders).

---

## 🖥️ **Technology Stack**

- **Frontend**: React (Vite),Redux Toolkit, RTK Query, TypeScript, Tailwind CSS, Ant Design
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token), Bcrypt.js (Password Hashing)
- **Database**: MongoDB + Mongoose ORM
- **Payment Integration**: SSLCOMMERZ

---

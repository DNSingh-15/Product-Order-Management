# 🌐 Product Order Management - Fullstack Project

A **microservice-based fullstack application** built with **NestJS**, **Next.js**, and **TypeScript**.  
Includes two backend services (`Product Service`, `Order Service`) communicating via **TCP**,  
and a modern **Next.js + MUI frontend** for a seamless user experience.

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DNSingh-15/Product-Order-Management.git
cd Product-Order-Management
```

---

## 2️⃣ Install Dependencies
```bash
📦 Frontend:              cd frontend && npm install
🧠 Backend:        cd /backend && npm install
⚙️  Order Service:         cd backend/order-service && npm install
🧩 Product Service:       cd backend/product-service && npm install
```

---

## 3️⃣ Run the Applications
* open 2 terminal one for frontend and other is backend

```bash
📦 Frontend:              cd frontend && open terminal then run:  npm run dev
🧠 Backend:        cd /backend && open terminal then run: npm start
```

---

## 🚀 Features

### 🧩 Product Service
- Built with **NestJS**
- Provides CRUD APIs for products  
- Exposes both **HTTP** and **TCP** endpoints
- Used by the Order Service to validate product existence and get price

### 📦 Order Service
- Built with **NestJS**
- Manages order creation, updates, and deletion  
- Connects to the Product Service via **TCP microservice communication**
- Handles pagination and price calculation automatically

### 💻 Frontend (Next.js + MUI)
- Built with **Next.js 14 + TypeScript**
- Uses **Material UI** for clean and responsive design  
- Includes **Pagination**, **CRUD operations**, and dynamic **form handling**
- Two fully functional pages:
  - `/products` → Manage products
  - `/orders` → Manage orders (linked to products)
- Integrated via `axios` with backend APIs

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js, React, TypeScript, Material UI |
| Backend | NestJS (Microservices + REST) |
| Communication | TCP (NestJS Microservice Client/Server) |
| Language | TypeScript |
| Package Manager | npm |
| Styling | MUI + custom SCSS/Tailwind-like layouts |

---

## ⚙️ Prerequisites

Before running locally, ensure you have:
- **Node.js** ≥ 18
- **npm** ≥ 9
- **TypeScript** installed globally (optional)
  ```bash
  npm install -g typescript

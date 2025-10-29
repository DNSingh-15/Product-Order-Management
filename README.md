
# 🌐 Revest Solutions - Fullstack Assignment (Monorepo)

A **microservice-based fullstack application** demonstrating modular architecture using **NestJS**, **Next.js**, and **TypeScript**.  
The system consists of two backend services (`Product Service`, `Order Service`) communicating via **TCP microservice transport**,  
and a modern **Next.js + MUI frontend** for seamless interaction.

---

## 🧭 Quick Start Guide

Follow these steps to clone and run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/revest-solutions.git
cd revest-solutions
```

2️⃣ Install Dependencies

Each service and the frontend maintain their own dependencies.
Run the following inside each folder:

cd backend/product-service
npm install
cd ../order-service
npm install
cd ../../frontend
npm install

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

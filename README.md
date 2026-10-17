# 🎮 NEXORA — Level Up Your Game

A modern, premium gaming gear e-commerce **frontend** built with **React.js**, featuring a futuristic dark UI, glassmorphism, neon accents, and a complete cart → checkout → order confirmation flow.

<p align="center">
  <a href="https://nexora68.netlify.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-nexora68.netlify.app-00ffb2?style=for-the-badge&logo=netlify&logoColor=black" alt="Live Demo" />
  </a>
  <a href="https://github.com/mohamedsarfaras/nexora">
    <img src="https://img.shields.io/badge/Source-GitHub-a259ff?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React%20Router-6.x-CA4245?logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Context%20API-State%20Management-00ffb2" />
</p>

---

## 🔗 Live Demo

👉 **[Explore NEXORA Live](https://nexora68.netlify.app/)**

Test the complete shopping flow: Home → Shop → Product Details → Add to Cart → Apply Coupon → Checkout → Order Confirmation.

## ✨ Features

### 🏠 Home
- Hero section with the "Level Up Your Game" tagline
- Seven gaming categories
- Featured and trending products
- Promotional discount banner
- Category-based navigation

### 🛍️ Shop
- Search products by name or category
- Filter by category and price range
- Sort by featured, price, rating, or name
- Dynamic result count
- Empty state and clear filters
- Responsive product grid

### 📦 Product Details
- Product image gallery with thumbnail switching
- Product specifications
- Ratings and review counts
- Quantity selector
- Wishlist toggle
- Related products
- Product-not-found handling

### 🛒 Cart
- Add, remove, and update product quantities
- Live subtotal, discount, shipping, and total calculations
- Coupon codes:
  - `NEXORA10` — 10% off
  - `GAMER20` — 20% off
  - `FREESHIP` — Free shipping
- Free shipping over $199 (or equivalent configured threshold)
- Cart persistence using `localStorage`
- Empty-cart state

### ❤️ Wishlist
- Add or remove products from cards and details pages
- Slide-out wishlist panel
- Add products directly to the cart
- Wishlist persistence using `localStorage`

### 💳 Checkout
- Validated customer information form
- Three payment options:
  - Credit/debit card
  - UPI
  - Cash on Delivery
- Inline validation messages
- Order confirmation with generated order ID, item count, total, and estimated delivery
- Cart automatically clears after a successful simulated order

### 🎨 UI / UX
- Futuristic dark theme with neon green, cyan, and purple accents
- Glassmorphism cards
- Smooth hover animations and transitions
- Toast notifications
- Responsive design for mobile, tablet, and desktop
- Accessible labels and image alt text
- Orbitron and Rajdhani typography

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Language | JavaScript (ES6+) |
| Routing | React Router DOM v6 |
| UI Library | Bootstrap 5 and React-Bootstrap |
| Styling | Custom CSS |
| State Management | Context API and React Hooks |
| Persistence | localStorage |
| Fonts | Google Fonts — Orbitron and Rajdhani |
| Deployment | Netlify |
| Version Control | Git and GitHub |

## 📁 Project Structure

```text
nexora/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── CategoryCard/
│   │   ├── PromoBanner/
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   ├── RatingStars/
│   │   ├── SearchBar/
│   │   ├── FilterPanel/
│   │   ├── WishlistOffcanvas/
│   │   ├── CartItem/
│   │   ├── OrderSummary/
│   │   └── Toast/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Shop/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   └── Checkout/
│   ├── context/
│   │   └── ShopContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mohamedsarfaras/nexora.git

# Navigate to the project
cd nexora

# Install dependencies
npm install

# Start the development server
npm start
```

The application will run at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

The optimized production build will be generated in the `build/` directory.

## 🧪 Test the Shopping Flow

1. Browse products on the Home or Shop page.
2. Open a product's details.
3. Add the product to your cart.
4. Update quantities in the cart.
5. Apply `NEXORA10`, `GAMER20`, or `FREESHIP`.
6. Proceed to checkout.
7. Enter the required customer information and select a payment method.
8. Complete the simulated order.
9. View the confirmation page and verify that the cart is cleared.

## 📌 Notes

- **Frontend-only project:** No backend or real payment processing is implemented.
- Product information is stored locally in `src/data/products.js`.
- Order confirmation is simulated.
- Cart and wishlist data persist across page refreshes through `localStorage`.
- Payment details are not processed by a payment gateway. Never enter real payment information into a demonstration checkout.

## 🌱 Key Learning Highlights

- Managing shared application state using React Context API.
- Persisting cart and wishlist data using `localStorage`.
- Building controlled forms and implementing input validation.
- Implementing client-side routing with React Router.
- Creating reusable React components.
- Designing responsive interfaces using Bootstrap and custom CSS.
- Deploying a React application through Netlify with GitHub integration.

## 🗺️ Future Enhancements

- [ ] Product reviews and ratings
- [ ] Order history
- [ ] User authentication
- [ ] Dark/light theme toggle
- [ ] Product comparison
- [ ] Backend integration and database support

## 👤 Author

**Mohamed Sarfaras**

- GitHub: [@mohamedsarfaras](https://github.com/mohamedsarfaras)
- LinkedIn: [Mohamed Sarfaras](https://www.linkedin.com/in/mohamed-sarfaras-598a322ba/)
- Live Project: [NEXORA](https://nexora68.netlify.app/)

---

<p align="center">
  <strong>NEXORA</strong> — <em>Level Up Your Game.</em> 🎮
</p>

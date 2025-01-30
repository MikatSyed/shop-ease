SHOP EASE

This is a simple e-commerce web application built with Next.js and TypeScript. It includes features such as displaying products, viewing product details, managing a cart, and interacting with a mock API to simulate e-commerce functionality.

Features

Landing Page

Display a list of products fetched from a mock API.
Each product card shows the product image, name, price, and an "Add to Cart" button.
Product Details Page

Clicking on a product navigates to a dynamic route (/product/[id]).
Displays product details, including image, name, description, price, and a related products section.
Cart Functionality

View all products added to the cart.
Show the total price of the cart.
Remove items from the cart.
API Integration

Fetch product data from a mock API (e.g., Faker.js or JSON Placeholder).
Implement API routes for fetching products and managing cart items.
Performance

Use Server-Side Rendering (SSR) for the landing page.
Use Static Site Generation (SSG) for product details pages.
Responsive Design

The application is fully responsive and works on both desktop and mobile devices.
Code Quality

Written in TypeScript following clean coding practices.
Includes comments and clear code structure.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Download Node.js
Yarn: Install Yarn
Running the Application Locally
Clone the repository to your local machine:


Edit
git clone https://github.com/MikatSyed/shop-ease
cd mini-e-commerce
Install dependencies using Yarn:


yarn
Run the development server:

bash
Copy
Edit
yarn dev
This will start the application at http://localhost:3000.

Open your browser and navigate to http://localhost:3000 to see the application in action.

Folder Structure
pages/: Contains the pages for the Next.js application.

index.tsx: Landing page displaying all products.
product/[id].tsx: Product details page with dynamic routing.
cart.tsx: Cart page displaying added products and total price.
components/: Contains reusable components such as ProductCard, CartItem, etc.

lib/: API integration files for fetching data from the mock API.

styles/: Global and component-specific styles.

API Routes

/api/products: Fetches the list of products.
/api/cart: Handles adding/removing items from the cart.

Optional Enhancements
Search/Filter: Add search or filter functionality on the landing page.
State Management: Implement state management withZustand.


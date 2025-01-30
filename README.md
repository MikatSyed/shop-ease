SHOP EASE
This is a simple e-commerce web application built with Next.js and TypeScript. It includes features such as displaying products, viewing product details, managing a cart, and interacting with a mock API to simulate e-commerce functionality.

Features
1. Landing Page
Display a list of products fetched from a mock API.
Each product card shows the product image, name, price, and an "Add to Cart" button.
2. Product Details Page
Clicking on a product navigates to a dynamic route (/product/[id]).
Displays product details, including image, name, description, price, and a related products section.
3. Cart Functionality
View all products added to the cart.
Show the total price of the cart.
Remove items from the cart.
4. API Integration
Fetch product data from a mock API (e.g., Faker.js or JSON Placeholder).
Implement API routes for fetching products and managing cart items.
5. Performance
Use Server-Side Rendering (SSR) for the landing page.
Use Static Site Generation (SSG) for product details pages.
6. Responsive Design
The application is fully responsive and works on both desktop and mobile devices.
7. Code Quality
Written in TypeScript following clean coding practices.
Includes comments and clear code structure.
Prerequisites
Before you begin, ensure you have the following installed:

Node.js: Download Node.js
Yarn: Install Yarn
Running the Application Locally

Clone the repository to your local machine:

git clone https://github.com/MikatSyed/shop-ease

cd shop-ease

Install dependencies using Yarn:

yarn

Run the development server:

yarn dev

This will start the application at http://localhost:3000.

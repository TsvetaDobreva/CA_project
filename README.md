# CA_project
This is a web application with the purpose of a portfolio of the products and services offered by the company S.A. ltd

## What are the C.A. application?
This is a product with which users can request an offer and place an order for the manufacture of aluminum and PVC windows and facades in the dimensions specified by them.

## Why use C.A. application?
A simple and modern interface is used.
A quick way to communicate. 
Completely online process from offer to product creation. 
Ability to track the status of each order online.

## Where can I see them in action?
Currently not publicly available.

## Getting started
Make sure you have the Angular CLI installed globally. We use NPM to manage the dependencies, so we strongly recommend you to use it. You can run npm install to resolve all dependencies (might take a minute).

Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### General functionality:

- Authenticate users via Firebase auth service (login/signup pages + logout button on settings page)
- CRU* users (sign up)
- CRUD offer and order

#### The general page breakdown looks like this:

- Home page (URL: /#/ )
    - Overview
    - Short link to get a offer
- Sign in/Sign up pages (URL: /#/auth/login, /#/auth/register )
    - Uses userData (store in localStorage)
- User views:
      - Get offer (URL: /#/user/getOffer ):
          - Provide dimensions and make a request for offer
      - My offer (URL: /#/user/myOffer ):
          - A list of send back offer from C.A. Agenda ltd
      - My orders (URL: /#/user/myOrders ):
          - A list of all my orders
          - Оrder tracking
- Admin views:
      - New offers (URL: /#/admin/newOffers ):
          - А list of all requested bids
      - New orders (URL: /#/admin/newOrders ):
          - A list of all orders placed
      - All orders (URL: /#/admin/allOrders ):
          - A list of all production orders placed;
          - Цhanging the status of any order
- Public views:
    - Contact us (URL: /#/contactUs )
    - About us (URL: /#/aboutUs )
    - Projects (URL: /#/projects )





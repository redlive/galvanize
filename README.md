## Instructions
1. `yarn setenv` to install modules and dependenices
2. `yarn dev` to run local Client and Server sides

Client side will run on http://localhost:3000
Backend side will run on http://localhost:3333




## Instructions

This part of the interview process allows us to learn more about your software engineering and web development skills. You are given a boilerplate "hello world" application and your task will be to add the first feature to this application. We will then discuss your solution during the interview.

The application will eventually be a REST API for managing products. A product has a name, a price, and possibly a description. The price is stored in USD. For this exercise, implement the following 2 endpoints.
1. Retrieve a list of all products. The request can optionally specify a currency too, in which case the price of the returned product should be in that currency. The following currencies should be supported:
- USD (default)
- CAD
- EUR
- GBP

2. Update a product. We also want to keep track of how many times a product has been updated.

The boilerplate application includes a basic Express application and a SQLite database. We've used an in-memory database for convenience but it can be treated as if it were a regular relational database. We've also provided a currency exchange rate API (https://currency-api-mock.highbond-s3.com/live).

Feel free to modify the existing code as well as add new code. Reasonable assumptions should be made to keep the solution simple. Comments can also be added to explain assumptions or future improvements if needed. Tests are optional but we will discuss what your testing approach would be in the interview. You can submit your solution as a zip file or a link to a shared repository.

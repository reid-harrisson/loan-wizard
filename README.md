# BnB Codding Challenge

Design and implement a multi-step wizard interface to collect user input in an organized and structured manner. The wizard should guide users through multiple steps or stages, ensuring that each step captures specific information. User input should be validated at every stage, and the collected data must be stored by making API calls to persist the information.

It is up to you to decide which validation rules are more important, which are less critical, and how many shortcuts you can implement to reduce overall workload.

Each step should submit its data to the API.

**We do not expect a perfect or complete solution. Accomplish as much as you are comfortable with and ensure the result reflects your confidence.**

We expect you to demonstrate confidence with **TypeScript**, **React**, **React** **Router**, **Zod** and **react-hook-form**. The rest of the choices are yours, and you are free to use any UI library you are familiar with.

**Steps Overview**

1. **Personal Information (Step 1)**:
   - **First Name**: Latin and German letters only, only single name allowed.
   - **Last Name**: Latin and German letters only, allow multiple names.
   - **Date of Birth**: Max age is 79 years old (calculate from the current date).
2. **Contact Details (Step 2)**:
   - **Email**: Validate as a proper email format.
   - **Phone**: Validate in E.164 format (e.g., `+1234567890`).
3. **Loan Request (Step 3)**:
   - **Loan Amount**: Between 10,000 and 70,000.
   - **Upfront Payment**: Must be lower than the loan amount.
   - **Terms**: Between 10 and 30 months, ensuring `terms / 12 + age < 80`.
4. **Financial Information (Step 4)**:

   - **Monthly Salary**: Required.
   - **Additional Income**: Optional, hidden unless a checkbox is selected.
   - **Mortgage**: Optional, hidden unless a checkbox is selected.
   - **Other Credits**: Optional, hidden unless a checkbox is selected.

   **Validation**: `(Monthly Salary + Additional Income - Mortgage - Other Credits) * terms * 0.5 > Loan Amount`. If the validation fails, suggest the user reduce the loan amount(go to step 3) or restart with a new person(go to step 1).

5. **Finalization (Step 5)**:
   - Display all previously entered data for review.
   - Include a "I confirm" checkbox (required to proceed).
   - Finalize the form with a "Finalize" button.

## **Optional Features**

While not mandatory, implementing the following features can enhance the user experience and demonstrate attention to detail:

**Navigation Between Steps**: allow users to navigate back and forth between steps. Ensure that previously entered data persists when navigating.

**Page Reload Handling**: implement functionality to restore the user's progress so they can resume the wizard from where they left off after a page reload.

**Success/Error Notifications**: display user-friendly notifications or toasts to indicate successful submissions or any errors encountered during API requests.

## **Timeline**

You are expected to invest around **3-6 hours** in this challenge. The result should reflect your ability to implement as much as possible within that timeframe, ensuring the code is clean, maintainable, and demonstrates your confidence and expertise.

## **Test API endpoints**

To simplify the development process, we provide a simple Fastify server that runs locally, accepts any JSON object as input and stores it in the file system.

The server exposes the following endpoints:

- **POST /entities**: Creates a new entity and returns the entity with a **uuid**.
- **GET /entities/:uuid**: Retrieves an entity by its **uuid**.
- **PATCH /entities/:uuid**: Updates an existing entity by its **uuid**.

To run the server locally, follow these steps:

```jsx
wget https://files.beesandbears.com/fastify.mjs
npm install fastify
node fastify.mjs
```

## **Deliverables**

Please push your solution to any public repository of your choice and send us the link to the repository.

## **How to run application**

Copy `.env.example` file and change it to `.env` file.
Change backend url.

```jsx
npm install
npm run dev
```

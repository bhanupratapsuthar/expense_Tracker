Here’s a concise project summary for your deployed app at [https://expensetracker-m9gj.onrender.com](https://expensetracker-m9gj.onrender.com):

---

### 💼 **Expense Tracker – Project Summary**

**Description:**
A full-stack web application that allows users to securely manage and track expenses for multiple beneficiaries. Users can register, log in, add beneficiaries, and record transaction logs with validation and error handling.

**Key Features:**

* 🔐 **Authentication** using Passport.js (local strategy)
* 📊 **Beneficiary-based tracking** with logs for each
* ✅ **Form validation** using Joi to ensure data integrity
* 💾 **MongoDB** with Mongoose for schema-based database interactions
* 📁 **Session management** with persistent store using `connect-mongo`
* 🔄 **RESTful routing** with `method-override` for PUT/DELETE
* 🎨 **EJS templating** with layout support via `ejs-mate`
* ⚠️ **Robust error handling** via a custom `ExpressError` class and async wrapper
* 🌐 **Deployment** via Render with secure `.env` configuration

**Tech Stack:**

* **Frontend:** EJS, HTML, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** Passport.js
* **Validation:** Joi
* **Session Store:** MongoDB via `connect-mongo`
* **Deployment:** Render

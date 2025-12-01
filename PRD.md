# ⭐ **VartaLang — Full MERN Roadmap (Elaborate + Practical + Backend First)**

---

# **PHASE 1 — BACKEND ARCHITECTURE (Node + Express + Mongo)**

---

## **1. Backend Folder Setup**

```
varta-backend/
  /src
    /config
    /controllers
    /routes
    /models
    /middleware
    /services
  server.js
package.json
.env
```

---

## **2. Install Core Backend Packages**

```
npm init
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
npm install nodemon --save-dev
```

Optional but recommended:

```
npm install zod
npm install express-rate-limit
npm install helmet
```

---

## **3. Setup Server + Database (MongoDB Atlas)**

**server.js**

* connect to MongoDB Atlas
* enable CORS
* enable JSON
* mount routes
* error handlers

**config/db.js**

* mongoose connect function

---

# **PHASE 2 — AUTHENTICATION (MERN Style)**

---

## **OPTION A — Best for simplicity: Clerk/Firebase Auth**

Frontend handles OTP/email.
Backend receives JWT → verifies → attaches `req.user`.

✔ safe
✔ fast
✔ reduces bugs

---

## **OPTION B — Build your own Email OTP auth**

Backend routes:

### **POST /auth/send-otp**

* generate 6-digit OTP
* hash and store in OTP collection
* send via email API (Brevo/Resend)

### **POST /auth/verify-otp**

* compare hashes
* create JWT token
* return user profile

### **middleware/auth.js**

* verify JWT
* attach `req.user = decodedUser`

**User model**

```
name  
email  
avatar (optional)  
createdAt  
```

---

# **PHASE 3 — DATABASE MODELS (Core of VartaLang)**

---

## **1. User Model**

```
name  
email  
gender  
age  
bio  
languagesKnown: [{ langCode, level }]  
languagesWanted: [{ langCode, level }]  
interests: [String]  
location  
createdAt
```

---

## **2. Preferences Model**

```
userId  
preferredLanguages  
preferredAgeRange  
preferredGender  
availability  
connectionPreference // call, text, both
```

---

## **3. Match Model**

```
userA  
userB  
score  
status: "pending" | "accepted" | "rejected" | "blocked"
createdAt
```

---

## **4. Message Model (optional for MVP)**

```
matchId  
sender  
message  
timestamp
```

---

## **5. AbuseReports**

```
reportedUser  
reportedBy  
reason  
timestamp  
resolved
```

---

# **PHASE 4 — BACKEND APIs (Express Routes)**

---

# ⭐ **1. Auth Routes**

```
POST /auth/send-otp
POST /auth/verify-otp
```

Returns JWT + user.

---

# ⭐ **2. User Routes**

```
GET /users/me
PUT /users/update
PUT /users/languages
PUT /users/interests
PUT /users/preferences
```

---

# ⭐ **3. Matching Routes (brain of platform)**

### **POST /match/find**

Algorithm:

```
if (A.knows includes B.wants AND B.knows includes A.wants):
     candidate match
score = interestOverlap + timeOverlap + profileCompleteness
sort by score
```

### **POST /match/accept**

### **POST /match/reject**

### **POST /match/block**

---

# ⭐ **4. Resources Routes** (YouTube recommendations)

```
GET /resources/:lang
POST /resources/add (admin)
```

Stores best playlists per language.

---

# ⭐ **5. Messages Routes** (optional MVP)

```
POST /messages/send
GET /messages/:matchId
```

---

# ⭐ **6. Safety Routes**

```
POST /safety/report
GET /safety/user-warnings
```

---

# **PHASE 5 — TOXICITY FILTER (Middleware)**

Middleware: `toxicityMiddleware.js`

Steps:

1. Detect script (Hindi/Tamil/Bengali/English)
2. Route to correct free HuggingFace model (no bad words shown)
3. If toxicity > threshold → block & log to AbuseReports
4. Otherwise pass to controller

Attach to:

```
POST /messages/send
```

---

# **PHASE 6 — BACKEND DEPLOYMENT**

Deploy Node + Mongo.

### Best stack:

* **Backend:** Railway / Render
* **Database:** MongoDB Atlas
* **Media Storage:** S3 / Firebase Storage (optional)

Steps:

1. Add environment variables (JWT_SECRET, DB_URL)
2. Add CORS
3. Add rate-limits
4. Deploy

Backend ready.

---

# **PHASE 7 — FRONTEND (After backend is complete)**

---

## 🔸 Tech

React + Tailwind + shadcn

## 🔸 Pages

* Landing Page
* Login/Signup
* User Profile Setup
* Language Setup
* Matching Page
* Match List
* Resource Suggestions
* Messaging
* Safety/Report page

Frontend calls backend API using Axios.

---

# **PHASE 8 — INTEGRATION & TESTING**

---

## **Testing Tools**

* Postman
* Jest (optional)
* Manual flows

## **Test flows**

* Signup → Create Profile → Find Match → Message → Block
* Resource fetch
* Toxicity filtering
* Reject/Accept matching

---

# ⭐ FINAL PHASE — POLISHING

* Add dashboards
* Add email templates
* Add resource recommendation logic
* Add interest tags
* Improve scoring algorithm

---

# ⭐ FINAL SUMMARY (Simple Execution Plan)**

### **Week 1 — Backend setup + Auth + User models**

### **Week 2 — Matching algorithm + Preferences + Resources**

### **Week 3 — Safety + toxicity filters + deployment**

### **Week 4 — Frontend full build + integration test**


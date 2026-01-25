# **VartaLang MVP — 6-Week Execution-Ready PRD**

**The Language Bridge of India**

---

## 1. Product Overview

**VartaLang** is a safe, respectful language-exchange platform where Indians learn languages from real people—by teaching the language they know and learning the language they want.

It is **not** a dating app, **not** a social feed, and **not** an influencer platform.

**Future Vision:** Premium career-focused courses (IELTS, embassy interviews, cultural center job training) for advanced learners.

---

## 2. Problem Statement

Existing platforms for language learning in India suffer from:

* unsafe conversations,
* random matching,
* cultural discomfort,
* excessive UI complexity,
* dating-app behavior.

Indian language learners need a **human, respectful, low-noise** space focused purely on learning.

---

## 3. Goals & Non-Goals

### Goals

* Enable 1-to-1 language learning via mutual exchange
* Ensure safety before speed
* Keep UX simple enough for teachers and elders
* Support all Indian languages + global languages (English, French, German, etc.)
* Build trust through systems, not popularity
* **Create monetization path via premium career courses**

### Non-Goals

* Virality or follower growth
* Open chat without matching
* Anonymous usage
* Dating or flirting mechanics
* Influencer monetization

---

## 4. Target Users

### Primary

* College students
* Language learners
* **Teachers & tutors** (primary role)
* Migrants / travelers
* Cultural learners
* **IELTS/TOEFL aspirants** (future premium)
* **Job seekers** (embassy, cultural centers) (future premium)

### Secondary

* Educators curating resources
* Institutions and NGOs

---

## 5. Tech Stack (All Free Tier)

```
Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI
Backend: Next.js API Routes
Database: MongoDB Atlas (FREE tier - 512MB)
Auth: NextAuth.js v5 + Google OAuth + Email/Password
Real-time: Socket.io (self-hosted on Vercel)
Storage: Cloudinary (free tier - 25GB)
Hosting: Vercel (hobby plan)
Email: Resend (free tier - 100 emails/day)
Validation: Zod
Safety: bad-words library + custom toxicity filters
Payments (future): Razorpay / Stripe for premium courses
```

---

## 6. Enhanced User Journey

### Step 1 — Signup (Single Page - All Info Collected)

**Required Fields:**
1. **Profile Picture** (upload or skip for now)
2. **Name** (full name)
3. **Email** (for updates & auth)
4. **Primary Language to Learn** (dropdown: Hindi, English, Tamil, etc.)
5. **Secondary Language to Learn** (optional)
6. **Languages I Know & Can Teach** (multi-select with fluency)
7. **Primary Role:**
   - 🎓 **Primary Learner** (I'm here to learn)
   - 👨‍🏫 **Primary Teacher/Creator** (I'm here to teach)
8. **State** (dropdown: Indian states)
9. **Country** (default: India, editable)
10. **Agree to receive email updates** (checkbox)

**Why all upfront?**
- Better match quality from day 1
- No incomplete profiles cluttering matches
- Clear user intent (learner vs teacher)

---

### Step 2 — Onboarding Complete
- Profile auto-created
- User redirected to `/matches` page
- Welcome email sent (Resend)

---

### Step 3 — Smart Matching
System calculates **match scores** based on:
* Language compatibility (50 pts)
* Mutual exchange (30 pts)
* Role compatibility (learner ↔ teacher gets bonus 20 pts)
* Same state (10 pts)
* Shared interests (5 pts each)

Shows **top 10 matches**

---

### Step 4 — Connection
* Send connection request with message
* Accept/Reject requests
* Only matched users can chat

---

### Step 5 — Real-time Chat
* 1-on-1 messaging (Socket.io)
* Profanity filter **before delivery**
* Block/Report functionality

---

### Step 6 — Learning Support
* **Free Resources:**
  - Curated YouTube channels
  - Free courses (beginner → advanced)
  - Grammar guides, vocab lists
  
* **Premium Resources (Future):**
  - IELTS preparation courses
  - Embassy interview training
  - Cultural center job training
  - Business English courses
  - Pricing: ₹999 - ₹4,999 per course

---

## 7. MongoDB Schema (Updated)

### User
```typescript
{
  _id: ObjectId,
  email: string,
  name: string,
  profilePhoto: string, // Cloudinary URL
  
  // Primary fields from signup
  primaryLanguageToLearn: string,
  secondaryLanguageToLearn?: string,
  languagesKnow: [
    { language: string, fluency: 'beginner' | 'intermediate' | 'advanced' | 'native' }
  ],
  
  // Role
  primaryRole: 'learner' | 'teacher',
  
  // Location
  state: string,
  country: string,
  
  // Preferences
  emailUpdates: boolean,
  
  // Optional fields (editable later)
  age?: number,
  city?: string,
  bio?: string,
  interests?: string[],
  
  // System fields
  isBlocked: boolean,
  isPremium: boolean, // for future paid courses
  createdAt: Date,
  updatedAt: Date
}
```

### ConnectionRequest
```typescript
{
  _id: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  status: 'pending' | 'accepted' | 'rejected',
  message: string,
  matchScore: number, // store the score at time of request
  createdAt: Date
}
```

### Connection
```typescript
{
  _id: ObjectId,
  user1Id: ObjectId,
  user2Id: ObjectId,
  matchScore: number,
  createdAt: Date
}
```

### Message
```typescript
{
  _id: ObjectId,
  connectionId: ObjectId,
  senderId: ObjectId,
  content: string,
  isFiltered: boolean,
  isRead: boolean,
  createdAt: Date
}
```

### AbuseReport
```typescript
{
  _id: ObjectId,
  reporterId: ObjectId,
  reportedUserId: ObjectId,
  reason: 'harassment' | 'spam' | 'inappropriate' | 'other',
  description: string,
  status: 'pending' | 'reviewed' | 'resolved',
  createdAt: Date
}
```

### LearningResource
```typescript
{
  _id: ObjectId,
  language: string,
  title: string,
  url: string,
  type: 'youtube' | 'course' | 'article' | 'premium_course',
  level: 'beginner' | 'intermediate' | 'advanced' | 'career', // 'career' for premium
  category?: 'ielts' | 'embassy' | 'business' | 'cultural_center', // for premium
  price?: number, // in INR, null for free resources
  description: string,
  thumbnail?: string,
  isPremium: boolean,
  createdBy: ObjectId, // admin
  createdAt: Date
}
```

### PremiumCourse (Future Schema)
```typescript
{
  _id: ObjectId,
  title: string,
  language: string,
  category: 'ielts' | 'toefl' | 'embassy' | 'business' | 'cultural_center',
  description: string,
  price: number,
  currency: 'INR',
  modules: [
    { title: string, duration: string, resources: string[] }
  ],
  instructor: {
    name: string,
    bio: string,
    photo: string
  },
  thumbnail: string,
  enrollmentCount: number,
  rating: number,
  isActive: boolean,
  createdAt: Date
}
```

### Enrollment (Future)
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  paymentId: string, // Razorpay/Stripe
  amountPaid: number,
  status: 'active' | 'completed' | 'expired',
  progress: number, // 0-100%
  enrolledAt: Date,
  expiresAt: Date
}
```

---

## 8. Core Features & API Endpoints

### 8.1 Authentication (`/api/auth`)
- **NextAuth.js v5** with Google Provider
- Email/Password signup with all fields collected
- JWT sessions
- Rate limiting on auth endpoints

**Endpoints:**
- `POST /api/auth/signup` - Complete signup with all fields
- NextAuth handles OAuth flows

---

### 8.2 User Profile (`/api/profile`)

**Endpoints:**
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update profile (bio, interests, age, city)
- `POST /api/profile/photo` - Upload profile photo (Cloudinary)
- `GET /api/profile/:userId` - View another user's profile

**Validation:** Zod schemas for all fields

---

### 8.3 Enhanced Matching Engine (`/api/matches`)

**Algorithm (Updated):**
```typescript
function calculateMatchScore(user: User, candidate: User): number {
  let score = 0;
  
  // Primary language match (50 points)
  if (user.primaryLanguageToLearn === candidate.languagesKnow.map(l => l.language).includes(user.primaryLanguageToLearn)) {
    score += 50;
  }
  
  // Mutual exchange (30 points)
  const userKnows = user.languagesKnow.map(l => l.language);
  const candidateWants = candidate.primaryLanguageToLearn;
  if (userKnows.includes(candidateWants)) {
    score += 30;
  }
  
  // Role compatibility bonus (20 points)
  // Learner gets matched with teacher
  if ((user.primaryRole === 'learner' && candidate.primaryRole === 'teacher') ||
      (user.primaryRole === 'teacher' && candidate.primaryRole === 'learner')) {
    score += 20;
  }
  
  // Same state (10 points)
  if (user.state === candidate.state) score += 10;
  
  // Shared interests (5 pts each, max 20)
  if (user.interests && candidate.interests) {
    const sharedInterests = user.interests.filter(interest =>
      candidate.interests.includes(interest)
    );
    score += Math.min(sharedInterests.length * 5, 20);
  }
  
  return score;
}
```

**Endpoints:**
- `GET /api/matches` - Get top 10 matches for current user
- `GET /api/matches/:userId/score` - Calculate match score with specific user

---

### 8.4 Connections (`/api/connections`)

**Endpoints:**
- `POST /api/connections/request` - Send connection request
- `GET /api/connections/requests` - Get pending requests (received)
- `PUT /api/connections/request/:id/accept` - Accept request
- `PUT /api/connections/request/:id/reject` - Reject request
- `GET /api/connections` - Get all active connections
- `DELETE /api/connections/:id` - Remove connection

---

### 8.5 Real-time Chat (`/api/messages` + Socket.io)

**Message Flow:**
1. User sends message via Socket.io
2. Server validates connection exists
3. **Profanity filter** checks content
4. If clean: save to DB + emit to recipient
5. If flagged: save with `isFiltered: true`

**Endpoints:**
- `GET /api/messages/:connectionId` - Get chat history
- `PUT /api/messages/:id/read` - Mark message as read
- Socket events: `send_message`, `receive_message`, `typing`

---

### 8.6 Safety & Moderation (`/api/reports`)

**Endpoints:**
- `POST /api/reports` - Report a user
- `POST /api/users/:id/block` - Block a user
- `GET /api/admin/reports` - Admin view reports
- `PUT /api/admin/reports/:id` - Update report status

---

### 8.7 Learning Resources (`/api/resources`)

**Endpoints:**
- `GET /api/resources?language=Hindi&level=beginner&type=free` - Get free resources
- `GET /api/resources/premium?category=ielts` - Get premium courses (future)
- `POST /api/resources` - Admin add resource
- `PUT /api/resources/:id` - Admin edit
- `DELETE /api/resources/:id` - Admin delete

---

### 8.8 Premium Courses (Future - Phase 2)

**Endpoints:**
- `GET /api/courses` - List all premium courses
- `GET /api/courses/:id` - Course details
- `POST /api/courses/:id/enroll` - Enroll (triggers payment)
- `GET /api/my-courses` - User's enrolled courses
- `PUT /api/courses/:id/progress` - Update progress

**Payment Flow:**
1. User clicks "Enroll Now"
2. Razorpay checkout opens
3. Payment success → create Enrollment record
4. Send confirmation email
5. Grant access to course modules

---

## 9. Frontend Pages & Components

### Pages (App Router)
```
/                          → Landing page
/auth/signup               → Complete signup form (ALL fields)
/auth/signin               → NextAuth sign-in
/dashboard                 → User home
/matches                   → Top 10 matches
/connections               → Active connections
/chat/:connectionId        → Chat interface
/resources                 → Free learning resources
/resources/premium         → Premium courses (future)
/course/:id                → Course details page (future)
/my-courses                → Enrolled courses (future)
/profile                   → Edit profile
/profile/:userId           → View user profile
/admin/reports             → Admin dashboard
/admin/resources           → Manage resources
```

### Signup Page Components
```tsx
<SignupForm>
  <ProfilePhotoUpload />
  <Input name="name" required />
  <Input name="email" type="email" required />
  <Select name="primaryLanguageToLearn" required />
  <Select name="secondaryLanguageToLearn" />
  <MultiSelect name="languagesKnow" required />
  <RadioGroup name="primaryRole" required>
    <Radio value="learner">🎓 Primary Learner</Radio>
    <Radio value="teacher">👨‍🏫 Primary Teacher</Radio>
  </RadioGroup>
  <Select name="state" required />
  <Select name="country" defaultValue="India" />
  <Checkbox name="emailUpdates">Receive email updates</Checkbox>
  <Button type="submit">Complete Signup</Button>
</SignupForm>
```

### Key Components
- `ProfileCard` - Display user info + match score + role badge
- `RoleBadge` - Visual indicator (Learner 🎓 / Teacher 👨‍🏫)
- `ChatBubble` - Message UI
- `LanguagePicker` - Multi-select with fluency levels
- `MatchScore` - Visual score indicator (0-110 now with role bonus)
- `ConnectionRequest` - Accept/Reject UI
- `ResourceCard` - Free resource card
- `PremiumCourseCard` - Course pricing + enrollment button (future)
- `SafetyBanner` - Report/Block buttons

---

## 10. 6-Week Build Timeline

### **Week 1: Foundation & Complete Signup**
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Setup MongoDB Atlas + Mongoose
- [ ] Implement NextAuth.js (Google OAuth + Email)
- [ ] **Build complete signup form (all 10 fields)**
  - Profile photo upload
  - Language pickers
  - Role selection
  - State/country dropdowns
- [ ] Create User schema with all new fields
- [ ] Landing page (Tailwind + Shadcn)
- [ ] Email service setup (Resend)

**Deliverable:** Users can sign up with complete profiles

---

### **Week 2: Profile & Email System**
- [ ] Profile edit page (bio, interests, age, city)
- [ ] Profile view page with role badge
- [ ] Zod validation for all forms
- [ ] API: `GET/PUT /api/profile`
- [ ] Welcome email template
- [ ] Email preferences page

**Deliverable:** Users can manage profiles & receive emails

---

### **Week 3: Enhanced Matching**
- [ ] Implement updated match score algorithm (with role bonus)
- [ ] Matches page with role badges
- [ ] Filter matches by role (show teachers if you're learner)
- [ ] Match score visual with breakdown
- [ ] API: `GET /api/matches`
- [ ] Connection request flow
- [ ] API: Connection CRUD endpoints

**Deliverable:** Role-aware matching system live

---

### **Week 4: Real-time Chat**
- [ ] Setup Socket.io server
- [ ] Chat UI with role indicators
- [ ] Real-time message delivery
- [ ] Profanity filter integration
- [ ] API: `GET/POST /api/messages`
- [ ] Read receipts
- [ ] Typing indicators
- [ ] New message email notifications

**Deliverable:** Connected users can chat

---

### **Week 5: Safety & Free Resources**
- [ ] Block user functionality
- [ ] Report system
- [ ] Admin dashboard
  - View reports
  - Block users
  - Manage resources
- [ ] Learning Resources page (free only)
  - Filter by language/level
  - Resource cards
- [ ] API: Resources CRUD (admin)
- [ ] Seed 100+ curated free resources

**Deliverable:** Safety + free learning library

---

### **Week 6: Polish & Launch**
- [ ] Onboarding flow optimization
- [ ] Email notifications for:
  - Connection request
  - Message received
  - Weekly match suggestions
- [ ] Dark mode
- [ ] SEO optimization
- [ ] Responsive design
- [ ] Performance optimization
- [ ] **Deploy to Vercel**
- [ ] **ProductHunt launch**

**Deliverable:** Public MVP live

---

## 11. Post-MVP Roadmap

### **Phase 2 (Month 2-3): Premium Courses**
- [ ] Premium course schema & pages
- [ ] Course creation dashboard (admin)
- [ ] Razorpay integration
- [ ] Course enrollment flow
- [ ] Course progress tracking
- [ ] Certificate generation

**Launch with:**
- 5 IELTS courses (₹1,999 - ₹3,999)
- 3 Embassy interview courses (₹2,499)
- 2 Business English courses (₹1,499)

---

### **Phase 3 (Month 4-6): Advanced Features**
- [ ] Video/Voice calling (Agora SDK)
- [ ] Scheduled learning sessions
- [ ] Language level assessments
- [ ] Mobile app (React Native)
- [ ] Teacher verification badges
- [ ] Student testimonials

---

### **Phase 4 (Month 7+): Scale**
- [ ] Group language practice rooms
- [ ] Institution partnerships
- [ ] AI conversation practice bot
- [ ] Analytics dashboard for teachers
- [ ] Affiliate program for course creators

---

## 12. Premium Course Categories (Future)

### **IELTS Preparation**
- **IELTS Speaking Mastery** - ₹2,999
- **IELTS Writing Band 7+** - ₹3,499
- **Complete IELTS Bundle** - ₹4,999

### **Embassy & Immigration**
- **US Embassy Interview Prep** - ₹2,499
- **Canada PR English Test** - ₹2,999
- **UK Visa Interview Guide** - ₹1,999

### **Cultural Center Jobs**
- **Alliance Française Job Prep** - ₹2,499
- **Goethe-Institut Interview** - ₹2,499
- **British Council Careers** - ₹2,999

### **Business English**
- **Corporate Communication** - ₹1,999
- **Email Writing Mastery** - ₹1,499
- **Presentation Skills** - ₹1,999

---

## 13. Success Metrics

**Primary (MVP):**
- Signup completion rate (target: >80%)
- Match acceptance rate (target: >40%)
- Messages sent per connection (target: >10)
- Teacher-learner ratio (target: 1:3)

**Secondary (Post-MVP):**
- Premium course conversion (target: 5% of users)
- Average revenue per paying user (target: ₹2,500)
- Course completion rate (target: >60%)
- Repeat course purchases (target: >30%)

---

## 14. Monetization Strategy (Future)

### **Revenue Streams**
1. **Premium Courses** (primary)
   - ₹1,499 - ₹4,999 per course
   - Target: 10% conversion rate
   - 10,000 users → 1,000 paying → ₹25L revenue

2. **Teacher Verification** (optional)
   - ₹499/year for verified badge
   - Benefits: priority in matches, profile boost

3. **Institution Partnerships**
   - Custom course creation for NGOs/schools
   - B2B pricing: ₹50,000 - ₹2L per institution

4. **Ads (minimal)**
   - Only on free resource pages
   - Google AdSense (non-intrusive)

### **Pricing Tiers**
- **Free:** Matching + chat + free resources
- **Premium Learner:** ₹199/month → ad-free + priority matching
- **Verified Teacher:** ₹499/year → badge + analytics
- **Career Courses:** One-time ₹1,499 - ₹4,999

---

## 15. Signup Flow (Detailed UX)

### **Step 1: Welcome Screen**
```
Welcome to VartaLang 🌍

Connect with real people. Learn real languages.

[Sign up with Google]
[Sign up with Email]

Already have an account? [Sign in]
```

---

### **Step 2: Complete Your Profile**
```
Let's set up your learning journey

[Upload Photo] 📸
Optional - add now or later

Full Name *
[________________]

Email *
[________________]

What do you want to learn? *
Primary Language: [Dropdown: Hindi, English, Tamil...]
Secondary Language: [Dropdown: Optional]

What can you teach? *
Languages I know: [Multi-select with levels]
☑ English (Native)
☐ Hindi (Advanced)
☐ Tamil (Beginner)

What's your primary goal? *
○ 🎓 I want to LEARN a language
○ 👨‍🏫 I want to TEACH a language

Where are you from? *
State: [Dropdown: Maharashtra, Delhi...]
Country: [Dropdown: India (default)]

☑ Send me weekly learning tips & match suggestions

[Complete Signup] →
```

---

### **Step 3: Success Screen**
```
Welcome aboard, [Name]! 🎉

We're finding your perfect language partners...

[Go to My Matches] →

What happens next?
✓ We'll match you with compatible partners
✓ You can send connection requests
✓ Start chatting once connected
✓ Access free learning resources
```

---

## 16. Security & Safety

### Authentication
- JWT sessions (HTTP-only cookies)
- CSRF protection
- Rate limiting (10 signups/hour per IP)

### Data Protection
- Zod validation on all endpoints
- MongoDB parameterized queries
- XSS prevention (React auto-escaping)
- HTTPS only

### Content Moderation
- **bad-words** library + custom Hindi/Tamil words
- Auto-flag after 3 reports
- Manual review queue for admins

### Privacy
- No public profiles
- Email only visible after connection
- GDPR-compliant data deletion

---

## 17. Email Templates (Resend)

### **Welcome Email**
```
Subject: Welcome to VartaLang, [Name]! 🌍

Hi [Name],

You're now part of India's most respectful language learning community!

Your Profile:
- Learning: [Primary Language]
- Teaching: [Languages Known]
- Role: [Learner/Teacher]

Next Steps:
1. Check your matches → [Link]
2. Send connection requests
3. Start your first conversation

Happy Learning!
The VartaLang Team
```

### **New Match Email (Weekly)**
```
Subject: 3 New Perfect Matches for You!

Hi [Name],

We found language partners who match your goals:

1. [User Name] - Teaches [Language] | Match Score: 85
2. [User Name] - Teaches [Language] | Match Score: 80
3. [User Name] - Teaches [Language] | Match Score: 78

[View All Matches] →

Don't miss out!
```

---

## 18. One-Line Positioning

> **VartaLang: Where India learns languages with dignity, safety, and human connection—and advances careers with expert courses.**

---

## 19. Development Commands

```bash
# Setup
npx create-next-app@latest vartalang --typescript --tailwind --app
cd vartalang
npm install next-auth@beta mongodb socket.io bad-words zod
npm install cloudinary resend razorpay

# Run dev
npm run dev

# Deploy
vercel --prod
```

---

## 20. Ready to Build? 🚀

**Immediate Next Steps:**
1. ✅ Setup GitHub repo
2. ✅ Initialize Next.js project
3. ✅ Create MongoDB Atlas cluster
4. ✅ Design complete signup form (Figma/wireframe)
5. ✅ Start Week 1 checklist

**Need detailed specs for:**
- Complete API contract (OpenAPI)
- Razorpay payment integration guide
- Admin dashboard wireframes
- Email template designs
- Premium course structure

**Let's ship VartaLang in 6 weeks and build India's first career-focused language platform.** 🎯
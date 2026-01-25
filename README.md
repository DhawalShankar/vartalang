# VartaLang - The Language Bridge of India

**Where India learns languages with dignity, safety, and human connection.**

---

## 🎯 What is VartaLang?

A **safe, respectful language-exchange platform** where Indians learn languages from real people by teaching what they know and learning what they want. NOT a dating app. NOT a social feed. Just pure language learning.

**Future:** Premium career courses (IELTS, embassy interviews, cultural center jobs).

---

## 🚀 Tech Stack (100% Free Tier)

```
Frontend: Next.js 14, TypeScript, Tailwind, Shadcn UI
Backend: Next.js API Routes
Database: MongoDB Atlas (FREE - 512MB)
Auth: NextAuth.js v5 + Google OAuth
Real-time: Socket.io
Storage: Cloudinary (25GB free)
Email: Resend (100/day free)
Hosting: Vercel
Safety: bad-words library
Payments: Razorpay (future)
```

---

## ✨ Core Features

### MVP (6 Weeks)
- ✅ Complete signup (photo, languages, role, location)
- ✅ Smart matching (language compatibility + role-based)
- ✅ 1-on-1 real-time chat
- ✅ Profanity filtering
- ✅ Block/Report system
- ✅ Free learning resources library
- ✅ Learner vs Teacher roles

### Future (Phase 2+)
- 💰 Premium courses (₹1,499 - ₹4,999)
- 📞 Video/Voice calls
- 🎓 IELTS, embassy, business training
- 📱 Mobile app

---

## 🧠 Smart Matching Algorithm

```typescript
Score Breakdown (0-110 points):
├─ Language compatibility: 50 pts
├─ Mutual exchange: 30 pts
├─ Role match (learner↔teacher): 20 pts
├─ Same state: 10 pts
└─ Shared interests: 5 pts each (max 20)
```

---

## 📋 User Flow

```
1. Signup → All info collected (photo, languages, role, location)
2. Auto-matched → Top 10 compatible partners
3. Send request → Accept/Reject
4. Chat → Real-time, toxicity-filtered
5. Learn → Free resources + premium courses (future)
```

---

## 🗄️ Core Schema

```javascript
User {
  email, name, profilePhoto, primaryRole: 'learner|teacher',
  primaryLanguageToLearn, secondaryLanguageToLearn,
  languagesKnow: [{language, fluency}],
  state, country, emailUpdates, isPremium
}

Connection { user1Id, user2Id, matchScore }
Message { connectionId, senderId, content, isFiltered }
Resource { language, title, url, type, level, price, isPremium }
```

---

## 📅 6-Week Timeline

| Week | Milestone |
|------|-----------|
| 1 | Auth + Complete Signup Form (10 fields) |
| 2 | Profile Edit + Email System |
| 3 | Enhanced Matching (role-aware) |
| 4 | Real-time Chat + Notifications |
| 5 | Safety + Free Resources Library |
| 6 | Polish + SEO + **ProductHunt Launch** |

---

## 💰 Monetization (Future)

```
Free Tier: Matching + chat + free resources

Premium Courses (Phase 2):
├─ IELTS Prep: ₹2,999
├─ Embassy Interviews: ₹2,499
├─ Business English: ₹1,999
└─ Cultural Center Jobs: ₹2,499

Optional:
├─ Premium Learner: ₹199/month (ad-free)
└─ Verified Teacher: ₹499/year (badge + analytics)
```

---

## 🛡️ Safety First

- ✅ Pre-delivery profanity filter
- ✅ Instant block/report
- ✅ No public profiles (privacy)
- ✅ Auto-flag after 3 reports
- ✅ Admin moderation dashboard
- ✅ GDPR-compliant data deletion

---

## 📊 Success Metrics

**Not vanity metrics.** We track:
- Match acceptance rate (>40%)
- Messages per connection (>10)
- Teacher-learner ratio (1:3)
- Toxicity rate (<2%)
- 30/60-day retention

**NOT tracked:** likes, followers, time spent

---

## 🎨 Key Pages

```
/                    → Landing
/auth/signup         → Complete signup (ALL 10 fields)
/matches             → Top 10 matches (role badges)
/connections         → Active chats
/chat/:id            → Real-time messaging
/resources           → Free learning library
/resources/premium   → Career courses (future)
/profile             → Edit profile
/admin/reports       → Moderation dashboard
```

---

## 🚦 Getting Started

```bash
# Clone & install
git clone https://github.com/yourusername/vartalang
cd vartalang
npm install

# Setup env
cp .env.example .env.local
# Add: MONGODB_URI, NEXTAUTH_SECRET, CLOUDINARY_URL, RESEND_API_KEY

# Run dev
npm run dev

# Deploy
vercel --prod
```

---

## 🎯 Core Principles

1. **Safety > Speed** - Every message filtered before delivery
2. **No Dark Patterns** - No engagement bait, no infinite scroll
3. **Reciprocal Learning** - You must teach to learn
4. **Role Clarity** - Learners match with teachers
5. **Cultural Respect** - No dating mechanics
6. **Institution-Grade** - Built for NGOs, schools, professionals

---

## 📈 Roadmap

**Now:** MVP Launch (6 weeks)  
**Month 2-3:** Premium courses + Razorpay  
**Month 4-6:** Video calls + Mobile app  
**Month 7+:** AI practice bot + Institutions  

---

## 🤝 Contributing

Open to contributions after MVP launch. Focus areas:
- Regional language bad-words lists
- Free resource curation
- UI/UX improvements
- Security audits

---

## 📄 License

MIT License - Build with dignity, not profit-first.

---

## 🌟 One-Liner

> **VartaLang: Where India learns languages with dignity, safety, and human connection—and advances careers with expert courses.**

---

**Built with ❤️ for India's language learners.**

[GitHub](#) | [ProductHunt](#) | [Twitter](#) | [hello@vartalang.com](mailto:cosmoindiaprakashan@gmail.com)
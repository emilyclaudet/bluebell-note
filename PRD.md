# Bluebell Note — Product Requirements Document

**Version 1.0 | March 2026 | MVP Spec**
**Author:** Emily
**Status:** Draft

---

## 1. Problem Statement

People regularly feel gratitude and appreciation for the people in their lives, but the social infrastructure for expressing it is almost entirely gated by major life events: birthdays, weddings, baby showers, holidays. Outside of these moments, there is no prompt, no ritual, and no frictionless channel for telling someone what they mean to you. The result is that heartfelt words go unsaid, relationships miss opportunities for deepening, and people underestimate how much they are valued by others.

Research consistently shows that both expressing and receiving gratitude significantly improves wellbeing, yet the gap between feeling grateful and acting on it remains enormous. Bluebell Note closes that gap — like bluebells blooming quietly in a woodland, kindness should be something that appears unexpectedly and brightens everything around it.

---

## 2. Goals

- **G1:** Enable anyone to write and schedule a meaningful message to someone they care about in under 3 minutes.
- **G2:** Achieve a 30%+ recipient-to-sender conversion rate (recipients who then write a message for someone else) within 60 days of launch.
- **G3:** Reach 500 messages sent within the first 30 days through organic sharing alone.
- **G4:** Maintain a 90%+ message delivery success rate (emails not bouncing or landing in spam).
- **G5:** Demonstrate that guided prompts increase message completion rate by 2x compared to a blank text field.

---

## 3. Non-Goals

- **User accounts or authentication.** No sign-up required for MVP. Adding auth increases friction and is premature before validating core demand.
- **Two-way messaging or replies.** This is not a chat app. The magic is in the one-directional, unexpected nature of receiving a message. Replies may dilute that.
- **AI-generated message content.** The entire value proposition is that messages are written by humans. AI prompts guide the writer but never write for them. This also avoids API costs.
- **Native mobile app.** A responsive web app is sufficient for MVP. Native apps can be explored once the concept is validated.
- **Monetization.** No premium tiers, no paid features. This is a portfolio/validation project first.

---

## 4. User Stories

### Sender

- As a sender, I want to pick my relationship type (friend, partner, parent, sibling, coworker, mentor) so that I receive relevant writing prompts.
- As a sender, I want to see 2–3 thoughtful prompt questions that help me think about what to say, so that I can write something meaningful even if I'm not a natural writer.
- As a sender, I want to write a freeform message with the option to skip prompts, so that I'm not forced into a structure if I already know what to say.
- As a sender, I want to upload one or more images (photos together, a meaningful screenshot, etc.) to include with my message, so it feels personal and visual.
- As a sender, I want to choose a delivery date or select "surprise me" (random delivery within 1–30 days), so I can be intentional about timing or embrace spontaneity.
- As a sender, I want to enter my recipient's name and email address, so the message reaches the right person.
- As a sender, I want to preview exactly what my recipient will see before I schedule it, so I feel confident about the final result.
- As a sender, I want to receive a confirmation email with the scheduled delivery date, so I have a record.

### Recipient

- As a recipient, I want to receive a beautifully designed email with a link to my message, so the experience feels special from the first touchpoint.
- As a recipient, I want to open a dedicated web page that displays the message, any attached images, and the sender's name, so it feels like receiving a letter.
- As a recipient, I want to be gently invited to write a message for someone else after reading mine, so the gratitude continues.

---

## 5. Requirements

### Must-Have (P0)

| Requirement | Description | Priority |
|---|---|---|
| Writing flow | Multi-step guided experience: pick relationship type, view 2–3 prompts, compose message, add images, pick delivery date, enter recipient details, preview, confirm. | P0 |
| Prompt bank | Curated bank of 50–100 writing prompts organized by relationship type. Stored as static JSON. Prompts surface as gentle questions, not templates. | P0 |
| Image upload | Sender can upload 1–3 images (JPEG, PNG, max 5MB each). Images display on the recipient's message page. Stored in cloud storage (e.g., Vercel Blob or S3). | P0 |
| Scheduling engine | Sender picks a specific date or "surprise me." Messages stored in DB with delivery timestamp. Vercel cron job runs daily, sends emails for messages due that day. | P0 |
| Recipient page | Beautiful, mobile-responsive web page at a unique URL with bluebell-inspired design. Shows sender name, message text, and images with a blooming reveal animation. Includes CTA to send a Bluebell to someone else. | P0 |
| Notification email | Recipient gets an email with sender's name, a short teaser, and a link to their message page. Clean HTML email via Resend or SendGrid. | P0 |
| Sender confirmation | After scheduling, sender receives a confirmation email with the delivery date and a link to their sent message. | P0 |
| Responsive design | Entire app works well on mobile and desktop. Writing flow is touch-friendly. | P0 |

### Nice-to-Have (P1)

| Requirement | Description | Priority |
|---|---|---|
| Visual themes | Sender can pick a visual theme for the recipient page (warm, playful, minimal, handwritten). Affects colors, typography, and layout. | P1 |
| Bloom animation | Recipient page message blooms open with a gentle scale and fade animation inspired by a bluebell opening, heightening the emotional moment. | P1 |
| Prompt refresh | Sender can tap to see different prompts if the first set doesn't resonate. | P1 |
| Social sharing | Recipient can share that they received a Bluebell (without revealing content) to Instagram Stories or X/Twitter. | P1 |
| Analytics dashboard | Simple internal dashboard showing: messages sent, delivered, opened, and conversion rate (recipient → sender). | P1 |

### Future Considerations (P2)

| Requirement | Description | Priority |
|---|---|---|
| User accounts | Optional sign-up to view sent message history, get reminders ("You haven't sent a Bluebell in 2 weeks"), and manage scheduled messages. | P2 |
| Group messages | Multiple people contribute to one message (e.g., a team appreciation message for a colleague). | P2 |
| Occasion reminders | Sender enters important dates (birthdays, anniversaries) and gets a nudge to write something before each one. | P2 |
| Custom domains | Let the recipient page live at bluebellnote.com/name or a sender's custom domain. | P2 |
| SMS delivery | Alternative delivery via text message for recipients who may not check email frequently. | P2 |

---

## 6. Core User Flow

### Sender experience (target: under 3 minutes)

1. **Landing page:** Warm, inviting hero with bluebell-inspired visuals and a single CTA: "Send a Bluebell to someone you love."
2. **Relationship picker:** Choose who this is for (friend, partner, parent, sibling, coworker, mentor, other).
3. **Prompt screen:** 2–3 thoughtful questions surface based on relationship type. These are displayed as gentle nudges above the text area, not form fields.
4. **Compose:** Large text area for the message. Character soft-limit indicator (suggested 500 chars, no hard cap). Option to upload 1–3 images.
5. **Schedule:** Pick a specific delivery date or "Surprise them" (random within 1–30 days). Enter recipient name and email. Enter sender's name and email.
6. **Preview:** Full preview of what the recipient will see, including images and layout.
7. **Confirm:** Send confirmation. Sender gets an email receipt. Done.

### Recipient experience

1. Email arrives with subject: "[Sender] sent you a Bluebell." Short preview text. Link to message page.
2. Message page opens with a blooming reveal animation. Message text, images, sender name displayed beautifully.
3. Below the message: "Someone just sent you a Bluebell. Want to send one to someone else?" → CTA back to the writing flow.

---

## 7. Prompt Bank Examples

Prompts are phrased as reflective questions. They are not templates — they are designed to unlock what the sender already feels but may struggle to articulate.

| Relationship | Example Prompts |
|---|---|
| Friend | What's a small thing this person does that always makes you smile? / When was the last time they showed up for you in a way that mattered? / What would you miss most if they moved far away? |
| Partner | What's something they do that makes you feel safe? / What moment together do you replay in your head? / What's something you've never told them you appreciate? |
| Parent | What's a lesson they taught you that you didn't understand until you were older? / What sacrifice of theirs do you only now appreciate? / What's a quality of theirs you see in yourself? |
| Sibling | What's an inside joke only you two understand? / What's something they're great at that they don't give themselves credit for? / When did they have your back when nobody else did? |
| Coworker | What's something they bring to the team that nobody else could? / When did they help you without being asked? / What do you admire about how they work? |
| Mentor | What's a piece of advice they gave you that changed your trajectory? / How would your life be different without their guidance? / What do they believe in you for that you're still growing into? |

---

## 8. Visual Identity

**Brand concept:** Bluebells are one of the most iconic British wildflowers. They carpet ancient woodlands each spring, appearing quietly and unexpectedly. In the Victorian language of flowers, bluebells represent gratitude, humility, and constancy. This metaphor maps directly to the product: small, beautiful gestures of kindness that appear when you least expect them.

### Color Palette

| Role | Color | Usage |
|---|---|---|
| Primary | Bluebell (#5B6AAF) | Headings, buttons, links, key UI accents |
| Secondary | Soft Lavender (#E8EAF6) | Backgrounds, cards, hover states |
| Accent | Woodland Green (#6A9B7B) | Success states, confirmation, secondary buttons |
| Warm | Petal Pink (#E8B4B8) | Highlights, notification badges, emotional moments |
| Dark | Deep Plum (#2D2A3E) | Body text, strong contrast |
| Light | Morning Mist (#F5F3F7) | Page backgrounds, subtle containers |

### Design Language

- **Typography:** Warm, rounded sans-serif for body (e.g., DM Sans, Nunito). A gentle serif for the message display page (e.g., Lora, Merriweather) to evoke the feeling of a handwritten letter.
- **Iconography:** Simple bluebell flower icon as the logo mark. Subtle floral line illustrations as decorative elements on the recipient page.
- **Animations:** Messages "bloom" open on the recipient page — a gentle scale and fade animation that evokes a flower opening. Soft, unhurried transitions throughout.
- **Tone of voice:** Warm, understated, never pushy. The product whispers rather than shouts. Copy should feel like a kind friend encouraging you, not a marketing funnel.
- **Shorthand:** Within the product, "Bluebell" is used as shorthand. "Send a Bluebell," "You received a Bluebell," "Your Bluebell is on its way."

---

## 9. Technical Architecture

- **Framework:** Next.js 14+ (App Router) deployed on Vercel.
- **Database:** Vercel Postgres or Supabase (PostgreSQL). Single `messages` table plus an `images` table.
- **Image storage:** Vercel Blob or AWS S3. Images uploaded client-side via presigned URLs, stored with message ID reference.
- **Email service:** Resend (free tier: 100 emails/day) or SendGrid. Transactional emails for delivery and sender confirmation.
- **Scheduling:** Vercel Cron Jobs. A daily cron runs at 8:00 AM UTC, queries messages with `delivery_date = today` and `status = scheduled`, sends emails, updates status to `delivered`.
- **Recipient pages:** Dynamic route `/m/[messageId]`. Server-rendered for fast loads and SEO of the landing page.
- **Styling:** Tailwind CSS. Mobile-first responsive design.

### Data Model

**messages**

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| sender_name | VARCHAR(100) | Display name of sender |
| sender_email | VARCHAR(255) | For confirmation email |
| recipient_name | VARCHAR(100) | Display name of recipient |
| recipient_email | VARCHAR(255) | Delivery target |
| relationship_type | ENUM | friend, partner, parent, sibling, coworker, mentor, other |
| message_text | TEXT | The written message |
| delivery_date | DATE | When to send |
| status | ENUM | scheduled, delivered, opened |
| created_at | TIMESTAMP | When message was created |
| theme | VARCHAR(50) | Visual theme (P1) |

**images**

| Field | Type | Notes |
|---|---|---|
| id | UUID | Primary key |
| message_id | UUID | FK to messages table |
| url | VARCHAR(500) | Cloud storage URL |
| order | INTEGER | Display order (1–3) |
| alt_text | VARCHAR(255) | Accessibility text |

---

## 10. Success Metrics

### Leading Indicators (Week 1–2)

- Messages created: Total count and daily trend.
- Completion rate: % of users who start the flow and successfully schedule a message (target: 60%+).
- Prompt engagement: % of senders who view prompts vs. skip them. Are prompted senders writing longer messages?
- Image upload rate: % of messages that include at least one image (target: 40%+).
- Delivery success rate: % of emails that reach the inbox without bouncing (target: 90%+).

### Lagging Indicators (Month 1–3)

- Recipient-to-sender conversion: % of recipients who click the CTA and send their own message (target: 30%+).
- Organic growth rate: New senders acquired without paid marketing. Tracking referral source.
- Repeat senders: % of senders who return to send a second message within 30 days (target: 15%+).
- Message open rate: % of recipients who click through to view their message page (target: 70%+).

---

## 11. Open Questions

| Question | Owner | Blocking? |
|---|---|---|
| Should we verify sender email (e.g., magic link) to prevent spam/abuse, or is that too much friction for MVP? | Product + Eng | Yes |
| What is the maximum image file size we can support on Vercel Blob free tier? | Engineering | No |
| Do we need a content moderation strategy for MVP, or is the low volume manageable with manual review? | Product | No |
| Should the "surprise me" delivery window be 1–30 days or should we let the sender pick the range? | Design | No |
| What email subject line maximizes open rates without feeling spammy? Needs A/B testing post-launch. | Product + Design | No |
| Should recipient pages expire after a certain time, or remain permanently accessible? | Product + Eng | No |

---

## 12. Timeline Considerations

**Target: Build and deploy MVP in a single afternoon/weekend session.**

| Phase | Scope | Estimate |
|---|---|---|
| Phase 1: Core | Landing page, writing flow with prompts, scheduling, recipient page, email delivery. | 4–6 hours |
| Phase 2: Images | Image upload UI, cloud storage integration, image display on recipient page. | 2–3 hours |
| Phase 3: Polish | Mobile optimization, email template design, preview flow, sender confirmation. | 2–3 hours |
| Phase 4: Launch | Custom domain setup, basic analytics, social sharing meta tags (OG image). | 1–2 hours |

**Dependencies:** Vercel account (free tier), email service API key (Resend or SendGrid), domain name (optional for MVP, can use .vercel.app subdomain).

---

## 13. Growth Loop

The product has a natural viral coefficient built into its core mechanic. Every Bluebell sent creates a new potential sender:

1. Sender writes and schedules a Bluebell.
2. Recipient receives email, opens their Bluebell page.
3. Recipient feels moved. Sees CTA: "Someone just sent you a Bluebell. Want to send one to someone else?"
4. Recipient becomes sender. The kindness spreads.

If the recipient-to-sender conversion rate exceeds ~30%, each Bluebell generates roughly one new Bluebell on average, creating sustainable organic growth without any marketing spend. Kindness, like bluebells, spreads naturally once the conditions are right.

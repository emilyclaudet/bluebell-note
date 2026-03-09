# Bluebell Note

Bluebell Note is a web app for writing and scheduling heartfelt messages to the people you care about — no special occasion required. The full PRD lives in `docs/PRD.md`.

## Product Summary

Users land on the site, pick a relationship type, get guided by reflective writing prompts, compose a message (optionally with images), and schedule delivery. Recipients get an email linking to a beautifully designed page showing the message. After reading, recipients are invited to send a Bluebell to someone else, creating an organic growth loop.

Within the product, "Bluebell" is the shorthand: "Send a Bluebell," "You received a Bluebell."

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Deployment:** Vercel
- **Database:** Vercel Postgres or Supabase (PostgreSQL)
- **Image storage:** Vercel Blob
- **Email:** Resend
- **Styling:** Tailwind CSS
- **Scheduling:** Vercel Cron Jobs (daily at 8:00 AM UTC)

## Data Model

**messages** table: id (UUID PK), sender_name, sender_email, recipient_name, recipient_email, relationship_type (ENUM: friend/partner/parent/sibling/coworker/mentor/other), message_text (TEXT), delivery_date (DATE), status (ENUM: scheduled/delivered/opened), created_at, theme (VARCHAR, P1).

**images** table: id (UUID PK), message_id (FK), url, order (1-3), alt_text.

## Key Routes

- `/` — Landing page and writing flow
- `/m/[messageId]` — Recipient message page (server-rendered)
- `/api/send` — Cron endpoint: query messages due today, send emails, update status

## Design System

**Color palette:**
- Primary: Bluebell `#5B6AAF`
- Secondary: Soft Lavender `#E8EAF6`
- Accent: Woodland Green `#6A9B7B`
- Warm: Petal Pink `#E8B4B8`
- Dark: Deep Plum `#2D2A3E`
- Light: Morning Mist `#F5F3F7`

**Typography:** DM Sans or Nunito for body. Lora or Merriweather for the recipient message display page.

**Tone:** Warm, understated, never pushy. The product whispers rather than shouts.

## Core User Flow

1. Landing page → "Send a Bluebell to someone you love"
2. Pick relationship type
3. View 2-3 reflective writing prompts
4. Compose message + optional image upload (1-3 images, max 5MB each)
5. Choose delivery date or "Surprise them" (random 1-30 days)
6. Enter recipient name/email and sender name/email
7. Preview → Confirm → Sender gets confirmation email

## Prompt Bank

Stored as static JSON, organized by relationship type. Prompts are reflective questions (not templates) like: "What's a small thing this person does that you've never thanked them for?" See `docs/PRD.md` Section 7 for the full prompt bank.

## MVP Scope (P0 only)

- Multi-step guided writing flow with prompt bank
- Image upload (1-3 images via Vercel Blob)
- Scheduling engine with date picker and "surprise me"
- Recipient page with bluebell-inspired design
- Email notifications (recipient delivery + sender confirmation) via Resend
- Responsive design (mobile-first)
- No auth required — no user accounts for MVP

## What This Project Is NOT

- Not a chat app — messages are one-directional
- Not AI-generated — humans write the messages, prompts just guide them
- Not monetized — this is a portfolio/validation project

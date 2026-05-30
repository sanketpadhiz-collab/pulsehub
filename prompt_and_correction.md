# DASHBOARD 

Act as a Senior Product Designer, UX Architect, and Frontend Engineer.
Create a modern corporate intranet dashboard page for a web application called "PulseHub".
PulseHub is a centralized internal platform that improves employee engagement, communication, visibility, collaboration, recognition, alignment, and organizational culture across the entire company ecosystem.
Tech Requirements:

- Use React JSX
- Use Tailwind CSS classes only
- Create a responsive dashboard component
- Use realistic mock data
- Follow modern SaaS design patterns
## Design Style:

* Claymorphism mixed with subtle glassmorphism
* Smooth microinteractions and hover effects
* Premium enterprise software appearance
* Clean spacing and strong visual hierarchy
* Soft shadows and rounded corners
* Modern and professional, not playful
* Mobile and desktop responsive
### Color Guidelines:

* Informational areas should remain monochromatic using whites, grays, slate tones, and deep navy blues
* Bright accent colors should be reserved ONLY for interactive elements, notifications, badges, buttons, and call-to-actions
* Avoid visual clutter and excessive color usage
### UX Requirements:

* Show only the most important information above the fold
* Use progressive disclosure principles
* Hide secondary information inside accordions, expandable sections, tabs, or "Read More" interactions
* Prioritize clarity over quantity
* Dashboard should feel powerful but not overwhelming
The dashboard should contain:

###  Welcome Header

* Personalized greeting
* Employee profile summary
* Quick action buttons
  
### Priority Information Section

* Leadership Message
* Company Announcement
* Strategic Business Update

### Organizational Snapshot

* Employee Count
* Active Projects
* Department Updates
* Upcoming Events
* Recognition Activity

### Recognition Spotlight

* Peer appreciation highlights
* Employee achievements
* Team accomplishments
* Small leaderboard preview

### Department Impact Overview

* Engineering
* Marketing
* Sales
* Operations
* HR
Display department achievements and impact metrics.

### Upcoming Events

* Interactive event cards
* RSVP status indicators
* Event countdowns

### New Joiners Carousel

* Employee onboarding spotlight
* Welcome messages

### Community Activity

* Trending discussions
* Most engaged posts
* Employee experiences

### Knowledge Hub Preview

* Popular resources
* Recently updated documents
* Quick access shortcuts
  
### Engagement Leaderboard

* Top contributors
* Participation points
* Achievement badges
### Implementation Requirements:

* Use realistic icons from Lucide React
* Use meaningful mock content
* Include hover states and transitions
* Use modern grid layouts
* Include expandable accordions where appropriate
* Make the design feel like a premium enterprise product used by thousands of employees
Return a complete JSX component only.
## PROMPT CORRECTION 
Review the current PulseHub dashboard as a Senior UX Architect and Product Designer.
Do NOT redesign from scratch.
Improve the existing dashboard based on the following observations:
Information Architecture Improvements

1. Leadership communication is the primary purpose of PulseHub and should have the highest visibility.
   * Create a dedicated "Leadership Corner" section near the top.
   * Include CEO Vision, Leadership Messages, Strategic Priorities, and Monthly Leadership Meet Outcomes.
   * This section should be more prominent than Knowledge Hub.
2. Remove the Knowledge Hub section entirely from the homepage. Assume Knowledge Hub is a dedicated navigation item with its own page. Reallocate that space to Leadership Corner, Monthly Leadership Meeting Outcomes, and Business Impact Updates Reorder homepage content according to business priority:
Priority Order:
   * Leadership Corner
   * Critical Announcements
   * Strategic Business Updates
   * Department Impact
   * Recognition Spotlight
   * Upcoming Events
   * Community Discussions
   * New Joiner UX Improvements

1. The sticky search bar feels visually distracting.
   * Make the header more compact.
   * Search should remain accessible but should not dominate the interface.
   * Consider reducing search width or converting it into a search-trigger interaction.
2. Improve dashboard scanning.
   * Reduce cognitive load.
   * Increase whitespace where necessary.
   * Create clearer visual separation between sections.
   * Strengthen hierarchy using typography rather than additional colors.
3. Reduce visual clutter.
   * Remove any information that is not immediately actionable.
   * Follow progressive disclosure principles more aggressively.
Enterprise Design Improvements

1. Make the experience feel closer to a premium enterprise platform such as:
   * Microsoft Viva
   * Notion Enterprise
   * Slack Enterprise Grid
   * Workvivo
2. Use a modern executive-dashboard mindset:
   * Executives should immediately understand company status.
   * Employees should immediately see what matters today.
   * Recognition and engagement should remain visible but not overpower strategic communication.
Deliverables

* Update the existing React JSX component.
* Explain every major UX decision before the code.
* Explain why each section was moved or reprioritized.
* Focus on product thinking, information hierarchy, and enterprise UX.
# EMPLOYEE RECOGNITION
You are a senior front-end engineer and UI designer. Build a modern, responsive React JSX page for a corporate intranet platform called PulseHub.
Page Name:
Employee Recognition Page
Tech Constraints:
* Use React (JSX) only
* Use Tailwind CSS for styling (no external CSS files)
* Use lucide-react icons
* Assume it will be part of a larger intranet app
* Clean, production-ready code (not a demo snippet)
🎯 Objective:
Design a Recognition Hub page where employees can:

* View recent recognitions
* Give recognition to colleagues
* Filter recognition feed
* See top employees of the month
🧩 Layout Requirements:
1. Top Navigation Section

* PulseHub logo (text-based is fine)
* Page title: “Recognition Hub”
* Search bar (for searching employees or recognitions)
* Notification icon + profile avatar placeholder
2. Hero / Header Section

* Welcome message: “Celebrate achievements across PulseHub”
* CTA button: “Give Recognition”
* Secondary button: “View Leaderboard”
3. Recognition Feed (Main Section)
A vertically scrolling feed of recognition cards:
Each card should include:

* Sender name + avatar
* Receiver name + avatar
* Recognition message
* Tag (e.g., “Teamwork”, “Innovation”, “Leadership”)
* Time ago (e.g., “2h ago”)
* Like / applause button
* Optional comment button
Make cards visually modern with:

* soft shadows
* rounded corners
* hover effects
* clean spacing
4. Filters Sidebar (or top filters if mobile)
Include:

* Department filter (Engineering, Marketing, HR, Sales)
* Recognition type filter
* Date range filter
5. Leaderboard Widget (Right Sidebar)
Show:

* Top 5 employees of the month
* Each with avatar, name, points/badges
* Small medal icons for top 3
6. “Give Recognition” Modal Component
Create a modal with:

* Employee selector (searchable dropdown UI placeholder)
* Message input box
* Tag selector (chips UI)
* Submit button
Modal should be included in same file (controlled via state)
🎨 Design Style:

* Corporate, modern SaaS aesthetic
* Light theme (white, slate, blue accents)
* Consistent spacing system
* Subtle animations (hover scale, fade-in cards)
* Mobile responsive layout
⚙️ Functional Requirements:

* Use React `useState` for:
   * modal open/close
   * feed data (mock JSON array)
* Map over dummy data for recognition feed
* Clean component structure (can be single file or modular functions)
📦 Output:
Return ONLY the complete JSX file:

* No explanations
* No extra text
* Fully runnable React component
  You are a senior front-end engineer and UI designer. Build a modern, production-ready **React JSX page** for a corporate intranet platform called **PulseHub**.

---


# Department Overview Page

---

## ⚙️ Tech Requirements:

* React (JSX only)
* Tailwind CSS for styling (no external CSS files)
* lucide-react icons
* Use clean, scalable component structure
* Assume this is part of a corporate intranet system

---

## 🎯 Objective:

Create a **Department Dashboard page** where employees can:

* View all departments in the company
* Explore department details
* See key members and leaders
* Track department performance
* Navigate into a specific department

---

## 🧩 Layout Structure:

### 1. Top Navigation (Shared PulseHub Header)

* PulseHub logo (text-based is fine)
* Page title: **“Departments”**
* Search bar (search departments or employees)
* Notification icon
* Profile avatar placeholder

---

### 2. Page Header Section

* Title: “Explore Departments”
* Subtitle: “Understand teams, roles, and contributions across PulseHub”
* CTA Button: **“Create Department”** (admin-style action)

---

### 3. Department Grid (Main Section)

Display departments as **modern cards in a responsive grid**

Each department card should include:

* Department name (e.g., Engineering, HR, Marketing, Sales)
* Short description
* Head of Department (name + avatar)
* Number of employees
* Performance indicator (optional progress bar or badge)
* “View Department” button

Design requirements:

* Clean card UI
* Hover elevation effect
* Subtle gradient accents per department
* Responsive grid (3–4 columns desktop, 1 column mobile)

---

### 4. Department Detail Preview Panel (Optional Right Sidebar)

When a department is selected (mock state allowed), show:

* Department name
* Leader info
* Key members (avatars list)
* KPIs (e.g., productivity, satisfaction, projects completed)
* Quick actions:

  * View Projects
  * View Members
  * Message Team

Use mock state via `useState`.

---

### 5. Filters Section

Add filtering options:

* Department type (Core, Support, Business)
* Size (Small, Medium, Large)
* Sort by performance / size / alphabet

Can be top filters or left sidebar depending on layout.

---

## 🎨 UI Style Guide:

* Corporate SaaS aesthetic (clean, modern)
* Light theme (white, slate, blue accents)
* Soft shadows, rounded-xl cards
* Subtle hover animations (scale, shadow lift)
* Consistent spacing system
* Mobile-first responsive design

---

## ⚙️ Functional Requirements:

* Use `useState` for:

  * selected department
  * filters (mock logic allowed)
* Map over mock department data array
* Keep everything in a single JSX file (unless necessary to split)
* Ensure reusable UI patterns (Card, Button, Badge style components as functions)

---

## 📦 Output Format:

Return ONLY:

* A complete React JSX file
* No explanations
* No comments outside code
* Production-quality structure
# KNOWLEDGE HUB

  You are a senior frontend engineer and product UX designer.
I am building a corporate intranet app called PulseHub. I need a Knowledge Hub page in React (JSX) using Tailwind CSS and lucide-react.
This Knowledge Hub must act as a centralized internal platform for employees.
---
## CORE REQUIREMENTS
Design and implement a Knowledge Hub page that includes:
## 1. Document & Policy Center (Primary Feature)
- Employee handbooks
- Company policies
- HR documents
- Internal guidelines
Requirements:
- Clean categorized layout (HR, Engineering, Admin, Finance, etc.)
- Search functionality
- Click to open/download documents
- Visually structured like Notion / Confluence (NOT cluttered UI)
---
## 2. Media Gallery (Secondary Feature)
- Image gallery of office events, celebrations, team moments
- Video section for company events
Requirements:
- Horizontal or grid layout (clean and minimal)
- Click opens modal viewer
- Modal shows:
  - image/video
  - title
  - uploader
  - optional description
- Background blur when modal is open
- Must feel like a professional corporate media archive (not social media)
---
## 3. Forum / Discussion Layer (Important)
Add a simple forum-like section where employees can:
- Post questions or updates
- Comment on posts
- Reply threads (basic level, not full Reddit clone)
Requirements:
- Clean card-based threads
- Minimal UI
- Focus on “knowledge exchange”
- No noisy social media design
---
## UX / DESIGN RULES
- Corporate, professional, minimal design (Not Instagram, not Facebook style)
- Inspired by:
  - Notion (structure)
  - Confluence (knowledge base)
  - Microsoft SharePoint (enterprise feel)
- Clear spacing and hierarchy
- No cluttered layouts
- Consistent typography and alignment
---
## ARCHITECTURE REQUIREMENTS
- Single React component or modular sections
- Proper JSX structure (no broken divs)
- No overlapping scroll issues
- Only ONE main scroll container
- Header (if present) must be stable and not interfere with layout
- Modal must lock background scrolling
---
## OUTPUT REQUIREMENT
Return:
- A complete React JSX page
- Fully working layout
- Clean Tailwind styling
- Realistic dummy data included (documents, posts, media)
- Production-ready structure
Do NOT give explanations. Only return code.
#EVENTS
Build a modern, structured Events module for a Corporate Intranet web application.
This platform already has a separate Gallery module, so this Events module must NOT behave like a media library. Instead, it should function as a curated storytelling and company highlights system.
🧠 CORE IDEA
Events module = “Company moments with context”
It should focus on:

* What happened
* Why it matters
* Who was involved
* What impact it created
👉 This is NOT for storing images. That is handled by Gallery.
🚫 CLEAR SEPARATION FROM GALLERY
The Events module must NOT:

* Show full image grids
* Act as a media archive
* Dump multiple photos per post
* Duplicate Gallery functionality
Instead: ✔ Each event = a structured story ✔ Max 1–2 highlight images per event ✔ Focus on meaning, not media volume
🧱 PAGE STRUCTURE
1. Sticky Header

* Page title: “Events”
* Search bar (title, tags, department)
* Filter + sort controls
2. Featured Events Carousel (Top Section)
Horizontal premium carousel showing only key events:

* Leadership events
* Townhalls
* Major achievements
* Company-wide celebrations
Each card includes:

* Event title
* Single cover image
* Short summary (1–2 lines)
* Badge: Featured / Important
3. Event Feed (Main Section)
Vertical list of structured event cards:
Each event card must include:

* Event title
* Date + department
* Short story-style description (what happened + outcome)
* ONE strong cover image (not gallery-style collection)
* Tags (Celebration / Achievement / Meeting / Townhall)
* Like + comment buttons
* “View Details” button
Card design must be:

* Clean
* Consistent height
* Well spaced
* Enterprise-style (not social media feed)
🧾 EVENT DETAIL VIEW
When an event is opened:
Left Side:

* Image/video carousel (ONLY for that single event)
Right Side:

* Event title
* Full description (story format, not bullet spam)
* Department + tags
* People involved (avatars)
* Reactions (like, celebrate, clap)
* Comments (threaded)
🎨 UI / UX REQUIREMENTS

* Enterprise-grade clean UI
* Minimal and structured layout
* Soft neutral colors (white, gray, subtle blue accents)
* Strong spacing and hierarchy
* No clutter or overlapping UI elements
* Smooth but subtle animations
* Fully responsive design
⚙️ FUNCTIONAL FEATURES

* Search events by title, department, tags
* Filter by category:
   * Celebrations
   * Achievements
   * Townhalls
   * Meetings
* Sort:
   * Latest
   * Featured
   * Most Engaged
* Like + comment system
* Featured carousel at top
* Lazy loading images
🎯 FINAL GOAL
The Events module should act as a company highlight newsroom, not a media storage system.
It should help employees instantly understand:

* Key company moments
* Achievements and impact
* Leadership updates
* Cultural highlights
# Gallery
  create a Instagram-style internal company media hub that supports both images and videos, while maintaining a clean, professional enterprise design.
The system should feel like a blend of Instagram + Notion + Slack media library, but strictly professional (no social media vibe).
🖼️ 1. Gallery Layout

* Use a responsive masonry/grid layout
* Each card supports:
   * Image or video thumbnail (auto-detect type)
   * Hover preview (subtle zoom or play icon overlay for videos)
   * Title (short and professional)
   * Uploader name + department tag
   * Timestamp (uploaded date)
   * Optional tags (e.g., #HR, #event, #update)
🎬 2. Media Interaction

* Clicking any media opens a full-screen or side modal viewer
* Viewer should include:
   * Large image or playable video (with controls)
   * Title + description
   * Uploader info (name, department, avatar initials)
   * Upload date + access level (public/restricted)
💬 3. Engagement Section (Important)
Inside the media detail view, add a comments panel:

* Threaded comments (like Instagram but clean and professional)
* Each comment shows:
   * User name
   * Timestamp
   * Comment text
* Ability to add a comment in real time
* Optional reply support under comments
Also include:

* 👍 Like button with count
* 👁 View count
* ⭐ Save / bookmark feature for internal use
🎨 4. UI Style (Professional Instagram feel)

* Clean white + slate-based UI
* Soft shadows and rounded corners
* Minimal icons (Lucide style)
* Smooth transitions and hover effects
* No flashy social-media animations or emojis overload
Think: Apple Photos + Instagram layout + enterprise dashboard polish
🔍 5. Features

* Search media by title, tags, uploader
* Filter by category (HR, Engineering, Finance, etc.)
* Toggle view: Grid / Compact list
* Sort by: Latest, Most liked, Most viewed
⚙️ 6. Media Types Handling

* Images → `<img>` preview
* Videos → `<video controls>` preview with play overlay in grid
* Auto-detect type from file metadata
📌 7. Important Constraint
This is NOT a social media app. It is an internal professional knowledge + media system, so:

* Keep interactions subtle and productivity-focused
* Avoid flashy UI or gamification
* Focus on clarity, usability, and enterprise feel
# changes made to knowledge hub
* Issue: 
The Gallery section (media feed with images/videos) made the Knowledge Hub feel cluttered and shifted focus away from structured knowledge (docs + discussions).

Root Cause:
Initial design mixed three paradigms (Notion + Slack + Instagram), causing UI overload and reduced clarity.

Fix:
Removed the Gallery section manually to streamline the product into a clearer dual-system:
- Documents (structured knowledge)
- Discussions (collaborative knowledge sharing)

Result:
Improved focus, reduced UI noise, and strengthened the core product identity as a knowledge management system rather than a social/media platform.  

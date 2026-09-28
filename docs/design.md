# DRISHTI-NWIS --- DESIGN.md

## 1. Design Direction

### Product

**DRISHTI --- Drilling Risk Intelligence & Safety History Interface**

### Visual identity

The product should feel like:

**Premium SaaS + Oil & Gas Operations Center + AI Intelligence
Platform**

Use the supplied visual reference as the primary UI inspiration: - deep
navy/near-black background - large soft blue/white radial glow - rounded
dark cards - restrained typography - generous spacing - thin borders -
subtle glass/blur effects - bright white primary text - electric blue as
the main accent

Do NOT copy the reference literally.

The reference is a visual direction for: - spacing - dark premium SaaS
feel - glowing background - card treatment - typography hierarchy

------------------------------------------------------------------------

# 2. Core Visual Concept

The landing page should look like an advanced drilling-intelligence
product.

Use a visual metaphor:

``` text
             DRILLING DATA
                   ↓
           ┌──────────────┐
           │   DRISHTI    │
           └──────────────┘
                   ↓
        HISTORICAL INTELLIGENCE
                   ↓
             RISK AHEAD
```

The visual language should communicate: - depth - geological layers -
drilling - petroleum - telemetry - AI - safety

without becoming a stereotypical "oil company website."

------------------------------------------------------------------------

# 3. Color System

## Background

Primary:

``` text
#030817
```

Secondary:

``` text
#071226
```

Card:

``` text
rgba(12, 25, 48, 0.72)
```

Border:

``` text
rgba(255,255,255,0.08)
```

## Main accent

Electric blue:

``` text
#4DA3FF
```

Bright blue:

``` text
#7CC4FF
```

## Supporting colors

Success:

``` text
#42D6A4
```

Warning:

``` text
#F5B942
```

Danger:

``` text
#FF5D67
```

Text:

``` text
#F5F8FF
```

Muted:

``` text
#8C9AB5
```

Avoid using too many saturated colors simultaneously.

------------------------------------------------------------------------

# 4. Landing Page

## Hero

Use a very large dark hero section.

### Small eyebrow

``` text
DRILLING INTELLIGENCE PLATFORM
```

### Main heading

``` text
Learn from every well.
Anticipate the next risk.
```

Highlight **next risk** with a soft blue gradient.

### Supporting copy

``` text
DRISHTI connects historical offset-well knowledge with
current drilling behaviour to reveal relevant patterns,
upcoming risk zones and evidence for better engineering decisions.
```

### CTA

Primary:

**Open Operations**

Secondary:

**Explore Intelligence**

------------------------------------------------------------------------

# 5. Hero Petroleum Visual

Do not put a literal stock oil rig photo behind the text.

Instead create an abstract technical illustration.

Recommended visual:

``` text
       ● telemetry point

       │
       │
───────┼────────────
       │
       │  WELLBORE
       │
───────┼────────────
     geological layer
─────────────────────
        ↓
       2800m
```

Combine: - glowing wellbore - geological contour lines - subtle drilling
trajectory - small telemetry nodes - depth markers - soft blue light

The result should feel like an **oilfield digital twin**, not an oil
advertisement.

------------------------------------------------------------------------

# 6. Petroleum Design Elements

Use these subtly throughout the landing page:

### 1. Wellbore line

A thin glowing vertical line can run behind/alongside sections.

### 2. Depth markers

Examples:

``` text
2,400 m
2,600 m
2,800 m
3,000 m
```

### 3. Geological contour lines

Use faint curved lines.

### 4. Seismic/grid pattern

Very subtle.

### 5. Pumpjack silhouette

Use only as a small decorative background element.

### 6. Drill-bit icon

Use in feature illustrations.

### 7. Pipeline lines

Use as connecting lines between data sections.

### 8. Oil-drop geometry

Use as a small logo/feature accent, not as a dominant visual.

------------------------------------------------------------------------

# 7. Landing Page Sections

## Section 1 --- Hero

Headline + abstract well visualization.

------------------------------------------------------------------------

## Section 2 --- "From Data to Foresight"

Use a horizontal flow:

``` text
Historical Wells
       ↓
Current Well
       ↓
AI Correlation
       ↓
Risk Horizon
       ↓
Engineer Decision
```

Use glowing connector lines.

------------------------------------------------------------------------

## Section 3 --- Core Intelligence

Four cards:

### WellTwin

``` text
Find wells that behaved like yours.
```

### Risk Horizon

``` text
See historical risk zones before you enter them.
```

### Incident Graph

``` text
Connect conditions, incidents and outcomes.
```

### Time Machine

``` text
Replay historical drilling behaviour.
```

Each card gets a minimal line-art technical icon.

------------------------------------------------------------------------

# 8. Interactive Risk Horizon Landing Animation

Create a small animated demonstration.

``` text
CURRENT
2800m

───────●───────────
       │
       │
───────🔴──────────
      2850m
    MUD LOSS

───────🟠──────────
      2870m
    HIGH TORQUE

───────🔴──────────
      2910m
    STUCK PIPE
```

The glowing marker should slowly move downward.

This subtly demonstrates the product before the user enters the
dashboard.

------------------------------------------------------------------------

# 9. Dashboard Design

The dashboard should be darker and more information-dense than the
landing page.

Use a left navigation rail.

``` text
DRISHTI

Overview
Live Well
Well Explorer
WellTwin
Risk Horizon
Incidents
Time Machine
Safety
AI Assistant
```

Bottom:

``` text
SYSTEM ONLINE
Demo Environment
```

------------------------------------------------------------------------

# 10. Dashboard Header

Example:

``` text
Operations Overview

Well X01
Field: Demonstration Field
Formation: XYZ

● LIVE SIMULATION
```

Don't make the dashboard look like a generic admin panel.

Use large, high-quality metric cards.

------------------------------------------------------------------------

# 11. Live Well Cards

Example:

``` text
DEPTH
2,800 m
+12 m/min

TORQUE
43 kN·m
Normal

ROP
18.2 m/hr
Stable
```

Use tiny sparkline charts.

When an anomaly begins, animate the metric subtly.

------------------------------------------------------------------------

# 12. Risk Card

Large feature card:

``` text
UPCOMING RISK

2850 — 2910 m

HIGH

3 historical events
2 relevant WellTwins
1 current anomaly
```

Add a glowing depth indicator.

------------------------------------------------------------------------

# 13. Well Map

Use a dark map style.

Current well:

**bright blue marker**

Relevant wells:

**blue/white markers**

Historical high-risk wells:

**red markers**

Hover:

``` text
X04
4.2 km
91% WellTwin
3 historical events
```

------------------------------------------------------------------------

# 14. Risk Horizon Component

This is the most visually important dashboard component.

Use a horizontal/vertical depth visualization.

``` text
2800 ─────── CURRENT
              │
2850 ─────── 🔴
              │
2870 ─────── 🟠
              │
2910 ─────── 🔴
```

Use animated glow around the current depth.

When the user moves the simulation depth, the current marker should
move.

------------------------------------------------------------------------

# 15. WellTwin UI

Use ranking cards.

``` text
WELL X04

91% MATCH

Formation       95%
Depth           92%
Parameters      89%
Trajectory      81%

[Explore Twin]
```

The 91% should be visually dominant.

------------------------------------------------------------------------

# 16. Time Machine UI

Use a cinematic timeline.

``` text
2700 ─── 2800 ─── 2850 ─── 2910
                    ●
                  PLAY
```

Show two lines:

``` text
Current Well
Historical Well X04
```

When the historical incident is reached, show an event marker.

------------------------------------------------------------------------

# 17. Incident Graph

Use a dark canvas.

Nodes should be circular with subtle glow.

Example:

``` text
Formation
    │
    ↓
Torque ↑
    │
    ↓
Hole Cleaning
    │
    ↓
Stuck Pipe
    │
    ↓
NPT
```

Avoid making the graph look like a generic developer diagram.

It should look like an **engineering intelligence map**.

------------------------------------------------------------------------

# 18. AI Assistant

Do NOT design it like ChatGPT.

Make it an **Engineering Copilot**.

Header:

``` text
DRISHTI ENGINEERING COPILOT
Evidence-grounded operational intelligence
```

Suggested questions:

``` text
Why is the next 100m risky?
Which well is most similar?
Show evidence for this alert.
What happened around 2850m?
```

Each response should include:

``` text
EVIDENCE
X04 — 2850m
X07 — 2865m

SOURCES
2 records
```

------------------------------------------------------------------------

# 19. Safety UI

Use a restrained warning style.

``` text
SAFETY CONTEXT

Potential Well-Control Concern

Relevant Domain
Well Control

Reference
Applicable OISD material

⚠ Review Required
```

Do not use a huge red "DANGER" treatment unless an actual critical state
is being demonstrated.

------------------------------------------------------------------------

# 20. Typography

Use:

### Headings

**Space Grotesk** or **Inter**

Weight: 600--700

### Body

**Inter**

Weight: 400--500

### Technical values

Use:

**JetBrains Mono**

for: - depth - RPM - pressure - timestamps - IDs

This creates the industrial/technical feel.

------------------------------------------------------------------------

# 21. Border Radius

Use:

``` text
Cards: 18–24px
Buttons: 12–14px
Small chips: 999px
```

Avoid excessive rounded "mobile app" styling.

------------------------------------------------------------------------

# 22. Glow Rules

Use glow sparingly.

Blue glow:

-   active well
-   selected card
-   AI interaction
-   primary CTA

Red glow:

-   actual risk state

Amber:

-   warning

Do not make every element glow.

------------------------------------------------------------------------

# 23. Motion

Animations should feel like industrial telemetry.

Use: - slow pulse - smooth depth movement - graph line drawing - subtle
card reveal - metric number transitions - map marker pulse

Avoid: - bouncing cards - excessive parallax - flashy particles -
unnecessary 3D animations

------------------------------------------------------------------------

# 24. Landing Page Animation Sequence

Recommended:

### On load

Soft blue glow slowly expands.

### 1 second

Wellbore line fades in.

### 2 seconds

Depth markers appear.

### 3 seconds

Telemetry dots activate.

### 4 seconds

Risk Horizon line appears.

### CTA remains static.

This should feel premium and controlled.

------------------------------------------------------------------------

# 25. Responsive Design

Primary target:

**Desktop / laptop**

because this is an industrial control/decision-support dashboard.

Still support: - 1440px - 1280px - 1024px

Mobile can be simplified rather than reproducing the entire desktop
dashboard.

------------------------------------------------------------------------

# 26. UX Rules

### Always show context

Never show:

``` text
HIGH RISK
```

without explaining:

``` text
Why?
Where?
Evidence?
```

### Never hide the current well state.

The current depth and well ID should remain visible.

### Never mix simulated and real data.

Use:

``` text
DEMO SIMULATION
```

clearly in the prototype.

### Always provide source/evidence for AI-generated claims.

------------------------------------------------------------------------

# 27. Landing Page Copy

### Hero

**Learn from every well.\
Anticipate the next risk.**

**DRISHTI transforms historical offset-well knowledge and current
drilling behaviour into explainable risk intelligence for drilling
teams.**

CTA:

**Open Operations**

Secondary:

**Explore Intelligence**

------------------------------------------------------------------------

## Section heading

**From historical memory to drilling foresight.**

Text:

``` text
Every drilled well contains operational knowledge.
DRISHTI connects that knowledge with the current well
to surface relevant patterns before they become surprises.
```

------------------------------------------------------------------------

# 28. Feature Card Copy

### WellTwin

**Find the well that behaved like yours.**

### Risk Horizon

**See what lies ahead.**

### Incident Graph

**Connect conditions to outcomes.**

### Time Machine

**Replay the drilling story.**

------------------------------------------------------------------------

# 29. Footer

Minimal:

``` text
DRISHTI-NWIS

Drilling Risk Intelligence & Safety History Interface

Prototype • SIH 2026

DEMONSTRATION ENVIRONMENT
```

Do not add unnecessary social links.

------------------------------------------------------------------------

# 30. Overall Design Principle

The product should visually communicate:

``` text
OIL & GAS
     +
INDUSTRIAL DATA
     +
AI
     +
SAFETY
     +
PREMIUM SaaS
```

The final impression should be:

> **"This looks like a real industrial intelligence product that could
> sit in a drilling operations center."**

Not:

> "This looks like a student dashboard with an oil logo."

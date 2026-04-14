export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  color: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
};

export const projects: Project[] = [
  {
    slug: "timeless-vows",
    title: "Timeless Vows",
    category: "Web Platform",
    year: "2025",
    description: "A full-stack wedding planning platform built for couples across East Africa — booking, vendors, RSVP, and more.",
    longDescription:
      "Timeless Vows reimagines wedding planning for East African couples. From vendor discovery and real-time booking to guest RSVP and digital invitations, every touchpoint was designed for delight. Built with Next.js, Supabase, and a custom CMS so couples own their day — not the platform.",
    tags: ["Next.js", "Supabase", "Tailwind", "Product Design"],
    link: "#",
    color: "#e8c48a",
  },
  {
    slug: "afronet-bio",
    title: "AfrONet Bio",
    category: "Creator Tool",
    year: "2024",
    description: "A biolink and creator monetisation platform built for African digital creators to own their audience.",
    longDescription:
      "AfrONet Bio is a link-in-bio platform engineered for African creators — multi-language support, mobile-first UX, and integrated M-Pesa/Stripe payments. Creators went from scattered social links to a single beautiful page that converts. Launched to 2K+ creators in the first month.",
    tags: ["React", "Node.js", "M-Pesa API", "Stripe", "Mobile-First"],
    link: "#",
    color: "#7eb8f5",
  },
  {
    slug: "marca-lupa",
    title: "Marca-Lupa Portfolio",
    category: "Creative Portfolio",
    year: "2024",
    description: "An award-worthy portfolio site for a multidisciplinary creative agency — bold typography, smooth motion.",
    longDescription:
      "A motion-forward portfolio for a creative agency blending brand identity, photography, and digital campaigns. Every page transition was choreographed. Built with Next.js App Router and Framer Motion, achieving a perfect Lighthouse score on first load.",
    tags: ["Next.js", "Framer Motion", "GSAP", "Three.js"],
    link: "#",
    color: "#c084fc",
  },
  {
    slug: "geoclimate-action",
    title: "GeoClimate Action",
    category: "Data Platform",
    year: "2024",
    description: "An interactive climate data visualisation dashboard for environmental researchers across East Africa.",
    longDescription:
      "GeoClimate Action brings satellite and ground-level environmental data to life. Researchers can explore deforestation trends, rainfall anomalies, and carbon metrics across Tanzania, Kenya, and Uganda. Built with React, D3.js, and a PostGIS backend.",
    tags: ["React", "D3.js", "PostGIS", "Python", "Data Viz"],
    link: "#",
    color: "#4ade80",
  },
  {
    slug: "willy-the-tailor",
    title: "Willy the Tailor",
    category: "E-Commerce",
    year: "2023",
    description: "A custom-suit e-commerce and portfolio site for a master tailor based in Kariakoo, Dar es Salaam.",
    longDescription:
      "Willy the Tailor needed a digital presence as sharp as his suits. The result: a custom measurement flow, WhatsApp booking integration, and a portfolio gallery that showcases decades of craft. Handmade orders increased by 3× in 90 days after launch.",
    tags: ["Next.js", "WhatsApp API", "Shopify", "Custom CMS"],
    link: "#",
    color: "#fbbf24",
  },
  {
    slug: "see-africa-safaris",
    title: "See Africa Safaris",
    category: "Tourism Platform",
    year: "2023",
    description: "A premium safari booking platform connecting global travellers with Tanzanian safari experiences.",
    longDescription:
      "See Africa Safaris required a platform worthy of the landscapes it sells. Full itinerary builder, real-time availability, multi-currency support, and a breathtaking visual experience. Bounce rate dropped 45% and bookings doubled in the first quarter post-launch.",
    tags: ["Next.js", "Stripe", "Sanity CMS", "Mapbox"],
    link: "#",
    color: "#f97316",
  },
  {
    slug: "dar-studio-agency",
    title: "Dar Studio Agency",
    category: "Agency Site",
    year: "2023",
    description: "Brand identity and digital home for Dar es Salaam's most exciting independent creative studio.",
    longDescription:
      "Dar Studio needed a website as ambitious as their work. Built entirely in Next.js with WebGL-powered visuals, micro-animations on every interaction, and a case study engine. The site became a conversation piece and generated 12 inbound leads in its first week live.",
    tags: ["Next.js", "WebGL", "GSAP", "Brand Identity"],
    link: "#",
    color: "#38bdf8",
  },
];

export const posts: Post[] = [
  {
    slug: "designing-for-east-africa",
    title: "Designing for East Africa: Why Context Matters",
    date: "April 8, 2025",
    category: "Design",
    excerpt:
      "Most design systems were built for a different world. Here is how I approach building digital products that actually fit the people using them.",
    content: `Most design systems were built for Silicon Valley users on high-end MacBooks with fast Wi-Fi. East Africa is a different world — and that is exactly what makes it exciting to build for.

When I started building AfrONet Bio, I had to unlearn almost everything I thought I knew about UX. Data costs are real. Feature phones still matter in rural areas. WhatsApp is a primary business tool. M-Pesa is infrastructure.

Good design for East Africa means understanding these constraints not as limitations but as the creative brief itself. The best product is not always the most feature-rich one — it is the one that loads in under two seconds on a 3G connection and speaks directly to the user's daily reality.

Context matters more than convention.`,
    readTime: "4 min read",
  },
  {
    slug: "my-stack-2025",
    title: "The Stack I Use for Every Project in 2025",
    date: "March 22, 2025",
    category: "Engineering",
    excerpt:
      "After shipping 20+ projects, I have settled on a toolkit that balances speed, performance, and developer joy.",
    content: `After two years of trying everything, I have landed on a stack that I trust for almost every project.

**Frontend:** Next.js 15 (App Router) + Tailwind CSS. The App Router changed how I think about data fetching entirely. Server Components cut my client bundle sizes dramatically.

**Database:** Supabase for most projects — Postgres under the hood, real-time subscriptions, auth out of the box. For heavy analytics, I reach for PlanetScale.

**CMS:** Sanity.io. The GROQ query language is underrated. Building custom studio plugins in React makes client handoff smooth.

**Animations:** Framer Motion for React-based transitions. GSAP for complex timeline-driven sequences. Three.js / WebGL for the moments that need to feel truly alive.

**Deployment:** Vercel. The edge network and analytics dashboard have never let me down.

The stack is stable. The creative brief is always new.`,
    readTime: "5 min read",
  },
  {
    slug: "building-timeless-vows",
    title: "Building Timeless Vows: A Case Study",
    date: "February 14, 2025",
    category: "Case Study",
    excerpt:
      "How we went from a napkin sketch to a full wedding platform in 12 weeks — and what I would do differently.",
    content: `Timeless Vows started as a conversation at a client's kitchen table. They had a vision: build the wedding planning platform East Africa did not have. Three months later we shipped.

**Week 1–2: Discovery**
We interviewed 40 couples and 20 vendors across Dar es Salaam and Nairobi. The insight that changed everything: couples don't plan weddings, families do. The product needed multi-user coordination built in from day one.

**Week 3–5: Design**
I designed 60+ screens in Figma before writing a line of code. We tested three navigation paradigms. The "family dashboard" concept won every usability test.

**Week 6–11: Build**
Next.js + Supabase + a custom booking engine. The hardest part? Real-time seat counts during peak evening hours when vendors were all updating simultaneously. Postgres row-level locking saved us.

**Week 12: Launch**
200 signups on day one. Four vendors booked through the platform before we officially announced.

What I would do differently: start the mobile app earlier. Most users came from mobile. Always do.`,
    readTime: "7 min read",
  },
  {
    slug: "moving-fast-caring-about-craft",
    title: "On Moving Fast and Still Caring About Craft",
    date: "January 30, 2025",
    category: "Perspective",
    excerpt:
      "Speed and quality are not opposites. Here is how I keep both without burning out.",
    content: `There is a myth in software that speed and quality trade off against each other. I do not believe that.

The fastest way to build something good is to be clear on what good means before you start. Most slowdowns happen mid-build when the brief is unclear. Clarity up front is speed in disguise.

The second myth: perfectionism is quality. It is not. Perfectionism is fear dressed up as standards. Quality means knowing which decisions deserve 80% effort and which deserve 20% — and being ruthlessly honest about which is which.

For me, the non-negotiables are performance, accessibility, and motion. If a page loads slowly, I have failed the user. If someone with a screen reader can't use it, I have failed. If the animations feel mechanical, I have broken the spell.

Everything else is negotiable. Ship, learn, refine.

The craft is in knowing what to sweat.`,
    readTime: "3 min read",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

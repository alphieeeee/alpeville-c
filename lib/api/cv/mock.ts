import type { CvData } from "./types";

const cvData: CvData = {
  hero: {
    eyebrow: "Curriculum Vitae",
    name: "Alpeville Carinan",
    role: "Senior Frontend Developer",
    location: "Muntinlupa, Metro Manila, Philippines | Open to Remote Work",
    contact: "",
    links: [
      { href: "mailto:alpsgega@gmail.com", label: "alpsgega@gmail.com" },
      { href: "tel:+639177950731", label: "+63 917 795 0731" },
      {
        href: "https://alphieeeee.github.io/zpla-interactive/",
        label: "Portfolio",
      },
      {
        href: "https://linkedin.com/in/alpeville-carinan-10382ab9/",
        label: "LinkedIn",
      },
    ],
  },
  summaryLabel: "Professional Summary",
  summary:
    "Senior Frontend Developer with 13+ years of experience building high-performance, interactive web applications using JavaScript and modern frontend frameworks. Specializes in React, Next.js, Vue, Nuxt, and GSAP, with strong experience in animation, performance optimization, rich media and banner development, and WordPress CMS work including headless architecture and theme customization. Experienced in scalable frontend systems, API integrations, and pixel-focused UI/UX for marketing and product teams.",
  rolesLabel: "Professional Experience",
  roles: [
    {
      title: "AI Frontend Intern",
      company: "Flyrank AI",
      dates: "2026",
      bullets: [
        "Explore AI-assisted development workflows for modern frontend development",
        "Build foundational skills in prompting and context engineering",
        "Use AI tools to support coding, research, debugging, and development workflows",
        "Complete Anthropic certifications and structured AI learning assignments",
        "Apply AI concepts through hands-on exercises and practical development projects",
        "Experiment with integrating AI-assisted techniques into existing frontend workflows"
      ],
    },
    {
      title: "Senior Frontend Developer",
      company: "Candy Digital",
      dates: "2019 - 2025",
      bullets: [
        "Develop responsive frontend applications using Vue.js, React, and WordPress, including headless CMS architecture",
        "Integrate and consume REST APIs and headless CMS data (WordPress REST API / WPGraphQL) to build dynamic applications",
        "Create data visualizations, dashboards, and reports",
        "Build scroll-based animations using GSAP to enhance user engagement",
        "Collaborate with designers and backend teams to deliver seamless UI/UX",
        "Optimize performance through reusable components, cross-browser compatibility, and efficient data fetching",
        "Deliver fast-turnaround websites and scope timelines based on animations, layouts, and data complexity",
      ],
    },
    {
      title: "Senior Creative Developer",
      company: "Candy Digital",
      dates: "2015 - 2019",
      bullets: [
        "Built interactive rich media ads for mobile and desktop across multiple ad platforms",
        "Developed high-performance HTML5 and JavaScript-based ad experiences",
        "Created responsive marketing microsites for product campaigns",
        "Optimized ad performance and engagement through animation and efficient scripting",
        "Developed responsive email campaigns optimized for deliverability, performance, and user engagement",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Gameloft Philippines",
      dates: "2015",
      bullets: [
        "Developed rich media ads for mobile in-game advertising platforms",
        "Built frontend experiences and marketing minisites for internal campaigns",
        "Collaborated with designers to translate concepts into interactive digital experiences",
      ],
    },
    {
      title: "Senior Developer",
      company: "Wide-Out Workforces Inc.",
      dates: "2011 - 2015",
      bullets: [
        "Specialized in live issue troubleshooting and quality assurance for rich media ads, resolving product challenges on live sites",
        "Acted as the go-to contact for campaign managers, publishers, and clients, implementing JavaScript fixes via DoubleClick for Advertisers",
        "Developed rich media ads, including Flash and HTML5 banners, expandable units, and mobile/In-App formats",
        "Served as deputy team lead, mentoring junior developers and providing project status updates",
      ],
    },
  ],
  skillsLabel: "Core Skills",
  skills: [
    { category: "Frontend Development", skills: "React, Next.js, Vue.js, Nuxt.js" },
    { category: "State Management", skills: "Vuex, Pinia, React Context API" },
    { category: "Languages", skills: "JavaScript, PHP (WordPress)" },
    { category: "Styling", skills: "Tailwind CSS, Bootstrap, SCSS, CSS3" },
    { category: "Animation", skills: "GSAP, Three.js, PixiJS" },
    { category: "Backend & APIs", skills: "Node.js, Express.js, REST APIs, WPGraphQL" },
    { category: "CMS", skills: "Headless WordPress, ACF" },
    { category: "Tools", skills: "Figma, Photoshop, Illustrator, Git, GitHub, npm, Postman, Jest" },
    { category: "Delivery", skills: "Vite, Webpack, Vercel, Cloudways, Jenkins" },
  ],
  highlightsLabel: "Project Highlights",
  highlights: [
    "Built interactive marketing websites using React, Vue, and GSAP",
    "Developed headless CMS solutions using WordPress, WPGraphQL, and modern JavaScript frameworks",
    "Built API-driven dashboards with ApexCharts and REST integrations",
    "Optimized frontend performance through reusable components and efficient data fetching",
  ],
  educationLabel: "Education",
  education: [
    {
      degree: "BS Computer Science",
      school: "University of the City of Muntinlupa",
      period: "2007 - 2011",
    },
  ],
  achievementsLabel: "Achievements",
  achievements: [
    "WebDev Team Winner - Company Animation Challenge (2022, Candy Digital)",
  ],
};

export default cvData;

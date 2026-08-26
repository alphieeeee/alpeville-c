import CtaButton from "../components/CtaButton";
import styles from "./page.module.css";

const skills = [
  ["Frontend Development", "React, Next.js, Vue.js, Nuxt.js"],
  ["State Management", "Vuex, Pinia, React Context API"],
  ["Languages", "JavaScript, PHP (WordPress)"],
  ["Styling", "Tailwind CSS, Bootstrap, SCSS, CSS3"],
  ["Animation", "GSAP, Three.js, PixiJS"],
  ["Backend & APIs", "Node.js, Express.js, REST APIs, WPGraphQL"],
  ["CMS", "Headless WordPress, ACF"],
  ["Tools", "Figma, Photoshop, Illustrator, Git, GitHub, npm, Postman, Jest"],
  ["Delivery", "Vite, Webpack, Vercel, Cloudways, Jenkins"],
] as const;

const roles = [
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
];

const highlights = [
  "Built interactive marketing websites using React, Vue, and GSAP",
  "Developed headless CMS solutions using WordPress, WPGraphQL, and modern JavaScript frameworks",
  "Built API-driven dashboards with ApexCharts and REST integrations",
  "Optimized frontend performance through reusable components and efficient data fetching",
];

export default function CVPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-10">
      <div>
        <CtaButton href="/" variant="secondary">
          Back
        </CtaButton>
      </div>

      <article className={styles.cv}>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Curriculum Vitae</p>
            <h1 className={styles.name}>Alpeville Carinan</h1>
            <p className={styles.role}>Senior Frontend Developer</p>
            <p className={styles.location}>Muntinlupa, Metro Manila, Philippines | Open to Remote Work</p>
          </div>
          <div className={styles.contact}>
            <a href="mailto:alpsgega@gmail.com">alpsgega@gmail.com</a>
            <a href="tel:+639177950731">+63 917 795 0731</a>
            <a href="https://alphieeeee.github.io/zpla-interactive/" target="_blank" rel="noreferrer">Portfolio</a>
            <a href="https://linkedin.com/in/alpeville-carinan-10382ab9/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.primaryColumn}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Professional Summary</p>
              <p className={styles.summary}>
                Senior Frontend Developer with 13+ years of experience building high-performance, interactive web applications using JavaScript and modern frontend frameworks. Specializes in React, Next.js, Vue, Nuxt, and GSAP, with strong experience in animation, performance optimization, rich media and banner development, and WordPress CMS work including headless architecture and theme customization. Experienced in scalable frontend systems, API integrations, and pixel-focused UI/UX for marketing and product teams.
              </p>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>Professional Experience</p>
              <div className={styles.experienceList}>
                {roles.map((role) => (
                  <article className={styles.experience} key={`${role.company}-${role.title}`}>
                    <h2>{role.title}</h2>
                    <p className={styles.company}>{role.company} <span>|</span> {role.dates}</p>
                    <ul className={styles.experienceBullets}>
                      {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Core Skills</p>
              <dl className={styles.skills}>
                {skills.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>Project Highlights</p>
              <ul className={styles.compactList}>
                {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>Education</p>
              <h2 className={styles.educationTitle}>BS Computer Science</h2>
              <p className={styles.muted}>University of the City of Muntinlupa</p>
              <p className={styles.muted}>2007 - 2011</p>
            </section>

            <section className={styles.section}>
              <p className={styles.sectionLabel}>Achievements</p>
              <p className={styles.muted}>WebDev Team Winner - Company Animation Challenge (2022, Candy Digital)</p>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}

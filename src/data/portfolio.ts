export const personalInfo = {
  name: "Akash Gupta",
  roles: ["Full Stack Developer", "AI Engineer", "React Developer", "Python Developer"],
  tagline: "AI-Augmented Full Stack Developer",
  bio: "Second-year B.Tech CSE student at Global Institute of Engineering & Technology (CGPA: 9.2), building intelligent, scalable web applications using React.js, Next.js, Node.js, and MongoDB. Oracle Generative AI Certified. Passionate about AI engineering, full-stack development, and solving real-world problems.",
  location: "Hyderabad, Telangana, India",
  email: "akashguptapro9247@gmail.com",
  phone: "+91 6300761220",
  github: "https://github.com/akashguptapro9247-coder",
  linkedin: "https://www.linkedin.com/in/akash-gupta6300",
  photo: "/profile.jpeg",
  resume: "/resume.pdf",
};

export const skills: Record<string, string[]> = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C", "HTML5", "CSS3"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design", "UI/UX", "DOM Manipulation"],
  Backend: ["Node.js", "Express.js", "Django", "Flask", "REST APIs", "JWT Auth", "OTP Auth", "OAuth"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL", "Supabase"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Azure", "Vercel", "Render", "Postman"],
  Concepts: ["Data Structures & Algorithms", "Problem Solving", "Software Engineering", "Clean Code", "Agile/Sprints"],
};

export interface Experience {
  role: string;
  company: string;
  type: string;
  period: string;
  current: boolean;
  points: string[];
}

export const experience: Experience[] = [
  {
    role: "Junior Python Developer Intern",
    company: "Yuva Intern",
    type: "Remote",
    period: "Jan 2026 – Present",
    current: true,
    points: [
      "Developing backend service modules in Python with REST API architecture, JWT/OAuth authentication workflows, and database integration using MongoDB and PostgreSQL.",
      "Improving code quality through clean code principles, reusable utility design, input validation layers, and structured peer code reviews across collaborative team sprints.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "CodSoft",
    type: "Remote",
    period: "Apr 2026 – May 2026",
    current: false,
    points: [
      "Engineered mobile-first responsive web interfaces using HTML5, CSS3, and JavaScript with Flexbox/Grid layouts, ensuring cross-browser compatibility and optimized UI performance.",
      "Managed source code with Git and GitHub in a team environment, handling branching, merge conflict resolution, and maintaining a clean, well-documented commit history.",
    ],
  },
];

export interface Project {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  badge: string | null;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "GovCareAI",
    subtitle: "AI Complaint Management Platform",
    description: "AI-powered government complaint management platform with NLP-based urgency detection and intelligent prioritization to automate public grievance resolution at scale.",
    stack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API", "AI/NLP"],
    live: "https://gov-care-ai.vercel.app/",
    github: "https://github.com/akashguptapro9247-coder/GovCareAI",
    badge: "Active",
    featured: true,
  },
  {
    name: "QuizFlow",
    subtitle: "Interactive Quiz Platform",
    description: "Full-featured quiz platform with MCQ gameplay, real-time score tracking, and category filtering. Scalable frontend architecture using TypeScript interfaces and Tailwind CSS.",
    stack: ["React.js", "TypeScript", "Tailwind CSS"],
    live: "https://akashguptapro9247-coder.github.io/quiz-game",
    github: "https://github.com/akashguptapro9247-coder/quiz-game",
    badge: null,
    featured: true,
  },
  {
    name: "Developer Portfolio",
    subtitle: "Production Portfolio Site",
    description: "Production-grade developer portfolio with Framer Motion animations, Next.js SSG for SEO optimization, and optimized Lighthouse performance scores.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://professional-portfolio-ochre-seven.vercel.app",
    github: "https://github.com/akashguptapro9247-coder/professional-portfolio",
    badge: null,
    featured: false,
  },
  {
    name: "TaskEntropy",
    subtitle: "Task Management App",
    description: "Modern task management app with drag-and-drop, category filtering, priority levels, and offline Local Storage support.",
    stack: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    live: "https://akashguptapro9247-coder.github.io/TaskEntropy/",
    github: "https://github.com/akashguptapro9247-coder/TaskEntropy",
    badge: null,
    featured: false,
  },
  {
    name: "GhostKey",
    subtitle: "Cyberpunk Password Generator",
    description: "Cyberpunk-themed password generator with custom length, character selection, real-time strength indicator, and one-click clipboard copy.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://akashguptapro9247-coder.github.io/GHOSTKEY/",
    github: "https://github.com/akashguptapro9247-coder/GHOSTKEY",
    badge: null,
    featured: false,
  },
];

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  cgpa: string | null;
  current: boolean;
}

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Global Institute of Engineering & Technology",
    period: "2024 – 2028",
    location: "Hyderabad, India",
    cgpa: "9.2",
    current: true,
  },
  {
    degree: "Intermediate Education (MPC)",
    institution: "Narayana Junior College",
    period: "2022 – 2024",
    location: "Hyderabad, India",
    cgpa: null,
    current: false,
  },
];

export interface Achievement {
  title: string;
  org: string;
  color: string;
}

export const achievements: Achievement[] = [
  { title: "Oracle AI Professional Certification", org: "Oracle", color: "red" },
  { title: "Oracle Generative AI Certification", org: "Oracle", color: "red" },
  { title: "Deloitte Data Analytics Certification", org: "Deloitte", color: "green" },
  { title: "JP Morgan Software Engineering Virtual Experience", org: "JP Morgan", color: "blue" },
  { title: "Goldman Sachs Virtual Experience Program", org: "Goldman Sachs", color: "amber" },
];

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export const skillIcons: Record<string, string> = {
  Languages: "💻",
  Frontend: "🎨",
  Backend: "⚙️",
  Databases: "🗄️",
  "Tools & Platforms": "🛠️",
  Concepts: "🧠",
};

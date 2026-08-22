// ── Profile avatar — replace src/assets/avatar.webp with your actual photo, keep the same filename ──
import avatar from '../assets/avatar.webp';

// ── Certification images ──
import certDataEngineering from '../assets/cert-data-engineering.webp';
import certDesignThinkingNPTEL from '../assets/cert-design-thinking-nptel.webp';
import certCreateathon from '../assets/cert-createathon.webp';
import certIBMSkillbuild from '../assets/cert-ibm-skillbuild.webp';
import certMyGovCybersecurity from '../assets/cert-mygov-cybersecurity.webp';
import certJavaUdemy from '../assets/cert-java-udemy.webp';
import certOracleJava from '../assets/cert-oracle-java.webp';
import certSQLAdvanced from '../assets/cert-sql-advanced.webp';
import certInternship from '../assets/cert-internship-better-tomorrow.webp';
import certSoftwareEngineering from '../assets/cert-software-engineering.webp';
import certUdemyCpp from '../assets/cert-udemy-cpp.webp';

// ── Achievement images ──
import achievementFreshathon from '../assets/achievement-freshathon.webp';
import achievementMiniProjectExpo from '../assets/achievementMiniProjectExpo.webp';
const achievementAIMLHackathon = null;

// ── Project showcase images ──
import projectFood from '../assets/project-food.webp';
import projectAmbulance from '../assets/project-ambulance.webp';
import projectEvent from '../assets/project-event.webp';
import projectDisaster from '../assets/project-disaster.webp';
import projectCrimeLens from '../assets/project-crimelens.webp';
const projectSmartCampus = null;

const portfolioData = {
  profile: {
    name: 'Kanhaiya Patel',
    title: 'Full Stack Developer',
    taglines: ['Full Stack Developer', 'Problem Solver'],
    heroBadge: 'Open to opportunities',
    heroDescription:
      "I'm a passionate software developer who enjoys building modern, user-friendly, and reliable digital solutions. I turn complex ideas into simple, efficient, and scalable applications. With experience in frontend development, backend systems, I create high-quality products that are both functional and impactful.",
    aboutTitle: 'About Me',
    aboutDescription:
      "I'm a Full Stack Developer specializing in building scalable, high-performance web applications. I bridge the gap between clean UI and robust backend systems, turning complex requirements into elegant, maintainable solutions.",
    aboutBody:
      'I bring hands-on experience across the entire development lifecycle — from architecting APIs and databases to crafting responsive interfaces. I take ownership of what I build, write code that lasts, and consistently deliver products that create real impact.',
    stats: [],
    contactTitle: "Let's build something great together.",
    contactDescription:
      "Whether you have a project in mind, a role to fill, or just want to connect — my inbox is always open.",
    email: 'kanhaiyapatel383@gmail.com',
    phone: '+91 9153965327',
    location: 'India • Coimbatore TamilNadu',
    github: 'https://github.com/kanhaiyapatel59',
    linkedin: 'https://www.linkedin.com/in/kanhaiya-patel-1490b6324/',
    twitter: 'https://x.com/Kanhaiyapatel59',
    resumeUrl: '/resume.pdf',
    avatar,
  },

  skills: [
    { id: 's1', name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E', category: 'Language' },
    { id: 's3', name: 'React', icon: 'SiReact', color: '#61DAFB', category: 'Frontend' },
    { id: 's4', name: 'Next.js', icon: 'SiNextdotjs', color: '#ffffff', category: 'Frontend' },
    { id: 's5', name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4', category: 'Styling' },
    { id: 's6', name: 'Node.js', icon: 'SiNodedotjs', color: '#339933', category: 'Backend' },
    { id: 's7', name: 'Express', icon: 'SiExpress', color: '#ffffff', category: 'Backend' },
    { id: 's8', name: 'MongoDB', icon: 'SiMongodb', color: '#47A248', category: 'Database' },
    { id: 's9', name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169E1', category: 'Database' },
    { id: 's10', name: 'AWS', icon: 'SiAmazonwebservices', color: '#FF9900', category: 'Cloud' },
    { id: 's11', name: 'Docker', icon: 'SiDocker', color: '#2496ED', category: 'DevOps' },
    { id: 's12', name: 'Git', icon: 'SiGit', color: '#F05032', category: 'Tools' },
  ],

  projects: [
    {
      id: 'p2',
      title: 'Campus Ambulance Tracker',
      description: 'A web-based emergency response system for faster ambulance dispatch and real-time request management.',
      techStack: ['Spring Boot', 'Java', 'MySQL', 'HTML', 'CSS'],
      highlights: [
        'Developed a campus emergency management platform to streamline ambulance requests and improve response coordination.',
        'Implemented real-time ambulance tracking, enabling users to monitor vehicle location and estimated arrival time.',
        'Built an admin panel to manage emergency requests, ambulance availability, and user records efficiently.',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/campus-ambulance-tracker',
      liveUrl: '',
      image: projectAmbulance,
    },
    {
      id: 'p3',
      title: 'Event Registration System',
      description: 'A full-stack web application for managing event registrations with secure user authentication and an intuitive registration workflow.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      highlights: [
        'Developed a responsive platform for users to browse and register for events.',
        'Implemented secure authentication and efficient registration management.',
        'Built a scalable backend with REST APIs and database integration for reliable data handling.',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/Event-Registration',
      liveUrl: '',
      image: projectEvent,
    },
    {
      id: 'p6',
      title: 'AI Disaster Command Center',
      description: 'An enterprise-grade multi-agent AI system for disaster response and emergency management, featuring 6 specialized AI agents that work together to detect, predict, and coordinate rescue operations during floods and natural disasters.',
      techStack: ['React.js', 'FastAPI', 'Python', 'LangGraph', 'Groq API', 'MongoDB', 'Tailwind CSS', 'Leaflet'],
      highlights: [
        'Built 6 specialized AI agents (Weather, Detection, Prediction, Resource, Rescue, Communication) that collaborate to provide comprehensive disaster response.',
        'Developed Commander Agent using LangGraph that orchestrates all agents with real-time execution animations and status tracking.',
        'Created enterprise-grade dashboard with dark theme, glassmorphism, interactive maps, and real-time agent status monitoring.',
        'Integrated image analysis for drone/CCTV footage with simulated AI detection of people, flood areas, and severity assessment.',
        'Implemented MongoDB for persistent storage of all incident analyses with complete history tracking and reporting.',
        'Built professional incident report generation with executive summaries, recommended actions, and multi-channel alerts (SMS, Email, Control Room).',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/disaster-response-ai',
      liveUrl: '',
      image: projectDisaster,
    },
    {
      id: 'p5',
      title: 'CrimeLens: AI-Powered Crime Intelligence & Investigation Platform',
      description: 'An enterprise-grade AI-powered crime intelligence platform that transforms scattered police records into actionable insights through interactive dashboards, geospatial heatmaps, criminal network analysis, and AI-driven predictive analytics for proactive policing.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Groq AI', 'Leaflet', 'Chart.js', 'Tailwind CSS'],
      highlights: [
        'Built unified crime intelligence platform eliminating Excel-based data silos for Karnataka Police.',
        'Developed geospatial heatmaps and criminal network visualization for hotspot detection and relationship mapping.',
        'Integrated Groq AI-powered conversational assistant for natural language crime analysis.',
        'Implemented predictive risk scoring using Machine Learning models (XGBoost, Scikit-learn).',
        'Deployed multi-agent system (Crime Pattern Agent, Patrol Recommendation Agent) with FastAPI.',
        'Built role-based access control (Admin, SCRB, District, Station Officer) for secure data governance.',
        'Deployed on Zoho Catalyst cloud platform with Docker containerization.',
        'Created responsive dashboard with real-time charts, maps, and exportable reports.',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/CrimeLens',
      liveUrl: 'https://crimelens-frontend-kqiohtrf.onslate.in',
      image: projectCrimeLens,
    },
    {
      id: 'p1',
      title: 'Online Food Ordering System',
      description: 'A full-stack food delivery platform with secure authentication and real-time order management.',
      techStack: ['React', 'Node.js', 'Express.js', 'JWT Authentication', 'MongoDB'],
      highlights: [
        'Built a full-stack food ordering application with secure JWT authentication and role-based user access.',
        'Developed real-time order tracking and an admin dashboard to manage users, orders, and analytics.',
        'Designed a responsive, user-friendly interface for seamless food browsing, ordering, and order management.',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/food-website',
      liveUrl: 'https://foody-ham-frontend.vercel.app',
      image: projectFood,
    },
    {
      id: 'p4',
      title: 'Smart Campus Service Request System',
      description: 'An enterprise-grade digital solution for managing campus maintenance and support services, enabling seamless request submission, technician dispatch, real-time tracking, and performance analytics.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT'],
      highlights: [
        'Built a complete service request management system with role-based access control (Student, Faculty, Admin, Technician) and secure JWT authentication.',
        'Implemented an enterprise ticket closure workflow featuring user confirmation (Accept/Reject resolution), full audit timeline, and reopen tracking.',
        'Integrated Socket.IO for real-time request status updates and instant notifications across all user roles.',
        'Developed an admin analytics dashboard to track technician performance metrics, SLA compliance, average resolution times, and success rates.',
        'Designed a modern, responsive UI supporting file uploads (proof of work), priority levels, and category-based request routing.',
      ],
      githubUrl: 'https://github.com/kanhaiyapatel59/smartcampus',
      liveUrl: 'https://smartcampus-ps7am1wip-kanhaiyapatel59s-projects.vercel.app',
      image: projectSmartCampus,
    },
  ],

  timeline: [
    {
      id: 't2',
      type: 'INTERNSHIP',
      title: 'Full Stack Developer Intern',
      organization: 'Global Intern •  MERN',
      period: '2026',
      description: [
        'Built an AI-powered crime intelligence platform using MERN stack.',
        'Developed crime analytics dashboards, maps, and investigation insights.',
        'Integrated AI agents for crime pattern detection and patrol recommendations.',
        'Implemented REST APIs, MongoDB, JWT authentication, and LangGraph.',
      ],
    },
    {
      id: 't1',
      type: 'INTERNSHIP',
      title: 'Full Stack Developer',
      organization: 'Better Tomorrow MERN',
      period: '2025',
      description: [
        'Built a MERN stack food delivery platform with secure authentication and a responsive user interface.',
        'Implemented JWT authentication and real-time order tracking for a seamless user experience.',
        'Developed an admin dashboard to manage users, orders, and platform operations efficiently.',
        'Optimized REST APIs and MongoDB queries to deliver fast, reliable application performance.',
      ],
    },
  ],

  education: [
    {
      id: 'e1',
      degree: 'B.E. Computer Science & Engineering',
      institution: 'Sri Eshwar College of Engineering',
      location: 'Coimbatore, Tamil Nadu',
      period: '2024 – 2028',
      grade: 'CGPA: 8.28 Upto 4th Semester',
      description: 'full stack development, data structures, algorithms, and AI/ML. Active participant in hackathons and technical events.',
    },
    {
      id: 'e2',
      degree: 'Higher Secondary (12th) — Science',
      institution: 'Om National Academy +2',
      location: 'Birgunj Parsa, Nepal',
      period: '2023 – 2024',
      grade: 'GPA 3.32',
    },
  ],

  certifications: [
    { id: 'c1', title: 'Full Stack Developer Internship', provider: 'Better Tomorrow', year: '2025', image: certInternship },
    { id: 'c2', title: 'IBM SkillBuild – Software Development', provider: 'IBM', year: '2024', image: certIBMSkillbuild },
    { id: 'c3', title: 'Introduction to Data Engineering and Big Data', provider: 'GUVI / HCL', year: '2026', image: certDataEngineering },
    { id: 'c4', title: 'Design Thinking – A Primer', provider: 'NPTEL / IIT Madras', year: '2026', image: certDesignThinkingNPTEL },
    { id: 'c5', title: 'Createathon 2024', provider: 'Sri Eshwar College of Engineering', year: '2024', image: certCreateathon },
    { id: 'c6', title: 'Oracle Java Foundations', provider: 'Oracle', year: '2024', image: certOracleJava },
    { id: 'c7', title: 'MyGov Cybersecurity Awareness', provider: 'MyGov India', year: '2024', image: certMyGovCybersecurity },
    { id: 'c8', title: 'SQL Advanced Certificate', provider: 'HackerRank', year: '2024', image: certSQLAdvanced },
    { id: 'c9', title: 'Java – The Complete Java Developer Course', provider: 'Udemy', year: '2024', image: certJavaUdemy },
    { id: 'c10', title: 'Software Engineering', provider: 'Sri Eshwar College of Engineering', year: '2024', image: certSoftwareEngineering },
    { id: 'c11', title: 'C / C++ Programming', provider: 'Udemy', year: '2024', image: certUdemyCpp },
  ],

  achievements: [
    { id: 'a1', title: 'Freshathon Winner 🏆', detail: '3rd place at FRSHathon 3.0 with 70+ participants.', image: achievementFreshathon },
    { id: 'a2', title: '1st Prize - Mini Project EXPO Winner 🏆', detail: 'Awarded First Prize for developing an innovative, real-world solution that demonstrated technical excellence, creativity, and practical impact.', image: achievementMiniProjectExpo },
    { id: 'a3', title: 'First Runner-Up — AIML Hackathon', detail: 'Secured Second Place by developing an innovative AI/ML solution to address a real-world problem through teamwork and technical expertise.', image: achievementAIMLHackathon },
  ],
};

export default portfolioData;

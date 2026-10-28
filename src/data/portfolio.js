export const PROFILE = {
  first: 'ROGER',
  last: 'JADEN',
  roles: ['JAVA BACKEND', 'SDE', 'AI / ML'],
  taglines: [
    'building backend systems that make sense.',
    'from API design to production deployment.',
    'learning deeply. shipping consistently.',
  ],
  email: 'rogerjaden384@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rogerjaden384',
  github: 'https://github.com/Rogerjaden',
  leetcode: 'https://leetcode.com/Rogerjaden',
  resume: '/resume.pdf',
};

export const STACK = 'JAVA · SPRING BOOT · SPRING SECURITY · REST APIS · POSTGRESQL · MYSQL · REACT · DOCKER · JWT · REDIS · KAFKA · PYTHON · PYTORCH · ';

export const SNIPPETS = [
  '@RestController',
  'docker compose up --build',
  'SELECT * FROM bookings;',
  'Authorization: Bearer <token>',
  'accuracy: 93.37% · model evaluated',
];

export const EXPERIENCE = [
  {
    when: '2026 · PRESENT',
    title: 'Building production-minded projects',
    text: 'Designing backend APIs, authentication flows, database relationships, and deployment workflows while preparing for an SDE-1 role.',
    now: true,
  },
  {
    when: '25 JAN — 25 FEB 2025',
    title: 'Web Development Intern · Virtual',
    company: 'Codsoft · Tamil Nadu, India',
    text: 'Created a vegetarian hotel landing page using React.js and Tailwind CSS. Built a personal portfolio website to strengthen practical JavaScript and frontend development skills.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS'],
  },
  {
    when: '01 JUL — 31 JUL 2025',
    title: 'Backend Development Intern · Virtual',
    company: 'Code Alpha · Tamil Nadu, India',
    text: 'Developed a URL Shortener featuring URL validation, automatic short-code generation, redirection, and MySQL integration. Built an Event Registration System with JWT authentication, Spring Security, event management, participant registration, form validation, REST APIs, and PostgreSQL integration.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'React.js', 'REST APIs', 'SQL', 'JWT'],
  },
  {
    when: 'RESEARCH PROJECT',
    title: 'Deep Hybrid Model for Femoral Stem Classification',
    text: 'Built an image classification model for hip X-rays using a hybrid deep-learning approach combining attention and transformer modules; achieved a reported test accuracy of 93.37%.',
    tech: ['Python', 'Deep Learning', 'CNN', 'CBAM', 'Transformers'],
  },
];

export const EDUCATION = [
  {
    when: '2022 - 2026',
    title: 'Electronics and Communication Engineering',
    text: 'Focus areas: design, development, fabrication, and maintenance of electronic hardware and communication systems.',
  },
];


export const PROJECTS = [
  {
    name: 'CloudVault',
    status: 'building',
    pitch: 'A cloud file-management application designed around secure file storage, nested folders, and sharing.',
    stack: 'java · spring boot · spring security · sql · react',
    details: 'Current design focuses on clear entity relationships, ownership and sharing rules, API contracts, and a maintainable monolithic architecture before expanding further.',
    githubUrl: 'https://github.com/Rogerjaden',
    liveDemoUrl: null,
  },
  {
    name: 'BookMyShow Clone',
    status: 'shipped',
    pitch: 'A movie-ticket booking application with authentication, seat locking, bookings, and payment workflow design.',
    stack: 'java · spring boot · react · mysql · razorpay',
    details: 'The backend work includes JWT authentication, role-based authorization, booking validation, seat-locking logic, and thinking through concurrent booking requests.',
    githubUrl: 'https://github.com/Rogerjaden/BookMyShow',
    liveDemoUrl: 'https://bookmyshow-qlpj.onrender.com',
  },
  {
    name: 'Femoral Stem Classification',
    status: 'shipped',
    pitch: 'A deep-learning project that classifies femoral stem implant types from hip X-ray images.',
    stack: 'python · pytorch · computer vision · eca · transformer',
    details: 'The dataset contains 2,744 images across anatomical, cemented, and uncemented classes. The reported test accuracy was 93.37%.',
    githubUrl: 'https://github.com/Rogerjaden/Deep-Hybrid-Model-For-Classification-of-Femoral-Stem',
    liveDemoUrl: null,
  },
  {
    name: 'Freelance Projects',
    status: 'shipped',
    pitch: 'Working on various client projects to build and maintain web applications.',
    stack: 'javascript · react · spring boot · postgresql · mysql · docker',
    details: 'Currently focusing on creating responsive, user-friendly interfaces with modern web technologies.',
    githubUrl: 'https://github.com/Rogerjaden',
    liveDemoUrl: 'https://dexter-builders.vercel.app/',
  }
];


export const SKILLS = [
  ['Languages', 'java, javascript, python, sql'],
  ['Backend', 'spring boot, spring data jpa, hibernate, spring security, rest apis, jwt'],
  ['Databases & messaging', 'mysql, postgresql, h2, redis, kafka '],
  ['Frontend', 'react, vite, html, css, responsive UI'],
  ['Tools & deployment', 'git, github, maven, postman, docker, kubernetes, render, aws, vercel'],
  ['AI & ML', 'pytorch, deep learning, computer vision, model evaluation'],
];

export const POSTS = [
  { date: 'NOTES · BACKEND', title: 'Designing seat locking for a booking system', blurb: 'Thinking through expiry, duplicate bookings, and concurrent requests.', href: '#projects' },
  { date: 'NOTES · JAVA', title: 'Building authentication beyond the login endpoint', blurb: 'JWT, roles, validation, and the details that make auth reliable.', href: '#skills' },
  { date: 'NOTES · LEARNING', title: 'From model notebook to measurable results', blurb: 'What I learned while evaluating a computer-vision project.', href: '#projects' },
];

export const SIDE_QUESTS = [
  ['DSA practice', 'Consistent problem-solving and strengthening core patterns.'],
  ['System design', 'Learning to reason about trade-offs, boundaries, and scale.'],
  ['Open source', 'Improving project quality, documentation, and code structure.'],
  ['Freelance', 'Building small projects for clients to strengthen practical skills.'],
];

export const NAV = [
  ['hero', 'home'], ['experience', 'experience'], ['education', 'education'],
  ['projects', 'projects'], ['skills', 'skills'], ['blog', 'notes'],
  ['sidequests', 'side quests'], ['contact', 'contact'],
];

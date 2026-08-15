// Experience data for the portfolio.
// `description` is the one-line lead; `achievements` carries the specifics and
// `tech` the tooling, so each card is scannable rather than a wall of prose.
//
// BASE_URL rather than a bare path: files in public/ are served from the site
// root, and this site deploys under a subpath (see `base` in vite.config.js).
// A path without the prefix would 404 in production and only work in dev.
export const EXPERIENCE_DATA = [
  {
    period: 'August 2025 - February 2026',
    title: 'Intern',
    company: 'Whirlpool Corporation',
    location: 'Pune, India',
    logo: `${import.meta.env.BASE_URL}WhirlpoolCorp.png`,
    description:
      'Automation engineering and Android application development — building solutions that improve efficiency and streamline workflows.',
    achievements: [
      'Developed automation solutions to reduce manual effort and improve operational efficiency across internal processes.',
      'Built an NFC-enabled Android application, implementing NFC communication, tag data processing, and seamless integration with application features.',
      'Collaborated with cross-functional teams to deliver industry-focused solutions while strengthening skills in software development, automation, and problem-solving.',
    ],
    tech: ['Java', 'Python', 'Android Application Development', 'PyTest', 'Automation'],
    experience: '6 months',
    delay: 0.1,
  },

  {
    period: 'August 2026 - Present',
    title: 'Trainee Developer',
    company: 'Capita',
    location: 'Pune, India',
    logo: `${import.meta.env.BASE_URL}Capita.png`,
    description:
      'Software development and technology training focused on building practical solutions while developing skills in C# and Microsoft Azure.',
    achievements: [
      'Developing software engineering skills through hands-on training in C# and Microsoft Azure.',
      'Learning to design, develop, and maintain applications using modern development practices and cloud technologies.',
      'Working collaboratively in a professional technology environment while strengthening problem-solving, debugging, and software development skills.',
    ],
    tech: ['C#', 'Microsoft Azure'],
    experience: 'Current',
    delay: 0.2,
  }
];

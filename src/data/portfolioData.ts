import type { Language } from '../context/LanguageContext';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  badgeColor: 'amber' | 'emerald' | 'blue' | 'purple';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  badge: string;
  details: string;
  isCurrent?: boolean;
  url?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  badge: string;
  date?: string;
  url?: string;
  pdfUrl?: string;
  code?: string;
  highlight: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    headline: string;
    location: string;
    status: string;
    email: string;
    linkedin: string;
    github: string;
    kaggle: string;
  };
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export const PORTFOLIO_DATA_ES: PortfolioData = {
  personal: {
    name: 'Mario Luna López',
    role: 'Junior Software & ML Engineer',
    headline: 'Desarrollador con base en frontend y sistemas, orientando mi perfil hacia ingeniería de datos y ML. Aficionado al desarrollo indie con Godot.',
    location: 'Granada, España',
    status: 'Formándome como Software & ML Engineer',
    email: 'mario.luna.lpez@gmail.com',
    linkedin: 'https://linkedin.com/in/m-luna-lpez',
    github: 'https://github.com/mlunlop',
    kaggle: 'https://www.kaggle.com/mariolunalopez',
  },
  skills: [
    {
      category: 'Data & Machine Learning',
      items: ['Python', 'Machine Learning (En progreso)', 'Pandas & NumPy', 'Data Cleaning & Validation', 'Dataset Partitioning'],
    },
    {
      category: 'Frontend & UI Architecture',
      items: ['React 19 & TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Java', 'Tailwind CSS v4', 'Angular & Ionic / Capacitor', 'Laravel', 'Responsive Design'],
    },
    {
      category: 'Sistemas & DevOps',
      items: ['Linux SysAdmin (Debian)', 'Nginx Web Server', 'Bash Scripting', 'Docker Containers', 'Git & CI/CD', 'Apple Atlas Diagnostics'],
    },
  ],
  experiences: [
    {
      id: 'babel',
      role: 'Desarrollador Frontend Junior',
      company: 'Babel',
      location: 'España',
      period: 'Feb 2026 – May 2026',
      badge: 'Producción Híbrida',
      badgeColor: 'blue',
      description: 'Mantenimiento evolutivo y correctivo de aplicaciones móviles e híbridas de alto tráfico.',
      highlights: [
        'Desarrollo y refactorización de vistas complejas bajo Angular, Ionic y Capacitor con TypeScript.',
        'Resolución de incidencias críticas en UI/UX y optimización de rendimiento en dispositivos móviles.',
        'Construcción de componentes modulares reutilizables y alineados con el sistema de diseño interno.',
      ],
      technologies: ['Angular', 'Ionic', 'Capacitor', 'TypeScript', 'Git', 'Agile'],
    },
    {
      id: 'artebit',
      role: 'Desarrollador Web & Chatbots IA',
      company: 'Centro ArteBit',
      location: 'Granada, España',
      period: 'May 2025',
      badge: 'IA Conversacional',
      badgeColor: 'purple',
      description: 'Mantenimiento de infraestructura web e integración de interfaces conversacionales impulsadas por LLMs.',
      highlights: [
        'Diseño de arquitectura de flujo y despliegue de chatbots conversacionales utilizando Voiceflow.',
        'Mantenimiento correctivo y soporte evolutivo sobre ecosistema web WordPress.',
        'Automatización de respuestas y orquestación de prompts para interacción con clientes.',
      ],
      technologies: ['Voiceflow', 'WordPress', 'Prompt Engineering', 'JavaScript', 'APIs'],
    },
    {
      id: 'multiservice',
      role: 'Técnico de Soporte & Hardware (Beca Erasmus+)',
      company: 'SC Multiservice',
      location: 'Brescia, Italia',
      period: 'Mar 2024 – May 2024',
      badge: 'Hardware & Sistemas',
      badgeColor: 'emerald',
      description: 'Diagnóstico avanzado de averías y reparación electrónica de precisión bajo estándares oficiales de fabricante.',
      highlights: [
        'Diagnóstico y sustitución de componentes críticos bajo metodología y herramientas oficiales Apple Atlas.',
        'Resolución de fallos a nivel de placa base, arquitectura de buses y periféricos.',
        'Inmersión profesional internacional y gestión técnica en entorno multilingüe.',
      ],
      technologies: ['Apple Atlas Standard', 'Diagnóstico Hardware', 'Sistemas Operativos', 'Gestión de Incidencias'],
    },
  ],
  education: [
    {
      id: 'bachelor',
      degree: 'Grado Universitario en Informática',
      institution: 'Universitat Carlemany (Andorra - Modalidad Online)',
      period: '2026 – 2029',
      badge: 'Grado Universitario',
      isCurrent: true,
      url: 'https://www.universitatcarlemany.com/programas/bachelors/bachelor-online-informatica',
      details: 'Fundamentos de ingeniería del software, lógica computacional, arquitectura de sistemas, gestión de infraestructuras y desarrollo de software eficiente y sostenible bajo el marco EEES (180 ECTS).',
    },
    {
      id: 'master-fp',
      degree: 'Máster de FP en Aprendizaje Automático: Gestión de Datos y Entrenamiento',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2026 – 2027',
      badge: 'Postgrado Especializado',
      isCurrent: true,
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cursos-de-especializacion-detalle-titulo?idTitulo=2710&backURL=/educacion/portales/web/formacion-profesional-andaluza/cursos-de-especializacion-catalogo-de-titulos',
      details: 'Enfoque intensivo en preparación de corpus de datos, arquitecturas ETL, validación estadística, fine-tuning y entrenamiento de modelos de Machine Learning.',
    },
    {
      id: 'daw',
      degree: 'C.F.G.S. Desarrollo de Aplicaciones Web (DAW) — Bilingüe',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2024 – 2026',
      badge: 'Grado Superior',
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cf-grado-superior-detalle-titulo?idTitulo=2292&backURL=/educacion/portales/web/formacion-profesional-andaluza/grado-superior-catalogo-de-titulos',
      details: 'Arquitectura frontend moderna, desarrollo backend con bases de datos relacionales/NoSQL, diseño de APIs REST y patrones de software en modalidad bilingüe inglés.',
    },
    {
      id: 'smr',
      degree: 'C.F.G.M. Sistemas Microinformáticos y Redes (SMR)',
      institution: 'I.E.S. Almicerán (Peal de Becerro, Jaén)',
      period: '2022 – 2024',
      badge: 'Grado Medio',
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cf-grado-medio-detalle-titulo?idTitulo=2275&backURL=/educacion/portales/web/formacion-profesional-andaluza/grado-medio-catalogo-de-titulos',
      details: 'Redes locales, configuración de servidores Linux/Windows, seguridad perimetral, virtualización y arquitectura física de sistemas informáticos.',
    },
  ],
  certifications: [
    {
      id: 'cambridge',
      name: 'B2 First – Score 162',
      issuer: 'Cambridge Assessment English',
      badge: 'Certificación Oficial',
      date: 'Ago. 2025',
      url: 'https://www.linkedin.com/in/m-luna-lpez/overlay/Certifications/785869851/treasury/?profileId=ACoAAEE6NhsBa4oSnx_kflgCWrVN_dCqq0RwEY8',
      pdfUrl: '/docs/B2%20Certificado%20Mario%20Luna.pdf',
      highlight: 'Certificación oficial de competencia lingüística (B2 First). Capacidad demostrada para colaborar en equipos internacionales, debatir especificaciones técnicas y redactar documentación de ingeniería en inglés.',
    },
    {
      id: 'apple',
      name: 'Apple Atlas Certified Technician',
      issuer: 'Apple Inc.',
      badge: 'Certificación de Fabricante',
      date: '2024',
      highlight: 'Acreditación oficial en diagnóstico sistemático de hardware, análisis de fallos electrónicos y estándares de calidad de servicio durante estancia técnica en SC Multiservice (Brescia, Italia).',
    },
    {
      id: 'google-mobile',
      name: 'Desarrollo de Apps Móviles',
      issuer: 'Google',
      badge: 'Credencial Verificada',
      date: 'Sept. 2024',
      url: 'https://skillshop.exceedlms.com/student/award/EP1kNfmyWhoLJyREHdeR6s7n',
      highlight: 'Formación especializada en arquitectura móvil, ciclo de vida de aplicaciones, UX móvil y rendimiento, respaldando la experiencia en producción frontend híbrida (Ionic/Capacitor).',
    },
    {
      id: 'nginx-linux',
      name: 'Servidor Web Nginx sobre Linux (Debian)',
      issuer: 'OpenWebinars',
      badge: 'Credencial Técnica',
      date: 'Feb. 2024',
      url: 'https://openwebinars.net/cert/573l',
      highlight: 'Despliegue y hardening de servidores web con Nginx en Debian: configuración de virtual hosts, reverse proxy, balanceo de carga, SSL/TLS y optimización de sockets para producción.',
    },
  ],
};

export const PORTFOLIO_DATA_EN: PortfolioData = {
  personal: {
    name: 'Mario Luna López',
    role: 'Junior Software & ML Engineer',
    headline: 'Developer with a solid foundation in frontend and systems, currently orienting my profile towards data engineering and ML. Indie game dev enthusiast with Godot.',
    location: 'Granada, Spain',
    status: 'Training as Software & ML Engineer',
    email: 'mario.luna.lpez@gmail.com',
    linkedin: 'https://linkedin.com/in/m-luna-lpez',
    github: 'https://github.com/mlunlop',
    kaggle: 'https://www.kaggle.com/mariolunalopez',
  },
  skills: [
    {
      category: 'Data & Machine Learning',
      items: ['Python', 'Machine Learning (In progress)', 'Pandas & NumPy', 'Data Cleaning & Validation', 'Dataset Partitioning'],
    },
    {
      category: 'Frontend & UI Architecture',
      items: ['React 19 & TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Java', 'Tailwind CSS v4', 'Angular & Ionic / Capacitor', 'Laravel', 'Responsive Design'],
    },
    {
      category: 'Systems & DevOps',
      items: ['Linux SysAdmin (Debian)', 'Nginx Web Server', 'Bash Scripting', 'Docker Containers', 'Git & CI/CD', 'Apple Atlas Diagnostics'],
    },
  ],
  experiences: [
    {
      id: 'babel',
      role: 'Junior Frontend Developer',
      company: 'Babel',
      location: 'Spain',
      period: 'Feb 2026 – May 2026',
      badge: 'Hybrid Production',
      badgeColor: 'blue',
      description: 'Feature development and bug fixing for high-traffic hybrid mobile applications.',
      highlights: [
        'Development and refactoring of complex views using Angular, Ionic, and Capacitor with TypeScript.',
        'Resolution of critical UI/UX issues and mobile device performance optimizations.',
        'Creation of reusable modular components aligned with the internal design system.',
      ],
      technologies: ['Angular', 'Ionic', 'Capacitor', 'TypeScript', 'Git', 'Agile'],
    },
    {
      id: 'artebit',
      role: 'Web Developer & AI Chatbots',
      company: 'Centro ArteBit',
      location: 'Granada, Spain',
      period: 'May 2025',
      badge: 'Conversational AI',
      badgeColor: 'purple',
      description: 'Web infrastructure maintenance and integration of LLM-powered conversational interfaces.',
      highlights: [
        'Flow architecture design and deployment of conversational chatbots using Voiceflow.',
        'Corrective maintenance and iterative enhancements on WordPress web infrastructure.',
        'Response automation and prompt orchestration for direct customer interaction.',
      ],
      technologies: ['Voiceflow', 'WordPress', 'Prompt Engineering', 'JavaScript', 'APIs'],
    },
    {
      id: 'multiservice',
      role: 'Hardware & Tech Support Specialist (Erasmus+ Grant)',
      company: 'SC Multiservice',
      location: 'Brescia, Italy',
      period: 'Mar 2024 – May 2024',
      badge: 'Hardware & Systems',
      badgeColor: 'emerald',
      description: 'Advanced fault diagnosis and precision electronic repair under official manufacturer standards.',
      highlights: [
        'Diagnosis and component replacement under official Apple Atlas methodology and tools.',
        'Troubleshooting and repair at motherboard, bus architecture, and peripheral levels.',
        'International professional immersion and technical management in a multilingual environment.',
      ],
      technologies: ['Apple Atlas Standard', 'Hardware Diagnostics', 'Operating Systems', 'Incident Management'],
    },
  ],
  education: [
    {
      id: 'bachelor',
      degree: 'Bachelor’s Degree in Computer Science',
      institution: 'Universitat Carlemany (Andorra - Online)',
      period: '2026 – 2029',
      badge: 'University Degree',
      isCurrent: true,
      url: 'https://www.universitatcarlemany.com/programas/bachelors/bachelor-online-informatica',
      details: 'Software engineering fundamentals, computational logic, systems architecture, infrastructure management, and sustainable software development under the EHEA framework (180 ECTS).',
    },
    {
      id: 'master-fp',
      degree: 'Vocational Master’s in Machine Learning: Data Management & Model Training',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2026 – 2027',
      badge: 'Postgraduate Specialization',
      isCurrent: true,
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cursos-de-especializacion-detalle-titulo?idTitulo=2710&backURL=/educacion/portales/web/formacion-profesional-andaluza/cursos-de-especializacion-catalogo-de-titulos',
      details: 'Intensive focus on dataset preparation, ETL pipelines, statistical validation, fine-tuning, and Machine Learning model training workflows.',
    },
    {
      id: 'daw',
      degree: 'Higher Vocational Degree in Web Application Development (DAW) — Bilingual',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2024 – 2026',
      badge: 'Higher Vocational Degree',
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cf-grado-superior-detalle-titulo?idTitulo=2292&backURL=/educacion/portales/web/formacion-profesional-andaluza/grado-superior-catalogo-de-titulos',
      details: 'Modern frontend architecture, backend engineering with relational/NoSQL databases, RESTful API design, and software architecture patterns in English bilingual track.',
    },
    {
      id: 'smr',
      degree: 'Intermediate Vocational Degree in Microcomputer Systems & Networks (SMR)',
      institution: 'I.E.S. Almicerán (Peal de Becerro, Jaén)',
      period: '2022 – 2024',
      badge: 'Vocational Degree',
      url: 'https://www.juntadeandalucia.es/educacion/portales/web/formacion-profesional-andaluza/cf-grado-medio-detalle-titulo?idTitulo=2275&backURL=/educacion/portales/web/formacion-profesional-andaluza/grado-medio-catalogo-de-titulos',
      details: 'Local area networks, Linux/Windows server administration, perimeter security, virtualization, and physical hardware architecture.',
    },
  ],
  certifications: [
    {
      id: 'cambridge',
      name: 'B2 First – Score 162',
      issuer: 'Cambridge Assessment English',
      badge: 'Official Certification',
      date: 'Aug. 2025',
      url: 'https://www.linkedin.com/in/m-luna-lpez/overlay/Certifications/785869851/treasury/?profileId=ACoAAEE6NhsBa4oSnx_kflgCWrVN_dCqq0RwEY8',
      pdfUrl: '/docs/B2%20Certificado%20Mario%20Luna.pdf',
      highlight: 'Official certificate of linguistic competence (B2 First). Proven ability to collaborate with international teams, discuss technical specifications, and write engineering documentation in English.',
    },
    {
      id: 'apple',
      name: 'Apple Atlas Certified Technician',
      issuer: 'Apple Inc.',
      badge: 'Manufacturer Certification',
      date: '2024',
      highlight: 'Official credential in systematic hardware diagnostics, electronic fault analysis, and service quality standards during technical placement at SC Multiservice (Brescia, Italy).',
    },
    {
      id: 'google-mobile',
      name: 'Mobile App Development',
      issuer: 'Google',
      badge: 'Verified Credential',
      date: 'Sept. 2024',
      url: 'https://skillshop.exceedlms.com/student/award/EP1kNfmyWhoLJyREHdeR6s7n',
      highlight: 'Specialized training in mobile architecture, application lifecycle, mobile UX, and performance, reinforcing hands-on production experience in hybrid frontend (Ionic/Capacitor).',
    },
    {
      id: 'nginx-linux',
      name: 'Nginx Web Server on Linux (Debian)',
      issuer: 'OpenWebinars',
      badge: 'Technical Credential',
      date: 'Feb. 2024',
      url: 'https://openwebinars.net/cert/573l',
      highlight: 'Deployment and hardening of web servers using Nginx on Debian: virtual host configuration, reverse proxy, load balancing, SSL/TLS, and socket optimization for production.',
    },
  ],
};

// Default export maintains compatibility with existing code
export const PORTFOLIO_DATA = PORTFOLIO_DATA_ES;

export function getPortfolioData(language: Language): PortfolioData {
  return language === 'en' ? PORTFOLIO_DATA_EN : PORTFOLIO_DATA_ES;
}

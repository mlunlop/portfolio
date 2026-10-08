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
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  badge: string;
  code?: string;
  highlight: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Mario Luna López',
    role: 'Software & Data / ML Engineer',
    headline: 'Especialista en ciclo de vida del dato, pipelines ETL y Machine Learning con base sólida en desarrollo frontend y sistemas Linux.',
    location: 'Granada, España',
    status: 'Disponible para nuevos retos',
    email: 'mario.luna.lpez@gmail.com',
    linkedin: 'https://linkedin.com/in/m-luna-lpez',
    github: 'https://github.com/mariolunalpz', // Fallback standard
  },
  skills: [
    {
      category: 'Data Engineering & ML',
      items: ['ETL Pipelines', 'Data Cleaning & Validation', 'Dataset Partitioning', 'Feature Engineering', 'PyTorch / Scikit-learn', 'Pandas & NumPy'],
    },
    {
      category: 'Frontend & UI Architecture',
      items: ['React 19 & TypeScript', 'Tailwind CSS v4', 'Angular & Ionic / Capacitor', 'Framer Motion', 'State Management', 'Responsive Design'],
    },
    {
      category: 'Sistemas & DevOps',
      items: ['Linux SysAdmin (LPIC-1)', 'Bash Scripting', 'Docker Containers', 'Git & CI/CD', 'Hardware Diagnostics (Apple Atlas)', 'Voiceflow AI Agents'],
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
  ] as ExperienceItem[],
  education: [
    {
      id: 'master-fp',
      degree: 'Máster de FP en Aprendizaje Automático: Gestión de Datos y Entrenamiento',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2026 – 2027',
      badge: 'Postgrado Especializado',
      details: 'Enfoque intensivo en preparación de corpus de datos, arquitecturas ETL, validación estadística, fine-tuning y entrenamiento de modelos de Machine Learning.',
    },
    {
      id: 'daw',
      degree: 'C.F.G.S. Desarrollo de Aplicaciones Web (DAW) — Bilingüe',
      institution: 'I.E.S. Zaidín-Vergeles (Granada)',
      period: '2024 – 2026',
      badge: 'Grado Superior',
      details: 'Arquitectura frontend moderna, desarrollo backend con bases de datos relacionales/NoSQL, diseño de APIs REST y patrones de software en modalidad bilingüe inglés.',
    },
    {
      id: 'smr',
      degree: 'C.F.G.M. Sistemas Microinformáticos y Redes (SMR)',
      institution: 'I.E.S. Almicerán (Granada)',
      period: '2022 – 2024',
      badge: 'Grado Medio',
      details: 'Redes locales, configuración de servidores Linux/Windows, seguridad perimetral, virtualización y arquitectura física de sistemas informáticos.',
    },
  ] as EducationItem[],
  certifications: [
    {
      id: 'lpic',
      name: 'LPIC-1 Versión 5.0 (Linux System Administration)',
      issuer: 'Linux Professional Institute',
      badge: 'Certificación Oficial',
      highlight: 'Dominio de administración del kernel Linux, particionamiento de sistemas de ficheros, permisos POSIX, gestión de procesos y automatización en Bash.',
    },
    {
      id: 'apple',
      name: 'Apple Atlas Certified Technician',
      issuer: 'Apple Inc.',
      badge: 'Certificación Oficial',
      highlight: 'Validación en diagnosis sistemática de hardware, trazabilidad de fallos electrónicos y estándares de calidad oficiales de servicio.',
    },
    {
      id: 'cambridge',
      name: 'Inglés B2 First (Upper-Intermediate)',
      issuer: 'Cambridge Assessment English',
      badge: 'Competencia Lingüística',
      highlight: 'Capacidad para debatir especificaciones técnicas, colaborar en equipos internacionales y redactar documentación de ingeniería en inglés con fluidez.',
    },
  ] as CertificationItem[],
};

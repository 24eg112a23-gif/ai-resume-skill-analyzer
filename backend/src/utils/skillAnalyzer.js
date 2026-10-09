const skillDatabase = {
  programming: [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "C#",
    "Go",
    "Rust",
    "PHP"
  ],

  web: [
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "Next.js",
    "Bootstrap",
    "Tailwind CSS"
  ],

  database: [
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Oracle",
    "Redis"
  ],

  tools: [
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Linux"
  ],

  data: [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Pandas",
    "NumPy",
    "TensorFlow",
    "PyTorch"
  ],

  software: [
    "Data Structures",
    "Algorithms",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "REST API"
  ]
};

const careerProfiles = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git"
  ],

  "Backend Developer": [
    "Java",
    "Node.js",
    "Express",
    "SQL",
    "REST API",
    "Git"
  ],

  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "Git"
  ],

  "Java Developer": [
    "Java",
    "OOP",
    "SQL",
    "Data Structures",
    "Spring Boot",
    "Git"
  ],

  "Data Analyst": [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "Excel",
    "Data Visualization"
  ],

  "Data Scientist": [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "Machine Learning",
    "Statistics"
  ]
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+#/-]/g, " ");
}

function findSkills(text) {
  const normalizedText = normalizeText(text);
  const foundSkills = [];

  Object.values(skillDatabase)
    .flat()
    .forEach((skill) => {
      const skillLower = skill.toLowerCase();

      if (normalizedText.includes(skillLower)) {
        foundSkills.push(skill);
      }
    });

  return [...new Set(foundSkills)];
}

function calculateCareerMatches(foundSkills) {
  const results = [];

  Object.entries(careerProfiles).forEach(([career, requiredSkills]) => {
    const matchedSkills = requiredSkills.filter((skill) =>
      foundSkills.some(
        (found) => found.toLowerCase() === skill.toLowerCase()
      )
    );

    const missingSkills = requiredSkills.filter(
      (skill) =>
        !foundSkills.some(
          (found) => found.toLowerCase() === skill.toLowerCase()
        )
    );

    const score = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );

    results.push({
      career,
      score,
      matchedSkills,
      missingSkills
    });
  });

  return results.sort((a, b) => b.score - a.score);
}

function analyzeResume(text) {
  const skills = findSkills(text);

  const careers = calculateCareerMatches(skills);

  const topCareer = careers[0];

  return {
    skills,
    skillCount: skills.length,
    careers,
    recommendedCareer: topCareer.career,
    readinessScore: topCareer.score,
    skillGaps: topCareer.missingSkills
  };
}

module.exports = {
  analyzeResume
};
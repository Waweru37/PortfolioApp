// src/config/portfolio.ts
export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    mission: string;
    vision: string;
    location: string;
    availability: string;
    tagline: string;
  };
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
  metrics: {
    projectsCompleted: string;
    yearsExperience: string;
    clientsSatisfied: string;
    linesOfCode: string;
  };
  interactiveStories: {
    [key: string]: {
      title: string;
      description: string;
      achievement: string;
      icon: string;
      techStack: string[];
      color: string;
    };
  };
}

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  personal: {
    name: "Mark Waweru Thuku",
    title: "Software Engineer · Business Strategist · Solutions Architect",
    mission: "To engineer powerful, scalable digital experiences that uplift economies and accelerate innovation across Africa and beyond.",
    vision: "To become a globally respected tech leader who empowers the next generation of builders, thinkers, and entrepreneurs.",
    location: "Nairobi, Kenya",
    availability: "Open to Global Opportunities",
    tagline: "Where African Innovation Meets Future Technology"
  },
  links: {
    github: "https://github.com/Waweru37",
    linkedin: "https://www.linkedin.com/in/markwaweru37/",
    resume: "/Mark-Waweru-Thuku-Resume.pdf"
  },
  metrics: {
    projectsCompleted: "50+",
    yearsExperience: "5+",
    clientsSatisfied: "100%",
    linesOfCode: "100K+"
  },
  interactiveStories: {
    lion: {
      title: "Leadership Excellence",
      description: "Like the king of the savanna, I lead cross-functional teams of 15+ developers across 3 continents with strategic vision and unwavering determination.",
      achievement: "Delivered $2M+ revenue-generating platforms with 98% client satisfaction",
      icon: "🦁",
      techStack: ["Team Leadership", "Agile Management", "Strategic Planning"],
      color: "from-yellow-500 to-orange-600"
    },
    // ... other stories
  }
};
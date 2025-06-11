import { Zap, GitBranch, Shield, Bus, Tractor, Briefcase, Footprints } from 'lucide-react';

// Data array for all projects. This makes adding, editing, or removing projects trivial.
const projectData = [
  {
    icon: <GitBranch />,
    title: "GitHub Multi-Folder Uploader",
    description: "A powerful shell script streamlining developer workflows by enabling bulk uploads of files and folders to a GitHub repository in a single command.",
    tech: ["Shell Scripting", "Git", "Developer Tools"]
  },
  {
    icon: <Tractor />,
    title: "Soko Suite: Agri-Tech Solutions",
    description: "A comprehensive suite of USSD apps (Sokolink, Sokosupply, Sokorepo) designed to digitize and connect Kenya's agricultural value chain, from farmer to market.",
    tech: ["USSD", "Python (Django)", "API Integration", "PostgreSQL"]
  },
  {
    icon: <Briefcase />,
    title: "Kazilink",
    description: "A USSD application bridging the gap between job seekers and recruiters, simplifying the hiring process for both informal and formal sector opportunities.",
    tech: ["USSD", "Node.js", "MongoDB", "Twilio API"]
  },
  {
    icon: <Footprints />,
    title: "RiadhaApp",
    description: "A dual-function USSD platform for the athletics community, connecting athletes with coaches and providing a simple, accessible digital training journal.",
    tech: ["USSD", "PHP (Laravel)", "MySQL", "Gamification"]
  },
  {
    icon: <Bus />,
    title: "Jamii Ride",
    description: "A real-time public transport information service via USSD, offering users up-to-date fare data and optimal route navigation across Kenya.",
    tech: ["USSD", "Real-Time Data", "Geolocation APIs"]
  },
  {
    icon: <Shield />,
    title: "Tujulishe",
    description: "A critical public alert system via USSD, issuing real-time notifications for utility disruptions (water/electricity) and community security alerts.",
    tech: ["USSD", "High-Availability", "SMS Gateway", "Alerting Systems"]
  }
];

function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">My Work & Innovations</h2>
        <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
          Here are some of the solutions I've architected, from developer tools to impactful USSD applications transforming key sectors in Kenya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg flex flex-col text-left hover:border-blue-500/50 hover:bg-gray-900/70 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">{project.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-slate-300 flex-grow mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tag, i) => (
                  <span key={i} className="text-xs font-medium bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-transparent text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Project One</h3>
            <p className="text-slate-300">A short description of what this project is about and the tech used.</p>
          </div>
          <div className="bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Project Two</h3>
            <p className="text-slate-300">A short description of what this project is about and the tech used.</p>
          </div>
          <div className="bg-gray-900 bg-opacity-40 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Project Three</h3>
            <p className="text-slate-300">A short description of what this project is about and the tech used.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;


function Projects() {
  const projects = [
    {
      title: "Weather App",
      desc: "Weather API based project",
    },
    {
      title: "To-Do App",
      desc: "Task management with storage",
    },
    {
      title: "Quotes Collection",
      desc: "Categorized quotes app",
    },
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {projects.map((project, index) => (
          <div key={index} className="card">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <button className="btn">View</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
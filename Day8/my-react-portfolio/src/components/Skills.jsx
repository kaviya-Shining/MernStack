function Skills() {
  const skills = [
    { name: "HTML", level: "90%" },
    { name: "CSS", level: "85%" },
    { name: "JavaScript", level: "80%" },
    { name: "React", level: "75%" },
  ];

  return (
    <section id="skills">
      <h2>Skills</h2>

      {skills.map((skill, index) => (
        <div key={index}>
          <p>{skill.name}</p>
          <div className="skill-bar">
            <div
              className="skill-progress"
              style={{ width: skill.level }}
            ></div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;
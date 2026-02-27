import { ReactTyped } from "react-typed";

function Home() {
  return (
    <section id="home">
      <h1>Hi, I'm Kaviya</h1>

      <h2>
        <ReactTyped
          strings={["React Developer", "MERN Learner", "UI Designer"]}
          typeSpeed={50}
          backSpeed={40}
          loop
        />
      </h2>

      <p style={{ maxWidth: "500px" }}>
        I build modern, responsive and animated web applications.
      </p>
    </section>
  );
}

export default Home;
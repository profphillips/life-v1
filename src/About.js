import Footer from "./Footer";
export default function About() {
  return (
    <>
      <section>
        <h3 id="about">About</h3>
        <p>Conway's Game of Life by John Phillips on April 17, 2021.</p>
        <p>
          Source:{" "}
          <a href="https://github.com/profphillips/life-v1">
            https://github.com/profphillips/life-v1
          </a>
        </p>
        <p>
          Live page:{" "}
          <a href="https://profphillips.github.io/life-v1/">
            https://profphillips.github.io/life-v1/
          </a>
        </p>
      </section>
      <Footer />
    </>
  );
}

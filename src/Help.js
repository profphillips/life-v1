import Footer from "./Footer";
export default function Help() {
  return (
    <>
      <section>
        <h3>Controls</h3>
        <p>This app implements Conway's game of life rules.</p>
        <p>
          The control buttons are at the bottom of the screen. You may need to
          scroll down to see them.
        </p>
        <p>
          Pause [Run], Next - toggle between running and pausing the simulation;
          when paused you can click the next button to move forward frame by
          frame.
        </p>
        <p>
          B/W [Color] - choose black and white or color cells. The color changes
          based on how long the cell has been alive.
        </p>
        <p>
          Slow, Medium, Fast - sets the simulation speed. Medium is about 1
          frame per second.
        </p>
        <p>
          Random, Clear - set a randome screen of cells or set all of the cells
          to 0.
        </p>
        <p>
          Load, Save - load and save the screens from/to 3 local storage slots.
        </p>
      </section>
      <Footer />
    </>
  );
}

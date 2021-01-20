import { useState, useEffect } from "react";

const getDems = () => {
  const dems = {
    x:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    y:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };

  return dems;
};

function useWindowDimensions() {
  // save current window width and height in the state object
  let [dems, setDems] = useState(getDems());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change dems from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setDems(getDems()), 200);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return dems;
}

export default useWindowDimensions;

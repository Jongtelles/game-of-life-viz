import "./Cell.css";

const Cell = ({ x, y, cellSize, palette, transition }) => {
  let converted;
  switch (transition) {
    case 100:
      converted = 0.2;
      break;
    case 200:
      converted = 0.2;
      break;
    case 300:
      converted = 0.3;
      break;
    case 500:
      converted = 0.4;
      break;
    case 1000:
      converted = 0.8;
      break;

    default:
      converted = 0.5;
      break;
  }

  return (
    <div
      className={`cell ${palette}`}
      style={{
        left: `${cellSize * x + 1}px`,
        top: `${cellSize * y + 1}px`,
        width: `${cellSize - 1}px`,
        height: `${cellSize - 1}px`,
        transition: `all ${converted}s ease-in-out 0s`,
      }}
    />
  );
};

export default Cell;

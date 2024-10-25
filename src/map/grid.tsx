export const Grid = () => {
  const width = 10;
  const height = 10;
  return (
    <div className="flex flex-row grow">
      {new Array(width * height).fill(1).map((_, i) => (
        <Cell key={i} x={Math.floor(i / width)} y={Math.floor(i / height)} />
      ))}
    </div>
  );
};

const Cell = ({ x, y }: { x: number; y: number }) => {
  console.log("I am a cell");
  const onCellClicked = () => {
    console.log(`Cell clicked at x: ${x}, y: ${y}`);
  };
  return (
    <div
      onClick={onCellClicked}
      className="size-32 bg-white border border-white"
    >
      This is a cell
    </div>
  );
};

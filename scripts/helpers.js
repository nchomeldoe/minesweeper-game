// set up grid based on size
const setRowsAndColumns = (gridSize) => {
  let rowsAndColumns = "1fr";
  for (let i = 1; i < gridSize; i++) {
    rowsAndColumns += " 1fr";
  }
  return rowsAndColumns;
};

// set tile colour based on number of adjacent mines
const setTileColor = (tile) => {
  switch (tile.innerHTML) {
    case "1":
      tile.style.color = "blue";
      break;
    case "2":
      tile.style.color = "green";
      break;
    case "3":
      tile.style.color = "red";
      break;
    case "4":
      tile.style.color = "purple";
      break;
    case "5":
      tile.style.color = "orange";
      break;
    case "6":
      tile.style.color = "hotpink";
      break;
    case "7":
      tile.style.color = "goldenrod";
      break;
    case "8":
      tile.style.color = "magenta";
      break;
    default:
      tile.style.color = "";
  }
};

// reveal tile
const revealTile = (e) => {
  e.target.classList.remove("hidden");
  e.target.tabIndex = "-1";
};

export { setRowsAndColumns, setTileColor, revealTile };

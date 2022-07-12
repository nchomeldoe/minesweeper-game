// innerHTML for various elements
const smileyFace = `<i class="fa-solid fa-face-smile fa-xl"></i>`;
const victoryFace = `<i class="fa-solid fa-face-laugh-beam fa-xl"></i>`;
const defeatFace = `<i class="fa-solid fa-skull fa-xl"></i>`;
const mineSymbol = `<i class="fa-solid fa-bomb"></i>`;

// query selectors
const board = document.querySelector(".board");
const tileGrid = document.querySelector(".tile-grid");
const resetButton = document.querySelector("button");
const mineCounter = document.querySelector(".header__mine-counter");
const clock = document.querySelector(".header__clock");
const levelSelector = document.querySelector("#levels");

// // set grid size
// let gridSize;
// let numberOfMines;

// set up grid based on size
const setRowsAndColumns = (gridSize) => {
  let rowsAndColumns = "1fr";
  for (let i = 1; i < gridSize; i++) {
    rowsAndColumns += " 1fr";
  }
  return rowsAndColumns;
};

const setGridStyles = (minesNo, gridDimension, boardWidth, boardHeight) => {
  numberOfMines = minesNo;
  gridSize = gridDimension;
  tileGrid.style.gridTemplateRows = setRowsAndColumns(gridDimension);
  tileGrid.style.gridTemplateColumns = setRowsAndColumns(gridDimension);
  board.style.width = boardWidth;
  board.style.height = boardHeight;
};

const setGridSize = (level = "beginner") => {
  if (level === "beginner") {
    setGridStyles(10, 9, "15rem", "18rem");
  } else if (level === "intermediate") {
    setGridStyles(30, 12, "20rem", "23rem");
  } else if (level === "advanced") {
    setGridStyles(50, 18, "30rem", "33rem");
  }
};

// lay out tiles
const layTiles = (level = "beginner") => {
  tileGrid.innerHTML = "";
  setGridSize(level);
  for (let i = 0; i < gridSize * gridSize; i++) {
    tileGrid.innerHTML += `<div tabindex="0" class="tile" id="id${
      i + 1
    }"></div>`;
  }
};

// const tiles = document.querySelectorAll(".tile");

// position mines randomly
const positionMines = () => {
  const mineLocations = [];
  for (let i = 0; mineLocations.length < numberOfMines; i++) {
    let randomNum = Math.floor(Math.random() * gridSize * gridSize + 1);
    if (!mineLocations.includes(randomNum)) {
      mineLocations.push(randomNum);
    }
  }
  mineLocations.forEach((location) => {
    let matchingTile = document.querySelector(`#id${location}`);
    matchingTile.innerHTML = mineSymbol;
  });
};

// find adjacent tiles depending on position of original tile
const findAdjacentTiles = (tile) => {
  const tileIdNo = Number(tile.id.substring(2));
  const tileDistances = !(tileIdNo % gridSize)
    ? [-(gridSize + 1), -gridSize, -1, gridSize - 1, gridSize]
    : tileIdNo % gridSize === 1
    ? [-gridSize, -(gridSize - 1), 1, gridSize, gridSize + 1]
    : [
        -(gridSize + 1),
        -gridSize,
        -(gridSize - 1),
        -1,
        1,
        gridSize - 1,
        gridSize,
        gridSize + 1,
      ];
  const adjacentTileIds = [];
  tileDistances.forEach((distance) => {
    if (
      tileIdNo + distance > 0 &&
      tileIdNo + distance < gridSize * gridSize + 1
    ) {
      adjacentTileIds.push(`#id${tileIdNo + distance}`);
    }
  });
  return adjacentTileIds;
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

// identify tiles that are next to mines and display how many mines they are next to
const displayNumbers = (tiles) => {
  tiles.forEach((tile) => {
    if (!tile.innerHTML) {
      let adjacentMines = 0;
      const adjacentTileIds = findAdjacentTiles(tile);
      adjacentTileIds.forEach((tileId) => {
        let checkedForMines = document.querySelector(tileId);
        if (checkedForMines.innerHTML === mineSymbol) {
          adjacentMines++;
        }
      });
      tile.innerHTML = adjacentMines ? adjacentMines : "";
      setTileColor(tile);
    }
  });
};

// // identify tiles that are next to mines and display how many mines they are next to
// const displayNumbers = (tiles) => {
//   tiles.forEach((tile) => {
//     if (!tile.innerHTML) {
//       let adjacentMines = 0;
//       const adjacentTileIds = findAdjacentTiles(tile);
//       adjacentTileIds.forEach((tileId) => {
//         let checkedForMines = document.querySelector(tileId);
//         if (checkedForMines.innerHTML === mineSymbol) {
//           adjacentMines++;
//         }
//       });
//       tile.innerHTML = adjacentMines ? adjacentMines : "";
//       if (tile.innerHTML === "1") {
//         tile.style.color = "blue";
//       } else if (tile.innerHTML === "2") {
//         tile.style.color = "green";
//       } else if (tile.innerHTML === "3") {
//         tile.style.color = "red";
//       } else if (tile.innerHTML === "4") {
//         tile.style.color = "purple";
//       } else if (tile.innerHTML === "5") {
//         tile.style.color = "orange";
//       } else if (tile.innerHTML === "6") {
//         tile.style.color = "hotpink";
//       } else if (tile.innerHTML === "7") {
//         tile.style.color = "goldenrod";
//       } else if (tile.innerHTML === "8") {
//         tile.style.color = "goldenrod";
//       }
//     }
//   });
// };

// detect device type
const deviceRegEx =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const deviceType = deviceRegEx.test(navigator.userAgent) ? "mobile" : "other";

// timer to detect short vs long touch events on mobile
let startTime;
let endTime;

const startTouchTimer = (e) => {
  startTime = e.timeStamp;
};

const determineTouchDuration = (e) => {
  endTime = e.timeStamp;
  const touchDuration = endTime - startTime;
  return touchDuration > 600 ? "long" : "short";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// functions to add and remove event listeners for tiles based on device type
const addTileEventListeners = (tiles) => {
  tiles.forEach((tile) => {
    if (deviceType === "other") {
      tile.addEventListener("mouseup", handleClick);
      tile.addEventListener("keydown", handleClick);
    } else if (deviceType === "mobile") {
      tile.addEventListener("touchstart", startTouchTimer);
      tile.addEventListener("touchend", handleClick);
    }
  });
};

const removeTileEventListeners = (tiles) => {
  tiles.forEach((tile) => {
    if (deviceType === "other") {
      tile.removeEventListener("mouseup", handleClick);
      tile.removeEventListener("keydown", handleClick);
    } else if (deviceType === "mobile") {
      tile.removeEventListener("touchstart", startTouchTimer);
      tile.removeEventListener("touchend", handleClick);
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// set timer to off
let timerOn = false;

// function for counting up in seconds
const startCountingSeconds = () => {
  if (timerOn) {
    const newTime = Number(clock.innerHTML) + 1;
    clock.innerHTML = newTime < 10 ? `0${newTime}` : newTime;
    setTimeout(startCountingSeconds, 1000);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// reset function
const resetAll = (tiles) => {
  resetButton.innerHTML = smileyFace;
  timerOn = false;
  mineCounter.innerHTML = `${numberOfMines}`;
  mineCounter.style.backgroundColor = "";
  clock.innerHTML = "00";
  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.style.color = "";
    tile.style.backgroundColor = "";
    if (!tile.classList.contains("hidden")) {
      tile.classList.add("hidden");
    }
    if (tile.classList.contains("flagged")) {
      tile.classList.remove("flagged");
    }
  });
  addTileEventListeners(tiles);
};

// set up new game
const startNewGame = (level = "beginner") => {
  // let gridSize;
  // let numberOfMines;
  layTiles(level);
  const tiles = document.querySelectorAll(".tile");
  resetAll(tiles);
  positionMines();
  displayNumbers(tiles);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// reveal tile
const revealTile = (e) => {
  e.target.classList.remove("hidden");
};

// change mine counter and make background red if number drops below 0
const changeMineCounter = (direction) => {
  const mineCount = Number(mineCounter.innerHTML);
  const newMineCount = direction === "down" ? mineCount - 1 : mineCount + 1;
  if (newMineCount < 10 && newMineCount >= 0) {
    mineCounter.innerHTML = `0${newMineCount}`;
  } else {
    mineCounter.innerHTML = `${newMineCount}`;
  }
  if (newMineCount < 0) {
    mineCounter.style.backgroundColor = "red";
  } else {
    mineCounter.style.backgroundColor = "";
  }
};

// apply or remove warning symbol
const toggleFlag = (e) => {
  if (e.target.classList.contains("flagged")) {
    e.target.classList.remove("flagged");
    changeMineCounter("up");
  } else if (e.target.classList.contains("hidden")) {
    e.target.classList.add("flagged");
    changeMineCounter("down");
  }
};

// find if all mines have been identified
const findIfAllMinesIdentified = (number, tiles) => {
  foundCount = 0;
  tiles.forEach((tile) => {
    if (tile.innerHTML === mineSymbol && tile.classList.contains("flagged")) {
      foundCount += 1;
    }
  });
  if (foundCount === number) {
    resetButton.innerHTML = victoryFace;
    timerOn = false;
    removeTileEventListeners(tiles);
    tiles.forEach((tile) => {
      if (!tile.classList.contains("flagged")) {
        tile.classList.remove("hidden");
        tile.style.backgroundColor = "palegreen";
      }
    });
  }
};

// clear adjacent blank or numbered tiles when a blank tile is clicked
const clearAdjacentBlanks = (tile) => {
  if (!tile.innerHTML) {
    const adjacentTileIds = findAdjacentTiles(tile);
    adjacentTileIds.forEach((tileId) => {
      let checkedForBlanks = document.querySelector(tileId);
      if (checkedForBlanks.innerHTML !== mineSymbol) {
        checkedForBlanks.classList.remove("hidden");
      }
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// highlight clicked mine in red and reveal all other mines
const gameOver = (e, tiles) => {
  if (e.target.innerHTML === mineSymbol) {
    console.log("boom");
    e.target.style.backgroundColor = "red";
    removeTileEventListeners(tiles);
    tiles.forEach((tile) => {
      if (
        tile.innerHTML === mineSymbol &&
        !tile.classList.contains("flagged")
      ) {
        tile.classList.remove("hidden");
      }
    });
    resetButton.innerHTML = defeatFace;
    timerOn = false;
  }
};

// apply different functions depending which tile is clicked and which type of event
const handleClick = (e) => {
  const tiles = e.target.parentElement.childNodes;
  if (clock.innerHTML === "00") {
    timerOn = true;
    setTimeout(startCountingSeconds, 1000);
  }
  if (
    (deviceType === "other" && (e.which === 1 || e.key === "Enter")) ||
    (deviceType === "mobile" && determineTouchDuration(e) === "short")
  ) {
    findIfAllMinesIdentified(numberOfMines, tiles);
    if (!e.target.classList.contains("flagged")) {
      revealTile(e);
      clearAdjacentBlanks(e.target);
      gameOver(e, tiles);
    }
  } else if (
    (deviceType === "other" &&
      ((e.type === "mouseup" && e.which !== 1) ||
        (e.type === "keydown" && e.key !== "Tab" && e.key !== "Shift"))) ||
    (deviceType === "mobile" && determineTouchDuration(e) === "long")
  ) {
    toggleFlag(e);
    findIfAllMinesIdentified(numberOfMines, tiles);
  }
};

//event listeners
resetButton.addEventListener("click", startNewGame);
levelSelector.addEventListener("change", (e) => {
  startNewGame(e.target.value);
});

// start new game on page load

startNewGame();

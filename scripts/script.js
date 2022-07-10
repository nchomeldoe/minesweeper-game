// innerHTML for various elements
const smileyFace = `<i class="fa-solid fa-face-smile fa-xl"></i>`;
const victoryFace = `<i class="fa-solid fa-face-laugh-beam fa-xl"></i>`;
const defeatFace = `<i class="fa-solid fa-skull fa-xl"></i>`;
const mineSymbol = `<i class="fa-solid fa-bomb"></i>`;

// query selectors
const tileGrid = document.querySelector(".tile-grid");
const resetButton = document.querySelector("button");
const mineCounter = document.querySelector(".header__mine-counter");
const clock = document.querySelector(".header__clock");

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

// functions to add and remove event listeners for tiles based on device type
const addTileEventListeners = () => {
  tiles.forEach((tile) => {
    if (deviceType === "other") {
      tile.addEventListener("mouseup", handleClick);
    } else if (deviceType === "mobile") {
      tile.addEventListener("touchstart", startTouchTimer);
      tile.addEventListener("touchend", handleClick);
    }
  });
};

const removeTileEventListeners = () => {
  tiles.forEach((tile) => {
    if (deviceType === "other") {
      tile.removeEventListener("mouseup", handleClick);
    } else if (deviceType === "mobile") {
      tile.removeEventListener("touchstart", startTouchTimer);
      tile.removeEventListener("touchend", handleClick);
    }
  });
};

// lay out 81 tiles
for (let i = 0; i < 81; i++) {
  tileGrid.innerHTML += `<div class="tile" id="id${i + 1}"></div>`;
}

// query selector for tiles
const tiles = document.querySelectorAll(".tile");

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

// reset function
const resetAll = () => {
  resetButton.innerHTML = smileyFace;
  timerOn = false;
  mineCounter.innerHTML = "10";
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
  addTileEventListeners();
};

// find adjacent tiles depending on position of original tile
const findAdjacentTiles = (tile) => {
  const tileIdNo = Number(tile.id.substring(2));
  const tileDistances = !(tileIdNo % 9)
    ? [-10, -9, -1, 8, 9]
    : tileIdNo % 9 === 1
    ? [-9, -8, 1, 9, 10]
    : [-10, -9, -8, -1, 1, 8, 9, 10];
  const adjacentTileIds = [];
  tileDistances.forEach((distance) => {
    if (tileIdNo + distance > 0 && tileIdNo + distance < 82) {
      adjacentTileIds.push(`#id${tileIdNo + distance}`);
    }
  });
  return adjacentTileIds;
};

// position mines randomly
const positionMines = () => {
  const mineLocations = [];
  for (let i = 0; mineLocations.length < 10; i++) {
    let randomNum = Math.floor(Math.random() * 81 + 1);
    if (!mineLocations.includes(randomNum)) {
      mineLocations.push(randomNum);
    }
  }
  mineLocations.forEach((location) => {
    let matchingTile = document.querySelector(`#id${location}`);
    matchingTile.innerHTML = mineSymbol;
  });
};

// identify tiles that are next to mines and display how many mines they are next to
const displayNumbers = () => {
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
      if (tile.innerHTML === "1") {
        tile.style.color = "blue";
      } else if (tile.innerHTML === "2") {
        tile.style.color = "green";
      } else if (tile.innerHTML === "3") {
        tile.style.color = "red";
      } else if (tile.innerHTML === "4") {
        tile.style.color = "purple";
      } else if (tile.innerHTML === "5") {
        tile.style.color = "orange";
      } else if (tile.innerHTML === "6") {
        tile.style.color = "pink";
      }
    }
  });
};

// set up new game
const startNewGame = () => {
  resetAll();
  positionMines();
  displayNumbers();
};

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
  } else {
    e.target.classList.add("flagged");
    changeMineCounter("down");
  }
};

// find all mines
const findAllMines = (number) => {
  foundCount = 0;
  tiles.forEach((tile) => {
    if (tile.innerHTML === mineSymbol && tile.classList.contains("flagged")) {
      foundCount += 1;
    }
  });
  if (foundCount === number) {
    resetButton.innerHTML = victoryFace;
    timerOn = false;
    removeTileEventListeners();
    tiles.forEach((tile) => {
      if (!tile.classList.contains("flagged")) {
        tile.classList.remove("hidden");
        tile.style.backgroundColor = "palegreen";
      }
    });
  }
};

// clear adjecent blank or numbered tiles when a blank tile is clicked
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

// highlight clicked mine in red and reveal all other mines
const gameOver = (e) => {
  if (e.target.innerHTML === mineSymbol) {
    e.target.style.backgroundColor = "red";
    removeTileEventListeners();
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
  if (clock.innerHTML === "00") {
    timerOn = true;
    setTimeout(startCountingSeconds, 1000);
  }
  if (
    (deviceType === "other" && e.which === 1) ||
    (deviceType === "mobile" && determineTouchDuration(e) === "short")
  ) {
    findAllMines(10);
    if (!e.target.classList.contains("flagged")) {
      revealTile(e);
      clearAdjacentBlanks(e.target);
      gameOver(e);
    }
  } else {
    toggleFlag(e);
    findAllMines(10);
  }
};

//event listeners
resetButton.addEventListener("click", startNewGame);
addTileEventListeners();

// start new game on page load
startNewGame();

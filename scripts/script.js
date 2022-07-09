const tileGrid = document.querySelector(".tile-grid");
const resetButton = document.querySelector("button");
const mineCounter = document.querySelector(".header__mine-counter");
const clock = document.querySelector(".header__clock");

for (let i = 0; i < 81; i++) {
  tileGrid.innerHTML += `<div class="tile" id="id${i + 1}"></div>`;
}

const tiles = document.querySelectorAll(".tile");

let timerOn = false;

const startCountingSeconds = () => {
  if (timerOn) {
    const newTime = Number(clock.innerHTML) + 1;
    clock.innerHTML = newTime;
    setTimeout(startCountingSeconds, 1000);
  }
};

const resetAll = () => {
  resetButton.innerHTML = `<i class="fa-solid fa-face-smile fa-xl"></i>`;
  timerOn = false;
  mineCounter.innerHTML = "10";
  clock.innerHTML = "0";
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
    tile.addEventListener("mousedown", handleClick);
  });
};

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
    matchingTile.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
  });
};

const displayNumbers = () => {
  tiles.forEach((tile) => {
    if (!tile.innerHTML) {
      let adjacentMines = 0;
      const adjacentTileIds = findAdjacentTiles(tile);
      adjacentTileIds.forEach((tileId) => {
        let checkedForMines = document.querySelector(tileId);
        if (checkedForMines.innerHTML === `<i class="fa-solid fa-bomb"></i>`) {
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

const startNewGame = () => {
  resetAll();
  positionMines();
  displayNumbers();
};

const revealTile = (e) => {
  e.target.classList.remove("hidden");
};

const toggleFlag = (e) => {
  if (e.target.classList.contains("flagged")) {
    e.target.classList.remove("flagged");
    mineCounter.innerHTML = Number(mineCounter.innerHTML) + 1;
  } else {
    e.target.classList.add("flagged");
    mineCounter.innerHTML = Number(mineCounter.innerHTML) - 1;
  }
};

const findAll = (number) => {
  foundCount = 0;
  tiles.forEach((tile) => {
    if (
      tile.innerHTML === `<i class="fa-solid fa-bomb"></i>` &&
      tile.classList.contains("flagged")
    ) {
      foundCount += 1;
    }
  });
  if (foundCount === number) {
    resetButton.innerHTML = `<i class="fa-solid fa-face-laugh-beam fa-xl"></i>`;
    timerOn = false;
    tiles.forEach((tile) => {
      tile.removeEventListener("mousedown", handleClick);
      if (!tile.classList.contains("flagged")) {
        tile.classList.remove("hidden");
        tile.style.backgroundColor = "palegreen";
      }
    });
  }
};

const clearAdjacentBlanks = (tile) => {
  if (!tile.innerHTML) {
    const adjacentTileIds = findAdjacentTiles(tile);
    adjacentTileIds.forEach((tileId) => {
      let checkedForBlanks = document.querySelector(tileId);
      if (checkedForBlanks.innerHTML !== `<i class="fa-solid fa-bomb"></i>`) {
        checkedForBlanks.classList.remove("hidden");
      }
    });
  }
};

const gameOver = (e) => {
  if (e.target.innerHTML === `<i class="fa-solid fa-bomb"></i>`) {
    e.target.style.backgroundColor = "red";
    tiles.forEach((tile) => {
      tile.removeEventListener("mousedown", handleClick);
      if (
        tile.innerHTML === `<i class="fa-solid fa-bomb"></i>` &&
        !tile.classList.contains("flagged")
      ) {
        tile.classList.remove("hidden");
      }
    });
    resetButton.innerHTML = `<i class="fa-solid fa-skull fa-xl"></i>`;
    timerOn = false;
  }
};

const handleClick = (e) => {
  if (clock.innerHTML === "0") {
    timerOn = true;
    setTimeout(startCountingSeconds, 1000);
    // startCountingSeconds();
  }
  if (e.which === 1) {
    findAll(10);
    if (!e.target.classList.contains("flagged")) {
      revealTile(e);
      clearAdjacentBlanks(e.target);
      gameOver(e);
      findAll();
    }
  } else {
    toggleFlag(e);
    findAll(10);
  }
};

const test = (e) => {
  switch (e.which) {
    case 1:
      alert("left Mouse button pressed.");
      break;
    default:
      alert("Right Mouse button pressed.");
      break;
  }
};

let timer;
const touchduration = 800;

const touchstart = (e) => {
  e.preventDefault();
  if (!timer) {
    timer = setTimeout(onlongtouch, touchduration);
  }
};

const touchend = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

const onlongtouch = () => {
  timer = null;
  alert("long touch");
};

resetButton.addEventListener("click", startNewGame);
// tileGrid.addEventListener("mousedown", test);
// tileGrid.addEventListener("touchmove", () => {
//   alert("moved!");
// // });
// tileGrid.addEventListener("touchstart", touchstart);
// tileGrid.addEventListener("touchend", touchend);
tiles.forEach((tile) => {
  tile.addEventListener("mousedown", handleClick);
});

startNewGame();

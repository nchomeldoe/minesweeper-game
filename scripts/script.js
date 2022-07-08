tileGrid = document.querySelector(".tile-grid");
resetButton = document.querySelector("button");

for (let i = 0; i < 81; i++) {
  tileGrid.innerHTML += `<div class="tile" id="id${i + 1}"></div>`;
}

const tiles = document.querySelectorAll(".tile");

const clearAll = () => {
  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.style.color = "";
  });
};

const positionMines = () => {
  const mineLocations = [];

  for (let i = 0; mineLocations.length < 10; i++) {
    console.log(mineLocations.length);
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
      let adjacentBombs = 0;
      const tileIdNo = Number(tile.id.substring(2));
      const tileDistances = !(tileIdNo % 9)
        ? [-10, -9, -1, 8, 9]
        : tileIdNo % 9 === 1
        ? [-9, -8, 1, 9, 10]
        : [-10, -9, -8, -1, 1, 8, 9, 10];
      tileDistances.forEach((distance) => {
        if (tileIdNo + distance > 0 && tileIdNo + distance < 82) {
          let checkedForMines = document.querySelector(
            `#id${tileIdNo + distance}`,
          );
          if (
            checkedForMines.innerHTML === `<i class="fa-solid fa-bomb"></i>`
          ) {
            adjacentBombs++;
          }
        }
      });
      tile.innerHTML = adjacentBombs ? adjacentBombs : "";
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
  clearAll();
  positionMines();
  displayNumbers();
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
tileGrid.addEventListener("mousedown", test);
// tileGrid.addEventListener("touchmove", () => {
//   alert("moved!");
// });
tileGrid.addEventListener("touchstart", touchstart);
tileGrid.addEventListener("touchend", touchend);

startNewGame();

// query selectors
const board = document.querySelector(".board");
const headerElements = document.querySelectorAll(".header *");
const tileGrid = document.querySelector(".tile-grid");
const resetButton = document.querySelector("button");
const mineCounter = document.querySelector(".header__mine-counter");
const clock = document.querySelector(".header__clock");
const levelSelector = document.querySelector("#levels");

export {
  board,
  headerElements,
  tileGrid,
  resetButton,
  mineCounter,
  clock,
  levelSelector,
};

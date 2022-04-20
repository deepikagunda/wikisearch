import {
  performSearchFn,
  clearInput,
  stopPageReload,
  clearButtonVisibilityFn,
} from "./utils.js";
document.addEventListener("DOMContentLoaded", () => {
  let searchInput = document.getElementsByClassName("searchinput")[0];
  searchInput.focus();
  let searchBtn = document.getElementById("searchButton");
  let searchbarElem = document.getElementsByClassName("searchbar")[0];
  let clearBtn = document.getElementById("clearButton");
  searchbarElem.addEventListener("submit", performSearchFn);
  // searchInput.addEventListener("input", performSearch);
  searchInput.addEventListener("keyup", clearButtonVisibilityFn);
  clearBtn.addEventListener("click", clearInput);
  //searchBtn.addEventListener("click", performSearch);
});

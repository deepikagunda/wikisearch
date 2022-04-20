function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (!timer) {
      fn(...args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
export const performSearchFn = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  let searchInput = document.getElementsByClassName("searchinput")[0];
  let input = searchInput.value;

  const results = await fetchResults(constructURL(input));
  renderResults(results);
};
export const clearButtonVisibilityFn = (event) => {
  let searchInput = document.getElementsByClassName("searchinput")[0];
  let clearBtn = document.getElementById("clearButton");
  let input = searchInput.value;
  if (input.length === 0) {
    //clearBtn.classList.add("active");
    clearBtn.classList.add("disabled");
  } else if (input.length === 1) {
    clearBtn.classList.remove("disabled");
  }
};
export const stopPageReload = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
export const renderResults = (results) => {
  let htmlStr = `<div class="resultContainer">`;
  for (let obj of results) {
    htmlStr += `<div class="title">${
      obj.title
    }</div><div class="imgDescWrapper">${
      obj.thumbnail
        ? `<div class="imgContainer"><img class="resultimg" src=${obj.thumbnail} /></div> `
        : ""
    }<div class="desc">${obj.desc}</div></div>`;
  }
  htmlStr += `</div>`;
  let resultsEle = document.getElementById("results");
  resultsEle.innerHTML = htmlStr;
};

export const constructURL = (input) => {
  let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${input}&gsrlimit=20&prop=pageimages|extracts&exchars=80&exintro&explaintext&exlimit=max&format=json&origin=*`; //`https://en.wikipedia.org/w/api.php?origin=*&action=query&prefixsearch=${input}&limit=5&format=json`;

  return encodeURI(url);
};
export const fetchResults = async (input) => {
  const results = await fetch(input);
  const resultsJSON = await results.json();

  return Object.values(resultsJSON.query.pages).map((obj) => {
    return {
      thumbnail: obj?.thumbnail?.source,
      title: obj?.title,
      desc: obj?.extract,
    };
  });
};
export const clearInput = (event) => {
  let resultsEle = document.getElementById("results");
  resultsEle.innerHTML = "";
  let searchInput = document.getElementsByClassName("searchinput")[0];
  searchInput.value = "";
  let clearBtn = document.getElementById("clearButton");
  clearBtn.classList.add("disabled");
};

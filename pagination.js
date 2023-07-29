const paginationContainer = document.getElementById("paginationContainer");
const paginationLinkNext = document.getElementById("paginationLinkNext");
const paginationLinkPrev = document.getElementById("paginationLinkPrev");
const paginationLink = document.querySelectorAll(".paginationLink");

const getInventories = async (page) => {
  console.log("getInventories : ", page);
};

let currentPage = 1;
let currentIndex = 0;

const totalPages = 11;

pagination(totalPages, 1);

function pagination(totalPages, index) {
  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationLink[i - 1].innerHTML = i;
      paginationLink[i - 1].classList.add("displayPaginationLink");
    }
  } else if (totalPages >= 5) {
    for (let i = 0; i <= 4; i++) {
      paginationLink[i].innerHTML = index;
      paginationLink[i].classList.add("displayPaginationLink");
      index++;    
    }
  }
  document
    .querySelectorAll(".paginationLink")
    [currentIndex].classList.add("activePagination");
  currentPage =
    document.querySelectorAll(".paginationLink")[currentIndex].innerText;
}

// const paginationLink = document.querySelectorAll(".paginationLink");

paginationLink.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = index;
    currentPage = link.innerText;
    getInventories(Number(currentPage));
    paginationLink.forEach((link) => link.classList.remove("activePagination"));
    link.classList.add("activePagination");
  });
});

let index = 1;

paginationLinkPrev.addEventListener("click", (e) => {
  e.preventDefault();
  const paginationLink = document.querySelectorAll(".paginationLink");
  if (currentIndex !== 0) {
    currentIndex--;
    paginationLink.forEach((link) => link.classList.remove("activePagination"));
    paginationLink[currentIndex].classList.add("activePagination");
    currentPage = paginationLink[currentIndex].innerHTML;
    getInventories(Number(currentPage));
  } else if (currentIndex === 0) {
    if (currentPage > 1) {
      index = currentPage - 1;
      pagination(totalPages, index);
      getInventories(Number(currentPage));
    }
  }
});

paginationLinkNext.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentIndex !== paginationLink.length - 1) {
    currentIndex++;
    paginationLink.forEach((link) => link.classList.remove("activePagination"));
    paginationLink[currentIndex].classList.add("activePagination");
    currentPage = paginationLink[currentIndex].innerText;
    getInventories(Number(currentPage));
  } else if (currentIndex === paginationLink.length - 1) {
    if (currentPage < totalPages) {
      index++;
      pagination(totalPages, index);
      getInventories(Number(currentPage));
    }
  }
});

const searchPage = document.getElementById("searchPage");

// call add event listner when press enter key
searchPage.addEventListener("keypress", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === "Enter") {
    if (searchPage.value) {
      const searchValue = Number(searchPage.value);
      if (searchValue <= totalPages && searchValue >=1) {
        getInventories(searchValue);
        paginationLink.forEach((link) =>
          link.classList.remove("activePagination")
        );
        let borderValue = searchValue - 4;
        if (borderValue > 0) {
          searchPagination(borderValue, searchValue);
        }else if(borderValue <= 0){
          searchPagination(searchValue, searchValue);
        }
      }
    }
  }
}

function searchPagination(borderValue, searchValue){
  for (let i = 0; i <= 4; i++) {
    paginationLink[i].innerHTML = borderValue;
    paginationLink[i].classList.add("displayPaginationLink");
    borderValue++;    
  }
  paginationLink.forEach((link) => {
    if (link.innerHTML === searchValue.toString()) {
      link.classList.add("activePagination");
    }
  });
}
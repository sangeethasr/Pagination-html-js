const paginationContainer = document.getElementById("paginationContainer");
const paginationLinkNext = document.getElementById("paginationLinkNext");
const paginationLinkPrev = document.getElementById("paginationLinkPrev");
const paginationLink = document.querySelectorAll(".paginationLink");

const getInventories = async (page) => {
  console.log("getInventories : ", page);
};

let currentPage = 1;
let currentIndex = 0;

const totalPages = 3;

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
  const activePaginationLink = document.querySelectorAll(".displayPaginationLink");
  if (currentIndex !== 0) {
    currentIndex--;
    activePaginationLink.forEach((link) => link.classList.remove("activePagination"));
    activePaginationLink[currentIndex].classList.add("activePagination");
    currentPage = activePaginationLink[currentIndex].innerHTML;
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
  const activePaginationLink = document.querySelectorAll(".displayPaginationLink");
  if (currentIndex !== activePaginationLink.length - 1) {
    currentIndex++;
    activePaginationLink.forEach((link) => link.classList.remove("activePagination"));
    activePaginationLink[currentIndex].classList.add("activePagination");
    currentPage = activePaginationLink[currentIndex].innerText;
    getInventories(Number(currentPage));
  } else if (currentIndex === activePaginationLink.length - 1) {
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
        currentPage = searchValue;
        getInventories(searchValue);
        if((totalPages<=5)&&(searchValue<=5)){
          searchPagination(1, totalPages-1, searchValue);
        }else if((totalPages>5)&&(searchValue>5)){
          let borderValue = searchValue-4;
          searchPagination(borderValue, 4, searchValue);
        }else if((totalPages>5)&&(searchValue<=5)){
          searchPagination(1, 4, searchValue);
        }
      }
    }
  }
}

function searchPagination(startInnerHtmlValue, endIndex, searchValue){
  for (let i = 0; i <= endIndex; i++) {
    paginationLink[i].innerHTML = startInnerHtmlValue;
    paginationLink[i].classList.add("displayPaginationLink");
    startInnerHtmlValue++;    
  }
  let flag = false;
  let activeIndex = 0;

    paginationLink.forEach((link,index) => {
    if (link.innerHTML === searchValue.toString()) {
      flag = true;
      activeIndex = index;
      currentIndex = index;
    }
  });

  if(flag){
    paginationLink.forEach((link) =>
    link.classList.remove("activePagination")
  );
    paginationLink[activeIndex].classList.add("activePagination");
    searchPage.value = "";
  }

}
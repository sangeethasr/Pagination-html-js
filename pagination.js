const paginationContainer = document.getElementById("paginationContainer");
const paginationLinkNext = document.getElementById("paginationLinkNext");
const paginationLinkPrev = document.getElementById("paginationLinkPrev");

let currentPage = 1;
let currentIndex = 0;

const totalPages = 11;

pagination(totalPages,1)

function pagination(totalPages,index) {
    if(totalPages<5){
        for(let i=1; i<=totalPages; i++){
            paginationContainer.innerHTML += `<a href="#" class="paginationLink">${i}</a>`
        }
    }else if(totalPages>=5){
        for(let i=index; i<=(4+index); i++){
            paginationContainer.innerHTML += `<a href="#" class="paginationLink">${i}</a>`;
        }
    }
    document.querySelectorAll(".paginationLink")[currentIndex].classList.add("active");
    currentPage = document.querySelectorAll(".paginationLink")[currentIndex].innerText;
}

const paginationLink = document.querySelectorAll(".paginationLink");

paginationLink.forEach((link,index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = index;
        currentPage = link.innerText;
        paginationLink.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
    })
});

let index= 1;

paginationLinkPrev.addEventListener("click", (e) => {
    e.preventDefault();
    const paginationLink = document.querySelectorAll(".paginationLink");
    if(currentIndex !==0){
        currentIndex--;
        paginationLink.forEach(link => link.classList.remove("active"));
        paginationLink[currentIndex].classList.add("active");
        currentPage = paginationLink[currentIndex].innerHTML;
    }else if(currentIndex === 0){
        if(currentPage > 1){
            paginationContainer.innerHTML = "";
            index= currentPage - 1;
            pagination(totalPages,index);
        }
    }
})

paginationLinkNext.addEventListener("click", (e) => {
    const paginationLink = document.querySelectorAll(".paginationLink");
    e.preventDefault();
    if(currentIndex !== paginationLink.length-1){
        currentIndex++;
        paginationLink.forEach(link => link.classList.remove("active"));
        paginationLink[currentIndex].classList.add("active");
        currentPage = paginationLink[currentIndex].innerText;
    }
    else if((currentIndex === paginationLink.length-1)){
        if(currentPage < totalPages){
            console.log(currentPage, totalPages)
            paginationContainer.innerHTML = "";
            index++;
            pagination(totalPages, index);
        }
    }
})
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const imgContainer = document.getElementById("imgContainer");

let currentPage = 1;
let query = "";
let isFetching = false;

// Function to fetch car images from the API based on search input
async function fetchCarImages(query, page) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=hF9GWlhOEEABdiEeH2qPDReai3Jy53s_U0OoCC_PJX8`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}

// Function to display car images in the image container
function displayCarImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description;
        imgElement.classList.add("car-image");
        imgContainer.appendChild(imgElement);
    });
}

// Function to clear images
function clearImages() {
    imgContainer.innerHTML = "";
    currentPage = 1;
}

// Event listener for search button click
btn.addEventListener("click", async () => {
    query = input.value.trim();
    if (query !== "") {
        clearImages();
        const images = await fetchCarImages(query, currentPage);
        displayCarImages(images);
    }
});

// Event listener for Enter key press in input field
input.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        query = input.value.trim();
        if (query !== "") {
            clearImages();
            const images = await fetchCarImages(query, currentPage);
            displayCarImages(images);
        }
    }
});

// Infinite Scroll
window.addEventListener("scroll", async () => {
if(!query)return;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight-100 && !isFetching) {
        isFetching = true;
        currentPage++;
        const images = await fetchCarImages(query, currentPage);
        displayCarImages(images);
        isFetching = false;
    }
});
      
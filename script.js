const btn = document.getElementById("btn");
        const input = document.getElementById("input");
        const imgContainer = document.getElementById("imgContainer");

        // Function to fetch car images from the API based on search input
        async function fetchCarImages(query) {
            try {
                const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=hF9GWlhOEEABdiEeH2qPDReai3Jy53s_U0OoCC_PJX8`);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error("Error fetching images:", error);
                return [];
            }
        }

        // Function to display car images in the image container
        function displayCarImages(images) {
            imgContainer.innerHTML = ""; // Clear previous images

            images.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image.urls.regular;
                imgElement.alt = image.alt_description;
                imgElement.classList.add("car-image");
                imgContainer.appendChild(imgElement);
            });
        }

        // Event listener for search button click
        btn.addEventListener("click", async () => {
            const query = input.value.trim();
            if (query !== "") {
                const images = await fetchCarImages(query);
                displayCarImages(images);
            }
        });

        // Event listener for Enter key press in input field
        input.addEventListener("keypress", async (event) => {
            if (event.key === "Enter") {
                const query = input.value.trim();
                if (query !== "") {
                    const images = await fetchCarImages(query);
                    displayCarImages(images);
                }
            }
        });
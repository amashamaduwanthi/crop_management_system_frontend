document.getElementById("saveCrop").addEventListener("click", function () {
     const cropCode = document.getElementById("cropCode").value;
     const commonName = document.getElementById("commonName").value;
     const scienceName = document.getElementById("scienceName").value;
     const category = document.getElementById("category").value;
     const season = document.getElementById("season").value;
     const cropImage = document.getElementById("cropImage").files[0];

    // Validate inputs (optional)
    if (!cropCode || !commonName || !scienceName || !cropImage) {
        alert("Please fill in all required fields!");
        return;
    }

    const formData = new FormData();
    formData.append("cropCode", cropCode);
    formData.append("commonName", commonName);
    formData.append("scienceName", scienceName);
    formData.append("category", category);
    formData.append("season", season);
    formData.append("cropImage", cropImage);

    fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/crop", {
        method: "POST",
        body: formData,
        headers: {

        }
    })
        .then(response => {
            if (response.ok) {
                alert("Crop saved successfully!");
                // Optionally, refresh the table or clear the form
                loadTableData()
            } else {
                alert("Error saving crop: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the crop.");
        });
    console.log(cropCode,commonName,scienceName,category,season,cropImage)
});



function loadTableData() {
    const tableBody = document.querySelector("#crop_table tbody");

    // Fetch data from the backend
    fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/crop")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch crops. Status: " + response.status);
            }
        })
        .then(data => {
            // Clear the table before populating
            tableBody.innerHTML = "";

            // Populate the table with fetched data
            data.forEach(crop => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${crop.crop_code}</td>
                    <td>${crop.common_name}</td>
                    <td>${crop.scientific_name}</td>
                    <td>
                        <img src="data:image/jpeg;base64,${crop.crop_image}" alt="Crop Image"
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>

                    <td>${crop.category}</td>
                    <td>${crop.season}</td>
                    <td>${crop.field_code || ""}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${crop.crop_code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${crop.crop_code}">Delete</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });

            // Attach event listeners for "Edit" and "Delete" buttons
            attachEventListeners();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while loading crop data.");
        });
}



// Load table data on page load
document.addEventListener("DOMContentLoaded", loadTableData);


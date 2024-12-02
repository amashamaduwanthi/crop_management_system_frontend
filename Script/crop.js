

var recordIndex;
// Clear form fields after successful submission
function clearCropForm() {
    document.getElementById("cropCode").value = '';
    document.getElementById("commonName").value = '';
    document.getElementById("scienceName").value = '';
    document.getElementById("category").value = '';
    document.getElementById("season").value = '';
    document.getElementById("cropImage").value = '';
    document.getElementById("fieldComboBox").value = '';
}

// Save crop method
document.getElementById("saveCrop").addEventListener("click", function () {
    const cropCode = document.getElementById("cropCode").value.trim();
    const commonName = document.getElementById("commonName").value.trim();
    const scienceName = document.getElementById("scienceName").value.trim();
    const category = document.getElementById("category").value.trim();
    const season = document.getElementById("season").value.trim();
    const cropImage = document.getElementById("cropImage").files[0];
    const field = document.getElementById("field_details").value.trim();

    // Validate inputs
    if (!cropCode || !commonName || !scienceName || !cropImage ||!field) {
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
    formData.append("field_name", field);

    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/crop", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                alert("Crop saved successfully!");
                loadCropTableData();
                clearCropForm();
            } else {
                alert("Error saving crop: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the crop.");
        });
});

// Load crop data into table
function loadCropTableData() {
    const tableBody = document.querySelector("#crop_table tbody");

    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/crop")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch crops. Status: " + response.status);
            }
        })
        .then(data => {
            tableBody.innerHTML = ""; // Clear existing rows

            data.forEach(crop => {
                const row = document.createElement("tr");

                const base64Image = crop.crop_image.startsWith("data:image")
                    ? crop.crop_image
                    : `data:image/jpeg;base64,${crop.crop_image}`;

                row.innerHTML = `
                    <td class="crop-code-value" >${crop.crop_code}</td>
                    <td class="crop-name-value">${crop.common_name}</td>
                    <td class="crop-scientific-value">${crop.scientific_name}</td>
                    <td >
                        <img src="${base64Image}" alt="Crop Image" 
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>
                    <td class="crop-category-value">${crop.category}</td>
                    <td class="crop-season-value">${crop.season}</td>
                    <td class="crop-field-value">$${crop.field.field_name}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${crop.crop_code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${crop.crop_code}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            attachCropEventListeners();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while loading crop data.");
        });
}

// Attach event listeners to edit and delete buttons
function attachCropEventListeners() {
    // Delete button listeners
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const cropCode = event.target.getAttribute("data-id");
            deleteCrop(cropCode);
        });
    });

    // Edit button listeners
//     document.querySelectorAll(".edit-button").forEach(button => {
//         button.addEventListener("click", (event) => {
//             const cropCode = event.target.getAttribute("data-id");
//             fetchCropDetails();
//         });
//     });
}

// Delete crop
function deleteCrop(cropCode) {
    if (confirm("Are you sure you want to delete this crop?")) {
        fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    alert("Crop deleted successfully!");
                    loadCropTableData();
                } else {
                    throw new Error("Failed to delete crop. Status: " + response.status);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while deleting the crop.");
            });
    }
}

// Fetch crop details for editing
// function fetchCropDetails(cropCode) {
//     console.log(cropCode)
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//
//             } else {
//                 throw new Error("Failed to fetch crop details. Status: " + response.status);
//             }
//         })
//         .then(crop => {
//             document.getElementById("cropCode").value = crop.crop_code;
//             document.getElementById("commonName").value = crop.common_name;
//             document.getElementById("scienceName").value = crop.scientific_name;
//             document.getElementById("category").value = crop.category;
//             document.getElementById("season").value = crop.season;
//             //document.getElementById("fieldComboBox").value = crop.field;
//         })
//         .catch(error => {
//             console.error("Error fetching crop details:", error);
//             alert("An error occurred while fetching crop details.");
//         });
// }
// function fetchCropDetails(cropCode) {
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//
//             } else {
//                 throw new Error("Failed to fetch field details. Status: " + response.status);
//             }
//         })
//         .then(crop => {
//             document.getElementById("cropCode").value = crop.crop_code;
//             document.getElementById("commonName").value = crop.common_name;
//             document.getElementById("scienceName").value = crop.scientific_name;
//             document.getElementById("season").value = crop.season;
//             document.getElementById("category").value = crop.category;
//         })
//         .catch(error => {
//             console.error("Error fetching field details:", error);
//             alert("An error occurred while fetching crop details.");
//         });
// }
//

// Update crop
// function updateCrop(cropCode, updatedData) {
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`, {
//         method: "PUT",
//         headers: {
//              "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//     })
//         .then(response => {
//             if (response.ok) {
//                 alert("Crop updated successfully!");
//                 loadCropTableData();
//             } else {
//                 throw new Error("Failed to update crop. Status: " + response.status);
//             }
//         })
//         .catch(error => {
//             console.error("Error updating crop:", error);
//             alert("An error occurred while updating the crop.");
//         });
// }

// Load crops on page load
document.addEventListener("DOMContentLoaded", loadCropTableData);
//




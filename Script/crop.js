// document.getElementById("saveCrop").addEventListener("click", function () {
//      const cropCode = document.getElementById("cropCode").value;
//      const commonName = document.getElementById("commonName").value;
//      const scienceName = document.getElementById("scienceName").value;
//      const category = document.getElementById("category").value;
//      const season = document.getElementById("season").value;
//      const cropImage = document.getElementById("cropImage").files[0];
//
//     // Validate inputs (optional)
//     if (!cropCode || !commonName || !scienceName || !cropImage) {
//         alert("Please fill in all required fields!");
//         return;
//     }
//
//     const formData = new FormData();
//     formData.append("cropCode", cropCode);
//     formData.append("commonName", commonName);
//     formData.append("scienceName", scienceName);
//     formData.append("category", category);
//     formData.append("season", season);
//     formData.append("cropImage", cropImage);
//
//     fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/crop", {
//         method: "POST",
//         body: formData,
//         headers: {
//
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 alert("Crop saved successfully!");
//                 // Optionally, refresh the table or clear the form
//                 loadTableData()
//             } else {
//                 alert("Error saving crop: " + response.statusText);
//             }
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("An error occurred while saving the crop.");
//         });
//     console.log(cropCode,commonName,scienceName,category,season,cropImage)
// });
//
//
//
//
//
// // Load table data on page load
// document.addEventListener("DOMContentLoaded", loadTableData);
//
// function loadTableData() {
//     const tableBody = document.querySelector("#crop_table tbody");
//
//     // Fetch data from the backend
//     fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/crop")
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Failed to fetch crops. Status: " + response.status);
//             }
//         })
//         .then(data => {
//             // Clear the table before populating
//             tableBody.innerHTML = "";
//
//             // Populate the table with fetched data
//             data.forEach(crop => {
//                 const row = document.createElement("tr");
//
//                 // Check if crop_image is valid and prefix if necessary
//                 const base64Image = crop.crop_image.startsWith("data:image")
//                     ? crop.crop_image
//                     : `data:image/jpeg;base64,${crop.crop_image}`;
//
//                 row.innerHTML = `
//                     <td>${crop.crop_code}</td>
//                     <td>${crop.common_name}</td>
//                     <td>${crop.scientific_name}</td>
//                     <td>
//                         <img src="${base64Image}" alt="Crop Image"
//                              class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
//                     </td>
//                     <td>${crop.category}</td>
//                     <td>${crop.season}</td>
//                     <td>${crop.field_code || ""}</td>
//                     <td>
//                         <button class="btn btn-primary btn-sm edit-button" data-id="${crop.crop_code}">Edit</button>
//                         <button class="btn btn-danger btn-sm delete-button" data-id="${crop.crop_code}">Delete</button>
//                     </td>
//                 `;
//
//                 tableBody.appendChild(row);
//             });
//
//             // Attach event listeners for "Edit" and "Delete" buttons
//             attachEventListenersCrop();
//             attachEventListener();
//         })
//         .catch(error => {
//             console.error("Error:", error);
//             alert("An error occurred while loading crop data.");
//         });
// }
//
// function attachEventListenersCrop() {
//     // Attach delete button event listeners
//     const deleteButtons = document.querySelectorAll(".delete-button");
//     deleteButtons.forEach(button => {
//         button.addEventListener("click", (event) => {
//             const cropCode = event.target.getAttribute("data-id");
//             deleteCrop(cropCode, event.target);
//         });
//     });
// }
//
// // Function to delete crop data
// function deleteCrop(crop_code, deleteButton) {
//     if (confirm("Are you sure you want to delete this crop?")) {
//         fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${crop_code}`, {
//             method: "DELETE",
//         })
//             .then(response => {
//                 if (response.ok) {
//                     // Remove the corresponding row from the table
//                     const row = deleteButton.closest("tr");
//                     row.remove();
//                     alert("Crop deleted successfully!");
//                 } else {
//                     throw new Error("Failed to delete crop. Status: " + response.status);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 alert("An error occurred while deleting the crop.");
//             });
//     }
// }
//
//
//
//
// function updateCrop(crop_code, updatedCropData) {
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${crop_code}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedCropData),
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to update crop. Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log("Crop updated successfully:", data);
//             alert("Crop updated successfully!");
//
//             // Refresh the table after update
//             loadTableData();
//         })
//         .catch(error => {
//             console.error("Error updating crop:", error);
//             alert(`An error occurred: ${error.message}`);
//         });
// }
//
// // Attach Event Listeners
// function attachEventListener() {
//     // Add click event listener to edit buttons
//     document.querySelectorAll(".edit-button").forEach(button => {
//         button.addEventListener("click", () => {
//             const cropCode = button.getAttribute("data-id");
//
//             // Example: Gather updated data (e.g., from a form or prompt)
//             const updatedCropData = {
//                 crop_code: cropCode, // Keep the same code
//                 common_name: prompt("Enter new common name:", ""),
//                 scientific_name: prompt("Enter new scientific name:", ""),
//                 crop_image: "", // Update this if image editing is allowed
//                 category: prompt("Enter new category:", ""),
//                 season: prompt("Enter new season:", ""),
//                 field_code: prompt("Enter new field code:", ""),
//             };
//
//             // Trigger update
//             updateCrop(cropCode, updatedCropData);
//         });
//     });
// }
//
// document.getElementById("searchCrop").addEventListener("click", function () {
//     const cropIdInput = document.getElementById("cropId");
//     const cropCode = cropIdInput.value.trim();
//     const feedback = document.getElementById("feedback");
//     const cropDetails = document.getElementById("cropDetails");
//
//     // Reset feedback and crop details
//     feedback.style.display = "none";
//     cropDetails.style.display = "none";
//
//     if (!cropCode) {
//         feedback.textContent = "Please enter a Crop ID.";
//         feedback.style.display = "block";
//         return;
//     }
//
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`, {
//         method: "GET",
//     })
//         .then(response => {
//             if (!response.ok) {
//                 if (response.status === 404) {
//                     throw new Error("Crop not found.");
//                 }
//                 throw new Error("Failed to fetch crop details.");
//             }
//             return response.json();
//         })
//         .then(crop => {
//             // Populate the form with fetched crop details
//             document.getElementById("cropCode").value = crop.crop_code;
//             document.getElementById("commonName").value = crop.common_name;
//             document.getElementById("scientificName").value = crop.scientific_name;
//             document.getElementById("season").value = crop.season;
//             document.getElementById("category").value = crop.category;
//
//             // Show the crop details section
//             cropDetails.style.display = "block";
//         })
//         .catch(error => {
//             feedback.textContent = error.message;
//             feedback.style.display = "block";
//         });
// });


// Clear form fields after successful submission
function clearCropForm() {
    document.getElementById("cropCode").value = '';
    document.getElementById("commonName").value = '';
    document.getElementById("scienceName").value = '';
    document.getElementById("category").value = '';
    document.getElementById("season").value = '';
    document.getElementById("cropImage").value = '';
}

// Save crop method
document.getElementById("saveCrop").addEventListener("click", function () {
    const cropCode = document.getElementById("cropCode").value.trim();
    const commonName = document.getElementById("commonName").value.trim();
    const scienceName = document.getElementById("scienceName").value.trim();
    const category = document.getElementById("category").value.trim();
    const season = document.getElementById("season").value.trim();
    const cropImage = document.getElementById("cropImage").files[0];

    // Validate inputs
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
                    <td>${crop.crop_code}</td>
                    <td>${crop.common_name}</td>
                    <td>${crop.scientific_name}</td>
                    <td>
                        <img src="${base64Image}" alt="Crop Image" 
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>
                    <td>${crop.category}</td>
                    <td>${crop.season}</td>
                    <td>crop.field_code || ""</td>
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
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const cropCode = event.target.getAttribute("data-id");
            fetchCropDetails(cropCode);
        });
    });
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
function fetchCropDetails(cropCode) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`)
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Failed to fetch crop details. Status: " + response.status);
            }
        })
        .then(crop => {
            document.getElementById("cropCode").value = crop.crop_code;
            document.getElementById("commonName").value = crop.common_name;
            document.getElementById("scienceName").value = crop.scientific_name;
            document.getElementById("category").value = crop.category;
            document.getElementById("season").value = crop.season;
        })
        .catch(error => {
            console.error("Error fetching crop details:", error);
            alert("An error occurred while fetching crop details.");
        });
}

// Update crop
function updateCrop(cropCode, updatedData) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    })
        .then(response => {
            if (response.ok) {
                alert("Crop updated successfully!");
                loadCropTableData();
            } else {
                throw new Error("Failed to update crop. Status: " + response.status);
            }
        })
        .catch(error => {
            console.error("Error updating crop:", error);
            alert("An error occurred while updating the crop.");
        });
}

// Load crops on page load
document.addEventListener("DOMContentLoaded", loadCropTableData);

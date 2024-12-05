
function saveField(){
    const formData = new FormData();

    formData.append("field_code", $("#fieldcode").val());
    formData.append("field_name", $("#field_name").val());

    const location_x = parseInt($("#field_location_x").val());
    formData.append("x", location_x);

    const location_y = parseInt($("#field_location_y").val());
    formData.append("y", location_y);

    formData.append("extent_size", $("#field_size").val());

    formData.append("field_image1", $("#field_image1")[0].files[0]);
    formData.append("field_image2", $("#field_image2")[0].files[0]);

    $.ajax({
        url:"http://localhost:6060/Crop_Monitoring_system/api/v1/field",
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result){
            clearFields();
            console.log(result);
            alert("Field Save Successfull");
            loadFieldTableData()
        },
        error: function (result){
            clearFields();
            console.log(result);
            alert("Field Save Unsuccessfull");
        }
    });
}

function loadFieldTableData() {
    const tableBody = document.querySelector("#field-table tbody");

    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/field")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch field. Status: " + response.status);
            }
        })
        .then(data => {
            tableBody.innerHTML = ""; // Clear existing rows

            data.forEach(field => {
                const locationString = `(${field.location.x}, ${field.location.y})`;
                const row = document.createElement("tr");

                const base64Image = field.field_image1.startsWith("data:image")
                    ? field.field_image1
                    : `data:image/jpeg;base64,${field.field_image1}`;

                const base64Image2 = field.field_image2.startsWith("data:image")
                    ? field.field_image2
                    : `data:image/jpeg;base64,${field.field_image2}`;

                row.innerHTML = `
                    <td>${field.field_code}</td>
                    <td>${field.field_name}</td>
                    <td>${locationString}</td>
                    <td>${field.extent_size}</td>
                    <td>
                        <img src="${base64Image}" alt="Field Image1" 
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>
                     <td>
                        <img src="${base64Image2}" alt="Field Image2" 
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>
                   
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${field.field_code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${field.field_code}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            attachFieldEventListeners();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while loading field data.");
        });
}



function attachFieldEventListeners() {
    // Delete button listeners
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const fieldCode = event.target.getAttribute("data-id");
            deleteField(fieldCode);
        });
    });

    // Edit button listeners
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const fieldCode = event.target.getAttribute("data-id");
            fetchFieldDetails(fieldCode);
        });
    });
}

// Delete crop
function deleteField(fieldCode) {
    if (confirm("Are you sure you want to delete this field?")) {
        fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/field/${fieldCode}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    alert("Field deleted successfully!");
                   loadFieldTableData()
                } else {
                    throw new Error("Failed to delete field. Status: " + response.status);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while deleting the field.");
            });
    }
}

// Fetch crop details for editing
function fetchFieldDetails(fieldCode) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/field/${fieldCode}`)
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Failed to fetch field details. Status: " + response.status);
            }
        })
        .then(field => {
            document.getElementById("fieldcode").value = field.field_code;
            document.getElementById("field_name").value = field.field_name;
            document.getElementById("field_location_x").value = field.x;
            document.getElementById("field_location_y").value = field.y;
            document.getElementById("field_size").value = field.extent_size;
        })
        .catch(error => {
            console.error("Error fetching field details:", error);
            alert("An error occurred while fetching crop details.");
        });
}

// Update crop
// function updateCrop(cropCode, updatedData) {
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/crop/${cropCode}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
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


document.addEventListener("DOMContentLoaded", loadFieldTableData);
function clearFields(){
    $("#fieldcode")
    $("#field_name").val('');
    $("#field_location_x").val('');
    $("#field_location_y").val('');
    $("#field_size").val('');
    $("#field_image1").val('');
    $("#field_image2").val('');
}



// document.addEventListener("DOMContentLoaded", function () {
//     const fieldComboBox = document.getElementById("fieldComboBox");
//
//     // Fetch staff members from backend API
//     fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/field")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to fetch field members.");
//             }
//             return response.json();
//         })
//         .then(field => {
//             // Populate the combo box
//             field.forEach(field => {
//                 const option = document.createElement("option");
//                 option.value = field.field_code; // Assuming staff has an 'id' field
//                 option.textContent = `${field.field_code} `; // Adjust fields as necessary
//                 fieldComboBox.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error("Error loading staff members:", error);
//         });
// });
//

document.addEventListener("DOMContentLoaded", function () {
    const field_comboBox = document.getElementById("field_ComboBox");

    // Fetch staff members from backend API
    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/field")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch field members.");
            }
            return response.json();
        })
        .then(fields => {
            // Populate the combo box
            fields.forEach(field => {
                const option = document.createElement("option");
                option.value = field.field_code; // Assuming staff has an 'id' field
                option.textContent = `${field.field_code} `; // Adjust fields as necessary
                field_comboBox.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading staff members:", error);
        });
});

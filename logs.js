// Save crop method
document.getElementById("saveLog").addEventListener("click", function () {
    // const cropCode = document.getElementById("cropCode").value.trim();
    const logDate = document.getElementById("log_date").value.trim();
    const logDetails = document.getElementById("log_detail").value.trim();
    const observedImage = document.getElementById("observed_image").files[0];
    // const id = document.getElementById("assigned_id").value.trim();
    // const crops = document.getElementById("assigned_field").value.trim();
    // const field = document.getElementById("assigned_crop").value.trim();

    // Validate inputs
    if (!logDate || !logDetails || !observedImage ) {
        alert("Please fill in all required fields!");
        return;
    }

    const formData = new FormData();
    formData.append("logDate", logDate);
    formData.append("logDetails", logDetails);
    formData.append("observedImage", observedImage);
    // formData.append("field_code", field);
    // formData.append("staff_code", id);
    // formData.append("crop_code", crops);


    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/log", {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                alert("Log saved successfully!");
                loadAllLogs()
               clearLogs()
            } else {
                alert("Error saving Log: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the log.");
        });
});



//----------------------------------------load all logs ------------------------
function loadAllLogs(){
    const tableBody = document.querySelector("#monitoringLog_table tbody");

    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/log')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to load logs: " + response.statusText);
            }
        })
        .then(data => {
            tableBody.innerHTML = ""; // Clear table before loading

            data.forEach(log => {
                const row = document.createElement('tr');
                const base64Image = log.observed_image.startsWith("data:image")
                    ? field.field_image1
                    : `data:image/jpeg;base64,${ log.observed_image}`;

                row.innerHTML = `

                    <td>${log.log_code}</td>
                    <td>${log.log_date}</td>
                    <td>${log.log_details}</td>
                    <td>
                        <img src="${base64Image}" alt="log Image1" 
                             class="img-thumbnail" width="50" height="50" style="object-fit: cover;">
                    </td>
                   
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${log.log_code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${log.log_code}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            attachLogEventListeners();
        })
        .catch(error => {
            console.error('Error loading logs:', error);
        });
}
document.addEventListener('DOMContentLoaded', loadAllLogs);



function attachLogEventListeners() {
    // Delete button listeners
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const logCode = event.target.getAttribute("data-id");
            deletelog(logCode);
        });
    });

    // Edit button listeners
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const logCode = event.target.getAttribute("data-id");
            fetchLogDetails(logCode);
        });
    });
}



// ------------------- edit log ----------------------------

function fetchLogDetails(logCode) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/log/${logCode}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch log details: ' + response.statusText);
            }
        })
        .then(log => {
            // Populate form fields for editing

            document.getElementById('log_detail').value = log.log_details;
            document.getElementById('log_date').value = log.log_date;
            //document.getElementById('observed_image').value = log.observed_image;

        })
        .catch(error => {
            console.error('Error fetching log details:', error);
        });
}




//--------------------delete log ---------------------------

// Delete crop
function deletelog(logCode) {
    if (confirm("Are you sure you want to delete this log?")) {
        fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/log/${logCode}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    alert("log deleted successfully!");
                    loadAllLogs()
                } else {
                    throw new Error("Failed to delete field. Status: " + response.status);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while deleting the log.");
            });
    }
}


function clearLogs(){
    $("#log_detail").val('');
    $("#log_date").val('');

}




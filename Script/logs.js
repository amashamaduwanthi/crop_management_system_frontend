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
                // loadCropTableData();
                // clearCropForm();
            } else {
                alert("Error saving Log: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the log.");
        });
});
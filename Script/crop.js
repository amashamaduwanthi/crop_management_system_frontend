document.getElementById("#saveCrop").addEventListener("click", function () {
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

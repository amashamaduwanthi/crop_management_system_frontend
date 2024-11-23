document.getElementById("saveField").addEventListener("click", async () => {
    const fieldCode = document.getElementById("field_code").value;
    const fieldName = document.getElementById("field_name").value;
    const extentSize = document.getElementById("extend_size").value;
    const location = document.getElementById("field_location").value;
    const fieldImage_01 = document.getElementById("image1").files[0];
    const fieldImage_02 = document.getElementById("image2").files[0];

    if (!fieldCode || !fieldName || !extentSize || !location || !fieldImage_01 || !fieldImage_02) {
        alert("Please fill out all fields.");
        return;
    }

    const formData = new FormData();
    formData.append("fieldCode", fieldCode);
    formData.append("fieldName", fieldName);
    formData.append("extentSize", extentSize);
    formData.append("location", location);
    formData.append("fieldImage_01", fieldImage_01);
    formData.append("fieldImage_02", fieldImage_02);

    try {
        const response = await fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/field", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to save field. Status: ${response.status}`);
        }

        alert("Field saved successfully!");
    } catch (error) {
        console.error("Error saving field:", error);
        alert("An error occurred while saving the field.");
    }
});

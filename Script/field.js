// document.getElementById("saveField").addEventListener("click", async () => {
//     const fieldCode = document.getElementById("field_code").value;
//     const fieldName = document.getElementById("field_name").value;
//     const extentSize = document.getElementById("extend_size").value;
//     const location = document.getElementById("field_location").value;
//     const fieldImage_01 = document.getElementById("image1").files[0];
//     const fieldImage_02 = document.getElementById("image2").files[0];
//
//     if (!fieldCode || !fieldName || !extentSize || !location || !fieldImage_01 || !fieldImage_02) {
//         alert("Please fill out all fields.");
//         return;
//     }
//
//     const formData = new FormData();
//     formData.append("fieldCode", fieldCode);
//     formData.append("fieldName", fieldName);
//     formData.append("extentSize", extentSize);
//     formData.append("location", location);
//     formData.append("fieldImage_01", fieldImage_01);
//     formData.append("fieldImage_02", fieldImage_02);
//
//     try {
//         const response = await fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/field", {
//             method: "POST",
//             contentType: false,
//             processData: false,
//             data: formData,
//         });
//
//         if (!response.ok) {
//             throw new Error(`Failed to save field. Status: ${response.status}`);
//         }
//
//         alert("Field saved successfully!");
//     } catch (error) {
//         console.error("Error saving field:", error);
//         alert("An error occurred while saving the field.");
//     }
// });

// function saveField(){
//     const formData = new FormData();
//
//     formData.append("field_code", $("#field_code").val());
//     formData.append("field_name", $("#field_name").val());
//
//     formData.append("extent_size", $("#extend_size").val());
//   formData.append("field_location"),
//
//     formData.append("field_image1", $("#image1")[0].files[0]);
//     formData.append("field_image2", $("#image2")[0].files[0]);
//
//     $.ajax({
//         url:"http://localhost:6060/Crop_Monitoring_system/api/v1/field",
//         method: "POST",
//         contentType: false,
//         processData: false,
//         data: formData,
//         success: function (result){
//             clearFields();
//             console.log(result);
//             alert("Field Save Successfull");
//         },
//         error: function (result){
//             clearFields();
//             console.log(result);
//             alert("Field Save Unsuccessfull");
//         }
//     });
// }
//
// function clearFields(){
//     $("#field_name").val('');
//     $("#extend_size").val('');
//     $("#field_location").val('');
//     $("#image1").val('');
//     $("#image2").val('');
// }
function saveField(){
    const formData = new FormData();

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
        },
        error: function (result){
            clearFields();
            console.log(result);
            alert("Field Save Unsuccessfull");
        }
    });
}

function clearFields(){
    $("#field_name").val('');
    $("#field_location_x").val('');
    $("#field_location_y").val('');
    $("#field_size").val('');
    $("#field_image1").val('');
    $("#field_image2").val('');
}
document.getElementById('saveVehicle').addEventListener("click",function (){
    console.log("clicked")
    const vehicle_code=document.getElementById("vehicle_code").value;
    const license_plate_number=document.getElementById("license_plate_number").value;
    const vehicle_category=document.getElementById("vehicle_category").value;
    const fuel_type=document.getElementById("fuel_type").value;
    const status=document.getElementById("status").value;
    const remarks=document.getElementById("remarks").value;
    const id=document.getElementById("staffComboBox").value;

    if(!vehicle_code|| !license_plate_number || !vehicle_category|| !fuel_type|| !status || !remarks||   !id){
        alert("Please fill in all required fields")
    }


    const vehicleData = {
        vehicle_code: vehicle_code,
        license_plate_number: license_plate_number,
        vehicle_category: vehicle_category,
        fuel_type: fuel_type,
        status: status,
        remarks: remarks,
        id: id
    };

    fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/vehicle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicleData)
    })
        .then(response => {
            if (response.ok) {
                alert("vehicle saved successfully!");
                // Optionally, you can refresh the staff list or clear the form

            } else {
                throw new Error("Error saving staff: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the staff.");
        });
    console.log(vehicle_code,license_plate_number,vehicle_category,fuel_type,status,remarks,id)
})

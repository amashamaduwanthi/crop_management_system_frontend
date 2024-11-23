// Event listener for Save button
document.getElementById('saveVehicle').addEventListener('click', function () {
    console.log('Save button clicked');

    // Collect form data
    const vehicleCode = document.getElementById('vehicle_code').value.trim();
    const licensePlateNumber = document.getElementById('license_plate_number').value.trim();
    const vehicleCategory = document.getElementById('vehicle_category').value.trim();
    const fuelType = document.getElementById('fuel_type').value.trim();
    const status = document.getElementById('status').value.trim();
    const remarks = document.getElementById('remarks').value.trim();
    const staffId = document.getElementById('id').value.trim();

    // Validate form data
    if (!vehicleCode || !licensePlateNumber || !vehicleCategory || !fuelType || !status || !staffId) {
        alert('Please fill in all required fields');
        return;
    }

    // Construct JSON payload
    const payload = {
        vehicle_code: vehicleCode,
        licensePlateNumber: licensePlateNumber,
        vehicleCategory: vehicleCategory,
        fuelType: fuelType,
        status: status,
        remarks: remarks,
        assigned_staff: {
            id: staffId
        }
    };

    // Send data to the backend
    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/vehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (response.status === 201) {
                alert('Vehicle saved successfully!');
                // Optionally clear form fields
                clearForm();
            } else if (response.status === 400) {
                alert('Invalid data. Please check your inputs.');
            } else {
                alert('An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error saving vehicle:', error);
            alert('Failed to save vehicle. Check console for details.');
        });
});

// Function to clear the form fields after successful submission
function clearForm() {
    document.getElementById('vehicle_code').value = '';
    document.getElementById('license_plate_number').value = '';
    document.getElementById('vehicle_category').value = '';
    document.getElementById('fuel_type').value = '';
    document.getElementById('status').value = '';
    document.getElementById('remarks').value = '';
    document.getElementById('id').value = '';
}



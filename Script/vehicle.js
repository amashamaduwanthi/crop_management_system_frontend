
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

// Load and display staff data in the table when the page is loaded
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
                loadTableDataVehicles();
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

// Load table data
function loadTableDataVehicles() {
    const tableBody = document.querySelector("#vehicle_table tbody");

    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/vehicle')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to load vehicles: " + response.statusText);
            }
        })
        .then(data => {
            tableBody.innerHTML = ""; // Clear table before loading

            data.forEach(vehicle => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${vehicle.vehicle_code}</td>
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.vehicleCategory}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.remarks}</td>
                    <td>${vehicle.assigned_staff?.id || 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${vehicle.vehicle_code}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${vehicle.vehicle_code}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            attachEventListenersVehicles();
        })
        .catch(error => {
            console.error('Error loading vehicles:', error);
        });
}

// Attach event listeners for edit and delete buttons
function attachEventListenersVehicles() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', event => {
            const vehicle_code = event.target.getAttribute('data-id');
            deleteVehicle(vehicle_code);
        });
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', event => {
            const vehicle_code = event.target.getAttribute('data-id');
            fetchVehicleDetails(vehicle_code);
        });
    });
}

// Delete vehicle
function deleteVehicle(vehicle_code) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/vehicle/${vehicle_code}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert('Vehicle deleted successfully!');
                    loadTableDataVehicles();
                } else {
                    throw new Error('Failed to delete vehicle: ' + response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting vehicle:', error);
            });
    }
}

// Fetch vehicle details for editing
function fetchVehicleDetails(vehicleCode) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/vehicle/${vehicleCode}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch vehicle details: ' + response.statusText);
            }
        })
        .then(vehicle => {
            // Populate form fields for editing
            document.getElementById('vehicle_code').value = vehicle.vehicle_code;
            document.getElementById('license_plate_number').value = vehicle.licensePlateNumber;
            document.getElementById('vehicle_category').value = vehicle.vehicleCategory;
            document.getElementById('fuel_type').value = vehicle.fuelType;
            document.getElementById('status').value = vehicle.status;
            document.getElementById('remarks').value = vehicle.remarks;
            document.getElementById('id').value = vehicle.assigned_staff?.id || '';
        })
        .catch(error => {
            console.error('Error fetching vehicle details:', error);
        });
}

// Clear form fields

// Load vehicles on page load
document.addEventListener('DOMContentLoaded', loadTableDataVehicles);

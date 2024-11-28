document.getElementById('save_eq').addEventListener('click', function () {
    console.log('Save button clicked');

    // Collect form data
    // const vehicleCode = document.getElementById('vehicle_code').value.trim();
    const name = document.getElementById('eq_name').value.trim();
    const type = document.getElementById('eq_type').value.trim();
    const status = document.getElementById('eq_status').value.trim();
    const StaffId = document.getElementById('eq_staff').value.trim();
    const fieldId = document.getElementById('eq_field').value.trim();



    console.log(name,type,status,StaffId,fieldId)

    // Validate form data
    if (!name || !type || !status || !StaffId|| !fieldId) {
        alert('Please fill in all required fields');
        return;
    }

    // Construct JSON payload
    const payload = {
        // vehicle_code: vehicleCode,
       name: name,
        type: type,
        status: status,
        assigned_staff: {
            id: StaffId
        },
        assigned_field: {
            field_code:fieldId
        }
    };

    // Send data to the backend
    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/equipment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (response.status === 201) {
                alert('Equipment saved successfully!');
                loadTableDataVehicles();
                clearForm();
            } else if (response.status === 400) {
                alert('Invalid data. Please check your inputs.');
            } else {
                alert('An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error saving Equipment:', error);
            alert('Failed to save Equipment. Check console for details.');
        });
});



//-----------------------load all equipment ------------------------------------
function loadTableDataEquipment() {
    const tableBody = document.querySelector("#equipment_table tbody");

    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/equipment')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to load equipment: " + response.statusText);
            }
        })
        .then(data => {
            tableBody.innerHTML = ""; // Clear table before loading

            data.forEach(equipment => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${equipment.equipment_id}</td>
                    <td>${equipment.name}</td>
                    <td>${equipment.type}</td>
                    <td>${equipment.status}</td>
                    <td>${equipment.assigned_field?.field_code||'N/A'}</td>
                    <td>${equipment.assigned_staff?.id || 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${equipment.equipment_id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${equipment.equipment_id}">Delete</button>
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
document.addEventListener('DOMContentLoaded', loadTableDataEquipment);

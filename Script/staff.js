document.getElementById('saveStaff').addEventListener("click", function () {
    console.log("clicked");

    // Get values from form inputs
    const id = document.getElementById("staffId").value;
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const designation = document.getElementById("designation").value;
    const gender = document.getElementById("gender").value;
    const joined_date = document.getElementById("joinedDate").value;
    const dob = document.getElementById("dob").value;
    const contact_no = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("line01").value;
    const role = document.getElementById("role").value;

    // Check if all fields are filled
    if (!id || !first_name || !last_name || !designation || !gender || !joined_date || !dob || !contact_no || !email || !address || !role) {
        alert("Please fill in all required fields");
        return;  // Stop execution if validation fails
    }

    // Create staff data object
    const staffData = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        designation: designation,
        gender: gender,
        joined_date: joined_date,
        dob: dob,
        contact_no: contact_no,
        email: email,
        address: address,
        role: role
    };

    // Send data to the backend
    fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/staff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData)
    })
        .then(response => {
            if (response.ok) {
                alert("Staff saved successfully!");
                loadTableDataStaff();  // Refresh the staff list
                clearForm()
            } else {
                throw new Error("Error saving staff: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the staff.");
        });

    console.log("Staff Data:", staffData);  // Log the staff data
});

// Load and display staff data in the table when the page is loaded
document.addEventListener("DOMContentLoaded", loadTableDataStaff);
//
// function loadTableDataStaff() {
//     const tableBody = document.querySelector("#staff-table tbody");
//
//     // Fetch staff data from backend API
//     fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/staff")
//         .then(response => {
//             if (response.ok) {
//                 return response.json();  // Parse the response JSON
//             } else {
//                 throw new Error("Failed to fetch staff. Status: " + response.status);
//             }
//         })
//         .then(data => {
//             // Clear the existing table data
//             tableBody.innerHTML = "";
//
//             // Populate the table with fetched staff data
//             data.forEach(staff => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${staff.id}</td>
//                     <td>${staff.first_name}</td>
//                     <td>${staff.last_name}</td>
//                     <td>${staff.designation}</td>
//                     <td>${staff.gender}</td>
//                     <td>${staff.joined_date}</td>
//                     <td>${staff.dob}</td>
//                     <td>${staff.contact_no}</td>
//                     <td>${staff.email}</td>
//                     <td>${staff.address}</td>
//                     <td>${staff.role}</td>
//                     <td>
//                         <button class="btn btn-primary btn-sm edit-button" data-id="${staff.id}">Edit</button>
//                         <button class="btn btn-danger btn-sm delete-button" data-id="${staff.id}">Delete</button>
//                     </td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//
//             // Attach event listeners for "Edit" and "Delete" buttons
//             attachEventListenersStaff();
//         })
//         .catch(error => {
//             console.error("Error loading staff:", error);
//             alert("An error occurred while loading staff data.");
//         });
// }
//
// // Attach event listeners for delete and edit buttons
// function attachEventListenersStaff() {
//     const deleteButtons = document.querySelectorAll(".delete-button");
//     deleteButtons.forEach(button => {
//         button.addEventListener("click", (event) => {
//             const id = event.target.getAttribute("data-id");
//             deleteStaff(id, event.target);
//         });
//     });
// }
//
// // Function to delete staff
// function deleteStaff(id, deleteButton) {
//     if (confirm("Are you sure you want to delete this Staff Member?")) {
//         fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`, {
//             method: "DELETE",
//         })
//             .then(response => {
//                 if (response.ok) {
//                     const row = deleteButton.closest("tr");
//                     row.remove();  // Remove the row from the table
//                     alert("Staff Member deleted successfully!");
//                 } else {
//                     throw new Error("Failed to delete Staff Member. Status: " + response.status);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 alert("An error occurred while deleting the Staff Member.");
//             });
//     }
// }






    document.addEventListener("DOMContentLoaded", function () {
        const staffComboBox = document.getElementById("staffComboBox");

        // Fetch staff members from backend API
        fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/staff")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch staff members.");
                }
                return response.json();
            })
            .then(staffMembers => {
                // Populate the combo box
                staffMembers.forEach(staff => {
                    const option = document.createElement("option");
                    option.value = staff.id; // Assuming staff has an 'id' field
                    option.textContent = `${staff.id} `; // Adjust fields as necessary
                    staffComboBox.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error loading staff members:", error);
            });
    });


// function loadTableDataStaff() {
//     const tableBody = document.querySelector("#staff-table tbody");
//
//     // Fetch staff data from backend API
//     fetch("http://localhost:6060/Crop_Monitoring_system/api/v1/staff")
//         .then(response => {
//             if (response.ok) {
//                 return response.json(); // Parse the response JSON
//             } else {
//                 throw new Error("Failed to fetch staff. Status: " + response.status);
//             }
//         })
//         .then(data => {
//             // Clear the existing table data
//             tableBody.innerHTML = "";
//
//             // Populate the table with fetched staff data
//             data.forEach(staff => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${staff.id}</td>
//                     <td>${staff.first_name}</td>
//                     <td>${staff.last_name}</td>
//                     <td>${staff.designation}</td>
//                     <td>${staff.gender}</td>
//                     <td>${staff.joined_date}</td>
//                     <td>${staff.dob}</td>
//                     <td>${staff.contact_no}</td>
//                     <td>${staff.email}</td>
//                     <td>${staff.address}</td>
//                     <td>${staff.role}</td>
//                     <td>
//                         <button class="btn btn-primary btn-sm edit-button" data-id="${staff.id}">Edit</button>
//                         <button class="btn btn-danger btn-sm delete-button" data-id="${staff.id}">Delete</button>
//                     </td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//
//             // Attach event listeners for "Edit" and "Delete" buttons
//             attachEventListenersStaff();
//         })
//         .catch(error => {
//             console.error("Error loading staff:", error);
//             alert("An error occurred while loading staff data.");
//         });
// }
//
// function attachEventListenersStaff() {
//     // Add click listeners to Edit buttons
//     const editButtons = document.querySelectorAll(".edit-button");
//     editButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             const id = this.dataset.id;
//
//             // Fetch staff details from the backend and populate the form
//             fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`)
//                 .then(response => {
//                     if (response.ok) {
//                         return response.json();
//                     } else {
//                         throw new Error("Failed to fetch staff details. Status: " + response.status);
//                     }
//                 })
//                 .then(staff => {
//                     // Populate input fields with the staff data
//                     document.getElementById("staff_id").value = staff.id;
//                     document.getElementById("first_name").value = staff.first_name;
//                     document.getElementById("last_name").value = staff.last_name;
//                     document.getElementById("designation").value = staff.designation;
//                     document.getElementById("gender").value = staff.gender;
//                     document.getElementById("joined_date").value = staff.joined_date;
//                     document.getElementById("dob").value = staff.dob;
//                     document.getElementById("contact_no").value = staff.contact_no;
//                     document.getElementById("email").value = staff.email;
//                     document.getElementById("address").value = staff.address;
//                     document.getElementById("role").value = staff.role;
//                 })
//                 .catch(error => {
//                     console.error("Error fetching staff details:", error);
//                     alert("An error occurred while fetching staff details.");
//                 });
//         });
//     });
//
//     // Add click listeners to Delete buttons
//     const deleteButtons = document.querySelectorAll(".delete-button");
//     deleteButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             const id = this.dataset.id;
//
//             if (confirm("Are you sure you want to delete this staff member?")) {
//                 // Send a DELETE request to the backend
//                 fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`, {
//                     method: "DELETE",
//                 })
//                     .then(response => {
//                         if (response.ok) {
//                             alert("Staff member deleted successfully!");
//                             loadTableDataStaff(); // Refresh the table
//                         } else {
//                             throw new Error("Failed to delete staff member. Status: " + response.status);
//                         }
//                     })
//                     .catch(error => {
//                         console.error("Error deleting staff member:", error);
//                         alert("An error occurred while deleting the staff member.");
//                     });
//             }
//         });
//     });
// }

// Save button to update staff details
// document.getElementById("saveStaff").addEventListener("click", function () {
//     const id= document.getElementById("staff_id").value;
//
//     // Collect updated data from the form
//     const updatedStaff = {
//         first_name: document.getElementById("first_name").value.trim(),
//         last_name: document.getElementById("last_name").value.trim(),
//         designation: document.getElementById("designation").value.trim(),
//         gender: document.getElementById("gender").value.trim(),
//         joined_date: document.getElementById("joined_date").value.trim(),
//         dob: document.getElementById("dob").value.trim(),
//         contact_no: document.getElementById("contact_no").value.trim(),
//         email: document.getElementById("email").value.trim(),
//         address: document.getElementById("address").value.trim(),
//         role: document.getElementById("role").value.trim(),
//     };
//
//     // Send the updated data to the backend
//     fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStaff),
//     })
//         .then(response => {
//             if (response.ok) {
//                 alert("Staff details updated successfully!");
//                 loadTableDataStaff(); // Refresh the table
//             } else {
//                 throw new Error("Failed to update staff details. Status: " + response.status);
//             }
//         })
//         .catch(error => {
//             console.error("Error updating staff details:", error);
//             alert("An error occurred while updating staff details.");
//         });
// });
// Function to clear the form fields
function clearForm() {
    document.getElementById('staff_id').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('designation').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('joined_date').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('email').value = '';
    document.getElementById('line01').value = '';
    document.getElementById('role').value = '';
}




function loadTableDataStaff() {
    const tableBody = document.querySelector('#staff_table tbody');
    fetch('http://localhost:6060/Crop_Monitoring_system/api/v1/staff')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach(staff => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${staff.id}</td>
                    <td>${staff.first_name}</td>
                    <td>${staff.last_name}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.joined_date}</td>
                    <td>${staff.dob}</td>
                    <td>${staff.contact_no}</td>
                    <td>${staff.email}</td>
                    <td>${staff.address}</td>
                    <td>${staff.role}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-button" data-id="${staff.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-button" data-id="${staff.id}">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            attachEventListenersStaff();
        })
        .catch(error => console.error('Error loading staff:', error));
}

// Attach event listeners for edit and delete buttons
function attachEventListenersStaff() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            deleteStaff(id);
        });
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            fetchStaffDetails(id);
        });
    });
}

// Delete staff
function deleteStaff(id) {
    if (confirm('Are you sure you want to delete this staff?')) {
        fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Staff deleted successfully!');
                    loadTableDataStaff();
                } else {
                    alert('Failed to delete staff.');
                }
            })
            .catch(error => console.error('Error deleting staff:', error));
    }
}

// Fetch staff details for editing
function fetchStaffDetails(id) {
    fetch(`http://localhost:6060/Crop_Monitoring_system/api/v1/staff/${id}`)
        .then(response => response.json())
        .then(staff => {
            document.getElementById('staffId').value = staff.id;
            document.getElementById('firstName').value = staff.first_name;
            document.getElementById('lastName').value = staff.last_name;
            document.getElementById('designation').value = staff.designation;
            document.getElementById('gender').value = staff.gender;
            document.getElementById('joined_date').value = staff.joined_date;
            document.getElementById('dob').value = staff.dob;
            document.getElementById('contact').value = staff.contact_no;
            document.getElementById('email').value = staff.email;
            document.getElementById('line01').value = staff.address;
            document.getElementById('role').value = staff.role;
        })
        .catch(error => console.error('Error fetching staff details:', error));
}

// Load staff on page load
document.addEventListener('DOMContentLoaded', loadTableDataStaff);

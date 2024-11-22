document.getElementById('saveStaff').addEventListener("click",function (){
    console.log("clicked")
    const id=document.getElementById("staffId").value;
    const first_name=document.getElementById("firstName").value;
    const last_name=document.getElementById("lastName").value;
    const designation=document.getElementById("designation").value;
    const gender=document.getElementById("gender").value;
    const joined_date=document.getElementById("joinedDate").value;
    const dob=document.getElementById("dob").value;
    const contact_no=document.getElementById("contact").value;
    const email=document.getElementById("email").value;
    const address=document.getElementById("line01").value;
    const role=document.getElementById("role").value;

    if(!id || !first_name || !last_name|| !designation || !gender || !joined_date || !dob || !contact_no || !email || !address || !role){
        alert("Please fill in all required fields")
    }


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

    fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/staff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData)
    })
        .then(response => {
            if (response.ok) {
                alert("Staff saved successfully!");
                // Optionally, you can refresh the staff list or clear the form
                loadTableData()
            } else {
                throw new Error("Error saving staff: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the staff.");
        });
    console.log(staffId,firstName,lastName,designation,gender,joinedDate,dob,contact,email,address,role)
})



document.addEventListener("DOMContentLoaded", loadTableData);

function loadTableData() {
    const tableBody = document.querySelector("#staff-table tbody");

    // Fetch data from the backend
    fetch("http://localhost:5050/Crop_Monitoring_system/api/v1/staff")
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Failed to fetch crops. Status: " + response.status);
            }
        })
        .then(data => {
            // Clear the table before populating
            tableBody.innerHTML = "";

            // Populate the table with fetched data
            data.forEach(staff => {
                const row = document.createElement("tr");

                // Check if crop_image is valid and prefix if necessary


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

            // Attach event listeners for "Edit" and "Delete" buttons
            attachEventListeners();
            attachEventListener();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while loading crop data.");
        });
}
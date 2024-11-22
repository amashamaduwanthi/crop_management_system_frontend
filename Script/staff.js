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

    if(!staffId || !firstName || !lastName || !designation || !gender || !joinedDate || !dob || !contact || !email || !address || !role){
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
// ================= CUSTOMER REGISTRATION =================

const customerForm = document.querySelector(".fields--customer");

customerForm.addEventListener("submit", async function (event) {

    // Stop normal HTML form submission
    event.preventDefault();

    const name = document.getElementById("cust-name").value;
    const email = document.getElementById("cust-email").value;
    const phone = document.getElementById("cust-phone").value;
    const password = document.getElementById("cust-password").value;
    const confirmPassword = document.getElementById("cust-confirm").value;

    console.log("Customer Name:", name);
    console.log("Customer Email:", email);
    console.log("Customer Phone:", phone);

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/customer/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        if (response.ok) {
            alert("Customer registration successful!");
        } else {
            alert(data.message);
        }

    } catch (error) {

        console.error("Error:", error);
        alert("Cannot connect to backend.");
    }
});


// ================= FREELANCER REGISTRATION =================

const freelancerForm = document.querySelector(".fields--freelancer");

freelancerForm.addEventListener("submit", async function (event) {

    // VERY IMPORTANT
    // Prevent browser from submitting form normally
    event.preventDefault();

    const name = document.getElementById("free-name").value;
    const email = document.getElementById("free-email").value;
    const phone = document.getElementById("free-phone").value;
    const password = document.getElementById("free-password").value;
    const confirmPassword = document.getElementById("free-confirm").value;
    const hourlyRate = document.getElementById("free-rate").value;

    console.log("Freelancer Name:", name);
    console.log("Freelancer Email:", email);
    console.log("Freelancer Phone:", phone);
    console.log("Hourly Rate:", hourlyRate);

    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/freelancer/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    hourlyRate: hourlyRate
                })
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        if (response.ok) {
            alert("Freelancer registration successful!");
        } else {
            alert(data.message);
        }

    } catch (error) {

        console.error("Error:", error);
        alert("Cannot connect to backend.");
    }
});
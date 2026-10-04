
const loginForm = document.querySelector(".card__form");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);

    // Basic validation
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        if (response.ok) {

            alert("Login successful!");

            // Store JWT token
            localStorage.setItem("token", data.token);

            // Store user type
            localStorage.setItem("userType", data.userType);

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.error("Login error:", error);

        alert("Cannot connect to backend.");
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    const loginForm = document.getElementById("loginForm");

    if (!loginForm)
    {
        return;
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const user = Object.fromEntries(formData);

        try
        {
            const response = await fetch("http://localhost:8080/api/sessions/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const result = await response.json();

            if (result?.message === "User logged in successfully")
            {
                window.location.href = "http://localhost:8080/api/products";
            }
            else
            {
                console.log(result);
            }
        }
        catch (error)
        {
            console.log(error);
        }
    });
});
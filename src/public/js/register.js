document.addEventListener("DOMContentLoaded", () =>
{
    const registerForm = document.getElementById("registerForm");

    if (!registerForm)
    {
        return;
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const user = Object.fromEntries(formData);

        try
        {
            const response = await fetch("http://localhost:8080/api/sessions/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const result = await response.json();

            if (result?.message === "User created successfully")
            {
                window.location.href = "http://localhost:8080/api/sessions/viewlogin";
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
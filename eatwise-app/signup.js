// 🔥 CONFIRM JS IS LOADED
console.log("signup.js loaded ✅");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const msg = document.getElementById("msg");

  if (!form) {
    console.error("signupForm not found ❌");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.textContent = "Creating account...";
    msg.style.color = "#555";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      msg.textContent = "Please fill all fields ❌";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.message || "Signup failed ❌";
        msg.style.color = "red";
        return;
      }

      // ✅ Save token for auto-login
      localStorage.setItem("token", data.token);

      msg.textContent = "Account created successfully ✅";
      msg.style.color = "green";

      // ⏳ Small delay for UX
      setTimeout(() => {
        window.location.href = "details.html";
      }, 800);

    } catch (error) {
      console.error("Signup error:", error);
      msg.textContent = "Server error ❌ Please try again";
      msg.style.color = "red";
    }
  });
});

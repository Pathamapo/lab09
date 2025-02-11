document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userDetail = document.getElementById("user-detail");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        const user = await response.json();

        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>
            <p>Company: ${user.company.name}</p>
        `;

        document.getElementById("view-posts").onclick = () => {
            window.location.href = `user-posts.html?id=${userId}`;
        };

    } catch (error) {
        console.error("Error fetching user:", error);
        userDetail.innerHTML = "<p>ไม่พบข้อมูลผู้ใช้</p>";
    }
});

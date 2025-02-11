document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const users = await response.json();

        userList.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <button onclick="viewUser(${user.id})">ดูรายละเอียด</button>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching users:", error);
        userList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});

function viewUser(userId) {
    window.location.href = `user-detail.html?id=${userId}`;
}

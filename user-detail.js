document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userDetail = document.getElementById("user-detail");

    if (!userId) {
        userDetail.innerHTML = "<p>กรุณาเลือกผู้ใช้</p>";
        return;
    }

    try {
        userDetail.innerHTML = "<p>กำลังโหลดข้อมูล...</p>";
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!response.ok) {
            throw new Error("ไม่พบข้อมูลผู้ใช้");
        }

        const user = await response.json();

        userDetail.innerHTML = `
            <div class="user-card">
                <h2><b>${user.name}</b></h2>
                <p><b>อีเมล</b><br>${user.email}</p>
                <p><b>ชื่อผู้ใช้</b><br>${user.username}</p>
                <p><b>เบอร์โทรศัพท์</b><br>${user.phone}</p>
                <p><b>เว็บไซต์</b><br>${user.website}</p>
                <p><b>ที่อยู่</b><br>${user.address.suite}, ${user.address.street}<br>
                   ${user.address.city}, ${user.address.zipcode}</p>
                <p><b>บริษัท</b><br>${user.company.name}<br>${user.company.catchPhrase}</p>
            </div>
        `;
    } catch (error) {
        userDetail.innerHTML = `<p>${error.message}</p>`;
    }

    document.getElementById("view-posts").onclick = () => {
        window.location.href = `user-posts.html?id=${userId}`;
    };
});

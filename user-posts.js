document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postsList = document.getElementById("posts-list");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) throw new Error("Posts not found");
        const posts = await response.json();

        postsList.innerHTML = posts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="toggleComments(${post.id}, this)">ดูความคิดเห็น</button>
                <div id="comments-${post.id}" class="comments-container" style="display: none;"></div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดโพสต์</p>";
    }
});

async function toggleComments(postId, button) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    if (commentsContainer.style.display === "none") {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if (!response.ok) throw new Error("Comments not found");
            const comments = await response.json();

            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment">
                    <p><strong>${comment.name}</strong> (${comment.email})</p>
                    <p>${comment.body}</p>
                </div>
            `).join("");

            commentsContainer.style.display = "block";
            button.textContent = "ซ่อนความคิดเห็น";

        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    } else {
        commentsContainer.style.display = "none";
        button.textContent = "ดูความคิดเห็น";
    }
}

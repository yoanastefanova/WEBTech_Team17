const parentDiv = document.querySelector(".cards");
window.addEventListener("load", async () => {
    try {
        let result = await axios({
            method: "GET",
            url: "/api/getFiles",
        });
        let files = result.data.files;
        const email = document.getElementById('user_email').getAttribute('data-id');

        files.forEach((file) => {
            if (file.owner === email){
                markup = `

<li class="cards_item">
            <div class="card">
                <div class="card_image"><img src="/images/file_blue.png"></div>
                <div class="card_content">
                    <h2 class="card_title" id="fname">${file.name}</h2>
                    <h3 class="card_text" id="size">Size: ${file.size}</h3>
                    <h3 class="card_text" id="date">Date: ${file.createdAt}</h3>
                    <a href="${file.name}" download="${file.name}">
                        <button action= class="btn download_btn" data-id=${file._id}>Download</button>
                    </a>
                    <button class="btn card_btn">Share</button>
                    <button class="btn card_btn">Delete</button>
                    <a href="http://localhost:5000/files/${file.name}">
                    <button class="btn card_btn">View</button>
                </a>
                </div>
            </div>
        </li>
              `;
                parentDiv.insertAdjacentHTML("beforeend", markup);
            }
        });
    } catch (error) {
        console.log(error);
    }
});
onst documents = [
    {
        name: "Commission structures updated - key",
        link: "https://docs.google.com/spreadsheets/d/1G_ykIwzwk5Vfg5Waiq8l0T4Xp0rUishQ/edit?gid=1441018370#gid=1441018370"
    }
];


const list = document.getElementById("documentList");


documents.forEach(doc => {

    const div = document.createElement("div");

    div.className = "document-card";

    div.innerHTML = `
        <a href="${doc.link}" target="_blank">
            ${doc.name}
        </a>
    `;

    list.appendChild(div);

});

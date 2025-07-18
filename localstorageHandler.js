export function addNotes(note) {
  let notes = localStorage.getItem("notes");
  if (notes == null) notes = [];
  else {
    notes = JSON.parse(notes);
  }
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadNotes() {
  let notesContainer = document.querySelector(".notes-area");
  notesContainer.innerHTML = "";
  let notesdata = localStorage.getItem("notes");
  if (!notesdata) return;
  let notes = JSON.parse(notesdata);

  notes.forEach((note) => {
    let notesCard = document.createElement("div");
    notesCard.classList.add("notes-card");

    notesCard.innerHTML = `
          <div>
              <input type="text" placeholder="title" class="notes-title" value="${note.title}"/>
                  <i class='bx bx-copy copy-icon' copy-id="${note.id}"></i>
                <i class="bx bx-trash delete-icon" data-id="${note.id}" ></i>
          </div>
      <textarea placeholder="add here" class="notes-content">${note.content}</textarea>
`;
    notesContainer.appendChild(notesCard);

    let titleInput = document.querySelector(".notes-title");
    let textArea = document.querySelector(".notes-content");
    let id = note.id;

    titleInput.addEventListener("input", () => {
      updateNotes(id, titleInput.value, textArea.value);
    });

    textArea.addEventListener("input", () => {
      updateNotes(id, titleInput.value, textArea.value);
    });

    document.querySelector(".delete-icon").addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      deleteNotes(id);
    });

    notesCard.querySelector(".copy-icon").addEventListener("click", (e) => {
      const id = e.target.getAttribute("copy-id");
      copyNotes(id);
    });
  });
}

export function deleteNotes(id) {
  let notes = localStorage.getItem("notes");
  notes = JSON.parse(notes);
  notes = notes.filter((note) => note.id != id);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

export function updateNotes(id, title, content) {
  let notes = localStorage.getItem("notes");
  notes = JSON.parse(notes);

  notes = notes.map((note) => {
    if (note.id == id) {
      return {
        ...note,
        title: title,
        content: content,
      };
    }
    return note;
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

export function copyNotes(id) {
  let notes = localStorage.getItem("notes");
  notes = JSON.parse(notes);
  let note = notes.find((n) => n.id == id);
  if (note) {
    navigator.clipboard
      .writeText(note.content)
      .then(() => {
        console.log("copied to clipboard");
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  } else {
    console.log("not found");
  }
}

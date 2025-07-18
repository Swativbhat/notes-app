import {
  addNotes,
  deleteNotes,
  updateNotes,
  copyNotes,
} from "./localstorageHandler.js";

export function createNote(title = "", content = "") {
  let note = {
    id: crypto.randomUUID(),
    title,
    content,
  };

  addNotes(note);

  const notesContainer = document.querySelector(".notes-area");

  const notesCard = document.createElement("div");
  notesCard.classList.add("notes-card");

  notesCard.innerHTML = `
    <div>
      <input type="text" class="notes-title" placeholder="title" value="${note.title}" />
      <i class='bx bx-copy copy-icon' copy-id="${note.id}"></i>
      <i class='bx bx-trash delete-icon' data-id="${note.id}"></i>
    </div>
    <textarea class="notes-content" placeholder="add here">${note.content}</textarea>
  `;

  let titleInput = notesCard.querySelector(".notes-title");
  let textArea = notesCard.querySelector(".notes-content");
  let id = note.id;

  titleInput.addEventListener("input", (e) => {
    updateNotes(id, e.target.value, textArea.value);
  });

  textArea.addEventListener("input", (e) => {
    updateNotes(id, titleInput.value, e.target.value);
  });

  notesCard.querySelector(".delete-icon").addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    deleteNotes(id);
  });

  notesCard.querySelector(".copy-icon").addEventListener("click", (e) => {
    const id = e.target.getAttribute("copy-id");
    copyNotes(id);
  });

  notesContainer.appendChild(notesCard);
}

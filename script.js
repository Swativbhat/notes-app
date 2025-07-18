import { createNote } from "./handleNotescard.js";
import { loadNotes } from "./localstorageHandler.js";

window.addEventListener("DOMContentLoaded", () => {
  loadNotes();
});

document.getElementById("add-button").addEventListener("click", () => {
  createNote();
});

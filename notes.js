const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red.inverse("Note title taken"));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note saved"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const listNote = () => {
  let index = 1;
  console.log(chalk.blue.inverse("Your Notes"));
  loadNotes().forEach((element) => {
    console.log(index + ". " + element.title);
    index++;
  });
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (notes.length === newNotes.length) {
    console.log(chalk.bgRed.black("No note with given the title"));
  } else {
    saveNotes(newNotes);
    console.log(chalk.bgGreen.black("Note removed"));
  }
};
const readNote = (title) => {
  const notes = loadNotes();
  const targetNote = notes.find((note) => note.title === title);
  if (targetNote) {
    console.log(chalk.gray.inverse(targetNote.title));
    console.log(chalk.blue.inverse(targetNote.body));
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNote: listNote,
  readNote: readNote,
};

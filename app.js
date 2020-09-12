const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//Add command
yargs.command({
  command: "add",
  describe: "Adding new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title, body }) {
    notes.addNote(title, body);
  },
});

//remove command
yargs.command({
  command: "remove",
  describe: "Remove a new note!",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    notes.removeNote(title);
  },
});

//read command
yargs.command({
  command: "read",
  describe: "Read a note!",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    notes.readNote(title);
  },
});

//list command
yargs.command({
  command: "list",
  describe: "List of notes!",
  handler() {
    notes.listNote();
  },
});

yargs.parse();

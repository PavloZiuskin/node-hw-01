const contactsMethod = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsMethod.listContacts();
      return console.log(contacts);
      break;

    case "get":
      const oneContact = await contactsMethod.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsMethod.addContact(name, email, phone );
      return console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsMethod.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid"); 

  const contactsPath = path.join(__dirname,"db/contacts.json");
 

const updateContacts = async(contacts)=>{await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))};

// TODO: задокументувати кожну функцію
async function listContacts() {
    const contacts= await fs.readFile(contactsPath);
    return JSON.parse(contacts)
    // ...твій код
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(contact=> contact.id === contactId)
    return contactById || null;
  }
  
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item=>item.id===contactId);
  if(index=== -1){
    return null;
  }
  const [result] = contacts.splice(index,1);
  updateContacts(contacts);
  return result;
}
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newPhone = contacts.find(contact=> contact.phone === phone);
    try {
      if(newPhone){
        return console.log("a contact with this phone number already exists");;
      }
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      }
      contacts.push(newContact);
      updateContacts(contacts);
      return newContact;
    } catch (error) {
      console.log(error.message)
    }
    
    
  }


  module.exports={
    addContact,
    removeContact,
    getContactById,
    listContacts
  }
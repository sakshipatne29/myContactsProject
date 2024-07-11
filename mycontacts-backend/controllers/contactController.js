const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.status(200).json({ message: "Get all Contacts" });
  res.status(200).json(contacts);
});

//@desc Create new Contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is : ", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  // res.status(201).json({ message: "Create Contact" });
  res.status(201).json(contact);
});

//@desc Get all Contacts
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // res.status(200).json({ message: `Get Contact for ${req.params.id}` });
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  // res.status(200).json({ message: `Update Contact for ${req.params.id}` });
  res.status(200).json(updatedContact);
});

//@desc Delete Contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  // const contact = await Contact.findById(req.params.id);
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    console.log("Contact found:", contact);

    await Contact.findByIdAndDelete(contactId);
    console.log("Contact successfully deleted");

    res
      .status(200)
      .json({ message: `Contact with ID ${contactId} has been deleted` });
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact" });
  }
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

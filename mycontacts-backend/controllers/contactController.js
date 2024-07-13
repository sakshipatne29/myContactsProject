const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  // res.status(200).json({ message: "Get all Contacts" });
  res.status(200).json(contacts);
});

//@desc Create new Contacts
//@route POST /api/contacts
//@access private
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
    user_id: req.user.id,
  });
  // res.status(201).json({ message: "Create Contact" });
  res.status(201).json(contact);
});

//@desc Get all Contacts
//@route GET /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "User doesn't have permission to update other user's contacts"
      );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: `Contact with ID ${contactId} has been updated`, updatedContact });

  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "An error occurred while updating the contact" });
  }
});


//@desc Delete Contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  // const contact = await Contact.findById(req.params.id);
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "User doesn't have permission to delete other user's contacts"
      );
    }


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

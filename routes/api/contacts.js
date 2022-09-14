const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await getContacts();
  res.json({
    message: "Success",
    status: 200,
    data: { result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await getContactById(contactId);
  res.status(200).json({ message: "Success", status: 200, data: { result } });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const result = await addContact(body);
  res.status(201).json({ message: "Success", status: 201, data: { result } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await removeContact(contactId);
  res.json({ message: "Success", status: 200, data: { result } });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const result = await updateContact(contactId, body);
  res.json({ message: "Success", status: 200, data: { result } });
});

module.exports = router;

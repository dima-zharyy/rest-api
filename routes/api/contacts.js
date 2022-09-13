const express = require("express");
const { getContacts } = require("../../models/contacts");

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
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

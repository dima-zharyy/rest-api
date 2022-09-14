const express = require('express');
const { NotFound } = require('http-errors');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string().min(5).max(30).required(),
});

const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await getContacts();
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await getContactById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.status(200).json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await addContact(body);
    res.status(201).json({ status: 'success', code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const result = await removeContact(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ message: 'contact deleted', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const contactId = req.params.contactId;
    const result = await updateContact(contactId, body);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

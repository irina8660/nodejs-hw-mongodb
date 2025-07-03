import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),

  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),

  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),

  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite must be true or false',
  }),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'any.only': 'contactType must be one of [work, home, personal]',
    }),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),

  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
  }),

  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),

  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),

  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'contactType must be one of [work, home, personal]',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

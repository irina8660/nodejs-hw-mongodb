import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.OWNER), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.OWNER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.OWNER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;

const Ajv = require('ajv');

const ajv = new Ajv();

const userAddSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 10 },
    email: { type: 'string', pattern: '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$' },
    password: {
      type: 'string', pattern: '^[^\\s]+$', minLength: 6, maxLength: 14,
    },
    isActive: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const validate = ajv.compile(userAddSchema);
module.exports = validate;

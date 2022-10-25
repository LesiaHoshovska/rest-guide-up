const Ajv = require('ajv');

const ajv = new Ajv();

const userUpdateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 10 },
    email: { type: 'string', pattern: '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$' },
    isActive: { type: 'boolean' },
    updatedAt: { type: 'string' },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const validate = ajv.compile(userUpdateSchema);
module.exports = validate;

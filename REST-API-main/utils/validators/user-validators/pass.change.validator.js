const Ajv = require('ajv');

const ajv = new Ajv();

const passChangeSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string', pattern: '^[^\\s]+$', minLength: 6, maxLength: 14,
    },
    newPassword: {
      type: 'string', pattern: '^[^\\s]+$', minLength: 6, maxLength: 14,
    },
  },
  required: ['password'],
  additionalProperties: false,
};

const validate = ajv.compile(passChangeSchema);
module.exports = validate;

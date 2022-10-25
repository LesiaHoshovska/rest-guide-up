const Ajv = require('ajv');

const ajv = new Ajv();

const postAddSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 20 },
    body: { type: 'string', maxLength: 300 },
    isActive: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['title', 'body'],
  additionalProperties: false,
};

const validate = ajv.compile(postAddSchema);
module.exports = validate;

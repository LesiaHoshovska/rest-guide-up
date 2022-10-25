const Ajv = require('ajv');

const ajv = new Ajv();

const postUpdateSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 20 },
    body: { type: 'string', maxLength: 300 },
    isActive: { type: 'boolean' },
    updatedAt: { type: 'string' },
  },
  required: ['title', 'body'],
  additionalProperties: false,
};

const validate = ajv.compile(postUpdateSchema);
module.exports = validate;

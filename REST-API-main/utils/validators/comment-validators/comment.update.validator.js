const Ajv = require('ajv');

const ajv = new Ajv();

const commentUpdateSchema = {
  type: 'object',
  properties: {
    body: { type: 'string', maxLength: 100 },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    isActive: { type: 'boolean' },
  },
  required: ['title', 'body'],
  additionalProperties: false,
};

const validate = ajv.compile(commentUpdateSchema);
module.exports = validate;

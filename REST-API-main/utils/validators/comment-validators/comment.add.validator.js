const Ajv = require('ajv');

const ajv = new Ajv();

const commentAddSchema = {
  type: 'object',
  properties: {
    body: { type: 'string', maxLength: 100 },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    isActive: { type: 'boolean' },
  },
  required: ['body'],
  additionalProperties: false,
};

const validate = ajv.compile(commentAddSchema);
module.exports = validate;

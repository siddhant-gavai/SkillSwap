const Joi = require('joi');
const { ApiError } = require('../utils/apiResponse');

const validateSkill = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().trim().max(50).required().messages({
            'string.empty': 'Please add a skill title',
            'string.max': 'Title can not be more than 50 characters',
            'any.required': 'Please add a skill title'
        }),
        description: Joi.string().trim().max(500).required().messages({
            'string.empty': 'Please add a description',
            'string.max': 'Description can not be more than 500 characters',
            'any.required': 'Please add a description'
        }),
        category: Joi.string().valid('Tech', 'Language', 'Music', 'Art', 'Fitness', 'Cooking', 'Other').required().messages({
            'any.only': 'Please select a valid category',
            'any.required': 'Please select a category'
        }),
        level: Joi.string().valid('Beginner', 'Intermediate', 'Expert').required().messages({
            'any.only': 'Please select a valid level',
            'any.required': 'Please select a level'
        }),
        availability: Joi.string().trim().required().messages({
            'string.empty': 'Please add availability',
            'any.required': 'Please add availability'
        }),
        embedding: Joi.array().items(Joi.number()).optional()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(', ');
        return next(new ApiError(400, errorMessages));
    }
    next();
};

module.exports = {
    validateSkill
};

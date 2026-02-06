import Joi from 'joi';

export const createTodoSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    complete: Joi.boolean().optional(),
});

export const updateTodoSchema = Joi.object({
    name: Joi.string().trim().min(1).optional(),
    complete: Joi.boolean().optional(),
});
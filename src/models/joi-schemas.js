import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const ServiceSpec = {
  title: Joi.string().required(),
  // detail1: Joi.string().required(),
  // detail2: Joi.number().allow("").optional(),
  // detail13 Joi.string().required(),
};

export const ServerSpec = {
  title: Joi.string().required(),
};

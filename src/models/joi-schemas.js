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
  os: Joi.string().allow("").optional(),
  desc: Joi.string().allow("").optional(),
  monitored: Joi.string().required(),
  backups: Joi.string().required(),
  syslog: Joi.string().allow("").optional(),
  login: Joi.string().allow("").optional(),
};

export const ServerSpec = {
  title: Joi.string().required(),
  cab: Joi.string().allow("").optional(),
  os: Joi.string().required(),
  idrac: Joi.string().allow("").optional(),
  desc: Joi.string().allow("").optional(),
  backups: Joi.string().required(),
  monitored: Joi.string().required(),
  support: Joi.string().allow("").optional(),
  service: Joi.string().required(),
  bios: Joi.string().required(),
  firmware: Joi.string().required(),
  maas: Joi.string().allow("").optional(),
};

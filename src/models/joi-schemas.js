import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Example").required(),
    lastName: Joi.string().example("Sample").required(),
    email: Joi.string().email().example("example@example.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const ServiceSpec = Joi.object()
  .keys({
    serviceName: Joi.string().required(),
    os: Joi.string().allow("").optional(),
    desc: Joi.string().allow("").optional(),
    monitored: Joi.string().required(),
    backups: Joi.string().required(),
    syslog: Joi.string().allow("").optional(),
    login: Joi.string().allow("").optional(),
    serverid: IdSpec,
  })
  .label("Server");

export const ServiceSpecPlus = ServiceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ServicePlus");

export const ServiceArraySpec = Joi.array().items(ServiceSpecPlus).label("ServiceArray");

export const ServerSpec = Joi.object()
  .keys({
    title: Joi.string().required(),
    tag: Joi.string().required(),
    cab: Joi.string().allow("").optional(),
    os: Joi.string().required(),
    idrac: Joi.string().allow("").optional(),
    desc: Joi.string().allow("").optional(),
    backupTo: Joi.string().required(),
    monitoredWith: Joi.string().required(),
    support: Joi.string().allow("").optional(),
    service: Joi.string().required(),
    bios: Joi.string().required(),
    firmware: Joi.string().required(),
    maas: Joi.boolean().allow("").optional(),
    cost: Joi.string().example(11.11).allow("").optional(),
    pdate: Joi.string().required(),
    model: Joi.string().allow("").optional(),
    nwcard: Joi.string().allow("").optional(),
  })
  .label("Server");

export const ServerSpecPlus = ServerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ServerPlus");

export const ServerArraySpec = Joi.array().items(ServerSpecPlus).label("ServerArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciO_JND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5xYigQ*0DCBo").required(),
  })
  .label("JwtAuth");

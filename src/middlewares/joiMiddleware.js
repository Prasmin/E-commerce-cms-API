import Joi from "joi";

const joiValidation = (schema, req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: "error.message",
        })
      : next();
  } catch (error) {
    next(error);
  }
};

// =================== Admin validation =============

export const newAdminValidation = (req, res, next) => {
  //conditions
  const schema = Joi.object({
    address: Joi.string().min(5).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
  });

  joiValidation(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  //conditions
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    emailVerificationCode: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  //conditions
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};
export const passResetValidation = (req, res, next) => {
  //conditions
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
    otp: Joi.string().required(),
  });

  joiValidation(schema, res, req, next);
};

//===============category Validation ==========
export const updatCatValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};

//===============Payment Method Validation ==========
export const newPMValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  joiValidation(schema, req, res, next);
};

export const updatePMValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    status: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  joiValidation(schema, req, res, next);
};

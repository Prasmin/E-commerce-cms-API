import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    //conditions
    const schema = Joi.object({
      address: Joi.string().min(5).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string(),
    });

    //compair

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const emailVerificationValidation = (req, res, next) => {
  try {
    //conditions
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }),
      emailVerificationCode: Joi.string().required(),
    });

    //compair
    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
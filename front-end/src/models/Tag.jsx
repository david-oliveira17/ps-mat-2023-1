import Joi from 'joi'

const Tag = Joi.object({
    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*':'A descrição é obrigatória (entre 2 e 30 caracteres)'}),

    color: Joi.string()
        .min(3)
        .max(8)
        .messages({'*':'O campo deve ter entre 3 e 8 caracteres'}),

      type: Joi.string()
      .min(1)
      .max(1)
      .required()
      .messages({'*':'O tipo é obrigatório'}),
})

export default Tag
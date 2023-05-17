import Joi from 'joi'

const OrderStatus = Joi.object({

    sequence: Joi.number()
    .min(0)
    .max(999)
    .required()
    .messages({'*':'A sequência deve ser informada'}),

    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*':'A descrição é obrigatória (entre 2 e 30 caracteres)'})

})

export default OrderStatus
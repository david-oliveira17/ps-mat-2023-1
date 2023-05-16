import Joi from 'joi'

const PaymentMethod = Joi.object({
    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*':'A descrição é obrigatória (entre 2 e 30 caracteres)'}),

    operator_fee: Joi.number()
        .min(0)
        .max(100)
        .required()
        .messages({'*':'A taxa de operação deve ser informada (entre 0 e 100)'}),
})

export default PaymentMethod
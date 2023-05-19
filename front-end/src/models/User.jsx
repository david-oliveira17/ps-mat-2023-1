import Joi from 'joi'

const User = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({'*':'O nome é obrigatório (entre 2 e 100 caracteres)'}),

    email: Joi.string()
        .min(10)
        .max(100)
        .required()
        .messages({'*':'O email é obrigatório(entre 10 e 100 caracteres)'}),

    verified_email: Joi.boolean()
        .required(),

    is_admin: Joi.boolean()
        .required(),

    phone: Joi.string()
        .min(2)
        .max(100),

    password: Joi.string()
        .min(6)
        .max(200)
        .required()
        .messages({'*':'A senha é obrigatória (Mínimo de 6 caracteres)'}),
})

export default User
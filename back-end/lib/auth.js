const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // Gambiarra

    next()
    return

    

    const bypassRoutes = [
        {url: '/users/login', method: 'POST'}
    ]

    for(let route of bypassRoutes) {
        if(route.url === req.url && route.method === req.method) {
            next()
            return
        }
    }

    //É necessário ter o token para continuar
    const bearerHeader = req.headers['authorization']
    //O token não foi passado -> 403
    if(!bearerHeader) return res.status(403).end()

    //Extrai o token de dentro do cabeçalho "authorization"
    const temp = bearerHeader.split(' ')
    const token = temp[1]

    //Validando o token
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {

        //Token inválido ou expirado => 403
        if(error) return  res.status(403).end()

        //Se chegamos até aqui, o token esta OK e temos as informações do usuário
        //logado no parâmetro "decoded". Vamos guardar isso na request para usar depois
        req.authUser = decoded

        console.log({authUser: req.authuser})

        next()
    })

    

}
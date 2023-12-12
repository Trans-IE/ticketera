const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    
    try {
        
        const { label } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.label = label;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token vencido'
        });
    }

    next();
}


module.exports = {
    validarJWT
}


const validarArchivoSubir = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json( { 
            msg: 'No hay archivos que subir - archivo subir' 
        } );
    }

    next();

}


module.exports = {
    validarArchivoSubir,
}

export const fileUpload = async( file ) => {

    //comprobamos que el argumento file existe
    if ( !file ) throw new Error('No tenemos ningun archivo a subir');

    //usamos la url que creamos en cloudinary y probamos en postman ver video 305
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dc9gvorwa/upload';

    //constuimos el formData usando formData() de javaScript mirar video 305 es lo que hicimos en postman
    const formData = new FormData();

    //construimos el body,clave-valor
    formData.append('upload_preset','react-journal');
    formData.append('file',file); //mandamos el archivo que es el argumento de la funcion

    try {

        //usamos la funcion fecth de javaScript para hacer la peticion POST para mandar la imagen a cloudinary
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imagen');

        //serializamos el body recibido mediante Json
        const cloudResp = await resp.json();
      
        //retornamos el secure_url que es la url de la imagen en cloudinary en modo http del Json creado con la constante cloudResp
        return cloudResp.secure_url;
        
    } catch (error) {
        console.log(error);
        throw new Error( error.message );
            
    }

}
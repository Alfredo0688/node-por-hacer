const fs = require('fs');
//const { describe } = require('yargs');

//arreglo "global" usado en las funciones para carga o lectura
let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    //leer archivo json

    //la variable listaPorHacer se transformará en un objeto javascript 
    //ya serializado con la informacion del archivo requerido
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {


    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    //funcion que graba en el archivo
    guardarDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();
    return listadoPorHacer;

}

const actualizarEstado = (descripcion, completado = true) => {

    cargarDB();
    //findIndex retorna el indice del objeto, si no lo encuentra retorna -1
    let index = listadoPorHacer.findIndex(tarea => {

        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        //actualizo la propiedad de la tarea encontrada en base a lo enviado por el usuario
        listadoPorHacer[index].completado = completado
        guardarDB();
        return true;
    } else { return false }
}

const borrar = (descripcion) => {
    cargarDB();
    /*let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    listadoPorHacer.f*/
    //listadoPorHacer.splice(index, 1)

    //asignamos a la variable un nuevo listado con la tarea excluida
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })

    if (nuevoListado.length === listadoPorHacer.length) {
        return false
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizarEstado,
    borrar
}
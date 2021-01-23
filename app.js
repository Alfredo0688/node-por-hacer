const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':

        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('========Por Hacer==========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
        }
        break;

    case 'actualizar':
        console.log('Actualiza una tarea por hacer');

        let actualizado = porHacer.actualizarEstado(argv.descripcion, argv.completado);
        if (actualizado) {
            console.log('Tarea actualizada');
        } else {
            console.log("No se encontró la tarea, vea que esté bien escrito");
        }

        break;

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        if (borrar == false) {
            console.log('no se encontró una tarea para eliminar');
        } else {
            console.log('Tarea eliminada');
        }
        break;

    default:
        console.log('Comando no es reconocido');
        break;
}
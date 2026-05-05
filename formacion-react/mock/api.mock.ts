import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock(
    [
        {
            url: '/api/formulario/maestros',
            body: { 
                nacionalidades: [
                    { id: 1, nombre: 'Española' },
                    { id: 2, nombre: 'Francesa' },
                    { id: 3, nombre: 'Italiana' },
                    { id: 4, nombre: 'Alemana' },
                    { id: 5, nombre: 'Británica' },      
                ],
                estadosCiviles: [
                    { id: 1, nombre: 'Soltero/a' },
                    { id: 2, nombre: 'Casado/a' },
                    { id: 3, nombre: 'Divorciado/a' },
                    { id: 4, nombre: 'Viudo/a' },
                ],
                ciudades: [
                    { id: 1, nombre: 'Madrid' },
                    { id: 2, nombre: 'Barcelona' },
                    { id: 3, nombre: 'Valencia' },
                    { id: 4, nombre: 'Sevilla' },
                    { id: 5, nombre: 'Zaragoza' },
                ],
                provincias: [
                    { id: 1, nombre: 'Madrid' },
                    { id: 2, nombre: 'Barcelona' },
                    { id: 3, nombre: 'Valencia' },
                    { id: 4, nombre: 'Sevilla' },
                    { id: 5, nombre: 'Zaragoza' },
                ],
                tiposResidencia: [
                    { id: 1, nombre: 'Propia' },
                    { id: 2, nombre: 'Alquilada' },
                    { id: 3, nombre: 'Familiar' },
                    { id: 4, nombre: 'Otra' },
                ]
            },
            method: 'GET',
            delay: 500
        },
        {
            //revisar datos mock para el envío del formulario
            url: '/api/formulario/enviar',
            method: 'POST',
            delay: 1000,
            body: ({body}) => {
                console.log('Datos recibidos en el mock:', body);
                if (body && body.idProvincia && body.idCiudad && body.idNacionalidad && body.idEstadoCivil && body.idTipoResidencia) {
                    return { success: true, message: 'Formulario enviado correctamente' }
                } else {
                    return { success: false, message: 'Error: Faltan campos obligatorios' }
                }
            }
        },
        {
            url: '/api/buscador/maestros',
            body: {
                estadosCiviles: [
                    { id: 1, nombre: 'Soltero/a' },
                    { id: 2, nombre: 'Casado/a' },
                    { id: 3, nombre: 'Divorciado/a' },
                    { id: 4, nombre: 'Viudo/a' },
                ],
                estados: [
                    { id: 1, nombre: 'Activo' },
                    { id: 2, nombre: 'Pendiente' },
                    { id: 3, nombre: 'Cancelado' },
                    { id: 4, nombre: 'Archivado' },
                ]
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/buscador/buscar',
            body: ({body}) => {
                console.log('Datos recibidos en el mock de búsqueda:', body);
                //añadir filtrado
                return datosBuscadorMock;
            },
            method: 'POST',
            delay: 500
        }
    ]
)


const datosBuscadorMock = [
        { id: 1, fechaRegistro: '2024-01-01', nombre: 'Juan', apellido1: 'Pérez', apellido2: 'García', idEstadoCivil: 1, idEstado: 1 },
        { id: 2, fechaRegistro: '2024-02-15', nombre: 'María', apellido1: 'López', apellido2: 'Martínez', idEstadoCivil: 2, idEstado: 2 },
        { id: 3, fechaRegistro: '2024-03-10', nombre: 'Carlos', apellido1: 'Sánchez', apellido2: 'Rodríguez', idEstadoCivil: 3, idEstado: 3 },
        { id: 4, fechaRegistro: '2024-04-05', nombre: 'Ana', apellido1: 'Gómez', apellido2: 'Fernández', idEstadoCivil: 4, idEstado: 4 },
        { id: 5, fechaRegistro: '2024-05-20', nombre: 'Luis', apellido1: 'Díaz', apellido2: 'Hernández', idEstadoCivil: 1, idEstado: 1 },
        { id: 6, fechaRegistro: '2024-06-15', nombre: 'Sofía', apellido1: 'Moreno', apellido2: 'Gómez', idEstadoCivil: 2, idEstado: 2 },
        { id: 7, fechaRegistro: '2024-07-10', nombre: 'Miguel', apellido1: 'Ruiz', apellido2: 'López', idEstadoCivil: 3, idEstado: 3 },
        { id: 8, fechaRegistro: '2024-08-05', nombre: 'Laura', apellido1: 'Fernández', apellido2: 'Sánchez', idEstadoCivil: 4, idEstado: 4 },
        { id: 9, fechaRegistro: '2024-09-20', nombre: 'David', apellido1: 'García', apellido2: 'Díaz', idEstadoCivil: 1, idEstado: 1 },
        { id: 10, fechaRegistro: '2024-10-15', nombre: 'Isabel', apellido1: 'Martínez', apellido2: 'Moreno', idEstadoCivil: 2, idEstado: 2 },
]

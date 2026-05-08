import dayjs from 'dayjs';
import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock(
    [
        {
            url: '/api/formulario/maestros',
            body: {
                nacionalidades: [
                    { id: 1, descripcion: 'Española' },
                    { id: 2, descripcion: 'Francesa' },
                    { id: 3, descripcion: 'Italiana' },
                    { id: 4, descripcion: 'Alemana' },
                    { id: 5, descripcion: 'Británica' },
                ],
                estadosCiviles: [
                    { id: 1, descripcion: 'Soltero/a' },
                    { id: 2, descripcion: 'Casado/a' },
                    { id: 3, descripcion: 'Divorciado/a' },
                    { id: 4, descripcion: 'Viudo/a' },
                ],
                ciudades: [
                    { id: 1, descripcion: 'Madrid' },
                    { id: 2, descripcion: 'Barcelona' },
                    { id: 3, descripcion: 'Valencia' },
                    { id: 4, descripcion: 'Sevilla' },
                    { id: 5, descripcion: 'Zaragoza' },
                ],
                provincias: [
                    { id: 1, descripcion: 'Madrid' },
                    { id: 2, descripcion: 'Barcelona' },
                    { id: 3, descripcion: 'Valencia' },
                    { id: 4, descripcion: 'Sevilla' },
                    { id: 5, descripcion: 'Zaragoza' },
                ],
                tiposResidencia: [
                    { id: 1, descripcion: 'Propia' },
                    { id: 2, descripcion: 'Alquilada' },
                    { id: 3, descripcion: 'Familiar' },
                    { id: 4, descripcion: 'Otra' },
                ]
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/formulario/domicilios',
            body: [
                {
                    id: 1,
                    calle: 'Garajonay',
                    numero: '11',
                    codigoPostal: '31621',
                    ciudad: 'sarriguren',
                    provincia: 'navarra',
                    tipoResidencia: 'propia',
                    fechaInicio: '22/03/2020',
                    actual: '✓',
                },
                {
                    id: 2,
                    calle: 'C. Bardenas Reales',
                    numero: '52-54',
                    codigoPostal: '31621',
                    ciudad: 'sarriguren',
                    provincia: 'navarra',
                    tipoResidencia: 'alquiler',
                    fechaInicio: '25/11/2003',
                    actual: '✕',
                },
            ],
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
                    { id: 1, descripcion: 'Soltero/a' },
                    { id: 2, descripcion: 'Casado/a' },
                    { id: 3, descripcion: 'Divorciado/a' },
                    { id: 4, descripcion: 'Viudo/a' },
                ],
                estadosSolicitud: [
                    { id: 1, descripcion: 'Activo' },
                    { id: 2, descripcion: 'Pendiente' },
                    { id: 3, descripcion: 'Cancelado' },
                    { id: 4, descripcion: 'Archivado' },
                ]
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/buscador/buscar',
            body: ({body}) => {
                let resultados = datosBuscadorMock;

                if (body?.filtros?.fechaDesde) {
                    resultados = resultados.filter(resultado => dayjs(resultado.fechaRegistro, 'YYYY-MM-DD').isAfter(dayjs(body.filtros.fechaDesde, 'YYYY-MM-DD').subtract(1, 'day')));
                }
                if (body?.filtros?.fechaHasta) {
                    resultados = resultados.filter(resultado => dayjs(resultado.fechaRegistro, 'YYYY-MM-DD').isBefore(dayjs(body.filtros.fechaHasta, 'YYYY-MM-DD').add(1, 'day')));
                }
                if (body?.filtros?.idEstadoSolicitud) {
                    resultados = resultados.filter(resultado => resultado.idEstadoSolicitud == body.filtros.idEstadoSolicitud);
                }
                if (body?.filtros?.idEstadoCivil) {
                    resultados = resultados.filter(resultado => resultado.idEstadoCivil == body.filtros.idEstadoCivil);
                }

                return { resultados }
            },
            method: 'POST',
            delay: 500
        }
    ]
)


const datosBuscadorMock = [
        { id: 1, fechaRegistro: '2024-01-01', nombre: 'Juan', apellido1: 'Pérez', apellido2: 'García', idEstadoCivil: 1, idEstadoSolicitud: 1 },
        { id: 2, fechaRegistro: '2024-02-15', nombre: 'María', apellido1: 'López', apellido2: 'Martínez', idEstadoCivil: 2, idEstadoSolicitud: 2 },
        { id: 3, fechaRegistro: '2024-03-10', nombre: 'Carlos', apellido1: 'Sánchez', apellido2: 'Rodríguez', idEstadoCivil: 3, idEstadoSolicitud: 3 },
        { id: 4, fechaRegistro: '2024-04-05', nombre: 'Ana', apellido1: 'Gómez', apellido2: 'Fernández', idEstadoCivil: 4, idEstadoSolicitud: 4 },
        { id: 5, fechaRegistro: '2024-05-20', nombre: 'Luis', apellido1: 'Díaz', apellido2: 'Hernández', idEstadoCivil: 1, idEstadoSolicitud: 1 },
        { id: 6, fechaRegistro: '2024-06-15', nombre: 'Sofía', apellido1: 'Moreno', apellido2: 'Gómez', idEstadoCivil: 2, idEstadoSolicitud: 2 },
        { id: 7, fechaRegistro: '2024-07-10', nombre: 'Miguel', apellido1: 'Ruiz', apellido2: 'López', idEstadoCivil: 3, idEstadoSolicitud: 3 },
        { id: 8, fechaRegistro: '2024-08-05', nombre: 'Laura', apellido1: 'Fernández', apellido2: 'Sánchez', idEstadoCivil: 4, idEstadoSolicitud: 4 },
        { id: 9, fechaRegistro: '2024-09-20', nombre: 'David', apellido1: 'García', apellido2: 'Díaz', idEstadoCivil: 1, idEstadoSolicitud: 1 },
        { id: 10, fechaRegistro: '2024-10-15', nombre: 'Isabel', apellido1: 'Martínez', apellido2: 'Moreno', idEstadoCivil: 2, idEstadoSolicitud: 2 },
]

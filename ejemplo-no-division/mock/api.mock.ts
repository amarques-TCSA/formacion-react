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
                    { id: 1, descripcion: 'Pamplona' },
                    { id: 2, descripcion: 'Tudela' },
                    { id: 3, descripcion: 'Estella' },
                ],
                provincias: [
                    { id: 1, descripcion: 'Navarra' },
                    { id: 2, descripcion: 'La Rioja' },
                    { id: 3, descripcion: 'Aragón' },
                ],
                tiposResidencia: [
                    { id: 1, descripcion: 'Propia' },
                    { id: 2, descripcion: 'Alquilada' },
                    { id: 3, descripcion: 'Familiar' },
                    { id: 4, descripcion: 'Otra' },
                ],
            },
            method: 'GET',
            delay: 600
        },
        {
            url: '/api/formulario/domicilios',
            body: [
                {
                    id: 1,
                    calle: 'Avenida Carlos III',
                    numero: '12',
                    codigoPostal: '31002',
                    ciudad: 'Pamplona',
                    provincia: 'Navarra',
                    tipoResidencia: 'propia',
                    fechaInicio: '01/01/2020',
                    actual: true,
                },
                {
                    id: 2,
                    calle: 'Calle Mayor',
                    numero: '8',
                    codigoPostal: '31500',
                    ciudad: 'Tudela',
                    provincia: 'Navarra',
                    tipoResidencia: 'alquiler',
                    fechaInicio: '15/06/2018',
                    actual: false,
                },
            ],
            method: 'GET',
            delay: 800
        },
        {
            url: '/api/formulario/enviar',
            body: {
                success: true,
                message: 'Formulario enviado correctamente',
            },
            method: 'POST',
            delay: 500
        },
        {
            url: '/api/formulario/nacionalidades',
            body: {
                nacionalidades: [
                    { id: 1, descripcion: 'Española' },
                    { id: 2, descripcion: 'Francesa' },
                    { id: 3, descripcion: 'Italiana' },
                    { id: 4, descripcion: 'Alemana' },
                    { id: 5, descripcion: 'Británica' },
                ],
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/formulario/estadosCiviles',
            body: {
               estadosCiviles: [
                    { id: 1, descripcion: 'Soltero/a' },
                    { id: 2, descripcion: 'Casado/a' },
                    { id: 3, descripcion: 'Divorciado/a' },
                    { id: 4, descripcion: 'Viudo/a' },
                ],
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/formulario/estadosSolicitud',
            body: {
                estadosSolicitud: [
                    { id: 1, descripcion: 'Pendiente' },
                    { id: 2, descripcion: 'Aprobada' },
                    { id: 3, descripcion: 'Rechazada' },
                ],
            },
            method: 'GET',
            delay: 500
        },
        {
            url: '/api/formulario/tiposResidencia',
            body: {
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
    ]
)

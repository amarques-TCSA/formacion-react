
interface Route {
	relativePath: string;
	absolutePath: string;
}

export const URLBase = import.meta.env.BASE_URL;

const Routes = {
	root: {
		relativePath: '/',
		absolutePath: '/',
	},
	inicio: {
		relativePath: '',
		absolutePath: '/',
	},
	formulario: {
		relativePath: 'nuevo',
		absolutePath: '/buscador/nuevo',
	},
	buscador: {
		relativePath: 'buscador',
		absolutePath: '/buscador',
	},
} as const satisfies Record<string, Route>;

type RoutesType = typeof Routes;
type RouteKeys = keyof RoutesType;

export { Routes };
export type { Route, RouteKeys, RoutesType };


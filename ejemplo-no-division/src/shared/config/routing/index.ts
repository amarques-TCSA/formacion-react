
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
	formulario: {
		relativePath: 'formulario',
		absolutePath: '/formulario',
	},
	renderizados: {
		relativePath: 'renderizados',
		absolutePath: '/renderizados',
	},
	queryVsSuspense: {
		relativePath: 'query-vs-suspense',
		absolutePath: '/query-vs-suspense',
	},
	hookVsFuncion: {
		relativePath: 'hook-vs-funcion',
		absolutePath: '/hook-vs-funcion',
	},
} as const satisfies Record<string, Route>;

type RoutesType = typeof Routes;
type RouteKeys = keyof RoutesType;

export { Routes };
export type { Route, RouteKeys, RoutesType };


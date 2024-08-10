export const PLUGIN_NAME = 'vite-plugin-react-file-router';
export const VIRTUAL_MODULE_ID = 'virtual:vite-plugin-react-file-router';
export const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export const ROUTE_IMPORT_NAME = '__pages_import_$1__';

export const dynamicRouteRE = /^\[(.+)\]$/;
export const cacheAllRouteRE = /^\[\.{3}(.*)\]$/;
export const replaceDynamicRouteRE = /^\[(?:\.{3})?(.*)\]$/;

export const nuxtDynamicRouteRE = /^_(.*)$/;
export const nuxtCacheAllRouteRE = /^_$/;

export const countSlashRE = /\//g;

export const replaceIndexRE = /\/?index$/;

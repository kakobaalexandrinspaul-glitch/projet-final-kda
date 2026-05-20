import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth-client': { paramsTuple?: []; params?: {} }
    'inscription-client': { paramsTuple?: []; params?: {} }
    'profil-client': { paramsTuple?: []; params?: {} }
    'compte-client': { paramsTuple?: []; params?: {} }
    'motdepasse-client': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth-client': { paramsTuple?: []; params?: {} }
    'inscription-client': { paramsTuple?: []; params?: {} }
    'profil-client': { paramsTuple?: []; params?: {} }
    'compte-client': { paramsTuple?: []; params?: {} }
    'motdepasse-client': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth-client': { paramsTuple?: []; params?: {} }
    'inscription-client': { paramsTuple?: []; params?: {} }
    'profil-client': { paramsTuple?: []; params?: {} }
    'compte-client': { paramsTuple?: []; params?: {} }
    'motdepasse-client': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
import lf from 'localforage'

const keys = {
  user: 'user',
  app: 'app',
  jwtToken: 'jwt-token',
  routeData: 'routeData'
}
let store = lf.createInstance({ name: 'default' })
// const defaultStore = store
/**
 * 设置存储空间名称
 * @param {string} name - 存储空间名称
 */
function setName(name) {
  store = lf.createInstance({ name })
}
function setUser(user) {
  return store.setItem(keys.user, user)
}
function getUser() {
  return store.getItem(keys.user)
}
function setToken(token) {
  return store.setItem(keys.jwtToken, token)
}
function getToken() {
  return store.getItem(keys.jwtToken)
}
function setApp(app) {
  return store.setItem(keys.app, app)
}
function getApp() {
  return store.getItem(keys.app)
}
function setRouteData(routerData) {
  return store.setItem(keys.routeData, routerData)
}
function getRouteData() {
  return store.getItem(keys.routeData)
}
function claerLocalforage() {
  return lf.clear()
}
export {
  setName,
  setUser,
  getUser,
  setToken,
  getToken,
  setApp,
  getApp,
  setRouteData,
  getRouteData,
  claerLocalforage
}

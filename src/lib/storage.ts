const TOKEN_KEY = 'site-auth-token'
export const AUTH_STATE_EVENT = 'dk-theme:auth-state-change'

function notifyAuthStateChange() {
  window.dispatchEvent(new Event(AUTH_STATE_EVENT))
}

export const tokenStorage = {
  get() {
    return localStorage.getItem(TOKEN_KEY)
  },
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
    notifyAuthStateChange()
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY)
    notifyAuthStateChange()
  },
}

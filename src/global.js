import Vue from 'vue'


export const axios = require('axios')
export const userKey = 'acessToken'
export const baseApiUrl = 'https://farmacia-cg.herokuapp.com/'


export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey, axios}



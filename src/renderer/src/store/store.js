import { defineStore } from 'pinia'
import Chat from '../components/SessionList/chat.vue'

export const useStore = defineStore('main', {
  state: () => ({
    phoneNumber: '',
    hint: '',
    language: 'zh-hans-beta',
    chatInfo: {}
  }),
  mutations: {
    setChatInfo(state, payload) {
      state.chatInfo = payload
    }
  },
  actions: {
    setPhoneNumber(number) {
      this.phoneNumber = number
    },
    setHint(hint) {
      this.hint = hint
    },
    setLanguage(language) {
      this.language = language
    },
    setChatInfo({ commit }, chatInfo) {
      commit('setChatInfo', chatInfo)
    }
  }
})

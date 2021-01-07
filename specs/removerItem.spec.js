import Vuex from "vuex"
import Vue from "vue"
import { mount, createLocalVue } from "@vue/test-utils"
import { mutations } from '@/store/mutations'


import Carrinho from '@/views/Carrinho'
import myStore from '@/store/index'

const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

describe('Remover Item', () => {
  it('Remove nada, sem produto', async () => {
    const state = { carrinho: []}
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Carrinho, {
        localVue: VueWithVuex,
        store
    })
    const remover = wrapper.vm.removerItem()
    expect(remover).toBe(undefined)

  })

  it('Remove item do carrinho', async () => {
    const state = { carrinho: [{ "id": "notebook", "nome": "Notebook", "preco": 2999 },
    { "id": "smartwatch", "nome": "Smartwatch", "preco": 5000 },
    { "id": "tablet", "nome": "Tablet", "preco": 1500 }]}
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Carrinho, {
        localVue: VueWithVuex,
        store
    })
      //remove elemento de index 0
      store.commit('REMOVE_CARRINHO', state, 0);
      expect(wrapper.vm.carrinho[0].id).toStrictEqual("smartwatch")
  })

})


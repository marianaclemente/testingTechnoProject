import Vuex from "vuex"
import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import { mutations } from '@/store/mutations'
import Produto from '@/views/Produto'
import ProdutosLista from '@/components/ProdutosLista'


const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

describe('Sair modal', () => {
    it('Section existe', () => {
        const state = { produto: { "id": "notebook", "nome": "Notebook", "preco": 2999 } }
        const store = new Vuex.Store({state, mutations})
        const wrapper = shallowMount(Produto, {
            localVue: VueWithVuex,
            store
        })
        const sectionArray = wrapper.findAll('section')
        const section = wrapper.find('section')
        expect(section.exists()).toBe(true)
        expect(sectionArray.length).toBe(2)
    })

    it('Clicar fora modal, produto = false', async () => {
        const state = { produto: { "id": "notebook", "nome": "Notebook", "preco": 2999 } }
        const store = new Vuex.Store({state, mutations})
        const wrapper = mount(Produto, {
            localVue: VueWithVuex,
            store
        })
        const sectionArray = wrapper.findAll('section')
        await sectionArray.trigger('click')
        expect(wrapper.vm.produto).toEqual(false)
    })

    it('Clicar button X, produto = false', async () => {
        const state = { produto: { "id": "notebook", "nome": "Notebook", "preco": 2999 } }
        const store = new Vuex.Store({state, mutations})
        const wrapper = mount(Produto, {
            localVue: VueWithVuex,
            store
        })
        const buttonArray = wrapper.findAll('button')
        await buttonArray.at(0).trigger('click')
        expect(buttonArray.at(0).text()).toBe('X')
        expect(wrapper.vm.produto).toEqual(false)
    })
})
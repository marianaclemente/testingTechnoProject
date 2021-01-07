jest.mock("@/services.js");

import Vuex from "vuex"
// import VueRouter from "vue-router"
import { mount ,createLocalVue, shallowMount} from "@vue/test-utils"
import mutations from '@/store/mutations'
import ProdutosLista from '@/components/ProdutosLista'
import { api } from "@/services.js";
import data from "@/api/produtos.json"

const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)
// VueWithVuex.use(VueRouter)
// const router = new VueRouter()

const produtos = data.produtos

describe('Entrar modal', () => {
    afterEach( () => {
        jest.resetAllMocks();
    })
    beforeEach( () => {
        api.get.mockImplementation( () => {
            return Promise.resolve({ data: produtos});
        });
    })
    it('Abrir modal, produto não null', async () => {
        const state = { produto: null}
        const store = new Vuex.Store({state, mutations})
        const wrapper = shallowMount(ProdutosLista, {
            localVue: VueWithVuex,
            store,
        })
        await wrapper.setData({ produtos: [{ "id": "notebook", "nome": "Notebook", "preco": 2999 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 1199 },
        { "id": "tablet", "nome": "Tablet", "preco": 1500 }] })

        const divArray = wrapper.findAll('div')
        await divArray.at(0).trigger('click')
        expect(api.get).toHaveBeenCalledTimes(2)
        expect(store.state.produto).not.toBe(null)
    })
    it('Checa se 5 divs são criadas', async () => {
        const state = { produto: null }
        const store = new Vuex.Store({state, mutations})
        const wrapper = shallowMount(ProdutosLista, {
            localVue: VueWithVuex,
            store,
        })
        await wrapper.setData({ produtos: [{ "id": "notebook", "nome": "Notebook", "preco": 2999 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 1199 },
        { "id": "tablet", "nome": "Tablet", "preco": 1500 }] })
        const divArray = wrapper.findAll('div')
        divArray.at(0).trigger('click')
        expect(divArray.length).toBe(5)
    })
})

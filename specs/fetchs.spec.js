jest.mock("@/services.js");
// jest.mock("@/router/index.js");

import Vuex from "vuex"
// import Router from "vue-router"
// import router from '@/router/index.js'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Produto from '@/views/Produto.vue'


import { mount ,createLocalVue} from "@vue/test-utils"
import { mutations } from '@/store/mutations'
import ProdutosLista from '@/components/ProdutosLista'
import { fetchProdutos ,fetchProduto } from './fetch'
// import axios from "axios"
import { api } from "@/services.js";
import data from "@/api/produtos.json"

const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)
// VueWithVuex.use(VueRouter)
// const router = new VueRouter()

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/notebook',
      name: 'Produto',
      component: Produto,
      props: true
    }
]

const produtos = data.produtos
const produto = {
    "id": "notebook",
    "nome": "Notebook",
    "preco": 2999,
    "img": "@/api/produtos/notebook/notebook.jpg",
    "descricao": "Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a necessidade de renovação processual causa impacto indireto na reavaliação do orçamento setorial.",
    "estoque": 12,
    "reviews": [
      {
        "nome": "Fábio",
        "estrelas": 5,
        "descricao": "Gostei muito do produto, atendeu todas as minhas necessidades"
      },
      {
        "nome": "Fábio",
        "estrelas": 5,
        "descricao": "Gostei muito do produto, atendeu todas as minhas necessidades"
      }
    ]
}
describe('FetchProdutos', () => {
    afterEach( () => {
        jest.resetAllMocks();
    })
    beforeEach( () => {
        api.get.mockImplementation( () => {
            return Promise.resolve({ data: { results: produtos} });
        });
        fetchProdutos();
    })
    it('FetchProdutos foi chamado uma vez',  async () => {
        expect(api.get).toHaveBeenCalledTimes(1);
    })
    it('FetchProdutos foi chamado com URL',  async () => {
        expect(api.get).toHaveBeenCalledWith("/produtos")
    })
    it('FetchProdutos in ProdutosLista', async () => {
        const state = { carrinho: []}
        const store = new Vuex.Store({state, mutations})
        // const router = new VueRouter({mode: 'history', routes: routes})
        const wrapper = mount(ProdutosLista, {
            localVue: VueWithVuex,
            store,
            // router,
        })
        await wrapper.setData({ produtos: produtos })
        // router.push('/notebook')
        // await wrapper.vm.$nextTick()
        
        wrapper.vm.fetchProdutos()
        expect(api.get).toHaveBeenCalledTimes(3);
    })
    it('Deve retornar 5 objetos', async () => {
        const {
            data: { results },
        } = await api.get();
        expect(results).toHaveLength(5);
    })
})


describe('FetchProduto', () => {
    afterEach( () => {
        jest.resetAllMocks();
    })
    beforeEach( () => {
        api.get.mockImplementation( () => {
            return Promise.resolve({ data: { results: produto} });
        });
        fetchProduto("notebook");
    })
    it('FetchProduto foi chamado uma vez',  async () => {
        expect(api.get).toHaveBeenCalledTimes(1);
    })
    it('FetchProduto foi chamado com URL',  async () => {
        expect(api.get).toHaveBeenCalledWith("/produtos/notebook")
    })
    it('FetchProduto foi chamado 3 vezes', async () => {
        const state = { produto: null}
        const store = new Vuex.Store({state, mutations})
        const wrapper = mount(ProdutosLista, {
            localVue: VueWithVuex,
            store,
            // router
        })
        
        await wrapper.vm.fetchProduto("notebook")
        expect(api.get).toHaveBeenCalledTimes(3);
      })

    it('Deve retornar 1 objeto com id = notebook', async () => {
        const {
            data: { results },
        } = await api.get();
        expect(results.id).toStrictEqual("notebook");
    })
})




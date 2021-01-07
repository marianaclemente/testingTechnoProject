import Vuex from "vuex"
import Vue from "vue"
import { mount, createLocalVue } from "@vue/test-utils"
import mutations from '@/store/mutations'


import Carrinho from '@/views/Carrinho'
import myStore from '@/store/index'

const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)


describe('Comparar Estoque', () => {
    it('Atualiza estoque', async () => {
        const state = { produto: {
            "id": "smartwatch",
            "nome": "Smartwatch",
            "preco": 1199,
            "descricao": "Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a necessidade de renovação processual causa impacto indireto na reavaliação do orçamento setorial.",
            "estoque": 5,
            "img": "./api/produtos/smartwatch/smartwatch-foto.jpg",
            "reviews": [
                {
                    "nome": "Rogério",
                    "estrelas": 5,
                    "descricao": "Gostei muito do produto, atendeu todas as minhas necessidades."
                },
                {
                    "nome": "Nathália",
                    "estrelas": 4,
                    "descricao": "Gostei, mas o preço poderia ser melhor."
                }
            ]
        },
        carrinho: [{ "id": "notebook", "nome": "Notebook", "preco": 2999 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 1199 },
        { "id": "tablet", "nome": "Tablet", "preco": 1500 },
        { "id": "tablet", "nome": "Tablet", "preco": 1500 },
        { "id": "notebook", "nome": "Notebook", "preco": 2999 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 1199 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 1199 }]
    }
        const store = new Vuex.Store({state, mutations})
        const wrapper = mount(Carrinho, {
            localVue: VueWithVuex,
            store
    })
        wrapper.vm.compararEstoque()
        expect(wrapper.vm.produto.estoque).toBe(2)
    })

})



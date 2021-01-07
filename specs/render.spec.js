import { render } from '@vue/server-test-utils'
import Produto from '@/views/Produto'
import Home from '@/views/Home'
import Alerta from '@/views/Alerta'
import TheHeader from '@/components/TheHeader'
import App from '@/App'

import Vuex from "vuex"
import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import mutations from '@/store/mutations'


const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

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

describe('Test render', () => {
  it('create a component to test', async () => {
        const TestComponent = {
        template: '<div><h2>Test</h2><p></p><p></p></div>'
        }
        const wrapper = await render(TestComponent)
        expect(wrapper.find('h2').text()).toEqual('Test')
        expect(wrapper.find('p').length).toEqual(2)
  })
})

describe('render Produto', () => {
  it('create a component to test', async () => {
        const state = { produto: produto }
        const store = new Vuex.Store({state, mutations})
        const wrapper = await render(Produto, {
            localVue: VueWithVuex,
            store
        })
        //expect(wrapper.text()).toContain('')
        expect(wrapper.find('h2').text()).toEqual('NotebookAvaliações')
        expect(wrapper.find('section').length).toEqual(2)
        expect(wrapper.find('p').length).toEqual(5)
        expect(wrapper.find('button').length).toEqual(2)
  })
})

describe('render Home', () => {
  it('create a component to test', async () => {
        const state = { produto: produto}
        const store = new Vuex.Store({state, mutations})
        const wrapper = await render(Home, {
            localVue: VueWithVuex,
            store
        })
        //expect(wrapper.text()).toContain('')
        expect(wrapper.find('section').length).toEqual(1)
  })
})

describe('render TheHeader', () => {
  it('create a component to test', async () => {
        const state = { produto: produto, carrinho: [{ "id": "notebook", "nome": "Notebook", "preco": 2999 },
        { "id": "smartwatch", "nome": "Smartwatch", "preco": 5000 },
        { "id": "tablet", "nome": "Tablet", "preco": 1500 }], totalCarrinho: 0}
        const store = new Vuex.Store({state, mutations})
        const wrapper = await render(TheHeader, {
            localVue: VueWithVuex,
            store
        })
        //expect(wrapper.text()).toContain('')
        expect(wrapper.find('div').length).toEqual(1)
  })
})

describe('render Alerta', () => {
  it('create a component to test', async () => {
        const state = { alertaAtivo: true, mensagemAlerta: "Item adicionado"}
        const store = new Vuex.Store({state, mutations})
        const wrapper = await render(Alerta, {
            localVue: VueWithVuex,
            store
        })
        expect(wrapper.find('div').length).toEqual(1)
  })
})

describe('render App', () => {
  it('create a component to test', async () => {
        const state = { alertaAtivo: true, mensagemAlerta: "Item adicionado"}
        const store = new Vuex.Store({state, mutations})
        const wrapper = await render(App, {
            localVue: VueWithVuex,
            store
        })
        // const divId = wrapper.find('#app')
        // expect(divId.element.id).toBe('app')
        expect(wrapper.find('div').length).toEqual(1)
  })
})

// describe('render Main', () => {
//   it('create a component to test', async () => {
//         const state = { alertaAtivo: true, mensagemAlerta: "Item adicionado"}
//         const store = new Vuex.Store({state, mutations})
//         const wrapper = await render(Main, {
//             localVue: VueWithVuex,
//             store
//         })
//         // const divId = wrapper.find('#app')
//         // expect(divId.element.id).toBe('app')
//         expect(wrapper.find('div').length).toEqual(1)
//   })
// })


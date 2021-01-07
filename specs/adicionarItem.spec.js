import Vuex from "vuex"
import Vue from "vue"
import { mount, createLocalVue } from "@vue/test-utils"
import { mutations } from '@/store/mutations'


import Produto from '@/views/Produto'
import myStore from '@/store/index'

const VueWithVuex = createLocalVue()
VueWithVuex.use(Vuex)

describe('Adicionar Item', () => {
  it('push carrinho', () => {
      const store = new Vuex.Store(myStore)
      const wrapper = mount(Produto, {
          localVue: VueWithVuex,
          store
      })
      store.state.carrinho.push('cucumber')
      expect(wrapper.vm.carrinho).toEqual(['cucumber'])
  })

  it('DECREMENTA_ESTOQUE', () => {
        const state = { produto: {
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
      }
      const store = new Vuex.Store({state, mutations})
      const wrapper = mount(Produto, {
          localVue: VueWithVuex,
          store
      })
      store.commit('DECREMENTA_ESTOQUE', state);
      //mutations.DECREMENTA_ESTOQUE(state)
      expect(wrapper.vm.produto.estoque).toEqual(11)

  })

  it('PUSH_CARRINHO', () => {
    const state = { carrinho: []}
    const produto = {
      "id": "notebook",
      "nome": "Notebook",
      "preco": 2999
  }
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Produto, {
        localVue: VueWithVuex,
        store
    })
    store.commit('PUSH_CARRINHO', state, produto);
    //mutations.DECREMENTA_ESTOQUE(state)
    expect(wrapper.vm.carrinho.length).toEqual(1)
  })

  it('Retorna nada, sem produto', async () => {
    const state = { produto: false}
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Produto, {
        localVue: VueWithVuex,
        store
    })
    const adicionar = wrapper.vm.adicionarItem()
    expect(adicionar).toBe(undefined)

  })

  it('Verifica se alerta tá exibindo a mensagem correta', async () => {
    const state = { produto: {
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
    },
    mensagemAlerta: "Notebook adicionado ao carrinho."
    }
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Produto, {
        localVue: VueWithVuex,
        store
    })
    const { id, nome, preco } = wrapper.vm.produto
    const esperado = wrapper.vm.mensagemAlerta
    expect(`${nome} adicionado ao carrinho.`).toStrictEqual(esperado)
  })

  it('Testando adicionarItem', async () => {
    const state = { produto: {
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
    }, 
    carrinho: [], carrinhoAtivo: true }
    const store = new Vuex.Store({state, mutations})
    const wrapper = mount(Produto, {
        localVue: VueWithVuex,
        store
    })
    const buttonArray = wrapper.findAll('button')
    await buttonArray.at(1).trigger('click')
    expect(buttonArray.at(1).text()).toBe('Adicionar Item')
    expect(wrapper.vm.produto.estoque).toEqual(11)
    expect(wrapper.vm.carrinho).toEqual([{"id": "notebook", "nome": "Notebook", "preco": 2999}])
  })
})
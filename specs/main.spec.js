import { mount } from "@vue/test-utils"
import Vue from 'vue'

describe('render Main', () => {
      it('create a component to test', async () => {
            Vue.config.silent = true;
            const Main = require('@/main.js');
            const wrapper = await mount(Main, {
                  render:jest.fn(),
            })
            expect(wrapper.is(Main)).toBe(true)
    })
  })


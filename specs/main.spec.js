import Main from '@/main.js'
import { mount } from "@vue/test-utils"

describe('render Main', () => {
    it('create a component to test', async () => {
          const wrapper = mount(Main)
          expect(wrapper.is(Main)).toBe(true)
    })
  })
import Main from '@/main.js'
import { mount } from "@vue/test-utils"

describe('render Main', () => {
      it('create a component to test', async () => {
            const wrapper = await mount(Main, {
                  render:jest.fn(),
                  $mount:jest.fn(),
            })
            expect(wrapper.is(Main)).toBe(true)
    })
  })


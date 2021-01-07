import { mount } from '@vue/test-utils'
import Component from '@/components/Component'


describe( 'test', () => {
    it ('works', () => {
        let wrapper = mount(Component)

        expect(2+2).toBe(4)
    })
})
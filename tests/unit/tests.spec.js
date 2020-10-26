import { mount } from '@vue/test-utils';
import Home from '@/components/Home.vue';

describe('Mounted Home', () => {
    const wrapper = mount(Home)
    
    test('Vue instance', () => {
        //expect(typeof Home.data).toBe('function')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    test('has a submit button', () => {
        expect(wrapper.contains('button[type=submit]')).toBe(true)
    })

    test("does app name exist", () => {
    
        expect(wrapper.find("h2").text()).toBe("Simulador")
    })
})

describe('Test input value', () => {
    test('set value', async () => {
        const wrapper = mount(Home)
        const name = wrapper.find('input[type=text]')
        const monthly = wrapper.find('input[type=number]')
        const years = wrapper.find('select')
    
        await name.setValue('Guilherme Queiroz Silva')
        await monthly.setValue('20')
        await years.setValue('24')

        expect(name.element.value).toBe('Guilherme Queiroz Silva')
        expect(monthly.element.value).toBe('20')
        expect(years.element.value).toBe('24')
    })
})

describe('button submit test', () => {
    test('test button', () => {
        const wrapper = mount(Home)
        wrapper.find('button').trigger('click')
        expect(wrapper.find('.modal').exists()).toBe(false)
    })
})

describe('Test show modal', () => { 
    test('change data modal', () => {
        const wrapper = mount(Home, {
            data() {
                return {
                    form: {
                        showModal: true
                    }
                }
            }
        })
        expect(wrapper.find('.modal').exists()).toBe(true)
    })
})
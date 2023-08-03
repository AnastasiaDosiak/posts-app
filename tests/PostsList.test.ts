import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import PostsList from '@/components/PostsList.vue'
import { createTestingPinia } from '@pinia/testing'  // <-- !!
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts';
vi.mock('vue-router', () => ({
    useRouter: vi.fn(() => ({
        fullPath: '',
        hash: '',
        matched: [],
        meta: {},
        name: undefined,
        params: {
            test: '123',
        },
        path: '/test',
        query: {},
        redirectedFrom: undefined,
    })),
}));
describe('CityList.vue Test with empty data store', () => {
    beforeAll(() => {
        vi.mock("next/router", () => require("next-router-mock"));
    });
    let wrapper = null as any;

    // SETUP - run prior to each unit test
    beforeEach(() => {
        // render the component
        wrapper = shallowMount(PostsList, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn
                    })
                ]
            }
        });
        console.log(wrapper, 'here')
    })

    // TEARDOWN - run after each unit test
    afterEach(() => {
        wrapper.unmount()
    })

    it('initializes with zero elements displayed', () => {
        // check that zero city cards are displayed
        expect(wrapper.findAll('h2').length).toEqual(0)

    })
})

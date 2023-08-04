import { createApp } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, expect, test, vi, beforeEach, beforeAll } from 'vitest';
import PostsList from '~/components/PostsList.vue';
import { useRouter } from 'vue-router';
import { mount } from '@vue/test-utils';

vi.mock('vue-router');

describe('PostsList', () => {
    useRouter.mockReturnValue({
        push: vi.fn(),
    });
    beforeEach(() => {
        useRouter().push.mockReset();
    });

    beforeAll(() => {
        vi.mock("next/router", () => require("next-router-mock"));
    });

    test('it mounts', () => {
        const app = createApp(PostsList);
        app.mount("#container");
        app.use(createTestingPinia());
        const wrapper = mount(app);
        expect(wrapper.vm).toBeTruthy();
    });

});

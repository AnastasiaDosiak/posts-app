import { setActivePinia, createPinia } from 'pinia';
import { usePostsStore } from '~/stores/posts';
import { beforeEach, describe, expect, vi, test, it } from 'vitest';
describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const mockPosts = [{ id: '1', title: 'test', body: 'test', reactions: 2 }];
  const mockActivePost = {
    id: 'test',
    title: 'test2',
    body: 'test2',
    reactions: 5,
  };
  const mockApiCallWithPosts = (emptyPosts = false) =>
    vi.fn(async () => {
      return Promise.resolve({
        posts: emptyPosts ? [] : mockPosts,
        total: emptyPosts ? 0 : 1,
      });
    });

  const mockApiCallWithPost = vi.fn(async () => {
    return Promise.resolve(mockActivePost);
  });

  test('Default values of store', () => {
    const store = usePostsStore()();
    expect(store.activePost).toBe(null);
    expect(store.totalPosts).toBe(0);
    expect(store.pending).toBe(true);
    expect(store.noData).toBe(false);
    expect(store.availablePosts).toStrictEqual([]);
  });

  test('setAvailablePosts', () => {
    it('should set available posts', async () => {
      const store = usePostsStore(mockApiCallWithPosts())();
      await store.setAvailablePosts(0);
      expect(store.noData).toBeFalsy();
      expect(store.availablePosts).toStrictEqual(mockPosts);
      expect(store.noData).toBeFalsy();
      expect(store.pending).toBeFalsy();
      expect(store.totalPosts).toBe(1);
    });
    it('should set available posts with no data and update store values', async () => {
      const store = usePostsStore(mockApiCallWithPosts(true))();
      await store.setAvailablePosts(0);
      expect(store.noData).toBeTruthy();
      expect(store.availablePosts).toStrictEqual([]);
      expect(store.totalPosts).toBe(0);
    });
  });
  test('setActivePost', () => {
    it('should set active post from available posts', async () => {
      const store = usePostsStore(mockApiCallWithPosts())();
      await store.setAvailablePosts(0);
      await store.setActivePost(mockPosts[0].id);
      expect(store.activePost).toStrictEqual(mockPosts[0]);
    });
    it('should set active post with sending request', async () => {
      const store = usePostsStore(
        mockApiCallWithPosts(),
        mockApiCallWithPost
      )();
      await store.setAvailablePosts(0);
      await store.setActivePost(mockPosts[0].id);
      expect(store.activePost).toStrictEqual(mockPosts[0]);
      expect(mockApiCallWithPost).toHaveBeenCalledTimes(1);
    });
  });
});

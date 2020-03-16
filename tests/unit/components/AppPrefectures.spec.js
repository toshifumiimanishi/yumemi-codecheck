import { shallowMount } from '@vue/test-utils';
import AppPrefectures from '~/components/AppPrefectures.vue';
import prefectures from '../_mockData/prefectures.json';

describe('AppPrefectures コンポーネントのテスト', () => {
  const propsData = {
    prefectures
  };

  it('props を正しく受け取れるか', () => {
    const wrapper = shallowMount(AppPrefectures, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  it('レンダリング結果のスナップショットテスト', () => {
    const wrapper = shallowMount(AppPrefectures, { propsData });
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});

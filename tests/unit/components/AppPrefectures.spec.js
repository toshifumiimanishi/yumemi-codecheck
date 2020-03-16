import { shallowMount } from '@vue/test-utils';
import AppPrefectures from '~/components/AppPrefectures.vue';
import prefectures from '../_mockData/prefectures.json';

describe('AppPrefectures.vue', () => {
  const propsData = {
    prefectures
  };

  it('props', () => {
    const wrapper = shallowMount(AppPrefectures, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });
});

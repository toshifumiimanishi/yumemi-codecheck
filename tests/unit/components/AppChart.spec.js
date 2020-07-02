import { mount } from '@vue/test-utils';
import AppChart from '~/components/AppChart.vue';
import totalPopulation from '../_mockData/totalPopulation.json';

describe('AppChart コンポーネントテスト', () => {
  const propsData = {
    totalPopulation
  };

  it('レンダリング結果のスナップショットテスト', () => {
    const wrapper = mount(AppChart, { propsData });
    expect(wrapper.vm.$el).toMatchSnapshot();
  })
});

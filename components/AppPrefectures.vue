<template>
  <div class="prefecture">
    <div class="prefecture_container">
      <h2 class="prefecture_heading">都道府県</h2>
      <ul class="prefecture_list">
        <li class="prefecture_item" v-for="prefecture in prefectures" :key="prefecture.prefCode">
          <label>
            <input type="checkbox" :value="prefecture.prefCode" v-model="checkedPrefCode" @change="onCheckedPrefName">
            {{ prefecture.prefName }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    prefectures: {
      type: Array
    }
  },
  data() {
    return {
      checkedPrefCode: [],
      totalPopulation: []
    }
  },

  methods: {
    async fetchPopulationComposition(prefCode) {
      const { data: { result } } = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
        headers: {
         'X-API-KEY': process.env.API_KEY
        }
      });
      const totalPopulation = result.data[0];

      this.totalPopulation = [...this.totalPopulation, {
        prefCode,
        data: totalPopulation.data
      }];
    },

    removeTotalPopulation(prefCode) {
      const index = this.totalPopulation.findIndex(population => {
        return population.prefCode === prefCode;
      });

      this.totalPopulation.splice(index, 1);
    },

    onCheckedPrefName(event) {
      const prefCode = event.currentTarget.value;
      const isChecked = event.currentTarget.checked;

      if (isChecked) {
        this.fetchPopulationComposition(prefCode);
      } else {
        this.removeTotalPopulation(prefCode);
      }
    }
  }
}
</script>

<style lang="scss">
.prefecture_container {
  margin: auto;
  width: 100%;
  max-width: 960px;
}

.prefecture_heading {
  display: inline-block;
  margin-bottom: 24px;
  padding: 0 8px;
  font-size: 24px;
  background-color: #000;
  color: #fff;
}

.prefecture_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, auto));
  gap: 24px;
}
</style>

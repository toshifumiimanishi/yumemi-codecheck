<template>
  <div class="prefecture">
    <div class="prefecture_container">
      <h2 class="prefecture_heading">都道府県</h2>
      <ul class="prefecture_list">
        <li class="prefecture_item" v-for="prefecture in prefectures" :key="prefecture.prefCode">
          <label>
            <input type="checkbox" :value="prefecture.prefCode" :name="prefecture.prefName" @change="onCheckedPrefName">
            {{ prefecture.prefName }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prefectures: {
      type: Array
    }
  },

  data() {
    return {
      totalPopulation: []
    }
  },

  methods: {
    onCheckedPrefName(event) {
      const prefName = event.currentTarget.name;
      const prefCode = event.currentTarget.value;
      const isChecked = event.currentTarget.checked;

      if (isChecked) {
        this.$emit('check', { prefName, prefCode });
      } else {
        this.$emit('uncheck', prefCode);
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

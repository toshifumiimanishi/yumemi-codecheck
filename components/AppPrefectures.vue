<template>
  <div class="prefecture">
    <div class="prefecture_container">
      <h2 class="prefecture_heading">都道府県</h2>
      <ul class="prefecture_list">
        <li class="prefecture_item" v-for="prefecture in prefectures" :key="prefecture.prefCode">
          <label>
            <input type="checkbox" :value="prefecture.prefName" v-model="checkedPrefName">
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
      checkedPrefName: []
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

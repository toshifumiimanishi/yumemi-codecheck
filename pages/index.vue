<template>
  <div class="container">
    <div>
      <AppPrefectures :prefectures="prefectures" />
    </div>
  </div>
</template>

<script>
import AppPrefectures from '~/components/AppPrefectures.vue';

export default {
  components: {
    AppPrefectures
  },
  data() {
    return {
      prefectures: []
    };
  },
  async asyncData({ app }) {
    const { result } = await app.$axios
      .$get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': process.env.API_KEY
        }
      });

    return { prefectures: result };
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

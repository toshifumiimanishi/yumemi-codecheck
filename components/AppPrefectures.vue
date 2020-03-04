<template>
  <div>
    <ul v-for="prefecture in prefectures" :key="prefecture.prefCode">
      <li>{{ prefecture.prefName }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    prefectures: {
      type: Array
    }
  }
}
</script>

<style>

</style>

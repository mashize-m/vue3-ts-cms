<template>
  <div class="user">
    <div class="search">
      <msz-form v-bind="searchFormConfig"></msz-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MszForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    MszForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>

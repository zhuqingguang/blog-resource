<template>
  <div class="layout">
    <page-header :links="Headers" :active="activeItem"></page-header>
    <nuxt/>
  </div>
</template>
<script>
import PageHeader from '@/components/page-header.vue';
const Headers = [
  { text: '工具', to: '/tool' },
  { text: '资源', to: '/resource' },
  { text: '教程', to: '/lesson' },
  { text: '软件', to: '/software' },
];
export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      Headers,
    };
  },
  computed: {
    activeItem() { return this.$route.params.type || 'tool'; }
  },
};
</script>
<style>
.layout {
  width: 880px;
  margin: auto;
}
</style>

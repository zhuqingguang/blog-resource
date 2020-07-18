<template>
  <div>
      <list :list="list"></list>
  </div> 
</template>

<script>
import { flatten } from 'lodash';
import List from '@/components/list';
import toolList from '../../data/toolList.json';

export default {
  layout: 'default',
  components: {
      List,
  },
  created() {
      this.list = flatten(toolList);
  },
}
</script>

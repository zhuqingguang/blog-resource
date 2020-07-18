<template>
  <div>
      <list :list="list"></list>
  </div> 
</template>

<script>
import { flatten } from 'lodash';
import List from '@/components/list';
import toolList from '../../data/toolList.json';
import softwareList from '../../data/softwareList.json';
import resourceList from '../../data/resourceList.json';
import lessonList from '../../data/lessonList.json';

const ListData = {
    toolList: flatten(toolList),
    softwareList: flatten(softwareList),
    resourceList: flatten(resourceList),
    lessonList: flatten(lessonList),
};
export default {
  layout: 'default',
  components: {
      List,
  },
  data() {
    return {
    }
  },
  created() {
      const { type } = this.$route.params;
      this.list = ListData[`${type}List`];
  },
}
</script>

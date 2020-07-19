<template>
    <div class="list-wrap mx-3">
        <div 
            v-for="(data, index) of list"
            :key="index"
            class="sm:flex border rounded-lg p-4 mb-5 justify-between"
        >
            <div class="mr-5">
                <p class="text-xl text-bold text-teal-500 mb-3"><a :href="data.url">{{data.name}}</a></p>
                <p>{{data.description}}</p>
            </div>
            <img 
                class="img rounded mb-3"
                v-lazy="data.imgSrc" 
                :alt="data.name" 
                v-if="data.imgSrc"
            >
        </div>
    </div>
</template>
<script>
// import ListItem from './list-item';

export default {
    name: 'list',
    props: {
        list: {
            type: Array,
            required: () => [],
        },
    },
    components: {
        // ListItem,
    },
};
</script>
<style lang="less" scoped>
.img {
    max-height: 300px;
    max-width: 400px;
}
@media screen and (max-width: 768px) {
    .img {
        max-width: 100%;
    }
}
</style>

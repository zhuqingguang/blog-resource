<template>
    <header>
        <nav class="flex">
            <div 
                class="flex-1 text-center py-5 text-pink-500"
                :class="active === link.to.slice(1) ? 'text-pink-900 font-bold' : ''"
                v-for="link of links"
                :key="link.text"
            >
                <nuxt-link :to="link.to">{{link.text}}</nuxt-link>
            </div>
        </nav>
    </header>
</template>
<script lang="ts">
export default {
    name: 'page-header',
    props: {
        links: {
            type: Array,
            default: () => [],
        },
        active: {
            type: String,
            default: 'tool',
        },
    },
};
</script>

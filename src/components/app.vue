<template lang="pug">
    .debugger-wrap
        header-bar.header
        split-content.content
            .left(slot="left")
                .data-item(v-for="item in dataList" @click="chooseData(item)" :class="{'active': item === choose}") {{ item.name }}
            .right(slot="right")
                .data-obj
                    data-field(
                        v-for="(value, key) in choose"
                        :key="key"
                        :field="{ value, key }"
                        :depth="0"
                        )
</template>
<script>
import headerBar from './header-bar.vue';
import splitContent from './split-content.vue';
import dataField from './data-field.vue';
export default {
    components: {
        headerBar,
        splitContent,
        dataField,
    },
    data() {
        return {};
    },
    computed: {
        dataList() {
            return this.$store.state.data || [];
        },
        choose() {
            return this.$store.state.chooseData || {};
        },
    },
    methods: {
        chooseData(item) {
            this.$store.commit('chooseData', item);
        },
    },
};
</script>
<style lang="stylus" scoped>
@import './config.styl';
.debugger-wrap
    width 100%

.left
    overflow-y auto
    overflow-x hidden

.data-item
    @extend .ellipsis
    width 100%
    height data-height
    line-height data-height - 1
    border-bottom 1px solid #eee
    padding 0 0 0 20px
    cursor pointer
    box-sizing border-box
    &:hover
    &.active
        background blue
        color white
.data-obj
    padding 20px
</style>

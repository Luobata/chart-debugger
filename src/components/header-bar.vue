<template lang="pug">
    .header
        .name {{ name }}
        .refresh-icon(@click="refreshData") {{ refresh }}
</template>
<style lang="stylus" scoped>
@import './config.styl';
.header
    width 100%
    height header-height
    line-height header-height - 1
    border-bottom 1px solid #eee
    box-sizing border-box
    padding-left 10px
.name
    font 16px 'microsoft yahei'
    display inline-block
    vertical-align middle
.refresh-icon
    font 14px 'microsoft yahei'
    background blue
    color #fff
    height button-height
    line-height button-height
    text-align center
    padding 0 10px
    vertical-align middle
    display inline-block
    margin-left 20px
    cursor pointer
    border-radius 2px
    &:hover
        background #8FC0FD
</style>
<script>
export default {
    data() {
        return {
            name: 'Data-debugger',
            refresh: 'refresh',
        };
    },
    methods: {
        refreshData() {
            window.getData();
        },
    },
};
</script>

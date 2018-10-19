<template lang="pug">
.content(
    @mousemove="move"
    @mouseup="end"
    @mouseleave="end"
    :class="{ dragging: dragging }"
    )
    .left(:style="{'width': split + '%'}")
        slot(name="left")
        .dragger(@mousedown.prevent="start")
    .right(:style="{'width': (100 - split) + '%'}")
        slot(name="right")
</template>
<style lang="stylus" scoped>
@import './config.styl';
.content
    display flex
    height "calc(100% - %s)" % header-height
    &.dragging
        cursor ew-resize
    .left
    .right
        position relative
        box-sizing border-box
        height 100%
    .left
        border-right 1px solid #eee
        .dragger
            position absolute
            z-index 99
            top 0
            bottom 0
            right -5px
            width 10px
            cursor ew-resize
</style>
<script>
export default {
    data() {
        return {
            split: 20,
            dragging: false,
            x: 0,
            sX: 0,
        };
    },
    methods: {
        start(e) {
            this.dragging = true;
            this.x = e.pageX;
            this.sX = this.split;
        },
        move(e) {
            if (this.dragging) {
                const dx = e.pageX - this.x;
                const total = this.$el.getBoundingClientRect().width;
                this.split = this.sX + parseInt(dx / total * 100, 10);
            }
        },
        end() {
            this.dragging = false;
        },
    },
};
</script>

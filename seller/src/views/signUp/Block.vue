<template>
            <div class="block">
              <div class="block-title" :style="titleStyle" v-if="showTitle"><slot name="title"></slot></div>
              <div class="block-content" :style="contentStyle" v-if="showContent"><slot name="content"></slot></div>
            </div>
</template>

<script>
export default {
    name:'Block',
    components:{
        
    },
    props: {
        titleStyle:{
            type: Object,
            default: () => {}
        },
        contentStyle: {
            type: Object,
            default: () => {}
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showContent: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.block-title {
  border-left: 10px solid red;
  padding-left: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid red;
  font-size: large;
  margin-bottom: 20px;
  width: 70%;
}
.block-content {
  display: flex;
  flex-direction: column;
  width: 60%;
}
</style>
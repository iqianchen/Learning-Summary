<template>
  <div id="summary">
    <LoadingError v-if="isError" @reload='load' :errorDetails='errorDetails'></LoadingError>
    <component v-if="!isError" :is="nowComponent"></component>
  </div>
</template>

<script>
import LoadingError from "#/whole/LoadingError";

export default {
  data() {
    return {
      nowComponent: null,
      isError: false,
      errorDetails: ""
    }
  },
  components: {
    LoadingError
  },
  mounted() {
    let currentName = this.$store.state.menu.activeItem.name
    this.load(currentName)
  },
  methods: {
    load(currentName) {
      import(`@/assets/markdown/${currentName}.md`)
        .then(() => {
          setTimeout(() => {
            this.nowComponent = () => import(`@/assets/markdown/${currentName}.md`)
            this.isError = false
          }, 200)
        })
        .catch( err => {
          this.nowComponent = LoadingError
          this.isError = true
          this.errorDetails = err.message
        })
    }
  }
}
</script>

<style lang="less">
@import "~less/markdown.less";
@import "~less/markdown-highlight.less";
</style>


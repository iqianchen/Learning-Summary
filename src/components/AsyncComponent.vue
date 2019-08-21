<template>
  <div>
    <is-loading v-if='isLoading'></is-loading>
    <loading-error v-if="isError"  @reload='load' :errorDetails='errorDetails'></loading-error>
    <component :is="nowComponent" v-if='!isLoading && !isError' ref="componentChild"></component>
  </div>
</template>

<script>
import IsLoading from "./whole/IsLoading";
import LoadingError from "./whole/LoadingError";

export default {
  name: 'asyncComponent',
  components: {
		IsLoading,
		LoadingError
	},
	data() {
		return {
			nowComponent: null,
			isLoading: true,
			isError: false,
			errorDetails: ""
		}
	},
	props: {
		componentPath: {
			type: String,
			required: true
		},
		delay: {
			type: Number,
			default: 200
		},
	},
	mounted() {
    this.load()
  },
  methods: {
    load() {
      import(`v/${this.componentPath}`)
        .then(() => {
          setTimeout(() => {
						this.nowComponent = () => import(`v/${this.componentPath}`)
						this.isLoading = false
						this.isError = false
					}, this.delay)
        })
        .catch(err => {
          this.nowComponent = LoadingError
					this.isError = true
					this.isLoading = false
					this.errorDetails = err.message
        })
    }
  }
}
</script>

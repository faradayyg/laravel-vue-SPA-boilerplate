<template>
	<div class="mt-4 pt-4">
		<h2>
			This is the Home page <br /> 
			<small>{{message}}</small> <br />
			<small>
				<router-link to="/protected">Protected Page</router-link>
			</small>
		</h2>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				message : "welcome to my SPA"
			}
		}
	}
</script>
<!-- Use scoped styles to apply styles to the current component alone -->
<style scoped>
	h2{
		text-align: center;
	}
</style>
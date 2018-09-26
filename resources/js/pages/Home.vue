<template>
	<div class="mt-4 pt-4">
		<span style="float:right;">
			<a href="https://github.com/faradayyg/laravel-vue-SPA-boilerplate">View on Github</a>
		</span><br />
		<h2>
			This is the Home page <br /> 
			<small>{{message}}</small> <br />
			<small>
				<router-link to="/protected">Protected Page</router-link>
			</small>
		</h2>

		<div class="text-center">
			<hr />
			<h3>
				Nice! You have Successfully setup.
			</h3>
			<p>
				Here's what's included:
			</p>
			<ol>
				<li>
					Vue Toastr <button class="btn btn-default" @click="showToastr()"> Click </button>
				</li>
				<li>
					A http mixin (Wrapper around axios) <button class="btn btn-default" @click="makeRequest()"> Click </button> <br />
					<code>{{httpResponse}}</code>
				</li>
				<li>
					Vue Top Progress, Will always appear at the top when a network call is being made <b>using the http mixin above</b> (except you remove it from the App.vue 😒)
				</li>
				<li>
					An EventBus plugin. This emits application-wide messages, which can be listened to by other components.<br /> 
					<b>Usage:</b> <code>this.eventBus.$emit('some.action')</code> 
					<br />to listen for a specific event:
					<code>this.$eventBus.$on('some.action', doSomething)</code>
				</li>
				<li>
					A Vuex Store. I'd normally declare the functions that call the mutators inside the mixin in my bootstrap.js, but hey, do you ¯\_(ツ)_/¯
				</li>
			</ol>

			<hr />

			<h3>How it works</h3>
			<ol>
				<li>
					Routing: All routes are declared in the <code>routes.js</code>  file.
				</li>
				<li>
					Further information about a route can be passed using the <code>meta</code> attribute
				</li>
				<li>
					Protected routes have the <code>meta.requiresAuth</code> attribute set to true.
				</li>
				<li>
					Routes that should not be visited if logged in, Eg. "login page", should have the <code>meta.requiresAuth</code> attribute set to false.
				</li>
				<li>
					The compile-time configuration variables are stored in <code>resources/js/config/env.js</code>. This includes the base URL, the name of the localStorage key for the token, (Which I called cookie_name), coz <a href="https://en.wikipedia.org/wiki/Hobnob_biscuit">Hobnob</a>
					<br />
					Other Custom config variables can be passed in there as well
				</li>
				<li>
					The store is a Vuex instance <a href="https://scotch.io/tutorials/state-management-in-vue-getting-started-with-vue">Read More</a>
				</li>
				<li>
					The eventBus is a vue instance passed into the main vue instance as a mixin. Used for emitting and listening for events across components.
				</li>
			</ol>

		</div>
		<div class="text-center">
			<hr>
			There are probably other cool stuff in there which I forgot to document. Let me know if you find any of such things. 
			faradayyg@gmail.com
			<br />
			Special thanks to <a href="https://github.com/ezra-obiwale">Ezra Obiwale </a>, PS: he taught me a lot.
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				message : "welcome to my SPA",
				httpResponse: null
			}
		},
		methods : {
			showToastr() {
				let type = Math.round(Math.random());

				if(type == 1) {
					this.$toastr.s('Hello World people, this is not an error');
				} 
				else {
					this.$toastr.e('Hello World people, this is not success');
				}
			},
			makeRequest() {
				this.http.get('/test').then(resp=>{
					this.httpResponse = resp;
				})
			}
		}
	}
</script>
<!-- Use scoped styles to apply styles to the current component alone -->
<style scoped>
	h2{
		text-align: center;
	}
	ol {
		max-width: 500px;
		margin: auto;
		text-align: left;
	}
	ol li{
		margin: 10px;
		padding-left: 15px;
	}
</style>
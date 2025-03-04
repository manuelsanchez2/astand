<script lang="ts">
	import Counter from '../components/Counter.svelte';
	import Greeter from '../components/Greeter.svelte';
	import Profile from '../components/Profile.svelte';
</script>

<main class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="text-4xl font-bold">Astand Tests</h1>

	<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
		<h2>Simple: Counter</h2>
		<Counter />
	</section>
	<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
		<h2>Simple: Greeter</h2>
		<Greeter />
	</section>
	<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
		<h2>Simple: Profile</h2>
		<Profile />
	</section>
</main>

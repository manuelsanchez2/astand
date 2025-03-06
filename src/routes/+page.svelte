<script lang="ts">
	import AstandDebugSection from '../components/AstandDebugSection.svelte';
import Counter from '../components/Counter.svelte';
	import GithubCorner from '../components/GithubCorner.svelte';
	import Greeter from '../components/Greeter.svelte';
	import Profile from '../components/Profile.svelte';
	import TestCombined from '../components/TestCombined.svelte';
</script>

<main class="flex min-h-screen flex-col items-center justify-center">
	<GithubCorner />

	<AstandDebugSection />

	<h1 class="text-4xl font-bold">Astand Playground</h1>

	<div class="flex flex-wrap items-start justify-center gap-3">
		<div>
			<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
				<h2>Simple: Counter</h2>
				<Counter />
			</section>
			<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
				<h2>Simple: Greeter</h2>
				<Greeter />
			</section>
		</div>
		<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
			<h2>Simple: Profile</h2>
			<Profile />
		</section>
		<section class="my-6 flex flex-col space-y-4 rounded-lg border-2 border-black p-4">
			<h2>Combined Store: Counter + Greeter</h2>
			<TestCombined />
		</section>
	</div>
</main>

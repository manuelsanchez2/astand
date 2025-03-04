<script lang="ts">
	import { profileStore } from '../stores/profileStore.svelte';

	// Bind local variables to the store's reactive snapshot.
	let name = $profileStore.name;
	let age = $profileStore.age;
	let city = $profileStore.address.city;
	let country = $profileStore.address.country;

	function updateProfile() {
		profileStore.updateName(name);
		profileStore.updateAge(Number(age));
		profileStore.updateAddress({ city, country });
	}
</script>

<div class="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
	<!-- Display current profile -->
	<div class="profile mb-6">
		<p class="text-xl font-semibold">Current Profile</p>
		<div class="flex items-center gap-2">
			<p class="font-medium">Name:</p>
			<span>{$profileStore.name}</span>
		</div>

		<div class="flex items-center gap-2">
			<p class="font-medium">Age:</p>
			<span>{$profileStore.age}</span>
		</div>

		<div class="flex items-center gap-2">
			<p class="font-medium">City:</p>
			<span>{$profileStore.address.city}</span>
		</div>

		<div class="flex items-center gap-2">
			<p class="font-medium">Country:</p>
			<span>{$profileStore.address.country}</span>
		</div>
	</div>

	<!-- Accessible form with fieldset and legend -->
	<fieldset class="rounded border border-gray-300 p-4">
		<legend class="px-2 text-lg font-bold">Update Your Information</legend>
		<div class="space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="age" class="block text-sm font-medium text-gray-700">Age</label>
				<input
					id="age"
					type="number"
					bind:value={age}
					class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="city" class="block text-sm font-medium text-gray-700">City</label>
				<input
					id="city"
					type="text"
					bind:value={city}
					class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</div>
			<div>
				<label for="country" class="block text-sm font-medium text-gray-700">Country</label>
				<input
					id="country"
					type="text"
					bind:value={country}
					class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</div>
		</div>
	</fieldset>
	<button
		on:click={updateProfile}
		class="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
	>
		Update Profile
	</button>
</div>

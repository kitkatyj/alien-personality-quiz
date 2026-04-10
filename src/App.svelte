<script lang="ts">
	import { onMount } from "svelte";
	import OptionButton from "./components/optionButton.svelte";

	// Store the fetched questions (optional; primarily we console.log them)
	let questions: [] = [];
	let fetchError: any = null;

	onMount(async () => {
		try {
			// Fetch from the public folder at the app root
			const res = await fetch("/questions.json");

			if (!res.ok) {
				throw new Error(
					`Failed to fetch /questions.json: ${res.status} ${res.statusText}`,
				);
			}

			questions = await res.json();

			// Log the fetched JSON to the console as requested
			console.log("questions.json:", questions);
		} catch (err) {
			fetchError = err;
			console.error("Error fetching questions.json:", err);
		}
	});

	let step = $state(-1);
</script>

<h1 hidden={step >= 0}>Your Alien Personality Quiz</h1>

{#if step < 0}
	{#if fetchError}
		<p style="color: red">
			Error loading questions.json. See console for details.
		</p>
	{:else if questions === null}
		<p>Loading questions.json…</p>
	{:else}
		<OptionButton
			text={"Start"}
			onclick={() => {
				step = 0;
			}}
		/>
	{/if}
{:else}
	<p>{JSON.stringify(questions[step])}</p>
{/if}

<style>
</style>

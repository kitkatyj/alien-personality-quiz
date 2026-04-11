<script lang="ts">
	import { onMount } from "svelte";
	import Start from "./components/Start.svelte";
	import OptionButton from "./components/OptionButton.svelte";
	import Question from "./components/Question.svelte";
	import { getPersonalityType } from './utils';

	// Store the fetched questions (optional; primarily we console.log them)
	let questions: [] = [];
	let fetchError: any = null;

	onMount(async () => {
		try {
			const res = await fetch("/questions.json");

			if (!res.ok) {
				throw new Error(
					`Failed to fetch questions: ${res.status} ${res.statusText}`,
				);
			}

			questions = await res.json();
		} catch (err) {
			fetchError = err;
			console.error("Error fetching questions.json:", err);
		}
	});

	let step = $state(-1);
	let personalitiesCount = $state("");
	let playerName = $state("");

	$inspect(playerName);

	const handleNextQuestion = (value:[]) => {
	  personalitiesCount += value.join("");
	  step += 1;
	}

	const handleReset = () => {
	  step = -1;
		personalitiesCount = ""
	}
</script>

<h1 hidden={step >= 0}>Your Alien Personality Quiz</h1>

{#if step < 0}
  <Start {fetchError} loading={questions===null} handleStart={() => step = 0}/>
{:else if step < questions.length}
  {#if questions[step].question}
    <Question qn={questions[step]} {handleNextQuestion} {playerName}/>
  {:else}
    <h2>{questions[step].cutscene ? questions[step].cutscene : "Invalid question."}</h2>

    {#if step === 0}
      <input bind:value={playerName}/>
    {/if}

    <OptionButton text={"Next"} onclick={()=>step+=1} />
  {/if}
{:else}
  <h2>Your personality is {getPersonalityType(personalitiesCount)}</h2>
  <OptionButton text={"Reset"} onclick={handleReset}/>
{/if}

<style>

</style>

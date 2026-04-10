<script>
  let { qn, handleNextQuestion, playerName } = $props();
  import OptionButton from "./OptionButton.svelte";
	import { shuffle } from '../utils';
</script>

<h2>{@html qn.question.replace(/\n/g, "<br><br>").replace("[Player]", playerName)}</h2>

{#if qn.calltoaction}
  <p>{qn.calltoaction}</p>
{/if}

{#each shuffle(qn.options) as option}
  <OptionButton text={option.text} onclick={() => handleNextQuestion(option.value)}/>
{/each}
<script>
  import OptionButton from "./OptionButton.svelte";
  let { fetchError, loading, handleStart } = $props();
</script>

{#if fetchError}
	<p style="color: red">
		Error loading questions.json. See console for details.
	</p>
{:else if loading}
	<p>Loading…</p>
{:else}
	<OptionButton text={"Start"} onclick={handleStart}/>
{/if}
<script>
	import { missChanceItems, addItem, createItem} from './MissChanceStore';
	import NewMissChanceForm from './NewMissChanceForm.svelte';
	import Modal from './Modal.svelte';
	let modal;
</script>
<svelte:head>
	<title>Random miss chance</title>
</svelte:head>
<main>
	<h1>Random miss chance</h1>
	<p>Miss chance range generator</p>
	<button class="create-button" on:click={() => modal.visible.set(true)}>Create new</button>

	<section class = 'miss-chance-section'>
		{#each $missChanceItems as item}
			<svelte:component this={item.component} {...item} />
		{/each}
	</section>
</main>

<Modal bind:this={modal} modalContent={NewMissChanceForm}/>

<style>
	:global(:root){
        --dark-1: #041C32;
		--dark-2: #04293A;

		--medium-1: #064663;

		--light-1: #ECB365;

		--light-3: white;

		--test-1: yellow;
		--test-2: rgb(223, 17, 238);
		--test-3: rgb(0, 253, 34);
    }

	:global(body) {
		background: var(--dark-1);
		padding: 0;
		margin: 0;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		max-width: 90%;
		height: 100%;
		/* background-color: var(--dark-2); */
	}

	main > p {
		color: var(--light-3);
		padding:0;
		margin:0;
		margin-bottom: 0.5em;
	}

	h1 {
		color: var(--light-1);
		text-transform: uppercase;
		font-size: 1.75em;
		font-weight: 200;
	}

	.create-button {
		margin-bottom: 2em;
	}

	.miss-chance-section {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2em;
	}
</style>
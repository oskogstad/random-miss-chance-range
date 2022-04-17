<script>
    import { writable } from 'svelte/store';
    export let modalContent;
    let modal;

    export const visible = writable(false);
    visible.subscribe(value => {
        if(modal)
            modal.style.setProperty('display', `${value ? 'flex' : 'none'}`);
    });

    const onModalClick = (event) => {
        if(event.target.classList.contains('modal'))
            closeModal();
    };

    const closeModal = () => {
        visible.set(false);
    };
</script>

<div class='modal' bind:this={modal} on:click={onModalClick}>
    <div class='modal-content'>
        <button on:click={closeModal}>X</button>
        <div>
            <svelte:component on:click this={modalContent} callback={closeModal}/>
        </div>
    </div>
</div>

<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 4;
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
		justify-content: center;
		align-items: center;
    }

    /* Modal Content */
    .modal-content {
        background-color: var(--medium-1);
        color: var(--light-3);
        padding: 1em;
        border-radius: 20px;
        border: 1px solid #888;
        min-width: 14em;
    }
</style>
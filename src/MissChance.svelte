<script>
    export let id;
    export let name;
    export let rangeStart;
    export let rangeEnd;
    export let missChance;
    export let gcpRule;
    export let component;

    import { removeItem, setNewRange, getRange } from './MissChanceStore';

    import { remoji } from './Emojis';

    let waitingText = "Awaiting jawn ..."
    let rollResultText = waitingText;
    let rolledNumberInput = "";
    let success = [];
    let fails = [];

    let numbers = getRange(id);

    success = numbers.success;
    fails = numbers.fails;

    const onRollInput = () => {
        if(rolledNumberInput == '') {
            rollResultText = waitingText;
            return;
        }

        const parsedRoll = parseInt(+rolledNumberInput);
        if(Number.isInteger(parsedRoll)) {
            if(numbers.success.includes(parsedRoll)) {
                if(parsedRoll == 69 && gcpRule)
                    rollResultText = `69! Best result! ${remoji.get69Emoji()}`;
                else 
                    rollResultText = `${parsedRoll} is a hit! ${remoji.getHitEmoji()}`;
            }
            else if(numbers.fails.includes(parsedRoll))
                if(parsedRoll == 86 && gcpRule)
                    rollResultText = `86! Worst result! ${remoji.get86Emoji()}`;
                else
                    rollResultText = `${parsedRoll} is a miss! ${remoji.getMissEmoji()}`;
            else
                rollResultText = `${parsedRoll} is not in range! ${remoji.getOutOfRangeEmoji()}`;
        }
        else {
            rollResultText = "Integers only!";
        }
    }

    const onRegenerateClick = () => {
        setNewRange(id, rangeStart, rangeEnd, missChance, gcpRule); 
        let numbers = getRange(id);
        success = numbers.success;
        fails = numbers.fails;

        rolledNumberInput = "";
        rollResultText = waitingText;
    }
</script>

<div class='miss-chance'>
    {#if gcpRule }
    <div class='ribbon' title='86 always fails, 69 always succeeds'>GCP Rule ✔</div>
    {/if}
    <div class='miss-chance-content'>
        <div class='name-check-wrapper'>
            <h2>{name}</h2>
            <label class="check-wrapper">Rolled:
                <input on:keyup={onRollInput} class="check-input" type="text" bind:value={rolledNumberInput} />
            </label>
        </div>
        <h3 class='roll-result'>{rollResultText}</h3>

        <label for='success-numbers'>Success:</label>
        <ul id='success-numbers'>
            {#each success as successNumber }
                <li class={parseInt(+rolledNumberInput) == successNumber ? 'marked-li-success' : ''}>
                    {successNumber}
                </li>
            {/each}
        </ul>
        <label for='fail-numbers'>Fail:</label>
        <ul id='fail-numbers'>
            {#each fails as failNumber}
                <li class={parseInt(+rolledNumberInput) == failNumber ? 'marked-li-fail' : ''}>
                    {failNumber}
                </li>
            {/each}
        </ul>
        
        <div class='button-wrapper'>
            <button on:click={() => removeItem(id)}>Delete</button>
            <button on:click={onRegenerateClick}>Randomize</button>
        </div>
    </div>
</div>

<style>
    h2 { 
        font-size: 1em;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        display: flex;
        flex-wrap: wrap;
        gap: 0.23em;
    }

    li { 
        font-size: 0.65em;
        padding: 0.05em;
        min-width: 1.5625em;
    }

    .marked-li-success {
        background-color: green;
    }

    .marked-li-fail {
        background-color: red;
    }

    .roll-result {
        margin:0 auto;
        line-height: 1em;
    }

    .check-wrapper {
        display:flex;
        flex-direction:column;
    }

    .check-input {
        max-width: 4em;
    }

    .name-check-wrapper {
        justify-content: space-between;
        display: flex;
        padding: 0 2em;
    }

    .button-wrapper {
        display: flex;
        gap: 2em;
        justify-content: center;
        border-top: 0.1em solid black;
        padding: 0.6em;
    }

    .miss-chance-content {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .miss-chance {
        background-color: var(--medium-1);
        color: var(--light-3);
        position: relative;
        padding: 0.5em 1em;
        max-width: 27em;
        width: 80%;
        box-shadow: 0 0 15px rgba(0,0,0,.1);
    }

    .ribbon {
        background-color: darkgrey;
        top: -12px;
        left: 40px;
        display: inline-block;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: var(--light-3);
        font-size: 0.688rem;
        position: absolute;
        padding: 0 10px;
        font-weight: 600;
        -webkit-box-shadow: -3px 3px 3px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: -3px 3px 3px 0px rgba(0,0,0,0.15);
        box-shadow: -3px 3px 3px 0px rgba(0,0,0,0.15);
        z-index: 2;
    }

    .ribbon::after {
        content: "";
        position: absolute;
        left: -12px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 12px 12px;
        border-color: transparent transparent grey transparent;
        z-index: 10;
    } 
</style>
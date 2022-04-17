<script>
    export let callback;
	import { addItem, createItem} from './MissChanceStore';
    
    let title;
    let titleError;

    let rangeStart;
    let rangeStartError;

    let rangeEnd;
    let rangeEndError;

    let missChance;
    let missChanceError;
    
    let gcpRule = false;

    const handleKeyPress = (event) => {
        if(event.keyCode === 13)
            createMissChance();
    }

    const createMissChance = () => {
        clearErrors();
        if(inputIsValid()) {
            const item = createItem(title, parseInt(rangeStart), parseInt(rangeEnd), parseInt(missChance), gcpRule);
            addItem(item);
            clearErrors();
            clearInputs();
            callback();
        }
    }

    const logItem = (prefix, item) => {
        console.log(prefix, ': ', item, 'typeof: ', typeof item);
    }

    const inputIsValid = () => {
        let numberOfErrors = 0;

        logItem("Title", title);
        if(!title) {
            titleError = "Needs a name";
            numberOfErrors++;
        }
        
        let parsedRangeStart = parseInt(+rangeStart);
        if(!Number.isInteger(parsedRangeStart)) {
            rangeStartError = "Start needs to be an integer";
            numberOfErrors++;
        }
        if(parsedRangeStart <= 0) {
            numberOfErrors++;
            rangeStartError = "Must be bigger than 0";
        }

        let parsedRangeEnd = parseInt(+rangeEnd);
        if(!Number.isInteger(parsedRangeEnd)) {
            rangeEndError = "End needs to be an integer";
            numberOfErrors++;
        }
        if(parsedRangeEnd <= 0) {
            numberOfErrors++;
            rangeEndError = "Must be bigger than 0";
        }

        let parsedMissChance = parseInt(+missChance);
        if(!Number.isInteger(parsedMissChance)) {
            missChanceError = "Number of misses/fails needs to be an integer";
            numberOfErrors++;
        }
        if(parsedMissChance <= 0) {
            numberOfErrors++;
            missChanceError = "Must be bigger than 0";
        }

        if(parsedRangeStart && parsedRangeEnd && parsedMissChance) {
            if(parsedRangeStart > parsedRangeEnd) {
                rangeStartError = "Start needs to be lower than End";
                rangeEndError = "End needs to be higher than Start";
                return false;
            }

            const rangeLength = (parsedRangeEnd - parsedRangeStart) + 1;
            if(rangeLength <= 1) {
                rangeStartError = "Range needs to be bigger than 1" 
                rangeEndError = "Range needs to be bigger than 1" 
                return false;
            }
            
            if(parsedMissChance >= rangeLength) {
                missChanceError = `Miss chance must be smaler than range (current maximum is ${rangeLength - 1})`;
                return false;
            }
        };

        return numberOfErrors === 0;
    }

    const clearErrors = () => {
        titleError = rangeStartError = rangeEndError = missChanceError = undefined;
    };

    const clearInputs = () => {
        title = rangeStart = rangeEnd = missChance = gcpRule = undefined;
    }

</script>

<div class="new-miss-chance-wrapper">
    <h2>Create new miss chance</h2>
    <label for="name-input">Name
        <label class='error-label' for="name-input" style="display: {titleError ? 'block' : 'none'}">
            {titleError}
        </label>
    </label>
    <input id="name-input" on:keypress={handleKeyPress} bind:value={title} type="text" placeholder="Name" />
    

    <label for="start-input">Start (inclusive)
        <label class='error-label' for="start-input" style="display: {rangeStartError ? 'block' : 'none'}">
            {rangeStartError}
        </label>
    </label>
    <input id="start-input" on:keypress={handleKeyPress} bind:value={rangeStart} type="text" placeholder="Integer, start of range">

    <label for="end-input">End (inclusive)
        <label class='error-label' for="end-input" style="display: {rangeEndError ? 'block' : 'none'}">
            {rangeEndError}
        </label>
    </label>
    <input id="end-input" on:keypress={handleKeyPress} bind:value={rangeEnd} type="text" placeholder="Integer, end of range">
    
    <label for="miss-chance-input">Number of misses in range
        <label class='error-label' for="miss-chance-input" style="display: {missChanceError ? 'block' : 'none'}">
            {missChanceError}
        </label>
    </label>
    <input id="miss-chance-input" on:keypress={handleKeyPress} bind:value={missChance} type="text" placeholder="Integer, how many should be fails">

    <label for="gcp-rules-checkbox">GCP rules
        <i title="If they are present, 69 always succeeds, and 86 always fails">(?)</i>
    </label>
    <label class="switch">
        <input bind:checked={gcpRule} id='gcp-rules-checkbox' type="checkbox">
        <span class="slider"></span>
    </label>
    
    <button on:click={createMissChance}>Create</button>
</div>

<style>
    .new-miss-chance-wrapper {
        padding: 1.5em;
        display: flex;
        gap: 0.2em;
        flex-direction: column;
    }

    .error-label {
        color: var(--light-1);
        gap:0;
        font-size: 0.75em;
    }

     /* The switch - the box around the slider */
    .switch {
        position: relative;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>

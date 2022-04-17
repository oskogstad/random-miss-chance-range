import { writable } from 'svelte/store';
import MissChance from './MissChance.svelte';

export const missChanceItems = writable([]);

export const addItem = (newItem) => {
    missChanceItems.update(existinItems => [
        newItem,
        ...existinItems
    ]);
    window.location = window.location;
}

export const removeItem = (id) => {
    missChanceItems.update(existingItems => 
        existingItems
            .filter(missChance => missChance.id !== id));
    window.localStorage.removeItem(id);
    window.location = window.location;
}

export const getRange = (id) => {
    return JSON.parse(window.localStorage.getItem(id));
}

export const setNewRange = (id, rangeStart, rangeEnd, missChance, gcpRule) => {
    const randomMissChanceData = generateRandomMissChance(rangeStart, rangeEnd, missChance, gcpRule);
    window.localStorage.setItem(id, JSON.stringify(randomMissChanceData));
}

const generateRandomMissChance = (rangeStart, rangeEnd, missChance, gcpRule) => {
    const remainingNumbers = [];

    for(let i = rangeStart; i <= rangeEnd; i++) {
        remainingNumbers.push(i);
    };

    let success = [];
    let fails = [];

    if(gcpRule) {
        let theBestIndex = remainingNumbers.indexOf(69);
        if(theBestIndex > -1) {
            let item = remainingNumbers.splice(theBestIndex, 1).pop();
            success.push(item);
        }

        let theWorstIndex = remainingNumbers.indexOf(86);
        if(theWorstIndex > -1) {
            let item = remainingNumbers.splice(theWorstIndex, 1).pop();
            fails.push(item);
        }
    }

    for(let i = fails.length; i < missChance; i++) {
        let randomIndex = Math.floor(Math.random()*remainingNumbers.length);
        let failItem = remainingNumbers.splice(randomIndex, 1).pop();

        fails.push(failItem);
    }

    success = remainingNumbers.concat(success);

    success.sort((a, b) => a > b);
    fails.sort((a, b) => a > b);

    return { success, fails };
}

const generateId = () => (Math.random() + 1).toString(36).substring(2);

export const createItem = (name, rangeStart, rangeEnd, missChance, gcpRule) => {
    const id = generateId();
    
    setNewRange(id, rangeStart, rangeEnd, missChance, gcpRule);

    return {
        id,
        name,
        rangeStart,
        rangeEnd,
        missChance,
        gcpRule,
        component: MissChance
    }
}

const storedItems = window.localStorage.getItem('storedItems');
const config = JSON.parse(storedItems);

if (config) {
    for (const item of config) {
        missChanceItems.update(existingItems => [
            ...existingItems, 
            { ...item, component: MissChance}
        ]);
    }
}
else {
    missChanceItems.set([
        createItem("50% miss chance", 1, 100, 50, true),
        createItem("20% miss chance", 1, 100, 20, true),
    ]);
}

missChanceItems.subscribe(value => {
    if(value) {
        window.localStorage.setItem('storedItems', JSON.stringify(value));
    }
});
const getHitEmoji = () => {
    const emojis = ['😁', '😻', '👌', '👍', '🙌', '‼️', '✅'];
    return getRandomEmoji(emojis);
}

const getMissEmoji = () => {
    const emojis = ['😵', '🤐', '🥵', '😵‍💫', '😣', '👎', '🙈', '❌'];
    return getRandomEmoji(emojis);
}

const getOutOfRangeEmoji = () => {
    const emojis = ['🙅', '🙅‍♂️', '🙅‍♀️','🚫', '⛔', '⚠️'];
    return getRandomEmoji(emojis);
}

const get69Emoji = () => {
    const emojis = ['🤩', '🤑', '🤭', '💃', '🕺', '🎩', '🥳', '🎊', '🎉'];
    return getRandomEmoji(emojis);
}

const get86Emoji = () => {
    const emojis = ['🏥', '🤮', '😱', '😰', '🤡', '💩', '🤦', '🤦‍♂️', '🤦‍♀️'];
    return getRandomEmoji(emojis);
}

const getRandomEmoji = (list) => {
    return list[Math.floor(Math.random()*list.length)];
}

export const remoji =  {
    getHitEmoji,
    getMissEmoji,
    getOutOfRangeEmoji,
    get69Emoji,
    get86Emoji
} 
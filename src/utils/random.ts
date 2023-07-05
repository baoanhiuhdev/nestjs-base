function random(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1)) + from
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }

    return array
}

export { random, shuffle }
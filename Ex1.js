import fetch from "node-fetch"
const getUniqueWordCount = (text, limit) => {
    return new Promise((resolve, reject) => {
        try {
            let textArray = text.split(' ').filter(x => x)

            const wordCount = {}

            textArray.forEach(word => {
                wordCount[word] = wordCount[word] || 0;
                wordCount[word] += 1;
            })

            let wordArray = Object.keys(wordCount)

            let topWordAray = wordArray.sort((a, b) => {
                return wordCount[b] - wordCount[a]
            }).slice(0, limit)

            let returnArray = []
            topWordAray.forEach(word => {
                returnArray.push({
                    word,
                    count: wordCount[word]
                })
            })
            resolve(returnArray)
        } catch (e) {
            reject(e)
        }
    })
}
const ex1 = async () => {
    try {
        const res = await fetch('http://norvig.com/big.txt')
        const data = await res.text()
        await getUniqueWordCount(data, 10).then(res => console.log(JSON.stringify(res)))
    } catch (e) {
        console.log(e)
    }
}

ex1()
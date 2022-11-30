import express, { response } from "express"
import fetch from "node-fetch"
const url = "https://randomuser.me/api/"
const app = express()

// sol 1
app.get("/sol/1", async (req, res) => {
    let users = []
    try {
        const limit = req.query.count
        for (let i = 0; i < limit; i++) {
            await fetch(url).then(res => res.json()).then(data => {
                let user = getUser(data.results[0])
                users.push(user)
            })
        }
        res.status(200).send(users)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// sol 2
app.get("/sol/2", async (req, res) => {
    let users = []
    try {
        const limit = req.query.count
        await fetch(`https://randomuser.me/api/?results=${limit}`).then(res => res.json()).then(data => {
            for (let i = 0; i < limit; i++) {
                let user = getUser(data.results[i])
                users.push(user)
            }
        })
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})



// sol 3 // giving error on this api but work fine with "https://jsonplaceholder.typicode.com/todos/"

/* app.get("/sol/3", async (req, res) => {
    try {
        let users = []
        const limit = new Array(req.query.count).fill(1).map((num, i) => i + 1)

        Promise.all(limit.map(async i => await fetch("https://jsonplaceholder.typicode.com/todos/"))
        ).then(responses => responses.forEach(async response => {
            const data = await response.json();
            // const user = getUser(data.results[0])
            users.push(users)
        }))
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})
*/


const getUser = (data) => {
    return {
        name: `${data.name.title} ${data.name.first} ${data.name.last}`,
        dob: data.dob.date.split('T')[0],
        email: data.email
    }
}


app.listen(1999, () => {
    console.log("server starte http://localhost:1999")
})
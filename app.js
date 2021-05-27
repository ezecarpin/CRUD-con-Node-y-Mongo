const express = require("express")
const app = express()
const port = process.env.PORT || 3000


// Motor de plantilla
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use(express.static(__dirname + "/public"))

app.get ("/", (req, res) => {
    res.render("index", { titulo: "inicio con EJS"})
})

app.get ("/servicios", (req, res) => {
    res.render("servicios", { titulo: "Pagina de nosotros"})
})

app.use((req, res, next) => {
    res.status(404).render("404", { titulo: "Pagina 404"})
})

app.listen(port, () => {
    console.log(`server funcionando en ${port}`)
})
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())



app.listen(3000, () => {
    console.log('Sever running on port 3000')
})


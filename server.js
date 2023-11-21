const express=require('express')
const app=express()

app.use(express.json())

const favLangs= ['html','css','javascript','react']

app.get('/api/get-records',(req,res)=>{
    res.json({lang:favLangs})
})


app.post('/api/add-record',(req,res)=>{

    const record=req.body.record
    favLangs.push(record)
    res.json({status: 'ok'})
})



app.listen(3001,()=>{
    console.log('server started on 3001')
})
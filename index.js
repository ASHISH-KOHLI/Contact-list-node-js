const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const port= 8000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
var contactList =[
    {
        name:'ashish', 
        phone:'1111111111'
    },
    {
        name:'ash', 
        phone:'123456789'  
    },
    {
        name:'ashish', 
        phone:'0123456789'
    }
]


app.get('/',(req,res) => { 
   return res.render('home',{
    title:" Contact List",
    contact_list: contactList
})
})




app.get('/practice',(req,res) => { 
    return res.render('practice',{
        title:"Practice"   
    })
 })

 app.post('/create-contact', (req, res) => {
    // return res.redirect('/practice')
   contactList.push({
    name:req.body.name,
    phone:req.body.phone
   })

   return res.redirect('/')
  })






app.listen(port, (err) => {
    if(err){console.log(`error in running the server`,err);}
    console.log(`express server is running on ${port}`)
  })
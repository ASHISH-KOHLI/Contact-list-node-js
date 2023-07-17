const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const port= 8000
const db = require('./config/mongoose');
const Contact = require('./models/contact');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

app.use( express.static('assets'))




// middelware 1
// app.use((req, res, next) => {
//     console.log('middleware 1 called')
//     next()
//   })


// //   middelware 2
// app.use((req, res, next) => {
//     console.log('middleware 1 called')
//     next()
//   })

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
//    return res.render('home',{
//     title:" Contact List",
//     contact_list: contactList
// })
 
   Contact.find(req.body).then(contacts => {
    console.log("Contacts fetched successfully")
    res.render('home',{
        title:'Contact list',
        contact_list : contacts
    })
   })
   .catch (err => {
    console.log('error in fetching contact from database');
    return;
   })

})




app.get('/practice',(req,res) => { 
    return res.render('practice',{
        title:"Practice"   
    })
 })



 app.post('/create-contact', (req, res) => {
// return res.redirect('/practice')
//    contactList.push({
//     name:req.body.name,
//     phone:req.body.phone
//    })
    Contact.create(req.body).then(newContact => {
        console.log('new contact created:', newContact)
        res.redirect('/')
    })
     .catch(err =>{
        console.log('Error in creating contact:', err);
        res.status(500).send('Error in creating contact');
     })

  })

//   for deleting a contact
  app.get('/delete-contact/', (req, res) => {
    // get the id from the query in url id=phone
    let id = req.query.id

    // find the contact in  the database using id and delete
    //  let contactIndex = contactList.findIndex(contact => contact.phone);
    //  if(contactIndex !=1){
    //     contactList.splice(contactIndex,1);
    //  }


    Contact.findByIdAndDelete(id)
    .then(id => {
        res.redirect('/')

    })
    .catch(err => {
        consol.log('error in deleting an object from database')
        return;
    })
    
  })




app.listen(port, (err) => {
    if(err){console.log(`error in running the server`,err);}
    console.log(`express server is running on ${port}`)
  })
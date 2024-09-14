const express=require('express')
const exphbs=require('express-handlebars')
const app=express()
const port=5000;
//config ahndlebars 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
//middleware verifier les heures ouvrables 
const workHours=(req,res,next)=>{
    const now=new Date();
    const day=now.getDay();//0=dimanche 1=lundii...
    // const hour=now.getHours();
    if (day >= 1 && day <= 7) {
        next(); // L'application est disponible pendant les heures ouvrables
    } else {
        res.send('L\'application est disponible uniquement pendant les heures ouvrables.');
    }

}
app.use(workHours)
app.use(express.static('public'))
//routes 
app.get('/',(req,res)=>{
    res.render('home',{title:'Accueil'});

})
app.get('/services',(req,res)=>{
    res.render('services',{title:'nos service'});

})

app.get('/contact',(req,res)=>{
    res.render('contact',{title:'constacter nous '});

})

app.listen(port,()=>{
    console.log(`serveur demarer sur http://localhost:${port}`)
})

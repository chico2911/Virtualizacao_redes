var express = require('express');
var router = express.Router();
var axios = require('axios')
var link = 'http://json:3000'
var authentication = 'http://localhost:5000'

/* GET home page. */
router.get(['/alunos','/'], (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  console.log(req.user)
  axios.get(link+'/alunos')
  .then(response=>{ 
    res.render('index', {lista: response.data,level:req.user.level})
  })
})

router.get('/alunos/:id', (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  console.log(req.params.id)
  axios.get(link+'/alunos/'+req.params.id)
  .then(response=>{
    res.render('aluno', {aluno: response.data,level:req.user.level})
  })
})

router.get('/adicionar', (req, res) => {
  axios.get(link+'/instrumentos')
  .then(response=>{ 
    res.render('adicionar',{lista:response.data})
  })
  
})

router.post('/adicionar', (req, res) => {
  aluno = req.body;
  axios.post(link+'/alunos',aluno)
  .then(response=>{ 
    res.redirect('/alunos')
  })
  
})

router.get('/apagar/:id', (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  console.log(req.user)
  axios.delete(link+'/alunos/'+req.params.id)
  .then(response=>{ 
    res.redirect('/alunos')
  })
})


module.exports = router;

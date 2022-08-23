const dbConnection = require('../../config/dbConnection');

module.exports = app => {

  const connection = dbConnection();

  
  
  app.get('/semestre', (req,res)=>{
    connection.query('select nombre from materia', (e,r) => {
      res.render('semestre',{
        materia:r,
        title:'semestre'
      }); 
    });
  })
  
  app.get('/perfil', (req,res)=>{
    res.render('perfil.ejs',{
      title:'semestre'
    })
  })
  app.get('/menu', (req,res)=>{
    res.render('main.ejs',{
      title:'semestre'
    })
  })
  
  app.get("/",function(req,res){
    connection.query('select * from materia', (e,r) => {
      res.render('news/index',{materia:r});
    });
    });

  app.get('/news', (req, res) => {
    connection.query('SELECT * FROM materia', (err, result) => {
      res.render('news/news', {
        news: result
      });
    });
  });

  app.post("/news",function(req,res){
    var codigo= req.body.codigo;
    var nombre = req.body.nombre;
    var horario= req.body.horario;
    var salon= req.body.salon;
    connection.query("insert into materia (codigo,nombre,horario,salon) value (\""+codigo+"\",\""+nombre+"\",\""+horario+"\",\""+salon+"\")",function(e,r){});
    res.redirect("/news");
  });

  app.get("/edit/:materiaid",function(req,res){
    connection.query("select * from materia where id="+req.params.materiaid ,function(e,r){
      res.render("news/edit.ejs",{
          materia:r[0]
       });
    });
    });


    app.post("/update",function(req,res){
      var id = req.body.id;
      var codigo = req.body.codigo;
      var nombre = req.body.nombre;
      var horario = req.body.horario;
      var salon = req.body.salon;
      console.log(id,codigo,nombre,horario,salon)
      connection.query(" update materia set codigo=\""+codigo+"\",nombre=\""+nombre+"\",horario=\""+horario+"\",salon=\""+salon+"\" where id="+id,function(e,r){
      });
    
      res.redirect("/");
    });

    app.get("/delete/:materiaid",function(req,res){
      connection.query("delete from materia where id="+req.params.materiaid,function(e,r){
      });
      res.redirect("/");
    });
};

var express = require('express');
var router = express.Router();
var monk = require('monk');
var nodemailer = require('nodemailer');
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage })
var db=monk('localhost:27017/psp');
var certi=db.get('certificate');
var logins = db.get('logins');
var proctorlogins = db.get('proctorlogins');
var parentlogins = db.get('parentlogins');
var feedback = db.get('feedback');
var parentmsg = db.get('parentmsg');
var confidential=db.get('confidential')
var alldetails = db.get('alldetails');
var attendence = db.get('attendence');
var backlogs = db.get('backlogs');
var aca = db.get('aca');

/* GET home page. */
 router.get('/', function(req, res, next) {
   // logins.find({},function(err,docs){
  // if (err) {
   //     console.log(err);
   //   }else{
    //  console.log(docs);
   //   }
   // })
   res.render('index', { title: 'Express' });
 });
 router.get('/proctor',function(req,res){
  if(req.Session && req.Session.user){
    console.log("working");
    // console.log(req.Session.user);
    res.locals.user = req.Session.user
    res.render('proctor');
  }
  else{
    req.Session.reset();
    res.redirect('/');
  }
})
router.get('/student',function(req,res){
  if(req.Session && req.Session.user){
    console.log("working");
    // console.log(req.Session.user);
     res.locals.user = req.Session.user
     certi.find({},function(err,docs){
    res.render('student',{"b":docs})
  })
    // res.render('student');
  }
   else{
     req.Session.reset();
     res.redirect('/');
   }
  // if(req.Session && req.Session.user){
  //    console.log("working");
  //   console.log(req.Session.user);
  //   res.locals.user = req.Session.user
  //   res.render('student');
    // console.log(req.Session.user);
    
    // res.render('proctor');
  //    certi.find({},function(err,docs){
  //   res.render('student',{"b":docs})
  // });
  // }
  //  else{
  //   req.Session.reset();
  //   res.redirect('/');
  // }
 
});
 router.get('/parent',function(req,res){
  if(req.Session && req.Session.user){
    console.log("working");
    // console.log(req.Session.user);
    res.locals.user = req.Session.user
    res.render('parent');
  }
  else{
    req.Session.reset();
    res.redirect('/');
  }
})
router.get('/logout', function(req,res){
  req.Session.reset();
  res.redirect('/');
});
router.get('/logout1', function(req,res){
  req.Session.reset();
  res.redirect('/');
});
router.get('/proctorduplicate',function(req,res){
  res.render('proctorduplicate');
})
router.get('/getproctorfeedback',function(req,res){
  if(req.Session && req.Session.user)
  {
    console.log(req.Session.user);
  feedback.find({"roll":{$gte:req.Session.user.snum,$lte:req.Session.user.enum}},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
       console.log(docs);
      res.send(docs);
    }
  })
}
})
router.get('/getparentmsg',function(req,res){
  if(req.Session && req.Session.user)
  {
    console.log(req.Session.user);
   parentmsg.find({"roll":{$gte:req.Session.user.snum,$lte:req.Session.user.enum}},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
       console.log(docs);
      res.send(docs);
    }
  })
}
})
router.get('/getstudentdetails',function(req,res){
  if(req.Session && req.Session.user)
  {
    console.log(req.Session.user);
  alldetails.find({"roll":{$gte:req.Session.user.snum,$lte:req.Session.user.enum}},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
       console.log(docs);
      res.send(docs);
    }
  })
}
})
router.get('/academics',function(req,res){

  if(req.Session && req.Session.user){
    console.log('working academic');
    console.log(req.Session.user)
    aca.find({"roll":req.Session.user.roll},function(err,docs){
      if(err){
        console.log(err)
      }
      else{
        console.log(docs);
        res.send(docs);
      }
    })
  }

})
router.get('/getbacklogdetails',function(req,res){
  backlogs.find({"roll":{$gte:req.Session.user.snum,$lte:req.Session.user.enum}},function(err,docs){
    if(err){
      console.log(err)
    }else{
      console.log(docs);
      res.send(docs);
    }
  })
})
// router.get('/pictures',function(req,res){  
//   certi.find({},function(err,docs){
//     res.render('pictures',{"b":docs})
//   });
// });
router.post('/certi-upload', upload.single('certi'), function (req, res, next) {
   console.log(req.file);
   var data={
    certi:req.file.originalname,
    descript:req.body.descript
   }
    certi.insert(data,function(err,docs){
    if(err){
      console.log(err);
    }else{
      console.log(docs);
    }
   });
  res.redirect('/student');
});
 router.post('/postdata',function(req,res){
  // console.log(req.body.Roll)
  logins.findOne({"roll":req.body.Roll,"pass":req.body.pass},function(err,docs){
    if(docs==null){
      console.log(err);
       res.sendStatus(500);
    }
    else{
      
      // console.log(docs);
      // res.redirect('/student')
        delete docs.pass
      req.Session.user = docs;
      console.log(docs);
        res.send(docs);
      // res.redirect('/student')
    }
   });  
 });
 router.post('/postpro',function(req,res){
  // console.log(req.body.Roll)
 proctorlogins.findOne({"empId":req.body.id,"pass":req.body.pwd},function(err,docs){
    if(docs==null){
      console.log(err);
       res.sendStatus(500);
    }
    else{
       // console.log('logged successfully');
      delete docs.pass
      req.Session.user = docs;
      console.log(docs);
      res.send(docs);
     // res.redirect('/proctor')
       
    }
   });  
 });
  router.post('/postparent',function(req,res){
  // console.log(req.body.Roll)
 parentlogins.findOne({"roll":req.body.roll,"pass":req.body.psd},function(err,docs){
    if(docs==null){
      console.log(err);
       res.sendStatus(500);
    }
    else{
       // console.log('logged successfully');
      delete docs.pass
      req.Session.user = docs;
      console.log(docs);
      res.send(docs);
     // res.redirect('/proctor')
       
    }
   });  
 });
 router.post('/poststudentfeed',function(req,res){
  // console.log(req.body);
  var data = {
    text: req.body.textarea,
     roll:req.Session.user.roll,
     "role":"proctor"
  }
  feedback.insert(data,function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs)
    }
  });
 });
 router.post('/postconfidential',function(req,res){
  // console.log(req.body);
  var confi = {
    text: req.body.textarea,
     roll:req.Session.user.roll,
     "role":"proctor"
  }
  confidential.insert(confi,function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs)
    }
  });
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abcxyz0981xyz@gmail.com',
    pass: 'abc0981xyz'
  }
});

var mailOptions = {
  from: 'P-S-P Portal(Students feedback)',
  to: 'srisahithich@gmail.com',
  subject: 'Feedback',
  text: req.body.textarea
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 });
 
  router.post('/postdetail',function(req,res){
    console.log(req.body);
    alldetails.find({"name":req.body.name},function(err,docs){
      if(err){
        console.log(err)
      }
      else{
        console.log(docs)
        res.send(docs);
      }
    })
  })
  router.post('/postradio',function(req,res){
   attendence.insert(req.body,function(err,docs){
    if(err){
      console.log(err);
    }

    else{
      console.log(docs);
      res.send(docs);
    }
  })
})
  router.post('/postparentmsg',function(req,res){
  // console.log(req.body);
  var info = {
    text: req.body.message,
     roll:req.Session.user.roll,
     name:req.Session.user.name,
     "role":"proctor"
  }
  parentmsg.insert(info,function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
      res.send(docs)
    }
  });
 });
module.exports = router;

// mygengo set up
var mygengo = require('../lib/mygengo');
var mg_public_key = "YOUR PUBLIC KEY",
	mg_private_key = "YOUR PRIVATE KEY";
	mg_callback_functions = {
		'job':{
			'reviewable': function(mg_callback_data){
				// Job is in reviewable
				console.log(mg_callback_data);
			}
		},
		'comment': function(){
			// comment call back
		}
	};
mygengo.init(mg_public_key, mg_private_key,mg_callback_functions, 'public/images/translation_previews/', false);

// Routes
module.exports = function(app){

// this will be our function when mygengo posts to use. Please define it in your mygengo account page.
app.post('/mygengo/mg_callback',function(req,res){
  mygengo.mg_callback(req,res);
});

app.get('/mygengo/getlangpairs', function(req,res){
  mygengo.getLangPairs(function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getstats', function(req,res){
  mygengo.getStats(function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getbalance', function(req,res){
  mygengo.getBalance(function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getlanguages', function(req,res){
  mygengo.getLanguages(function(mg_response){
    console.log(mg_response);
  });
});
app.get('/mygengo/getjob/:job_id', function(req,res){
  mygengo.getJob(req.params.job_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getpreview/:job_id', function(req,res){
  mygengo.getPreviewURL(req.params.job_id, function(mg_response){
    console.log(mg_response);
  });
});


app.get('/mygengo/getjobs', function(req,res){
  mygengo.getJobs({status:'reviewable'},function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getjobgroup/:group_id', function(req,res){
  mygengo.getJobGroup(req.params.group_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/postjobs', function(req,res){
	randomjobload = {
		jobs:{
			job_1:{
				type:'text',
				slug:'api job test 3',
				body_src: 'i love rock and 123123123123 roll',
				lc_src: 'en',
				lc_tgt:'ja',
				tier:'standard',
				auto_approve:'true',
				custom_data:'user id is sadas',
				comment:'dont fuck this up'},
			job_2:{
				type:'text',
				slug:'api job test 4',
				body_src: 'i love hipping and 123123123123123123123 hopping',
				lc_src: 'en',
				lc_tgt:'ja',
				tier:'standard',
				auto_approve:'true',
				custom_data:'user id is wewe',
				comment:'seriously do a good job'}
			},
		as_group:1,
		process:1}
  mygengo.postJobs(randomjobload, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/postquote', function(req,res){
	randomjobload = {
		jobs:{
			job_1:{
				type:'text',
				slug:'api job test 3',
				body_src: 'i love rock and asd roll',
				lc_src: 'en',
				lc_tgt:'ja',
				tier:'standard',
				auto_approve:'true',
				custom_data:'user id is sadas',
				comment:'dont fuck this up'},
			job_2:{
				type:'text',
				slug:'api job test 4',
				body_src: 'i love hipping and asd hopping',
				lc_src: 'en',
				lc_tgt:'ja',
				tier:'standard',
				auto_approve:'true',
				custom_data:'user id is wewe',
				comment:'seriously dont fuck this up'}
			},
		as_group:1,
		process:1}
  mygengo.postQuote(randomjobload, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getfeedback/:job_id', function(req,res){
  mygengo.getFeedback(req.params.job_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getrevisions/:job_id', function(req,res){
  mygengo.getRevisions(req.params.job_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getrevision/:job_id/:rev_id', function(req,res){
  mygengo.getRevision(req.params.job_id, req.params.rev_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/getcomments/:job_id', function(req,res){
  mygengo.getComments(req.params.job_id, function(mg_response){
    console.log(mg_response);
  });
});

app.get('/mygengo/postcomment/:job_id', function(req,res){
  res.send('<form action="/mygengo/postcomment/" method="post"><input type="hidden" name="job_id" value="'+req.params.job_id+'" /><textarea name="body"></textarea><input type="submit" /></form>');
});

app.post('/mygengo/postcomment/', function(req,res){
  mygengo.postComment(req.body.job_id,{body: req.body.body}, function(mg_response){
	console.log(mg_response)
  });
});

app.get('/mygengo/deletejob/:job_id', function(req,res){
  res.send('<form action="/mygengo/deletejob/" method="post"><input type="hidden" name="_method" value="delete" /><input type="hidden" name="job_id" value="'+req.params.job_id+'" />'+"delete job #" + req.params.job_id+'<input type="submit" /></form>');
});

app.delete('/mygengo/deletejob', function(req,res){
  mygengo.deleteJob(req.body.job_id, function(mg_response){
	console.log(mg_response)
]  });
});


app.get('/mygengo/revisejob/:job_id',function(req,res){
  mygengo.reviseJob(req.params.job_id, 'sorry it sucks', function(mg_response){
    console.log(mg_response);
  });
});
app.get('/mygengo/approvejob/:job_id',function(req,res){
  mygengo.reviseJob(req.params.job_id, 'sorry it sucks', function(mg_response){
    console.log(mg_response);
  });
});
}

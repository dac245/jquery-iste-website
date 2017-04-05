	//now what?
	//api:  http://www.ist.rit.edu/api/
	$(document).ready(function(){
		myXhr('get',{path:'/about/'},'#about').done(function(json){
				var x='<h2 class="word_split_title emp">'+json.title+"</h2>";
				x+='<p class="chngCol">'+json.description+'</p>';
				x+='<p class="chngCol emp">'+'"'+json.quote+'"'+'</p>';
				x+='<p id="auth" class="chngCol">--'+ json.quoteAuthor+'</p>';
				$('#about').append(x);
		});
		
		myXhr('get',{path:'/degrees/undergraduate/'},'#content').done(function(json){
			var firststyle = '';
			$.each(json.undergraduate,function(i, item){
				firststyle += '<div class="blot1"><h2>'+item.title+'</h2>'+'<p>'+item.description+'</p></div>';
			});
			
			$('#content').append(firststyle);
			
		});
		
		myXhr('get',{path:'/degrees/graduate/'},'#graduate').done(function(json){
			var xy = '';
			$.each(json.graduate,function(i, item){
				if(item.title != undefined && item.description != undefined){
					xy += '<div class="blot2"><h2>'+item.title+'</h2>'+'<p>'+item.description+'</p></div>';
				}
				else{
					xy += '<div class="blot2"><h2>'+item.degreeName+'</h2>'+'<p>'+item.availableCertificates+'</p></div>';
				}
			});
			xy += '<div class="clearit"></div>';
			$('#graduate').append(xy);
			
			$('.blot2').columnize({columns: 2});
		});
		
		myXhr('get',{path:'/minors/'},'#minors').done(function(json){
			var y = '<h1 class="emp chngCol">Minors</h1>';
			$.each(json.UgMinors,function(i, item){
					y += '<div class="minPop" id="'+ item.name +'"><h2>' + item.title + '</h2>' + '<p>' + item.name + '</p></div>';
				});
				
				$('#minors').append(y);
				
				$.each(json.UgMinors,function(i, item){
					var ulThis = '';
					$.each(json.UgMinors[i].courses,function(i, item){
						ulThis += '<li>'+item+'</li>';
					});
					
					$('#' +item.name+'').magnificPopup({
					  items: {
							src: '<div class="white-popup"><h2>' + item.title + '</h2>' + '<p>' + item.name + '</p>' + 
							'<p>' + item.description + '</p>' + '<p class="courseWords"><h3>Courses:</h3><ul>'+ ulThis + '</ul></p>' + '<p>' + item.note + '</p></div>',
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				});
				
					$(".minPop").click(function() {
						$( ".white-popup" ).effect( "bounce", "slow" );
					});
			});
		
		myXhr('get',{path:'/employment/'},'#employment').done(function(json){
				y = '<div class="emp"><h2 class="word_split_title">' + json.introduction.title + '</h2></div>';
				y += '<div class="blot1"><h2>' + json.introduction.content[0].title + '</h2>' + '<p class="smallFit2">' + json.introduction.content[0].description + '</p></div>';
				y += '<div class="blot1"><h2>' + json.degreeStatistics.statistics[0].value + '</h2>' + '<p>' + json.degreeStatistics.statistics[0].description + '</p></div>';
				y += '<div class="blot1"><h2>' + json.degreeStatistics.statistics[1].value + '</h2>' + '<p>' + json.degreeStatistics.statistics[1].description + '</p></div>';
				y += '<div class="blot1"><h2>' + json.degreeStatistics.statistics[2].value + '%</h2>' + '<p>' + json.degreeStatistics.statistics[2].description + '</p></div>';
				y += '<div class="blot1"><h2>' + json.degreeStatistics.statistics[3].value + '</h2>' + '<p>' + json.degreeStatistics.statistics[3].description + '</p></div>';
				y += '<div class="blot1"><h2>' + json.employers.title + '</h2>' + '<p>' + json.employers.employerNames + '</p></div>';
				y += '<div class="blot1"><h2>' + json.careers.title + '</h2>' + '<p>' + json.careers.careerNames + '</p></div>';
				y += '<div class="blot1"><h2>' + json.introduction.content[1].title + '</h2>' + '<p class="smallFit">' + json.introduction.content[1].description + '</p></div>';
				
				$('#employment').append(y);
				
				$(".word_split_title").lettering('words');
				
				$('.blot1').columnize({ columns: 2 });
		});
		
		var tabPop = '';
		var y2 = '';
		myXhr('get',{path:'/employment/'},'#coop').done(function(json){
				y2 = '<a id="coopTable"><h2 class="makeBtn">' + json.coopTable.title + '</h2></a>';
				
				
				tabPop = '<div class="white-popup popup-scrollTab"><table class="centPop"><tr><th class="emp">Employer</th><th class="emp">City</th><th class="emp">Degree</th></tr>';
				$.each(json.coopTable.coopInformation,function(i, item){ // for this I will use tables ex: tr td table
					tabPop += '<tr><td class="emp">' + item.employer + '</td>' + '<td class="emp">' + item.city + '</td>'  + '<td class="emp">' + item.degree + '</td></tr>';
				});
				
				tabPop += '</table></div>';
				
				$('#coop').append(y2);
				
				$('#coopTable').magnificPopup({
					  items: {
							src: tabPop,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$("#coopTable").click(function() {
						$( ".white-popup" ).effect( "slide" );
					});
		});
		
		myXhr('get',{path:'/employment/'},'#coop').done(function(json){
				y2 = '<a id="empTable"><h2 class="makeBtnRight">' + json.employmentTable.title + '</h2></a>'; // this is the button to click 
				
				
				tabPop = '<div class="white-popup popup-scrollTab"><table class="centPop"><tr><th class="emp">Employer</th><th class="emp">City</th><th class="emp">Degree</th></tr>';
				$.each(json.employmentTable.professionalEmploymentInformation,function(i, item){ // for this I will use tables ex: tr td table
					tabPop += '<tr><td class="emp">' + item.employer + '</td>' + '<td class="emp">' + item.city + '</td>'  + '<td class="emp">' + item.degree + '</td></tr>';
				}); 

				tabPop += '</table></div>';
				
				$('#coop').append(y2); // this is 
				
				$('#empTable').magnificPopup({ // 
					  items: {
							src: tabPop, // here it puts it into the actual pop up 
							type: 'inline' // the table does that it takes care of the rows  this just adds it all in there
					  },
					  closeBtnInside: true
				});
				
				$("#empTable").click(function() { // this part gives it the effect 
						$( ".white-popup" ).effect( "slide" ); // this makes it look like its sliding
					});
		});
		
		
		myXhr('get',{path:'/people/'},'#people').done(function(json){
			var z='<h1 class="emp chngCol">Faculty of IST</h1>';
			$.each(json.faculty,function(i, item){
				z += '<div class="bstyle" id="'+ item.username + '">' + '<img class="stylePics" src="'+item.imagePath+'"/>' + '</div>';
			});
			$('#people').append(z);
			
			$.each(json.faculty,function(i, item){
					$('#' +item.username+'').magnificPopup({
					  items: {
							src: '<div class="white-popup emp">'+ '<img class="stylePics" src="'+item.imagePath+'"/>' +
									 '<p><b>Name:</b> ' + item.name + '</p>' + '<p><b>Title:</b> ' + item.title + '</p>' +
									 '<p><b>E-mail:</b> '+ item.email + '</p>' + '<p><b>Office:</b> ' + item.office + '</p>' + '<p><b>Phone:</b> ' + item.phone + '</p></div>',
							type: 'inline'
					  },
					  closeBtnInside: true
				});
			});
			
			$.each(json.faculty,function(i, item){
			$('#'+item.username+'').click(function() {
						$( ".white-popup" ).effect( "bounce", "slow" );
					});
			});
		});
		
		myXhr('get',{path:'/research/'},'#research').done(function(json){
			var serGet = '';
			$('#research').append('<h1 class="chngCol">Research by Interest</h1>');
			$.each(json.byInterestArea,function(i, item){
				serGet += '<div class="resPop" id="new' + i +'"><h2>' + item.areaName + '</h2></div>';
			});
			
			$('#research').append(serGet);
			
			$.each(json.byInterestArea,function(i, item){
					$('#new' + i +'').magnificPopup({
					  items: {
							src: '<div class="white-popup popup-scroll">' + item.citations + '</div>',
							type: 'inline'
					  },
					  closeBtnInside: true
				});
			});
			
			$.each(json.byInterestArea,function(i, item){
			$('#new'+i+'').click(function() {
						$( ".white-popup" ).effect( "bounce", "slow" );
					});
			});
			
			// this line splits the interest Area and faculty
			$('#research').append('<div class="clearit"></div>');
			$('#research').append('<h1 class="chngCol">Research by Faculty</h1>');
			var facGet = '';
						$.each(json.byFaculty,function(i, item){
							facGet += '<div class="facPop" id="t' + item.username +'"><h2>' + item.facultyName + '</h2></div>';
						});
			
			$('#research').append(facGet);
			$('#research').append('<div class="clearit"></div>');
			
			$.each(json.byFaculty,function(i, item){
					$('#t' + item.username +'').magnificPopup({
					  items: {
							src: '<div class="white-popup popup-scroll">' + item.citations + '</div>',
							type: 'inline'
					  },
					  closeBtnInside: true
				});
			});
			
			$.each(json.byFaculty,function(i, item){
					$('#t'+item.username+'').click(function() {
						$( ".white-popup" ).effect( "bounce", "slow" );
					});
			});
			
		});
		
		myXhr('get',{path:'/resources/'},'#resources').done(function(json){
			var resources = '<h1 class="emp chngCol">'+json.title+'</h1>' + '<p class="emp chngCol">'+json.subTitle+'<p>';
			var btnAdd1 = '';
			var btnAdd2 = '';
			var btnAdd3 = '';
			var btnAdd4 = '';
			var btnAdd5 = '';
			var btnAdd6 = '';
			
			resources += '<div id="btnTemp1"><h2>'+json.studyAbroad.title+'</h2></div>';
			
			btnAdd1 = '<div class="white-popup"><h2>'+json.studyAbroad.title+'</h2><p>'+json.studyAbroad.description+'</p>';
			$.each(json.studyAbroad.places,function(i, item){
					btnAdd1 += '<h3>'+item.nameOfPlace+'</h3>'+'<p>'+item.description+'</p>';
				});
			btnAdd1 += '</div>';
			
			resources += '<div id="btnTemp2"><h2>'+json.studentServices.title+'</h2></div>';
			btnAdd2 = '<div class="white-popup popup-scroll"><h2>'+json.studentServices.academicAdvisors.title+'</h2>'+'<p>'+json.studentServices.academicAdvisors.description+'</p>';
			btnAdd2 += '<h2>'+json.studentServices.professonalAdvisors.title+'</h2>';
			
			$.each(json.studentServices.professonalAdvisors.advisorInformation,function(i, item){
					btnAdd2 += '<h3>'+item.department+'</h3>'+'<p>'+item.name+'</p>'+'<p><a href="mailto:'+item.email+'" target="_top">'+item.email+'</a></p>';
				});
				
			btnAdd2 += '<h2>'+json.studentServices.facultyAdvisors.title+'</h2>'+'<p>'+json.studentServices.facultyAdvisors.description+'</p>';
			btnAdd2 += '<h2>'+json.studentServices.istMinorAdvising.title+'</h2>';
			
			$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation,function(i, item){
					btnAdd2 += '<h3>'+item.title+'</h3>'+'<p>'+item.advisor+'</p>'+'<p><a href="mailto:'+item.email+'" target="_top">'+item.email+'</a></p>';
				});
			btnAdd2 += '</div>';
				
			resources += '<div id="btnTemp3"><h2>'+json.tutorsAndLabInformation.title+'</h2></div>';
			btnAdd3 = '<div class="white-popup"><p>'+json.tutorsAndLabInformation.description+'</p></div>';
			
			resources += '<div id="btnTemp4"><h2>'+json.studentAmbassadors.title+'</h2></div>';
			
			btnAdd4 = '<div class="white-popup popup-scroll"><img src="'+json.studentAmbassadors.ambassadorsImageSource+'"/>';
			$.each(json.studentAmbassadors.subSectionContent,function(i, item){
					btnAdd4 += '<h3>'+item.title+'</h3>'+'<p>'+item.description+'</p>';
				});
				
			btnAdd4 += '<a href="'+json.studentAmbassadors.applicationFormLink+'">'+json.studentAmbassadors.applicationFormLink+'</a>';
			btnAdd4 += '<p>'+json.studentAmbassadors.note+'</p></div>';
			
			resources += '<div id="btnTemp5"><h2>Forms</h2></div>';
			
			btnAdd5 = '<div class="white-popup">';
			btnAdd5 += '<p>Undergradute Forms</p>';
			$.each(json.forms.undergraduateForms,function(i, item){
					btnAdd5+= '<ul><li><a href="http://ist.rit.edu/'+item.href+'" target="_blank">'+'<p>'+item.formName+'</p>'+'</a></li></ul>';
				});
			
			btnAdd5 += '<p>Gradute Forms</p><ul>';
			$.each(json.forms.graduateForms,function(i, item){
					btnAdd5 += '<li><a href="http://ist.rit.edu/'+item.href+'" target="_blank">'+'<p>'+item.formName+'</p>'+'</a></li>';
				});
			btnAdd5 += '</ul></div>';
				
			resources += '<div id="btnTemp6"><h2>'+json.coopEnrollment.title+'</h2></div>';
			
			btnAdd6 = '<div class="white-popup popup-scroll">';
			$.each(json.coopEnrollment.enrollmentInformationContent,function(i, item){
					btnAdd6 += '<h3>'+item.title+'</h3>'+'<p>'+item.description+'</p>';
				});
				
			btnAdd6 += '<a href="http://ist.rit.edu/'+json.coopEnrollment.RITJobZoneGuidelink+'" target="_blank">'+'<p>'+json.coopEnrollment.RITJobZoneGuidelink+'</p>'+'</a></div>';
							
			$('#resources').append(resources);
			
			$('#btnTemp1').magnificPopup({
					  items: {
							src: btnAdd1,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$('#btnTemp2').magnificPopup({
					  items: {
							src: btnAdd2,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$('#btnTemp3').magnificPopup({
					  items: {
							src: btnAdd3,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$('#btnTemp4').magnificPopup({
					  items: {
							src: btnAdd4,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$('#btnTemp5').magnificPopup({
					  items: {
							src: btnAdd5,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$('#btnTemp6').magnificPopup({
					  items: {
							src: btnAdd6,
							type: 'inline'
					  },
					  closeBtnInside: true
				});
				
				$("#btnTemp1").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
				$("#btnTemp2").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
				$("#btnTemp3").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
				$("#btnTemp4").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
				$("#btnTemp5").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
				$("#btnTemp6").click(function() {
						$( ".white-popup" ).effect( "highlight" );
					});
		});
		
		$.backstretch("assets/images/background.jpg");
	});

	//utilities...
	//data - {path:'/about/'}
	//(getOrPost, data, idForSpinner)
	function myXhr(t, d, id){
		return $.ajax({
			type:t,
			url:'proxy.php',
			dataType:'json',
			data:d,
			cache:false,
			async:true,
			beforeSend:function(){
				//PLEASE - get your own spinner that 'fits' your site.
				$(id).append('<img src="assets/images/hamster.gif" class="spin"/>');
			}
		}).always(function(){
			//kill spinner
			$(id).find('.spin').fadeOut(5000,function(){
				$(this).remove();
			});
		}).fail(function(){
			//handle failure
		});
	}

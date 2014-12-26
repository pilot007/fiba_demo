var lineChartData = {
 labels : ["","","","","","",""],
 datasets : [
 {
 fillColor : "rgba(151,187,205,0.5)",
 strokeColor : "rgba(151,187,205,1)",
 pointColor : "rgba(151,187,205,1)",
 pointStrokeColor : "#fff",
 data : [50,90,140,190,500,750,1050]
 }
 ]
 
 };
     var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Swiss Otel"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "GAP"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Fiba Emeklilik"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "FibaBank"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Mark&Spencers"
    }

];
    var pieOptions = [
{
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,
    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

}
];		 
var app = {
	// Application Constructor
	initialize : function() {
		console.log("init");
		this.bindEvents();
		app.url="http://10.0.0.31:8080/fiba_group_webservices/";
		//app.url="http://127.0.0.1:9090";
		//app.first_init();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		console.log("bindevent");
		document.addEventListener('deviceready', this.onDeviceReady, false);
                            
	},
	onDeviceReady : function() {
		console.log("ondevice ready");
		app.receivedEvent('deviceready');
		app.first_init();
		
	//new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
	  
		
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		console.log("receive event");
		$.mobile.touchOverflowEnabled = false;
		$.mobile.defaultPageTransition = 'flip';
		$.mobile.defaultDialogTransition = 'none';
		$.mobile.transitionFallbacks.slide = 'none';
		$.mobile.transitionFallbacks.pop = 'none';
		$.mobile.buttonMarkup.hoverDelay = 0;
		
		//checkConnection();
	},
	productList : null,
	fnc_Barkod : function() {
				$("#un_barkod").empty();
		        $("#un_barkod").append(app.user_name);
	},	
	fnc_Puanlarim : function() {
				$("#un_puanlarim").empty();
		        $("#un_puanlarim").append(app.user_name);
		        console.log("puanlarım 1");
		$.ajax({
			url : app.url+"GetAcitivies?member_id=1",
			dataType : "json",
			success : function(a, b, c) {
				console.log("puanlarım 2");
				$('#div_puanlarim ul').remove();
				$('#div_puanlarim').append('<ul data-role="listview"></ul>');
				listItems = $('#div_puanlarim').find('ul');
				console.log("puanlarım 3");
				 
				
				for (var i = 0; i < a.length; i++) {
				html ="<table>";
					console.log("puanlarım 4");
					html += '<tr><td>'+ a[i].company_name+ '</td>';
					html += '<td>' + a[i].points + '</td></tr>';
				    html+="</table>";
					listItems.append('<li id="prj_' + a[i].activity_id + '">' + html + '</li>');
				};
				
				$('#div_puanlarim ul').listview();
				console.log("puanlarım 5");
				for (var i = 0; i < a.length; i++) {
					console.log("puanlarım 6");
					$('#prj_' + a[i].activity_id).bind('tap',
					function(event, ui) {
						var strID = $(this).attr('id').replace('prj_','');
						app.getProductsDetay(strID);
					});
				}

		    },
			error : function(a, b, c) {
				$("#device_info").append('hata aldı '+ '<br />');
				element2.innerHTML = "hata username:";

				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
				        
		        		
	},	
	
	fnc_Mesajlar : function() {
				$("#un_mesajlar").empty();
		        $("#un_mesajlar").append(app.user_name);
	},	
    fnc_Profil : function() {
				$("#un_profil").empty();
		        $("#un_profil").append(app.user_name);
	},
	fnc_Kampanyalar : function() {
				$("#un_kampanyalar").empty();
		        $("#un_kampanyalar").append(app.user_name);
	},			
	fnc_Istatistik : function() {
				$("#un_istatistik").empty();
		        $("#un_istatistik").append(app.user_name);
	},
	fnc_EnYakin : function() {
				$("#un_enyakin").empty();
		        $("#un_enyakin").append(app.user_name);
	},			
	member_savefunc : function() {
	},	
	getMusteriler : function(){
	
	},
	isnull : function(p){
		if (p ==null)
		return '.';
		else
		return p;
	},
	first_init : function(){
		app.uuid = app.isnull(device.uuid);
		//if (app.uuid==".")
		app.uuid="586BC0F6-09DC-44FB-8F1D-A3ABCB8E0C80";
		app.user_name="Merhaba : Ayşe Balcı ( 1050 FibaPuan )";
		app.user_id="90910000001";
		
		$("#un_barkod").empty();
		$("#un_barkod").append(app.user_name);

		$("#un_barkod2").empty();
		$("#un_barkod2").append(app.user_name);

				new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData,pieOptions);
				new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

/*
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+"123456789"+"&jsonType=1&con_type=getPieChart",
			dataType : "json",
			success : function(a, b, c) {
				pieData=[];
				$("#device_info").empty();
				for (var i = 0; i < a.length; i++) {
					var x ={value:parseInt(a[i].count), color:a[i].user_color, label:a[i].user_name, highlight: "#5AD3D1"};
					pieData.push(x);
					//console.log(x);
					//pieData[i].value=a[i].count;
					//pieData[i].color=a[i].user_color;
					
					$("#device_info").append("<font style=background-color:"+a[i].user_color+">" + a[i].user_name+"  (" +a[i].count+")</font>"+ '<br />');					
				};	
				
				//style="width: 300px; height: 300px;"
				//new Chart(document.getElementById("line").getContext("2d")).Pie(pieData);
				new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData,pieOptions);
				new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
				
				//{ "user_name": "Ersin","user_color": "#E0E4CC","count": "2"}
			},
			error : function(a, b, c) {
				$("#device_info").append('hata aldı '+ '<br />');
				element2.innerHTML = "hata username:";

				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		
		*/
		
		if(app.username==null){
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=getUserName",
			dataType : "json",
			success : function(a, b, c) {
				if (a.length>0)		
				  app.username ="Merhaba : " + a[0].user_name;
				else
				  $("#device_info").append('Kullanıcı tanımınız yapılmamıştır. Lütfen yöneticinize danışınız ');
			},
			error : function(a, b, c) {
				$("#device_info").append('hata aldı '+ '<br />');
				element2.innerHTML = "hata username:";

				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}


		if(app.statusType==null){
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id=="+app.uuid+"&jsonType=1&con_type=activitytype",
			dataType : "json",
			success : function(a, b, c) {
			app.statusType=a;
			console.log('statusType');
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}
						
		if(app.status==null){
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytypestatus&activity_type_id=2",
			dataType : "json",
			success : function(a, b, c) {
			app.status=a;
			console.log('status');
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}
		
		if(app.personels==null){
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=employee",
			dataType : "json",
			success : function(a, b, c) {
			app.personels=a;
			console.log('personel');
	},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}

		
		if(app.companies==null){
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=customer",
			dataType : "json",
			success : function(a, b, c) {
			app.companies=a;
			console.log('companies');
	},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}
	},
	getProducts : function() {

		$.ajax({
			url : "http://cosmeticamobile.com/Announcements.ashx",
			dataType : "jsonp",
			success : function(a, b, c) {
				app.productList = a;
				for (var i = 0; i < a.length; i++) {
					var o = new Option(a[i].Description.substring(1, 10), a[i].ID);
					$('#products').append(o);
				};
				console.log("succ a ", a);
				console.log("succ b ", b);
				console.log("succ c ", c);

			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			}
		});

	},
	getProducts2 : function() {
		$("#username").empty();
		$("#username").append(app.username);

		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1",
			dataType : "json",
			success : function(a, b, c) {
				app.productList = a;
				$("#div_liste").empty();
				$('#twitList ul').remove();
				$('#twitList').append('<ul data-role="listview"></ul>');
				listItems = $('#twitList').find('ul');

				for (var i = 0; i < a.length; i++) {
					html = '<h1><a >'+ a[i].from + '</a></h1>';
					html += ' <p> ' + a[i].subject + '</p>';
					listItems.append('<li id="prj_' + a[i].id + '">' + html + '</li>');
				};
				$('#twitList ul').listview();
				
				for (var i = 0; i < a.length; i++) {
					$('#prj_' + a[i].id).bind('tap',
					function(event, ui) {
						var strID = $(this).attr('id').replace('prj_','');
						app.getProductsDetay(strID);
					});
				}

				console.log("succ a ", a);
				console.log("succ b ", b);
				console.log("succ c ", c);

			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			}
		});

	},
	getProductsall : function() {
		$("#usernameb").empty();
		$("#usernameb").append(app.username);		
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetActivities?android_id="+app.uuid+"&jsonType=1",
			dataType : "json",
			success : function(a, b, c) {
				$("#div_liste_all").empty();
				$('#twitList_all ul').remove();
				$('#twitList_all').append('<ul data-role="listview"></ul>');
				listItems = $('#twitList_all').find('ul');

				for (var i = 0; i < a.length; i++) {
					html = '<div id="prj_' + a[i].id + '" ><h1><a id="prjx_' + a[i].id + '" >' + a[i].from + '</a></h1>';
					html += ' <p> ' + a[i].subject + '</p>';
					listItems.append('<li>' + html + '</li>');
				};
				$('#twitList_all ul').listview();
				
				for (var i = 0; i < a.length; i++) {
					$('#prj_' + a[i].id).bind('tap',
					function(event, ui) {
						var strID = $(this).attr('id').replace('prj_','');
						app.getProductsDetay(strID);
					});
				}

				console.log("succ a ", a);
				console.log("succ b ", b);
				console.log("succ c ", c);

			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			}
		});

	},

	insertfunc : function() {
		console.log("save func");
		var result= $("#sel_personels_yeni option:selected").val();
		var v_sel_company_yeni= $("#sel_company_yeni option:selected").val();
		var v_sel_activity_yeni= $("#sel_activity_yeni option:selected").val();
		var v_sel_activity_type_yeni= $("#sel_activity_type_yeni option:selected").val();
		var v_sel_activity_status_yeni= $("#sel_activity_status_yeni option:selected").val();
		var desc= $("#userDesc_yeni").val();
		//if(app.status==null)
		{
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=insertactivity"+
			"&temp_status_id="+v_sel_activity_status_yeni+
			"&temp_assignto="+result + "&desc=" + desc +
			"&temp_activity_type_id="+v_sel_activity_yeni +
			"&temp_activity_property_id="+v_sel_activity_type_yeni +
			"&temp_company_id="+v_sel_company_yeni,
			dataType : "json",
			success : function(a, b, c) {
			app.kaydettimi=a;			
			$.mobile.changePage($('#benim'));
			app.getProducts2();
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}		
	},	
	savefunc : function() {
		console.log("save func");
		var result= $("#sel_personels option:selected").val();
		var result2= $("#sel_status option:selected").val();
		var desc= $("#userDesc").val();
		//if(app.status==null)
		{
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=updateactivity&temp_activity_type_id="+app.id+"&temp_status_id="+result2+"&temp_assignto="+result + "&desc=" + desc,
			dataType : "json",
			success : function(a, b, c) {
			app.status=a;			
			$.mobile.changePage($('#benim'));
			app.getProducts2();
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
		}				
	},
	getProductsDetay : function(id) {
		$("#usernamed").empty();
		$("#usernamed").append(app.username);		
		app.id=id;	
		app.first_init();	
		console.log("getProductsDetay:", app.id);

		
		$.when(  
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=getactivity&activity_type_id=" + app.id,
			dataType : "json",
			success : function(a, b, c) {
			var detays=[];
			app.detays=a;

			}			,
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			},
			}).then(function( data, textStatus, jqXHR ) {
  //alert( jqXHR.status ); // Alerts 200

				$.mobile.changePage($('#detay'));
				console.log("getProductsDetayx:", app.id);
				$('#twitList_detay').empty();
				$('#twitList_detay').append('<ul data-role="listview"></ul>');
				listItems = $('#twitList_detay').find('ul');
				
				for (var i = 0; i < app.detays.length; i++) {
					app.activity_type_id=app.detays[i].activity_id;
					//html = app.detays[i].project_id +'<br/>'+ app.detays[i].company_name +'<br/>';
					v_activity_status_id=app.detays[i].activity_status_id;
					v_activity_id= app.detays[i].activity_id;
					v_activity_property_id = app.detays[i].activity_property_id;
					v_assigned_id=app.detays[i].assigned_id; 
					$("#userDesc").empty();
					$("#prjid").empty();
					$("#compname").empty();
					$("#userDesc").val(app.detays[i].project_desc);
					$("#prjid").append("İş No: "+app.detays[i].project_id);
					$("#compname").append("Şirket Adı: "+app.detays[i].company_name);
 
					//html += ' <textarea id="comment" style="margin: 0px; width: 250px; height: 98px;" value="' + app.detays[i].project_desc  +'" /><br/>';
				};
				html="<br\>";
				if(app.status!=null){
				html +='<br/>'+'Personel : <select id="sel_personels" >';
				for (var i = 0; i < app.personels.length; i++) 
				{
					if (v_assigned_id==app.personels[i].user_id) 
					{
						html += '<option selected="true" value="'+app.personels[i].user_id+'">'+app.personels[i].user_name+'</option>';
					} 
					else
					{
						html += '<option value="'+app.personels[i].user_id+'">'+app.personels[i].user_name+'</option>';
					};
				};
				html +='</select> <br/>';
				}
				
				if(app.status!=null){
				html +='<br/>'+' Statüs : <select id="sel_status" >';
				for (var i = 0; i < app.status.length; i++) 
				{
					if (v_activity_status_id==app.status[i].activity_status_id) 
					{
						html += '<option selected="true" value="'+app.status[i].activity_status_id+'">'+app.status[i].activity_status_name+'</option>';
					}
					else
					{
						html += '<option value="'+app.status[i].activity_status_id+'">'+app.status[i].activity_status_name+'</option>';
					}
				};
				html +='</select> <br/>';
				}
			    html +='<input type="button" name="save" id="save" value="Kaydet" onclick="app.savefunc()"/>';

				$('#twitList_detay').append(html);				
				console.log("v_activity_status_id ", v_activity_status_id);
				console.log("v_assigned_id ", v_assigned_id);
				console.log("app.html ", app.html);
				//$('#twitList_detay').append(app.html);
				$('#twitList_detay ul').listview();
		}));
	},
	getYeni : function() {
				$("#usernamey").empty();
		        $("#usernamey").append(app.username);

				for (var i = 0; i < app.personels.length; i++) 
				{
					var o = new Option(app.personels[i].user_name, app.personels[i].user_id);
					$('#sel_personels_yeni').append(o);
				};

				for (var i = 0; i < app.companies.length; i++) 
				{
					var o = new Option(app.companies[i].company_name, app.companies[i].company_id);
					$('#sel_company_yeni').append(o);
				};				
				
				if(app.activity==null){
				$.ajax({
					url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytype",
					dataType : "json",
					success : function(a, b, c) {
					app.activity=a;
					console.log('detay activity');

				for (var i = 0; i < app.activity.length; i++) 
				{
					var o = new Option(app.activity[i].activity_name, app.activity[i].activity_id);
					$('#sel_activity_yeni').append(o);
				};				

			    },
					error : function(a, b, c) {
						console.log("err a ", a);
						console.log("err b ", b);
						console.log("err c ", c);
						console.log("err c ", c);
					}
				});
				}


$('#sel_activity_yeni').change(function(){
    console.log('Test: ' + $('#sel_activity_yeni').val());

				$.ajax({
					url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytypeproperty&activity_type_id="+$('#sel_activity_yeni').val(),
					dataType : "json",
					success : function(a, b, c) {
					app.activity_prop=a;
					console.log('detay activity prop');
				
				$('#sel_activity_type_yeni').empty();
				var o = new Option("Seçiniz", -1);
				$('#sel_activity_type_yeni').append(o);
				for (var i = 0; i < app.activity_prop.length; i++) 
				{
					var o = new Option(app.activity_prop[i].user_name, app.activity_prop[i].activity_property_id);
					$('#sel_activity_type_yeni').append(o);
				};				

			    },
					error : function(a, b, c) {
						console.log("err a ", a);
						console.log("err b ", b);
						console.log("err c ", c);
						console.log("err c ", c);
					}
				});
    
    
});

	$('#sel_activity_type_yeni').change(function(){
    console.log('sel_activity_type_yeni: ' + $('#sel_activity_type_yeni').val());
    
				$.ajax({
					url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytypestatus2&activity_type_id="+$('#sel_activity_type_yeni').val(),
					dataType : "json",
					success : function(a, b, c) {
					app.activity_prop_status=a;
					console.log('detay activity status prop');
				
				$('#sel_activity_status_yeni').empty();
				var o = new Option("Seçiniz", -1);
				$('#sel_activity_status_yeni').append(o);

				for (var i = 0; i < app.activity_prop_status.length; i++) 
				{
					var o = new Option(app.activity_prop_status[i].activity_status_name, app.activity_prop_status[i].activity_status_id);
					$('#sel_activity_status_yeni').append(o);
				};				

			    },
					error : function(a, b, c) {
						console.log("err a ", a);
						console.log("err b ", b);
						console.log("err c ", c);
						console.log("err c ", c);
					}
				});
    
});

	},
	
	getPersonel : function(html,div_name) {
		console.log("getPersonel:");
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=employee",
			dataType : "json",
			success : function(a, b, c) {
				html +='<select id="sel_personels">';
				for (var i = 0; i < a.length; i++) 
				{
					html += '<option value="'+a[i].user_id+'">'+a[i].user_name+'</option>';
				};
				html +='</select> <br/>';
				app.html=html;
				$('#'+div_name).append(app.html	);
				
	},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});		
	},
	getActivity : function(html,div_name) {
		console.log("getPersonel:");
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytype",
			dataType : "json",
			success : function(a, b, c) {				
				console.log("getProductsDetayx:", app.id);
				
				html +='<select id="sel_activity">';
				for (var i = 0; i < a.length; i++) {
					html += '<option value="'+a[i].activity_id+'">'+a[i].activity_name+'</option>';
				};
				html +='</select> <br/>';
				$('#'+div_name).append(html);
				$('#sel_activity').val('');
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			}
		});

	},	
	getActivityProperty : function(html,div_name) {
		console.log("getPersonel:");
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytype&activity_type_id="+app.activity_type_id,
			dataType : "json",
			success : function(a, b, c) {				
				console.log("getProductsDetayx:", app.id);

				html +='<select id="sel_activity">';
				for (var i = 0; i < a.length; i++) {
					html += '<option value="'+a[i].activity_id+'">'+a[i].activity_name+'</option>';
				};
				html +='</select> <br/>';
				$('#'+div_name).append(html);
				//$('#'+div_name+' ul').listview();
				$('#sel_activity').val('');
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
	},
	getActivityPropertyStatus : function(html,div_name) {
		console.log("gets Prop Satus:" + app.activity_type_id);
		
		$.ajax({			
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=activitytypestatus&activity_type_id="+app.activity_type_id,
			dataType : "json",
			success : function(a, b, c) {				
				console.log("sel_activity_status");

				html +='Durum : <select id="sel_activity_status">';
				for (var i = 0; i < a.length; i++) {
					html += '<option value="'+a[i].activity_status_id+'">'+a[i].activity_status_name+'</option>';
				};
				html +='</select> <br/>';
				//$('#'+div_name).append(html);				
				console.log("statsu html :" + html);
				app.html=html;
				console.log("statsu html :" + app.html);
				$('#'+div_name).append(app.html	);
			},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);
			}
		});
	},			
	getCustomer : function(html, div_name) {
		console.log("getCustomer:");
		$.ajax({
			url : app.url+"/istakip_yesis_webservices/GetMyActivities?android_id="+app.uuid+"&jsonType=1&con_type=customer",
			dataType : "json",
			success : function(a, b, c) {				
				html ='Müşteri : <select id="sel_customer" style="width: 368px;">';
				for (var i = 0; i < a.length; i++) {
					html += '<option value="'+a[i].company_id+'" >'+a[i].company_name+'</option>';
				};
				html +='</select> <br/>';
				$('#'+div_name).append(html);
				$('#sel_customer').val('');
	},
			error : function(a, b, c) {
				console.log("err a ", a);
				console.log("err b ", b);
				console.log("err c ", c);
				console.log("err c ", c);

			}
		});

	},	
	getTurkish : function(str) {
		return str;
	},
	openCamera : function() {
		var onCamSuccess = function(imageData) {
			/* No action required */
		};

		var onCamFail = function(error) {
			/* No action required */
			//alert('Kamera kullanılamıyor (' + error.code + ')');
		};

		var cameraPopoverHandle = navigator.camera.getPicture(onCamSuccess, onCamFail, {
			quality : 25,
			allowEdit : false,
			sourceType : Camera.PictureSourceType.CAMERA,
			destinationType : Camera.DestinationType.DATA_URL,
			encodingType : Camera.EncodingType.JPEG,
			cameraDirection : Camera.Direction.FRONT,
			targetWidth : 80,
			targetHeight : 80,
			saveToPhotoAlbum : false
		});
	},

	detectCurrentLocation : function() {
		var onGeoSuccess = function(position) {
			console.log(position);

			var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			google.maps.visualRefresh = true;

			var mapOptions = {
				zoom : 13,
				center : location,
				rotateControl : false,
				streetViewControl : false,
				mapTypeControl : false,
				draggable : true,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var currentLocationMarker = new google.maps.Marker({
				position : location,
				map : map,
				bounds : false,
				title : 'Buradasınız',
				//icon : image,
				//shape : shape,
				optimized : false
				//animation : google.maps.Animation.BOUNCE
			});
		};

		var onGeoFail = function(error) {
			console.log(error);
		};

		navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail, {
			timeout : 3000,
			enableHighAccuracy : true
		});
	},
	mapLoaded : function() {
		console.log("mapLoaded");
		app.detectCurrentLocation();
	}
	/*,
	findById : function(url, id) {
		if (id != null) {
			console.log("find by x");
			v_pos1 = url.indexOf('id=');
			v_pos2 = url.indexOf('&');
			v_id = url.substring(v_pos1, v_pos2);
			//app.getProductsDetay(v_id);
			app.id = id;
			//app.getProductsDetay(app.id);
			console.log("app.id:" + app.id);
		}
	} */
};

/*
$("a").live("click", function(e) {
	v_url = $(this).attr("href");
	v_id = $(this).attr("id");
	app.findById(v_url, v_id);
});
*/
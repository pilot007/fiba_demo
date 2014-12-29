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
		app.total_points=0;
		app.url="http://85.97.120.30:9090/fiba_group_webservices/";
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
			url : app.url+"GetAcitivies?member_id="+app.id,
			dataType : "json",
			success : function(a, b, c) {
				console.log("puanlarım 2");
				$('#div_puanlarim ul').remove();
				$('#div_puanlarim').append('<ul data-role="listview"></ul>');
				listItems = $('#div_puanlarim').find('ul');
				console.log("puanlarım 3");
				 
				
				for (var i = 0; i < a.length; i++) {
				html ="<table style='width:100%'>";
					console.log("puanlarım 4");
					html += '<tr><td width="50%">'+ a[i].company_name+ '</td>';
					html += '<td width="30%">' + a[i].activity_date + '</td>';
					html += '<td width="20%">' + a[i].points + '</td></tr>';
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
		        $("#un_mesajlar").append(app.user_name + "("+app.total_points+")");
	},	
    fnc_Profil : function() {
				$("#un_profil").empty();
		        $("#un_profil").append(app.user_name+ "("+app.total_points+")");
		        $("#txt_isim").val(app.name +" "+ app.surname);
		        $("#tx_tckn").val(app.identityno);
		        $("#txt_dogumtarihi").val(app.birthdate);
				$("#txt_cep_tel").val(app.mobile);
				$("#txt_email").val(app.email);
				$("#txt_adres").val(app.address_text);
				if(app.allow_email==1)
				$('#chk_mail').Attr('checked',true);
				else
				$('#chk_mail').Attr('checked',false);
				
				if(app.allow_sms==1)
				$('#chk_sms').Attr('checked',true);
				else
				$('#chk_sms').Attr('checked',false);

	},
	fnc_Kampanyalar : function() {
				$("#un_kampanyalar").empty();
		        $("#un_kampanyalar").append(app.user_name+ "("+app.total_points+")");
	},			
	fnc_Istatistik : function() {
				$("#un_istatistik").empty();
		        $("#un_istatistik").append(app.user_name+ "("+app.total_points+")");
	},
	fnc_EnYakin : function() {
				$("#un_enyakin").empty();
		        $("#un_enyakin").append(app.user_name+ "("+app.total_points+")");
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
		app.user_name="Merhaba : Ayşe Balcı";
		app.user_id="90910000001";
		app.id="123456789";

		$("#un_barkod").empty();
		$("#un_barkod").append(app.user_name);

		$("#un_barkod2").empty();
		$("#un_barkod2").append(app.user_name);

		new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData,pieOptions);
		new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

		$.ajax({
			url : app.url+"GetAcitivies?member_id="+app.id+"&conType=totalpoint",
			dataType : "json",
			success : function(a, b, c) {
					app.total_points=a[0].total_point;
					$("#un_barkod").empty();
					$("#un_barkod").append(app.user_name+ "("+app.total_points+")");					
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
		
		
		
		//if(app.name==null)
		{
		$.ajax({			
			url : app.url+"GetMember?member_id="+app.id,
			dataType : "json",
			success : function(a, b, c) {
				{
				  app.identityno=a.identityno;
				  app.name=a.name;
				  app.surname=a.surname;
				  app.birthdate=a.birthdate;
				  app.Birth_place=a.Birth_place;
				  app.address_type=a.address_type;
				  app.address_text=a.address_text;
				  app.city_id=a.city_id;
				  app.allow_email=a.allow_email;
				  app.allow_sms=a.allow_sms;
				  app.mobile=a.mobile;
				  app.work_phone=a.work_phone;
				  app.home_phone=a.home_phone;
				  app.fax=a.fax;
				  app.email=a.email;
				  app.user_name ="Merhaba : " + a.name + " " + a.surname;
				  				  
				 }
				//else
				//  $("#device_info").append('Kullanıcı tanımınız yapılmamıştır. Lütfen yöneticinize danışınız ');
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
};


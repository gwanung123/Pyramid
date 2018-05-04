
	
	var protocol = {
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat�� login ��û
		///////////////////////////////////////////////////////////////////////////////////////// */
		login: function login(id, pwd, nonce)
		{
			var json = new Object();
			json.fname = this.login.name;	//	login 
			json.id = id;								// ���� id
			json.pwd = pwd;						//	�н�����
			json.nonce = nonce;					
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat�� ä�� ��û
		///////////////////////////////////////////////////////////////////////////////////////// */
		hello: function wchathello(queue, id, ip, page, scode, charset)
		{
			var json = new Object();
			json.fname = this.hello.name;
			json.queue = queue; 					// queue ��ȣ
			json.id = id;									// ���� id
			json.ip = ip;									// nxproxy_wchat url ( ex 121.170.212.189:8878 )
			json.page = page;						// ��ǥ page url ( ex 121.170.212.189:8080 )
			json.scode = scode;						// ���� �ڵ� 
			json.charset = charset;					// ĳ���� ��
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat�� ä�� ����
		///////////////////////////////////////////////////////////////////////////////////////// */
		say: function wchatsay(id, mimetype, message) 
		{
			var json = new Object();
			json.fname = this.say.name;		
			json.id = id;													//���� id
			json.mime = mimetype;								//mimetype ( ex wchat/text, .... )
			json.contents = Base64.encode(message);	//��ȭ ����
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat�� ä�� ���� ��û
		///////////////////////////////////////////////////////////////////////////////////////// */
		bye: function wchatbye(id)
		{
			var json = new Object();
			json.fname = this.bye.name;			
			json.id = id;													//���� id
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		}
	};

	var init = (function(protocol) {

		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		index.html���κ��� ���� ���� parameters �Ľ�
		///////////////////////////////////////////////////////////////////////////////////////// */
		var Args = (function() {
			
			var args = new Object();
			var query =  window.location.search.substring(1);
			
			var pairs = query.split("&");
				
			for(var i = 0; i < pairs.length; i++ ) {
				
				var pos = pairs[i].indexOf('=');
				if( pos == -1 ) continue;
					
				var argname = pairs[i].substring(0, pos);
				var val = pairs[i].substring(pos+1);
				val = decodeURIComponent(val);
				args[argname] = val;
			}
		
			console.log("parsing parmeters.."+"["+JSON.stringify(args)+"]");
			return args;
		
		})();

		var holder = document.getElementById("inputText");
		holder.ondragover = function () { this.className = 'hover'; return false; };
	    holder.ondragend = function () { this.className = ''; return false; };

	    holder.ondrop = function (e) {
	        //this.className = '';
	         e.preventDefault();

			for (var n = 0; n < e.dataTransfer.files.length; n++) {
		        var entry = e.dataTransfer.items[n].webkitGetAsEntry();
		        var file = e.dataTransfer.items[n].getAsFile();
		        if (entry.isDirectory) {
		        	console.log(entry.fullPath);
		        }
		        console.log("#file:" + e.dataTransfer.files[n].name); 

		        
		        var change = document.getElementById("change");
		        change.innerHTML ="<input type='file' multiple='multiple' class='form-control' name='uploadfile' id ='uploadfile' "
		        + "value ='" + e.dataTransfer.files[n].name +"'" 
		        + " ></input>";
		        

	    	}

	      //    for (let f of e.dataTransfer.files) {
     		//  	console.log('File(s) you dragged here: ', f.path);
    		 // }

    		 
    		 return false;
    	}




		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		��ȭ ���� ���� ��ü
		///////////////////////////////////////////////////////////////////////////////////////// */
		var msgform = (function() {

			var _userid = "";
			var _time = "";
			var _identity = "";
			var _lastoption = "";
			
			
			function IsAttach(userinfo, time) {
				
				if (_userid != userinfo["id"] ) {
				
					_userid = userinfo["id"];
					_lastoption = userinfo["option"];
					
					return false;
					
				}else if( _lastoption != userinfo["option"]) {
					_lastoption = userinfo["option"];
					return false;
				}

				if (_time != time) {
					_time = time;
					return false;
				}
			
				return true;
			}

			function AttachUserInfo(userinfo) {
			
				var szid = "";
				var tagimg = "";
				var tagid = $('<li></li>').attr('class', _identity+'-id');
				
				if (_identity === 'me') {
					szid = $('<div><div>').text(userinfo["option"]);
					$(szid).appendTo($(tagid));
				} else {
					szid = $('<div><div>').text(userinfo["id"]);
					tagimg = $('<img></img>').attr('src', 'img/face.png');
					$(szid).appendTo($(tagid));
					$(tagimg).appendTo($(tagid));
				}
				$(tagid).appendTo($(".chat-box"));
			}
		
			/*/////////////////////////////////////////////////////////////////////////////////////////       
			////		�ð��� ���� 09:30 �� ���� �������� ����
			///////////////////////////////////////////////////////////////////////////////////////// */
			function conver12H (time)
			{
				var label = ['����', '����'];
				var timeRegExFormat = /^([0-9]{1,2}):([0-9]{1,2})$/;	// ^ �Է°� ����, [] ��ȣ ���� ��� ����, {n} �� �ݺ�, $ �Է°� ��
					
				var timetoken = time.match(timeRegExFormat);
					
				if( typeof timeRegExFormat === undefined) 
				{
					return null;
				}
					
				var intHours = parseInt(timetoken[1]);
				var intMinutes = parseInt(timetoken[2]);
				var szHours12H = ('0' + (intHours == 12 ? 12 : intHours % 12 )).slice(-2);
				var szMinute = ('0' + intMinutes).slice(-2);
				
				return label[parseInt(intHours / 12) ] + ' ' +szHours12H+':'+szMinute;		
			}
		
			return {
		
				/*/////////////////////////////////////////////////////////////////////////////////////////       
				////		��ȭ ���� ���
				///////////////////////////////////////////////////////////////////////////////////////// */
				show: function (userinfo, message, time) {

					var tagmsg;
					var tagtime;
					var cvtime;
					var lastchild = $(".chat-box").children().last();
					
					if (userinfo["id"] == "") {
						_identity = 'me';
					} else {
						_identity = 'other';
					}

					if (IsAttach(userinfo, time)) {
						lastchild.remove();
						tagmsg = $('<li></li>').attr('class', _identity + '-normal');
						tagtime = $('<li></li>').attr('class', _identity + '-normal time');

					} else {

						AttachUserInfo(userinfo);
						tagmsg = $('<li></li>').attr('class', _identity);
						tagtime = $('<li></li>').attr('class', _identity + '-normal time');
					}

					cvtime = conver12H(time);
					$(tagmsg).text(message).appendTo($(".chat-box"));
					$(tagtime).text(cvtime).appendTo($(".chat-box"));
					$("#content").scrollTop($("#content")[0].scrollHeight);
				}
			}
			
		})();
		
		
		$('#sendMsg').click( function () {
			
			var text = $("#inputText").val();
			
			if(text == "")
				return false;
			
			var obj = protocol["say"](Args.userid, "wchat/text", text);
			sock.send(obj);
			$("#inputText").val("");
			
		} );
	
		$('#inputText').keyup( function(e) {
		
			if(e.keyCode == 13 ) {
				$('#sendMsg').trigger("click");
			}
		} );


		$("#btnSubmit").click(function (event) {
	        //stop submit the form, we will post it manually.
	        event.preventDefault();
	        doAjax();
    	});

		function doAjax() {
 
			    // Get form
			    var form = $('#fileUploadForm')[0];
			    var data = new FormData(form);
			 
				$.ajax({
					type: "POST",
					enctype: 'multipart/form-data',
					//url: "api/v1/files/upload",
					url: "https://10.10.30.12:9443/api/v1/files/upload",
					data: data,
					processData: false, //prevent jQuery from automatically transforming the data into a query string
					contentType: false,
					cache: false,
					success: function (data) {
			//			// >>>>> DEBUG
			//			console.log("code=" + data.code);
			//			console.log("message=" + data.message);
			//			console.log("count=" + data.count);
			//			console.log("files=" + data.files);
			//			$.each(data.files, function(i, v) {
			//				console.log("i=" + i + ", filename=" + v.name + ", size=" + v.size + ", url=" + v.uri);
			//			});
			//			// <<<<< DEBUG

						$("#result").html("");
						if(data.code == 200 && data.count > 0 && data.files != null) {
							$.each(data.files, function(i, v) {
			//					console.log("i=" + i + ", filename=" + v.name + ", size=" + v.size + ", url=" + v.uri);

								$("#result").append('<a href=' + v.uri +'>' + (i+1) + ". " + v.name + '</a> </br>' );

								var obj = protocol["say"](Args.userid, "wchat/file", v.uri + "/" +v.name);
								sock.send(obj);

							});
						} else {
							$("#result").append('Uploading error. </br>' )
						}
			        },
			        error: function (e) {
			        	$("#result").text(e.responseText);
			        }
			    });
			    
			}







	
		window.addEventListener( 'beforeunload', function(ev) { 				//�˾�â ������ ��� ä�� ����
		
			var obj = protocol["bye"](Args.userid);
			sock.send(obj);
			sock.close();
		});	
	
	
		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		//// 		���� ��ħ ����
		////////////////////////////////////////////////////////////////////////////////////////////
		////		�齺���̽� : 8, F5 : 116, CTRL + R : e.ctrlKey && 82
		///////////////////////////////////////////////////////////////////////////////////////// */
		$(document).keydown(function ( e ) {
	
			var key = (e) ? e.keyCode : event.keyCode;
			var t = document.activeElement;
     
			if (key == 8 || key == 116 || (e.ctrlKey && key == 82) ) {
			
				if (key == 8) {
				
					if (t.tagName != "INPUT") {
					
						if (e) {
							e.preventDefault();
						} else {
							event.keyCode = 0;
							event.returnValue = false;
						}
					}
				} else {
				
					if (e) {
						e.preventDefault();
					} else {
						event.keyCode = 0;
						event.returnValue = false;
					}
				}
			}
		} );
	
		var sock = (function() {
		
			var url = "ws://"+Args.ip;
			var websock = new WebSocket(url);
			var firstMessage = false;

			websock.onopen = function() {
				websock.send(protocol["login"](Args.userid, "1", ""));	//nxproxy_wchat�� login ��û
			};
				
			websock.onmessage = function(message) {
	
				var nowtime = new Date();
				var sztime = nowtime.getHours()+":"+nowtime.getMinutes();
				var obj = JSON.parse(message.data);
				
				console.log(message.data);
			
				if(obj.fname === "login") {
			
					if(obj.result == 1) {
				
						var usrinfo = {"id":"", "option":""};
						websock.send(protocol["hello"](Args.queue, Args.userid, Args.ip, Args.page, Args.scode, "utf-8"));
						msgform.show(usrinfo, "���� ������ �Դϴ�.", sztime);	
						$("#inputText").attr("disabled", "disabled");					// ä�� �Է�â ��Ȱ��ȭ
					}
				
				} else if(obj.fname === "wchathello") {
				
					
			
				} else if(obj.fname === "wchatsay") {		//���� ���� �޽���
			
					if(obj.result == 1 ) {		
				
						var usrinfo = {"id":"", "option":""};
						msgform.show(usrinfo, Base64.decode(obj.contents), sztime);
						
					}
				} else if(obj.fname === "wchatmsg") {		//������ ���� �޽���
						
					if(obj.mime == "") {								//���� ���� ����� mime = "" ���� ���� ������ ���� ó��
				
						var usrinfo = {"id":"����", "option":""};
						msgform.show(usrinfo, "���� ������ ���� �Ǿ����ϴ�.", sztime);
						websock.close();
						websock = null;
						window.close();
					
					} else {
						
						var usrinfo = {"id":"����", "option":""};
						msgform.show(usrinfo, Base64.decode(obj.contents), sztime);
					
						if(!firstMessage) {							// �������κ��� ù �޽��� ���Ž� ä�� �Է� Ȱ��ȭ
							$("#inputText").removeAttr("disabled");
							firstMessage = true;	
						}
					
					}
				}
			};
	
			websock.onclose = function() {
				console.log("close");
			};
	
			websock.onerror = function() {
				console.log("error");
				window.close();
			};
		
			return {
				send : function(obj) {
					websock.send(obj);
				},
				close: function() {
					websock.close();
				}
			};
			
		})();
	
	});
	
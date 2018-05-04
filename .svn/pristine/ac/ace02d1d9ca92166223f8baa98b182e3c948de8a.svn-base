
	
	var protocol = {
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat에 login 요청
		///////////////////////////////////////////////////////////////////////////////////////// */
		login: function login(id, pwd, nonce)
		{
			var json = new Object();
			json.fname = this.login.name;	//	login 
			json.id = id;								// 유저 id
			json.pwd = pwd;						//	패스워드
			json.nonce = nonce;					
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat에 채팅 요청
		///////////////////////////////////////////////////////////////////////////////////////// */
		hello: function wchathello(queue, id, ip, page, scode, charset)
		{
			var json = new Object();
			json.fname = this.hello.name;
			json.queue = queue; 					// queue 번호
			json.id = id;									// 유저 id
			json.ip = ip;									// nxproxy_wchat url ( ex 121.170.212.189:8878 )
			json.page = page;						// 대표 page url ( ex 121.170.212.189:8080 )
			json.scode = scode;						// 서비스 코드 
			json.charset = charset;					// 캐릭터 셋
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat에 채팅 전송
		///////////////////////////////////////////////////////////////////////////////////////// */
		say: function wchatsay(id, mimetype, message) 
		{
			var json = new Object();
			json.fname = this.say.name;		
			json.id = id;													//유저 id
			json.mime = mimetype;								//mimetype ( ex wchat/text, .... )
			json.contents = Base64.encode(message);	//대화 내용
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		},
	
		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		nxproxy_wchat에 채팅 종료 요청
		///////////////////////////////////////////////////////////////////////////////////////// */
		bye: function wchatbye(id)
		{
			var json = new Object();
			json.fname = this.bye.name;			
			json.id = id;													//유저 id
			console.log(JSON.stringify(json));
			return JSON.stringify(json);
		}
	};

	var init = (function(protocol) {

		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		 ////		index.html으로부터 전달 받은 parameters 파싱
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
		 ////		대화 상자 생성 객체
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
			////		시간을 오전 09:30 와 같은 포맷으로 변경
			///////////////////////////////////////////////////////////////////////////////////////// */
			function conver12H (time)
			{
				var label = ['오전', '오후'];
				var timeRegExFormat = /^([0-9]{1,2}):([0-9]{1,2})$/;	// ^ 입력값 시작, [] 괄호 안의 모든 문자, {n} 번 반복, $ 입력값 끝
					
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
				////		대화 상자 출력
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







	
		window.addEventListener( 'beforeunload', function(ev) { 				//팝업창 닫히는 경우 채팅 종료
		
			var obj = protocol["bye"](Args.userid);
			sock.send(obj);
			sock.close();
		});	
	
	
		
		/*/////////////////////////////////////////////////////////////////////////////////////////       
		//// 		새로 고침 막기
		////////////////////////////////////////////////////////////////////////////////////////////
		////		백스페이스 : 8, F5 : 116, CTRL + R : e.ctrlKey && 82
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
				websock.send(protocol["login"](Args.userid, "1", ""));	//nxproxy_wchat에 login 요청
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
						msgform.show(usrinfo, "상담원 연결중 입니다.", sztime);	
						$("#inputText").attr("disabled", "disabled");					// 채팅 입력창 비활성화
					}
				
				} else if(obj.fname === "wchathello") {
				
					
			
				} else if(obj.fname === "wchatsay") {		//고객이 보낸 메시지
			
					if(obj.result == 1 ) {		
				
						var usrinfo = {"id":"", "option":""};
						msgform.show(usrinfo, Base64.decode(obj.contents), sztime);
						
					}
				} else if(obj.fname === "wchatmsg") {		//상담원이 보낸 메시지
						
					if(obj.mime == "") {								//상담원 연결 종료시 mime = "" 으로 오기 때문에 예외 처리
				
						var usrinfo = {"id":"상담원", "option":""};
						msgform.show(usrinfo, "상담원 연결이 종료 되었습니다.", sztime);
						websock.close();
						websock = null;
						window.close();
					
					} else {
						
						var usrinfo = {"id":"상담원", "option":""};
						msgform.show(usrinfo, Base64.decode(obj.contents), sztime);
					
						if(!firstMessage) {							// 상담원으로부터 첫 메시지 수신시 채팅 입력 활성화
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
	
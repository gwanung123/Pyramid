﻿********************************************************************
PYRAMID-EKRCCC MONITOR  v0.9.0.03 : 2018.04.27
수정일 : 2018.04.27
수정자 : eric
이슈번호 : 
키워드 : 
수정원인 : EKR LAB 과 소스 머지 
수정소스 : 
파일 변경 
	_MONITOR\ComponentTmpls\componentTmpls.js  
	_MONITOR\ComponentTmpls\kendo_user_Queue.html  
	_MONITOR\Contents\Board\model\modelBoardTop.js 
	_MONITOR\Contents\User\styles\css\contents_user.css 
	_MONITOR\Contents\User\sub\viewUserBottom.html 
	_MONITOR\Contents\User\sub\viewUserTop.html 
	_MONITOR\Contents\User\sub\viewUserTop.js 
	_MONITOR\Contents\contents.templates.model.js 

	_MONITOR\Defines\text\text.en.js 
	_MONITOR\Styles\css\monitor.css
	_MONITOR\monitor.define.js 

파일 추가 
    _MONITOR\ComponentTmpls\models\model.kendo.user.AgentChart.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.AgentIN.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.AgentOUT.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.AgentStats.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.QueueChart.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.QueueList.js
	_MONITOR\ComponentTmpls\models\model.kendo.user.QueueStats.js

	_MONITOR\ComponentTmpls\kendo_user_AgentChart.html
	_MONITOR\ComponentTmpls\kendo_user_AgentChart.js
	_MONITOR\ComponentTmpls\kendo_user_AgentIN.html
	_MONITOR\ComponentTmpls\kendo_user_AgentIN.js
	_MONITOR\ComponentTmpls\kendo_user_AgentOUT.html
	_MONITOR\ComponentTmpls\kendo_user_AgentOUT.js
	_MONITOR\ComponentTmpls\kendo_user_AgentStats.html
	_MONITOR\ComponentTmpls\kendo_user_AgentStats.js
	_MONITOR\ComponentTmpls\kendo_user_QueueChart.html
	_MONITOR\ComponentTmpls\kendo_user_QueueChart.js
	_MONITOR\ComponentTmpls\kendo_user_QueueList.html
	_MONITOR\ComponentTmpls\kendo_user_QueueList.js
	_MONITOR\ComponentTmpls\kendo_user_QueueStats.html
	_MONITOR\ComponentTmpls\kendo_user_QueueStats.js

	_MONITOR\Contents\User\model\modelUserAgentChart.js
	_MONITOR\Contents\User\model\modelUserAgentIN.js
	_MONITOR\Contents\User\model\modelUserAgentOUT.js
	_MONITOR\Contents\User\model\modelUserAgentStats.js
	_MONITOR\Contents\User\model\modelUserQueueChart.js
	_MONITOR\Contents\User\model\modelUserQueueList.js
	_MONITOR\Contents\User\model\modelUserQueueStats.js

********************************************************************
PYRAMID-EKRCCC MONITOR  v0.9.0.02 : 2018.04.23
수정일 : 2018.04.23
수정자 : Sam
이슈번호 : #22981
키워드 : 20180423 Sam #22981
수정원인 : Board에서 Call Type, Call Kind가 UNKNOWN으로 표시됨
수정소스 : _MONITOR/Defines/text/text.en.js
수정내용 : Eric TM님 요청으로 Skill ID, Call Count, Call Type, Call kind 삭제
********************************************************************
PYRAMID-EKRCCC MONITOR  v0.9.0.01 : 2018.04.20
수정일 : 2018.04.20
수정자 : Sam
이슈번호 : #22979
키워드 : 20180420 Sam #22979
수정원인 : Agent 창에서 인바운드,아웃바운드,내선통화,회의통화,협의통화 시 STATE 가 모두 OTHERWORK 로 표시 되는 현상
수정소스 : _MONITOR/ComponentTmpls/models/model.kendo.agent.AgentState.js
수정내용 : STATE의 경우 Mode정보에 대해서만 표현하고 있어서 해당 부분에 CallType을 고려해서 표기하도록 수정
-  bind할 데이터 객체를 만들때 Mode 정보 셋팅하는 메소드 ptt.makeDataMode = function( mode ) ->ptt.makeDataMode = function( mode , callType)으로 사용하도록 수정함
********************************************************************
PYRAMID-EKRCCC MONITOR  v0.9.0.00 : 2018.04.18
수정일 : 2018.04.18
수정자 : Sam
이슈번호 : #22976
키워드 : 20180418 Sam #22976
수정원인 : Agent 창에서 Mode 가 UNKNOWN 으로 표기 되는 현상
수정소스 : _MONITOR/ComponentTmpls/kendo_agent_AgentState.html
수정내용 : 해당 사이트에서는 Inbound만 사용하기 때문에 Mode 표기가 불필요하여 제거
- _MONITOR/ComponentTmpls/kendo_agent_AgentState.html 에서 Mode 삭제



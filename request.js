var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');//post 解析 必须要有

var url = require('url');
var util = require('util');

//mongodb 
var mongodb = require('./mongoOperateFuncTool');
//mongodb.find('productItem',{},function(err,res){
//	console.log('db connect check')
//});


http.createServer(function(req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
    res.writeHead(200, {'Content-Type': 'text/plain'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
//  res.write("网站名：" + params.name);
//  res.write("\n");
//  res.write("网站 URL：" + params.url);
    var json = JSON.stringify({
    		name : params.name,
    		address : params.url
    })
    
    res.end(json);
    console.log('=======get ====== success =======3000======');
 
}).listen(3000);
//http://localhost:4100/complex.json?callback=?&types=ACCOUNT

var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 请求的url
var path = '/user';
app.get(path, function(req, res) {
    // 默认返回的json 对象
    var obj = {
        "success": false
    }
    // 产生一个随机的金额模拟一下可用余额
    var money = Math.floor(Math.random()*10) + 5;
   
    // 如果请求中有参数 ‘types=ACCOUNT’
    if('types' in  req.query && req.query.types === 'ACCOUNT'){
        obj = {
            "ACCOUNT": {
                "avaiable": money,
                "freezeAmount": 0
            },
            "success": true
        };
    }
    res.send(obj);
    console.log('=======get ====== success =======4100======');
//  res.jsonp(obj);
});
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
// create application/json parser
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.post('/submit', jsonParser, function (req, res) {
  
   console.log(req.body);
  
 	//向数据库中插入数据
   mongodb.insertOne('productItem',req.body,function(err,res){
		console.log('向数据库插入数据成功')
	});
   var obj = {
   	data:req.body
   }
   res.send(obj);
   console.log("主页 POST 请求");
})
app.get('/queryBaseInfo', function (req, res) {
   console.log("/queryBaseInfo 响应 获取课程 年级 请求 http://www.kemiketang.com/kemiapi/queryCriteria/queryBaseInfo");
   
   var obj =  {"code":0,"message":"success","content":{"teacherCourse":[{"subjectId":2291,"subjectName":"教学培训","type":"teachercourse","isSelected":0},{"subjectId":2281,"subjectName":"科学培训","type":"teachercourse","isSelected":0}],"imgScience":[{"subjectId":651,"subjectName":"生命科学","type":"shortvideo","isSelected":0},{"subjectId":661,"subjectName":"物质科学","type":"shortvideo","isSelected":0},{"subjectId":671,"subjectName":"技术与工程","type":"shortvideo","isSelected":0},{"subjectId":681,"subjectName":"地球与宇宙","type":"shortvideo","isSelected":0},{"subjectId":1441,"subjectName":"其它","type":"shortvideo","isSelected":0}],"grade":[{"subjectId":404,"subjectName":"一年级","type":"course","isSelected":2},{"subjectId":405,"subjectName":"二年级","type":"course","isSelected":1}],"material":[{"subjectId":1231,"subjectName":"教科版","type":"material","isSelected":2},{"subjectId":1221,"subjectName":"人教版","type":"material","isSelected":1},{"subjectId":2971,"subjectName":"鄂教版","type":"material","isSelected":1},{"subjectId":2601,"subjectName":"湘科版","type":"material","isSelected":1},{"subjectId":3181,"subjectName":"苏教版","type":"material","isSelected":1},{"subjectId":3291,"subjectName":"青岛版（六三制）","type":"material","isSelected":1},{"subjectId":3301,"subjectName":"青岛版（五四制）","type":"material","isSelected":1},{"subjectId":3521,"subjectName":"冀人版","type":"material","isSelected":1},{"subjectId":3531,"subjectName":"大象版","type":"material","isSelected":1},{"subjectId":3541,"subjectName":"粤教版","type":"material","isSelected":1}],"semester":[{"subjectId":1,"subjectName":"上学期","type":"semester","isSelected":1},{"subjectId":2,"subjectName":"下学期","type":"semester","isSelected":2}]},"otherData":null}

   res.send(obj);
})
//  getSimpleCourseForB 获取 视频列表信息
app.get('/getSimpleCourseForB', function (req, res) {
	//sellType: YINGXIANGSUCAI
	//currentPage: 1
	//pageSize: 9
	// 如果请求中有参数 ‘types=ACCOUNT’
    if('sellType' in  req.query && req.query.types === 'YINGXIANGSUCAI'){
        
    }
   console.log("/del_user 响应 http://www.kemiketang.com/kemiapi/course/focusing/getSimpleCourseForB?sellType=YINGXIANGSUCAI&currentPage=1&pageSize=9 请求");
   var obj = {"code":0,"message":"success","content":{"page":1,"size":9,"total":326,"data":[{"courseId":10171,"courseName":"游泳的北极熊","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"游泳的北极熊","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536650203127.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":19,"whetherToPay":null,"pageViewcount":45325,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":7,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10161,"courseName":"夕阳下的北极熊","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"夕阳下的北极熊","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536649990090.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":1,"whetherToPay":null,"pageViewcount":35311,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":5,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10151,"courseName":"热浪中的北极熊","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"热浪中的北极熊","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536649495529.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":1,"whetherToPay":null,"pageViewcount":20519,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":1,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10141,"courseName":"北极熊玩耍","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"北极熊玩耍","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536649250195.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":4,"whetherToPay":null,"pageViewcount":23746,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":3,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10131,"courseName":"北极熊生活环境","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"北极熊生活环境","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536649147225.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":1,"whetherToPay":null,"pageViewcount":18819,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":2,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10121,"courseName":"北极熊身体特征","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"北极熊身体特征","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536649056026.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":1,"whetherToPay":null,"pageViewcount":20201,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":2,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10111,"courseName":"北极熊进食","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"北极熊进食","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536648962618.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":0,"whetherToPay":null,"pageViewcount":14384,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":0,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10101,"courseName":"北极熊打闹","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"北极熊打闹","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536648864413.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":0,"whetherToPay":null,"pageViewcount":17387,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":1,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null},{"courseId":10091,"courseName":"长颈鹿特征","isavaliable":null,"subjectId":404,"addTime":null,"sourcePrice":null,"currentPrice":0.00,"title":"长颈鹿特征","context":null,"courseKpoint":null,"lessionNum":null,"logo":"http://kemivideoupload.oss-cn-beijing.aliyuncs.com/courseimage/image/1536648741988.jpg???¶m=course","updateTime":null,"limitCount":null,"bogusBuycount":null,"pageBuycount":null,"commentNum":3,"whetherToPay":null,"pageViewcount":17716,"endTime":null,"loseType":null,"loseTime":null,"sellType":"YINGXIANGSUCAI","liveStatus":2,"liveBeginTime":null,"liveEndTime":null,"nearestLiveBeginTime":null,"nearestLiveEndTime":null,"playTime":null,"videoUrl":null,"videoType":null,"studyPercent":null,"teacherList":[{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null}],"mainTeacherName":null,"mainTeacher":{"id":0,"name":null,"education":null,"career":null,"isStar":0,"picPath":null,"type":null,"status":0,"createTime":null,"updateTime":null,"subjectId":404,"sort":0,"orderType":null},"courseList":null,"courseKpointList":null,"courseStudyhistory":null,"memberCourseId":null,"location":null,"kpointLiveStatus":null,"knowledgeId":"651","knowledgeName":null,"praiseCount":null,"isApproval":null,"addLoginName":null,"procInstId":null,"imageText":"[]","isImageText":0,"imageTextList":[],"semester":null,"chapter":null,"isRecommend":null,"courseSource":null,"courseEdition":null,"materialEdition":"1221","watchType":null,"courseType":null,"sequence":0,"mediaState":1,"startTime":null,"roomEnvironment":null,"roomEnvironmentList":null,"courseLabel":null,"giftTime":null,"postage":null,"subjectName":null,"recommendId":0,"orderNum":null,"memberTypeId":null,"courseAttributeValue":null,"teacherListMap":null,"courseMemberList":null,"inviteList":null,"tidbitCount":null,"favouriteCount":2,"fileType":"VIDEO","realViewcount":null,"allPlayTime":null,"isRecord":null,"buyHistory":0,"recordList":[],"knowledgeList":[],"sellTypeList":null,"userId":null,"favouriteHistory":null,"isPrepare":null,"watchTime":0,"isEnd":0,"errorMessage":null,"isPlaySuccess":1,"mediaId":null,"videoDuration":"0","stream":null,"simpleResult":null,"courseLabelSql":null,"noCourseId":null}]},"otherData":null}
   res.send(obj);
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
//var server = app.listen(8081, function () {
// 
//var host = server.address().address
//var port = server.address().port
// 
//console.log("应用实例，访问地址为 http://%s:%s", host, port)
// 
//})
app.listen(4100);

//作者：christeer 
//来源：CSDN 
//原文：https://blog.csdn.net/christeer/article/details/51347548 
//版权声明：本文为博主原创文章，转载请附上博文链接！
function remove(array, id) {
  var found = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      found = true;
      break;
    }
  }
  console.log("remove member at index ", i, found ? 'found' : 'Not found');
  found && array.splice(i, 1);
}

var MainView = {
  template: '\
	<div style="position: absolute; top: 0; bottom: 0; left: 0;right: 0; ">\
        <banner @logout="logout" :courseName="courseName" :courseId="courseId" :teacher="selfName"></banner>                                                                                                                 \
        <div class="edu-container">                                                                                                                                                                                          \
            <div class="edu-container-inner">                                                                                                                                                                                \
            <!-- 左侧固定 start -->                                                                                                                                                                                          \
                <div class="edu-left-sidebar">                                                                                                                                                                               \
                    <div class="edu-sidebar-box">                                                                                                                                                                            \
                        <div class="edu-sidebar-hd">                                                                                                                                                                         \
                            <h2 class="edu-sidebar-hd-title">成员管理</h2>                                                                                                                                                   \
                        </div>                                                                                                                                                                                               \
                        <div class="edu-sidebar-bd">                                                                                                                                                                         \
                            <div class="edu-sidebar-btn">                                                                                                                                                                    \
                                <button v-if="false" type="button" class="tc-15-btn" v-on:click="onInviteButtonClick">邀请成员</button>                                                                                      \
                            </div>                                                                                                                                                                                           \
                            <ul class="edu-sidebar-list">                                                                                                                                                                    \
                                <li>                                                                                                                                                                                         \
                                    <span>{{selfName}}<em>（我）</em></span>                                                                                                                                                 \
                                    <span class="edu-sidebar-list-state">{{ selfRole }}</span>                                                                                                                               \
                                    <a v-show="canLink" style="margin-left: 10px;" href="javascript:;;" @click="togglePusher">{{ togglePusherText }}</a>                                                                     \
                                </li>                                                                                                                                                                                        \
                                <li v-for="item in member_list" v-if="item.userID != selfId" :key="\'edu-sidebar-\'+(item.id)">                                                                                                        \
                                    <span>{{ item.nickName }}</span>                                                                                                                                                             \
                                </li>                                                                                                                                                                                        \
                            </ul>                                                                                                                                                                                            \
                        </div>                                                                                                                                                                                               \
                    </div>                                                                                                                                                                                                   \
                </div>                                                                                                                                                                                                       \
                <!-- 左侧固定 start -->                                                                                                                                                                                      \
                                                                                                                                                                                                                             \
                 <!-- 主界面 start -->                                                                                                                                                                                       \
                <div class="edu-main" style="overflow-y: scroll">                                                                                                                                                            \
                    <div style=" margin-right:320px; margin-left: 20px; height: 100%;">                                                                                                                                             \
                    <!-- tab start -->                                                                                                                                                                                       \
                        <div class="tc-15-tab tc-15-tab-alt customize-tab-bg" >                                                                                                                                              \
                            <div role="tablist" class="tc-15-tablist edu-tab-tablist">                                                                                                                                       \
                                <ul>                                                                                                                                                                                         \
                                    <li v-bind:class="{ \'tc-cur\': mode==\'camera\' }"><a @click="setMode(\'camera\')"  href="javascript:;" title="打开录像" role="tab">摄像头</a></li>                                      \
                                    <li v-bind:class="{ \'tc-cur\': mode==\'whiteboard\' }"><a @click="setMode(\'whiteboard\')" href="javascript:;" title="打开白板" role="tab">白板</a></li>            \
                                </ul>                                                                                                                                                                                        \
                                <!-- <div class="pull-right"> -->                                                                                                                                                            \
                                    <!-- <button class="tc-15-btn weak" v-on:click=""></button> -->                                                                                                                          \
                                    <!-- <button class="tc-15-btn" v-on:click="joinPusherBtnClick" v-if="selfRole != \'主播\'">加入互动</button> -->                                                                           \
                                <!-- </div> -->                                                                                                                                                                              \
                            </div>                                                                                                                                                                                           \
                          </div>                                                                                                                                                                                             \
                        <!-- tab end -->                                                                                                                                                                                     \
                        <!-- 内容快 start -->                                                                                                                                                                                \
                        <div class="edu-area-main">                                                                                                                                                                          \
                            <!--tab1 摄像头 Start -->                                                                                                                                                                        \
                            <div v-show="mode == \'camera\'" style="background-color: black;text-align:center;justify-content: center;height: 60vh;">                                                                                                                                 \
                                <!-- <div id="videoview" class="edu-main-video-play" style=" margin: 0 auto; width: 720px; height: 540px;"> -->                                                                                      \
                                <!-- </div> -->                                                                                                                                                                                      \
                                <video id="localVideo" style=" margin: 0 auto; width: 100%;    height: 100%;" muted autoplay playinline></video>                                                                                                                                    \
                            </div>                                                                                                                                                                                           \
                            <!--tab1 摄像头 End -->                                                                                                                                                                          \
                            <!--tab2 白板 Start -->                                                                                                                                                                          \
                            <div v-show="mode == \'whiteboard\'">  \
                              <sketchpad v-if="showSketchpad" :canDraw="canDraw" :toggleSketchPage="toggleSketchPage"  @sketchpadData="onSketchpadDataGen" :inputData="inputSketchpadData"   :imOptions="imOptions" :userAuthData="userAuthData" />  \
                            </div> \
                            <!--tab2 白板 End -->                                                                                                                                                                            \
                        </div>                                                                                                                                                                                               \
                        <!-- 内容快 end -->                                                                                                                                                                                  \
                        <!-- 互动人员 start -->                                                                                                                                                                              \
                        <div v-show="mode === \'camera\'" class="tc-member-list-container">                                                                                                                                    \
                           <ul class="edu-member-list-inner edu-scroll">                                                                                                                                                     \
                               <li v-show="showSelfPreviewed" class="edu-member-box">                                                                                                                                        \
                                    <!-- 互动人员图片 start -->                                                                                                                                                              \
                                    <div class="edu-member-img" id="video_previewed">                                                                                                                                        \
                                    </div>                                                                                                                                                                                   \
                                    <!-- 互动人员图片 end -->                                                                                                                                                                \
                                    <!-- 互动信息 start -->                                                                                                                                                                  \
                                    <div class="edu-member-body">                                                                                                                                                            \
                                        <div class="edu-member-body-info">                                                                                                                                                   \
                                            <span class="edu-member-name">{{ selfName }}</span>                                                                                                                              \
                                        </div>                                                                                                                                                                               \
                                    </div>                                                                                                                                                                                   \
                                </li>                                                                                                                                                                                        \
                                                                                                                                                                                                                             \
                                <li class="edu-member-box" v-for="(item, index) in members" :key="index">                                                                                                                    \
                                    <!-- 互动人员图片 start -->                                                                                                                                                              \
                                    <div class="edu-member-img" :id="\'video_\'+(item.id)">                                                                                                                                    \
                                        <img :id="\'img_\'+(item.id)"  v-show="item.reqeust" srcset="../assets/css/img/default.png 1x, ../assets/css/img/default@2x.png 2x" src="../assets/css/img/default.png" alt="default"> \
                                        <video :id="\'v_\'+(item.id)" style=" margin: 0 auto; width: 100%; height: 100%;" autoplay playsinline></video>\
                                    </div>                                                                                                                                                                                   \
                                    <!-- 互动人员图片 end -->                                                                                                                                                                \
                                    <!-- 互动信息 start -->                                                                                                                                                                  \
                                    <div class="edu-member-body">                                                                                                                                                            \
                                        <div class="edu-member-body-info">                                                                                                                                                   \
                                            <span class="edu-member-name">{{ nameMap[item.name] || item.name}}</span>                                                                                                                               \
                                        </div>                                                                                                                                                                               \
                                    </div>                                                                                                                                                                                   \
                                </li>                                                                                                                                                                                        \
                                                                                                                                                                                                                             \
                                <li class="edu-member-box" v-for="(item, index) in requestMembers" :key="index">                                                                                                             \
                                    <!-- 互动人员图片 start -->                                                                                                                                                              \
                                    <div class="edu-member-img">                                                                                                                                                             \
                                        <img srcset="../assets/css/img/default.png 1x, ../assets/css/img/default@2x.png 2x" src="../assets/css/img/default.png" alt="default">                                               \
                                          <!--学生请求发言 start -->                                                                                                                                                         \
                                          <div class="request-speak">                                                                                                                                                        \
                                              <div class="request-speak-bd">                                                                                                                                                 \
                                                  <h4>请求连麦,{{ item.count }}s后关闭</h4>                                                                                                                                  \
                                                  <div class="request-speak-btn">                                                                                                                                            \
                                                      <a @click="agreeSpeak(true, item.id)" href="javascript:void(0)" class="request-agree">同意</a>                                                                         \
                                                      <a @click="agreeSpeak(false, item.id)" href="javascript:void(0)" class="request-refuse">拒绝</a>                                                                       \
                                                  </div>                                                                                                                                                                     \
                                              </div>                                                                                                                                                                         \
                                          </div>                                                                                                                                                                             \
                                          <!-- 学生请求发言 end -->                                                                                                                                                          \
                                    </div>                                                                                                                                                                                   \
                                    <!-- 互动人员图片 end -->                                                                                                                                                                \
                                    <!-- 互动信息 start -->                                                                                                                                                                  \
                                    <div class="edu-member-body">                                                                                                                                                            \
                                        <div class="edu-member-body-info">                                                                                                                                                   \
                                            <span class="edu-member-name">{{item.name}}</span>                                                                                                                               \
                                        </div>                                                                                                                                                                               \
                                    </div>                                                                                                                                                                                   \
                                </li>                                                                                                                                                                                        \
                            </ul>                                                                                                                                                                                            \
                        </div>                                                                                                                                                                                               \
                        <!-- 互动人员 end -->                                                                                                                                                                                \
                    </div>                                                                                                                                                                                                   \
                    <!-- 右侧固定 留言 start -->                                                                                                                                                                             \
                    <div class="edu-right-sidebar">                                                                                                                                                                        \
                      <div role="tablist" class="tc-15-tablist edu-tab-tablist">                                                                                                                                            \
                        <ul>                                                                                                                                                                                                \
                          <li class="tc-cur">                                                                                                                                                                               \
                            <a href="javascript:;" title="打开录像">消息</a>                                                                                                                                                    \
                          </li>                                                                                                                                                                                              \
                          </ul>                                                                                                                                                                                              \
                        </div>                                                                                                                                                                                              \
                        <div class="edu-right-chatroom">                                                                                                                                                                     \
                            <div class="edu-chatroom-notification">                                                                                                                                                          \
                                <ul>                                                                                                                                                                                         \
                                    <li v-for="item in recentMembers">{{item.name}}{{item.joined ? \'进入\': \'退出\'}}了直播间</li>                                                                                             \
                                </ul>                                                                                                                \
                            </div>                                                                                                                                                                                           \
                            <div class="edu-chatroom-list">                                                                                                                                                                  \
                                <ul>                                                                                                                                                                                         \
                                    <li v-for="msg in msgs" v-if="!msg.isSystem" :class="{\'edu-chatroom-admin\': msg.isSystem, \'edu-chatroom-student\': !msg.isSystem}">                                                                              \
                                        <span>{{ msg.who }}:</span> {{msg.content}}                                                                                                                                             \
                                    </li>                                                                                                                                                                                    \
                                </ul>                                                                                                                                                                                        \
                            </div>                                                                                                                                                                                       \
                            <div class="edu-chatroom-speaking">                                                                                                                                                              \
                                <textarea v-model="inputMessage" @keyup.enter="onSendMessageClick" class="tc-15-input-textarea" placeholder="在此输入消息，按回车键发送"></textarea>                                         \
                                <div class="edu-expression-icon">                                                                                                                                                            \
                                    <!-- <i class="expression-icon"></i> -->                                                                                                                                                 \
                                    <button @click="onSendMessageClick" class="tc-15-btn m ">发送</button>                                                                                                               \
                                </div>                                                                                                                                                                                       \
                            </div>                                                                                                                                                                                           \
                                                                                                                                                                                                                             \
                        </div>                                                                                                                                                                                               \
                    </div>                                                                                                                                                                                                   \
                    <!-- 右侧固定 留言 start -->                                                                                                                                                                             \
                </div>                                                                                                                                                                                                       \
                 <!-- 主界面 end -->                                                                                                                                                                                         \
            </div>                                                                                                                                                                                                           \
        </div>                                                                                                                                                                                                               \																																																				\
	</div>',
  name: 'MainView',
  components: {
    'banner': Banner,
    'sketchpad': Sketchpad,
  },
  data: function () {
    return {
      courseName: null, //房间名
      courseId: null, //房间id
      selfName: null,
      selfRole: '主播',
      selfId: null, //用户id
      canLink: false,
      showSelfPreviewed: 0,
      toggleSketchPage: false,
      isRoomCreator: false,
      togglePusherText: '',
      inputSketchpadData: null,
      showSketchpad: false,
      members: [
        // { name: "李明", id: "2343", reqeust: true, ts: new Date()-30*60*1000},
      ],
      member_list:[],
      requestMembers: [],
      refleshTask: null,
      requestingPushers: [{
        id: '1',
        'name': 'jacqiu'
      }],
      pusherVideosDisplay: [false, false, false, false, false, false],
      pushers: {},
      msgs:[], // chat list
      nameMap:{
        "@TIM#SYSTEM": ''
      }, // userId : nickName
      messages: [
        //   {name: "李明", admin: false, id: "2343", text: "大家好，准备上课了！"},
        //   {name: "王老师", admin: true, id: "2343", text: "上课啦！"}
      ],
      inputMessage: "",
      lastUpdateTime: moment(Date.now() - 10 * 1000 * 60).format("hh:mm:ss A"),
      recentMembers: [],
      mode: "camera",
      memberUpdateTimer: null,
      imOptions: {
        sendMsg: function () {
          return "sendMsgFunction";
        }
      },
      canDraw: false,
      getMemberListSto: null,
      userAuthData: { // 用户鉴权信息
      }
    };
  },
  mounted: function () {
    var query = this.$route.query;
    console.log("Main.mounted: ", JSON.stringify(query));
    if (!query) {
      alert("请先登录!");
    } else if (query.cmd == "create") {
      this.selfRole = ''
      this.canDraw = true;
      this.isRoomCreator = true;
      this.courseName = query.courseName || '新房间';
      this.selfName = query.creator;
    } else if (query.cmd == "enter") {
      this.selfRole = '';
      this.canDraw = false;
      this.isRoomCreator = false;
      this.selfName = query.userName;
      this.roomID = query.roomID;
    } else if (query.cmd != "create" && query.cmd != "enter") {
      alert("发生错误，无法识别身份");
    }
    this.selfId = localStorage.getItem("selfId") ||  query.userId
    var self = this;
    WebRTCRoom.getLoginInfo(
      self.selfId ,
      function (res) {
        self.userAuthData = res.data;
        self.selfId = res.data.userID;
        self.userSig = res.data.userSig;
        self.accountType = res.data.accountType;
        self.sdkAppID = res.data.sdkAppID;
        localStorage.setItem("selfId", self.selfId)
        self.initRTC();
    }, function (res) {});
  },

  watch: {
    members: {
      handler: function (newData, oldData) {
        var self = this;
        console.warn("members:", newData);
        self.$nextTick(function () {
          for (var index in newData) {
            var videoElement = document.getElementById("v_" + newData[index].id);
            if (videoElement) {
              videoElement.srcObject = newData[index].stream;
            }
          }
        });
      },
      deep: true
    },

    requestMembers: {
      handler: function (newData, oldData) {
        var self = this;
        if (newData.length == 0) {
          self.refleshTask = null;
        } else {
          if (!self.refleshTask) {
            self.refleshTask = setTimeout(function () {
              self.refleshRequestMembers();
            }, 1000)
          }
        }
      },
      deep: true
    },
    showSelfPreviewed: function (newValue, oldValue) {
      var self = this;
      if (newValue) {
        self.$nextTick(function () {
          var previewId = 'video_previewed'
        })
      } else {}
    },
    selfRole: function (newValue, oldValue) {
      console.log("selfRole: " + oldValue + "-> newValue:" + newValue)
      switch (newValue) {
        case '主播':
          {
            if (oldValue == '观众') {
              this.canLink = true;
              this.togglePusherText = '断开连麦'
            }
            break;
          }
        case '观众':
          {
            this.canLink = true;
            // this.togglePusherText = '请求连麦'
            this.togglePusherText = ''
            this.members = [];
            break;
          }
      }
    }
  },

  methods: {
    initRTC: function(){
      var self = this;
      var query = this.$route.query;
      var RTC = this.RTC = new WebRTCAPI({
        sdkAppId: self.sdkAppID,
        userId: self.selfId,
        userSig: self.userSig,
        accountType: self.accountType,
      },function(){
        if (query.cmd == "create") {
          self.actionCreateRoom(query);
        } else if (query.cmd == "enter") {
          self.actionEnterRoom(query);
        }
      },function(error){
        console.error( error )
      });

    
      RTC.on("onLocalStreamAdd", function( info ) {
        var videoElement = document.getElementById("localVideo");
        videoElement.srcObject = info.stream;
        videoElement.muted = true;
      });

      RTC.on("onRemoteStreamUpdate", function( info ){
        var videoElement = document.getElementById("v_" + info.videoId);
        if( videoElement ){
          videoElement.srcObject = null;
        }
        if (info.stream) {
            var temp = []
            for (var i = 0; i < self.members.length; i++) {
              if (self.members[i].userId != info.userId) {
                temp.push(self.members[i])
              }
            }
            var member = {
              id: info.videoId,
              name: info.userId,
              request: false,
              role: '主播',
              roleText: '连麦',
              ts: Date.now(),
              stream: info.stream,
              userId: info.userId
            };
            temp.push(member);
            self.members = temp;

          } else {
            console.info(info.userId + "进入了房间");
          }
      });

      
      RTC.on("onRemoteStreamRemove", function( info ){
        var videoElement = document.getElementById("v_" + info.videoId);
        if (videoElement) {
          videoElement.srcObject = null;
        }
        var temp = []
        for (var i = 0; i < self.members.length; i++) {
          if (self.members[i].id != info.videoId) {
            temp.push(self.members[i])
          }
        }
        self.members = temp;
      });
  
      RTC.on("onKickOut",function(){
        console.warn("其他地方登录，被踢下线");
        self.goHomeRouter();
      });
  
      RTC.on("onWebSocketClose",function(){
        console.warn("websocket断开");
        self.goHomeRouter();
      });
  
  
      RTC.on("onRelayTimeout",function(){
        console.warn("服务器超时断开");
        self.goHomeRouter();
      });
    },
    togglePusher: function () {
      var self = this;
      switch (self.togglePusherText) {
        case '请求连麦':
          {
            self.joinPusherBtnClick();
            break;
          }
        case '断开连麦':
          {
            LiveRoom.quitPusher({
              fail: function () {
                alert('发生错误(quitPusher)')
                self.selfRole = '观众'
              },
              success: function () {
                self.selfRole = '观众'
                console.log('退出连麦成功')
              }
            });
            break;
          }
      }
    },

    getMemberList: function(){
      var self = this;
      WebRTCRoom.get_room_members( self.courseId, function(data){
        console.debug( data )
        if( data.data.code === 0){
          data.data.members.forEach(function(item){
            self.nameMap[item.userID] = item.nickName
          })
          self.member_list = data.data.members;
        }
      }, function( err ){
        if( err && err.errCode === 3){
          self.goHomeRouter();
        }
      })
    },

    renderMemberList: function(){
      var self = this
      this.stopRenderMemberList();
      self.getMemberList();
      this.getMemberListSto = setTimeout(function(){
        self.renderMemberList();
      },3000);
    },
    stopRenderMemberList: function(){
        clearTimeout( this.getMemberListSto )
    },

    refleshRequestMembers: function () {
      var self = this;
      var temp = []
      for (var i = 0; i < self.requestMembers.length; i++) {
        var mb = self.requestMembers[i]
        mb.count--;
        if (mb.count > 0)
          temp.push(mb)
      } //for
      self.refleshTask = null;
      self.requestMembers = temp;
      console.log('reflesh: ', JSON.stringify(self.requestMembers))
    },

    afterCreateRoom: function( courseInfo ){
      var self = this
      self.courseId = courseInfo.courseId;
      self.courseName = courseInfo.courseName;
      //创建房间
      console.error({
        roomid: parseInt(self.courseId),
        role: 'user',
        privateMapKey: courseInfo.privateMapKey
      })
      this.RTC.createRoom({
        roomid: parseInt(self.courseId),
        role: 'user',
        privateMapKey: courseInfo.privateMapKey
      }, function(){
        console.info('ENTER RTC ROOM OK')
      },function (result) {
        if (result) {
          console.error("ENTER RTC ROOM failed");
          self.goHomeRouter();
        }
      });
      self.initIM();
      self.renderMemberList();
    },

    actionCreateRoom: function (query) {
      console.log('-> action create room')
      var self = this;

      //本地存储，刷新的时候还是同一个房间号
      if( localStorage.getItem('course_info') ){
        var courseInfo = JSON.parse( localStorage.getItem('course_info') )
        self.afterCreateRoom( courseInfo );
        WebRTCRoom.startHeartBeat(self.selfId, courseInfo.courseId);
      }else{
        WebRTCRoom.createRoom(self.selfId, self.selfName, query.courseName, function (res) {
          //本地存储，刷新的时候还是同一个房间号
          localStorage.setItem('course_info',JSON.stringify( {courseId:res.data.roomID, courseName: query.courseName, privateMapKey: res.data.privateMapKey } ));
          self.afterCreateRoom( {courseId:res.data.roomID, courseName: query.courseName, privateMapKey: res.data.privateMapKey } )
        }, function (res) {
          // error, 返回
          self.goHomeRouter();
        });
      }
    },

    actionEnterRoom: function (query) {
      var self = this;
      self.courseId = query.roomID;
      self.courseName = query.roomInfo;
      self.selfName = query.userName;
      WebRTCRoom.enterRoom(self.selfId, query.userName, self.courseId, function (res) {
        //进房间
        self.RTC.createRoom({
          roomid: parseInt(self.courseId),
          role: 'user',
          privateMapKey: res.privateMapKey
        }, function (result) {
          
        }, function (){
          if (result) {
            console.error("webrtc建房失败");
            self.goHomeRouter();
          }
        });
        self.initIM();
        self.renderMemberList();
      }, function (res) {
        // error, 返回
        self.goHomeRouter();
      });
    },

    updateRecentMember: function (member, joined) {
      var self = this;
      if (self.recentMembers.length > 5) {
        self.recentMembers.splice(0, 1);
      }
      self.recentMembers.push({
        name: member.name,
        id: member.id,
        joined: joined
      })
      this.lastUpdateTime = moment(
        Date.now()
      ).format("hh:mm:ss A");
      console.log("updateRecentMember： ", JSON.stringify(this.recentMembers));
    },

    setMode: function (mode) {
      this.mode = mode;
      this.showSketchpad = true;
      console.log("mode", this.mode);
    },
    onInviteButtonClick: function () {
      console.log("onBeginClassBtnClick() called");
    },

    joinPusherBtnClick: function () {
      var self = this;
      console.log("请求连麦: userID= ", self.selfId, ' userName=', self.selfName);
      self.showSelfPreviewed = true;
    },

    toogleMemberVoice: function (id) {
      //关闭学生的声音
      console.log("toogleMemberVoice", id);
    },

    agreeSpeak: function (agree, id) {
      //连麦应答
      console.log("agreeSpeak", agree, id);
      var self = this;
      for (var i = 0; i < self.requestMembers.length; i++) {
        if (self.requestMembers[i].id == id) break;
      }
      self.requestMembers.splice(i, 1);
      if (agree) {
        console.log("同意" + id + "加入连麦");
      } else {}
    },

    kickMember: function (userID) {

    },

    onSendMessageClick: function () {
      var self = this;
      var msg = this.inputMessage;
      this.inputMessage = "";
      if (msg && msg.length > 0) {
        console.log("sending Msg: ", msg , {
          groupId: self.courseId,
          msg: msg,
          nickName: self.selfName,
          identifier: self.selfId
        });
      }
      // IM.sendMsg( self.selfId, self.courseId, msg);
      IM.sendRoomTextMsg({
        groupId: self.courseId,
        msg: msg,
        nickName: self.selfName,
        identifier: self.selfId
      });
    },

    logout: function () {
      //推出登录
      console.log("logout clicked");
      var self = this;
      if (confirm("退出登录吗？")) {
        self.goHomeRouter();
      } else {}
    },

    goHomeRouter: function () {
      var self = this;
      // WebRTCAPI.init({}, {});
      localStorage.removeItem('course_info');
      this.RTC.quit();
      this.stopRenderMemberList();
      WebRTCRoom.quitRoom(self.selfId, self.courseId, function (res) {
        self.$router.push({
          path: '/'
        });
      }, function (res) {
        self.$router.push({
          path: '/'
        });
      });
    },

    onSketchpadDataGen: function (boardData) {
      IM.sendBoardMsg({
        groupId: this.courseId,
        msg: boardData,
        nickName: this.selfName,
        identifier: this.selfId
      });
    },



    onBigGroupMsgNotify: function (msgList) {
      for (var i = msgList.length - 1; i >= 0; i--) { //遍历消息，按照时间从后往前
          var msg = msgList[i];
          //console.warn(msg);
          webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
          //显示收到的消息
          showMsg(msg);
      }
    },


    onMsgNotify: function(newMsgList) {
      if( newMsgList && newMsgList.length > 0 ){
        var msgsObj = IM.parseMsgs( newMsgList )
        this.msgs = this.msgs.concat( msgsObj.textMsgs );
        if(!this.isRoomCreator) {
          this.inputSketchpadData = msgsObj.whiteBoardMsgs || '';
        }
      }
    },

    initIM: function () {
      var self = this;
      var loginInfo = {
        sdkAppID: self.sdkAppID,
        appIDAt3rd: self.sdkAppID,
        identifier: self.selfId,
        identifierNick: self.selfName,
        accountType: self.accountType,
        userSig: self.userSig
      };
      console.debug('initIM', loginInfo )
      IM.login(loginInfo, {
          "onBigGroupMsgNotify": self.onMsgNotify
        },
        function (resp) {
          IM.joinGroup( self.courseId , self.selfId )
        },
        function (err) {
          alert(err.ErrorInfo);
        }
      );
    }

  } //methods
};
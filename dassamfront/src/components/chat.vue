<template>
  <div>
    <v-app-bar color="cyan" flat dark fixed height="60px">
      <v-btn icon @click="back()">
        <span class="material-icons">
          arrow_back
        </span>
      </v-btn>

      <v-avatar size="3 0">
         <v-icon  size="30">mdi-account-circle</v-icon> 
      </v-avatar>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{$store.state.selectedName}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item 
            v-for="(setting, index) in settings"
            :key="index"
            @click="() => {}"
          >
           <router-link to="/setting"> <v-list-item-title >{{setting }}</v-list-item-title></router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main
      id="scroll-target"
      class="overflow-y-auto main"
      style=" background:#00838F;margin-top:60px;margin-bottom:50px;"
    >
      <span v-for="(message, index) in messages" :key="index">
        <!--SENDER START  TEXT-->
        <div
          style="display:block;width:80%;margin:0;padding:1px"
          class="sender"
          v-if="
            message.from == $store.state.userId &&
              message.to == $store.state.selectedId
          "
        >
          <v-card
            v-if="message.type === 'text'"
            rounded
            elevation="2"
            style="position:relative"
            class="sender text"
            d-block
            flat
            ><div class="message>" style="float:left">
              <p class="message">{{ message.message }}</p>
            </div>
            <div style="width:50px;float:right;" class="time">
              <p class="time-content">
                {{ message.created_at | formatDate }}
                <span
                  v-if="message.read == -1"
                  style="font-size:15px;background:white!important"
                  class="material-icons"
                >
                  watch_later </span
                ><span
                  style="font-size:15px"
                  v-if="message.read == 0"
                  class="material-icons"
                >
                  check </span
                ><span
                  v-if="message.read == true"
                  style="font-size:15px;color:green"
                  class="material-icons"
                >
                  done_all
                </span>
              </p>
            </div>
            <!--END SENDER-->
            <!--SENDER IMAGE START-->
          </v-card>
          <v-card
            v-else
            rounded
            elevation="2"
            style="position:relative;margin-bottom:10px"
            class="sender text"
            height="280"
            width="280"
            d-block
            flat
          >
            <div class="message>" style="float:left;">
              <v-img
                :src="link(message.message)"
                height="90%"
                width="95%"
                class="sender-image"
                style="position:absolute;right:6px;left:6px;top:6px;bottom:40px"
              ></v-img>
              <div
                style="width:50px;right:9px;position:absolute;bottom:3px;"
                class="time"
              >
                <p class="time-content">
                  {{ message.created_at | formatDate }}
                  <span
                    v-if="message.read == -1"
                    style="font-size:15px;background:white!important"
                    class="material-icons"
                  >
                    watch_later </span
                  ><span
                    style="font-size:15px"
                    v-if="message.read == 0"
                    class="material-icons"
                  >
                    check </span
                  ><span
                    v-if="message.read == true"
                    style="font-size:15px;color:green"
                    class="material-icons"
                  >
                    done_all
                  </span>
                </p>
              </div>
            </div>
          </v-card>
        </div>
        <!--SENDER IMAGE END-->

        <!--RECEIVER PART-->

        <div
          style="display:block;width:80%;padding:1px"
          class="receiver"
          v-if="
            message.from == $store.state.selectedId &&
              message.to == $store.state.userId
          "
        >
          <v-card v-if="message.type==='text'"
            color="light-green lighten-3"
            class="receiver text"
            rounded
            elevation="2"
            flat
            ><div class="message>" style="float:left">
              <p class="message">{{ message.message }}</p>
            </div>
            <div style="width:50px;float:right;" class="time">
              <p class="time-content">{{ message.created_at | formatDate }}</p>
            </div>
          </v-card>
          <!--RECEIVER IMAGE-->

          <v-card
            v-else
            rounded
            color="light-green lighten-3"
            elevation="2"
            style="position:relative;margin-bottom:10px"
            class="receiver text"
            height="280"
            width="280"
            d-block
            flat
          >
            <div class="message>" style="float:left;">
              <v-img
                :src="link(message.message)"
                height="90%"
                width="95%"
                class="sender-image"
                style="position:absolute;right:6px;left:6px;top:6px;bottom:40px"
              ></v-img>
              <div
                style="width:50px;right:9px;position:absolute;bottom:3px;"
                class="time"
              >
                <p class="time-content">
                  {{ message.created_at | formatDate }}
                </p>
              </div>
            </div>
          </v-card>
          <!--END RECEIVER IMAGE-->

        </div>
      </span>
      <!--PREVIEW IMAGE BEFORE SEND-->
      <div
        style="display:block;width:80%;margin:0;padding:1px"
        class="sender"
        v-if="imagePreviewUrl"
      >
        <v-card
          rounded
          elevation="2"
          style="position:relative"
          class="sender text"
          d-block
          flat
        >
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="cyan"
          ></v-progress-circular>

          <div class="message>" style="float:left">
            <v-img :src="imagePreviewUrl" height="300px" width="250px"></v-img>
          </div>
        </v-card>
      </div>
      <!---END PREVIEW-->
    </v-main>
    <v-footer flat fixed rounded color="#00838F" style="padding-bottom:0;">
      <div class="footer-content">
        <v-textarea
          id="textarea"
          persistent-hint
          @keyup.enter="Send()"
          v-model="text"
          @focus="scrollBottom()"
          solo
          flat
          class="text-area"
          rows="1"
          name="input-7-1"
          background-color="#ffffff"
          placeholder="Entrer votre message"
          auto-grow
        ></v-textarea>
        <span @click.prevent="TakePhoto()" class="material-icons camera-icon">
          photo_camera
        </span>

        <v-btn
          class="mx-2 send-btn"
          @click.prevent="Send()"
          fab
          dark
          style="height:50px;width:50px"
          color="cyan"
        >
          <span class="material-icons">
            send
          </span>
        </v-btn>
      </div>
    </v-footer>
  </div>
</template>
<script>
import moment from "moment"

Vue.filter("formatDate", function(date) {
  if (date) {
    return moment(String(date)).format("HH:mm");
  }
});

import store from "../store/index.js";
import Vue from "vue";
import axios from "axios";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;
import { decode } from "base64-arraybuffer";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://api.dassam.net";
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
Echo = new Echo({
  broadcaster: "pusher",
  cluster: "ap2",
  useTLS: false,
  key: "bc1f892da84753f0772a",
  authorizer: (channel, options) => {
    console.log(options);
    return {
      authorize: (socketId, callback) => {
          axios.defaults.headers.common['Authorization']=`Bearer ${store.state.isAuth}`;
        axios
          .post("api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name
          })
          .then(response => {
            callback(false, response.data);
          })
          .catch(error => {
            callback(true, error);
          });
      }
    };
  }
});

export default {
  data() {
    return {
      loading: false,
      url: true,
      settings: [
        "Signaler cet utilisateur",
        "Bloquer cet utilisateur",
        "Faire un  don a DassamMedic"
      ],
      id: "",
      init: true,
      messages: store.state.AllMessages,
      camera: true,
      text: "",
      message: {
        message: "",
        type: ""
      },
      imagePreviewUrl: "",
      cordonnees: "",
      phoneNumber: "",
      appVerifier: "",
      email: "",
      password: "",
      Combine: store.state.userId + store.state.selectedId,
      mounted: false,
      imagePreviewUrl: ""
    };
  },

  methods: {
    scrollBottom(){
    //SCROLL TO  THE BOTTOM //
    Vue.nextTick(function() {
      var div = document.getElementById("scroll-target");
      return div.scrollTop+10000000;
    });
    //END SCROLL TO THE BOTTOM//
    },
    link(e) {
      return "http://api.dassam.net/messages/" + e;
    },

    Send(e) {
      document.getElementById("textarea").focus();
      this.message.message = this.text;
      (this.text = ""), (this.camera = true);
      var MessageValues = {}; //Store the message info before storing into  database for user to  see what he has sended

      MessageValues = {
        from: store.state.userId,
        to: store.state.selectedId,
        message: this.message.message,
        created: new Date(),
        type: "text",
        read: -1 //It means message is not sent yet
      };

      this.UsersOnWelcomePage(); //SET INFO IN WELCOME USERS PAGE

      if (this.messages == "[]" || Object.keys(this.messages).length === 0) {
        this.messages = MessageValues = [
          {
            //This condition because messages is initialised with stringfy Json and [] seems to be caracter.
            from: store.state.userId,
            read: -1, //It means message is not sent yet
            to: store.state.selectedId,
            type: "text",
            message: this.message.message,
            created: new Date()
          }
        ];
        //THIS FUNCTION BELOW IS FOR SCROLLING
        Vue.nextTick(function() {
          var div = document.getElementById("chat");
          div.scrollTop = div.scrollHeight - div.clientHeight;
        });
      axios.defaults.headers.common['Authorization']=`Bearer ${store.state.isAuth}`;
        axios
          .post("api/message/" + store.state.selectedId, this.message)
          .then(response => {
            localStorage.setItem("messages", JSON.stringify(response.data));
              this.messages = JSON.parse(localStorage.getItem('messages'));
          });
      } else {
        this.messages.push(MessageValues);
        Vue.nextTick(function() {
          var div = document.getElementById("scroll-target");
          div.scrollTop = div.scrollHeight;
        });

        this.camera = true;

        axios
          .post("api/message/" + store.state.selectedId, this.message)
          .then(response => {
            this.loading = false;
            Vue.nextTick(function() {
              var div = document.getElementById("scroll-target");
              div.scrollTop = div.scrollHeight;
            });
            localStorage.setItem("messages", JSON.stringify(response.data));
              this.messages = JSON.parse(localStorage.getItem('messages'));
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    saveImage() {
      this.message.message = this.imagePreviewUrl;
      this.message.type = "image";
      var MessageValues = {}; //Store the message info before storing into  database for user to  see what he has sended

      this.loading = true;
      MessageValues = {
        from: store.state.userId,
        type: "image",
        to: store.state.selectedId,
        message: this.imagePreviewUrl,
        created: new Date(),
        read: -1 //It means message is not sent yet
      };

      this.camera = true;
      axios.defaults.headers.common['Authorization']=`Bearer ${store.state.isAuth}`;
      axios
        .post("api/message/" + store.state.selectedId, this.message)
        .then(response => {
          this.loading = false;
          this.message.type = "";
          this.imagePreviewUrl = false;
          this.messages = response.data;
          Vue.nextTick(function() {
            var div = document.getElementById("scroll-target");
            div.scrollTop = div.scrollHeight;
          });
          localStorage.setItem("messages", JSON.stringify(response.data));
        })
        .catch(() => {
          this.loading = false;
          this.imagePreviewUrl = false;
          this.message.type = "";
        });
    },

    Initialisation() {
      axios.get("api/read/" + store.state.selectedId);
      //I read the selected user messages,and I update the content

      if (Object.keys(store.state.allUsers).length === 0) {
        this.messages = {};
      } else {
        //WE UPADE HERE THE USER COUNTER FOR MESSAGE
        var tableau = Object.entries(store.state.allUsers);
        for (const property in tableau) {
          if (store.state.selectedId == tableau[property][1].id) {
            tableau[property][1].count = 0;
            break;
          }
        }
        localStorage.setItem(
          "allUsers",
          JSON.stringify(Object.fromEntries(tableau))
        );

        //END
        this.messages = JSON.parse(localStorage.getItem("messages"));
      }
      store.state.userIsSelected = false;
      if (this.mounted)
        document.getElementById("scrolling").scrollByPoint(0, 10000000000, 300);
    },
    //FUNCTION IS USED TO UPDATE THE USERS ON THE WELCOME PAGE
    UsersOnWelcomePage() {
      var cle = Math.round(Date.now() / 1000);
      if (Object.keys(store.state.allUsers).length === 0) {
        //CHECK  IF THERE ARE NOT PREVIOUS  USERS IF SO,WE CREATE A NEW ONE ELSE WE GO TO NEXT STEP OF CONDITIONS
        store.state.allUsers = {
          [cle]: {
            message: this.message.message,
            count: 0,
            type:'text',
            id: store.state.selectedId,
            username: store.state.selectedName,
            created_at: new Date()
          }
        };
        localStorage.setItem("allUsers", JSON.stringify(store.state.allUsers));
        store.state.orderer = Object.keys(store.state.allUsers)
          .sort()
          .reverse();
        //Store the new user in the local storage for further use,
      } else {
        var userAlreadyExists = false;
        var userAlreadyExistsKey = "";
        var tableau = Object.entries(store.state.allUsers);
        for (const property in tableau) {
          if (store.state.selectedId == tableau[property][1].id) {
            userAlreadyExists = true;
            userAlreadyExistsKey = tableau[property][0];
            break;
          }
        }
        if (userAlreadyExists) {
          //  Check if user is in my welcome list

          delete store.state.allUsers[userAlreadyExistsKey];

          store.state.allUsers[cle] = {
            message: this.message.message,
            count: 0,
            type:'text',
            id: store.state.selectedId,
            username: store.state.selectedName,
            created_at: new Date()
          };
          store.state.orderer = Object.keys(store.state.allUsers)
            .sort()
            .reverse();
          localStorage.setItem(
            "allUsers",
            JSON.stringify(store.state.allUsers)
          );
        } else {
          // Else I  add  him
          store.state.allUsers[cle] = {
            message: this.message.message,
            count: 0,
            type:'text',
            id: store.state.selectedId,
            username: store.state.selectedName,
            created_at: new Date()
          };
          store.state.orderer = Object.keys(store.state.allUsers)
            .sort()
            .reverse();
          localStorage.setItem(
            "allUsers",
            JSON.stringify(store.state.allUsers)
          ); //Store the new user in the local storage for further use,
        }
      }
    },

    back() {
      (this.messages = []), this.$router.push("/");
      this.$store.commit("Back");
    },
    async TakePhoto() {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        allowEditing: true,
        quality: 90
      });
      this.imagePreviewUrl = photo.dataUrl;
      this.saveImage();
    },
    async getPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("Current", coordinates);
      this.cordonnees = ("Current", coordinates.coords.latitude);
    }
  },
  created() {
    Echo.private("chat." + localStorage.getItem('myid')).listen("MessageEvent", e => {
      if (e.message.from == store.state.selectedId) {
        this.messages.push(e.message);
        //SCROLL TO  THE BOTTOM //
        Vue.nextTick(function() {
        
          var div = document.getElementById("scroll-target");
          div.scrollTop = div.scrollHeight;
        });
        //END SCROLL TO THE BOTTOM//
        if (store.state.isSelectedEvent)
          axios.get("api/read/" + store.state.selectedId);
      }
    });
    Echo.private("read." + localStorage.getItem('myid')).listen(
      "HasreadMessageEvent",
      e => {
        if (e.from == store.state.selectedId) {
          axios
            .get("api/messages") //Get all the user's messages
            .then(response => {
              this.messages = response.data;
              //SCROLL TO  THE BOTTOM //
              Vue.nextTick(function() {
                var div = document.getElementById("scroll-target");
                div.scrollTop = div.scrollHeight;
              });
              //END SCROLL TO THE BOTTOM//
              localStorage.setItem("messages", JSON.stringify(response.data));
            });
        }
      }
    );
  },

  mounted() {
   
    this.mounted = true;
      axios.defaults.headers.common['Authorization']=`Bearer ${store.state.isAuth}`;
    axios.get("api/read/" + store.state.selectedId); //WE READ THE SELECTED USER MESSAGES
    if (Object.keys(store.state.allUsers).length === 0) {
      this.messages = {};
    } else {
      
      //WE UPADE HERE THE USER COUNTER FOR MESSAGE
      var tableau = Object.entries(store.state.allUsers);
      for (const property in tableau) {
        if (store.state.selectedId == tableau[property][1].id) {
          tableau[property][1].count = 0;
          break;
        }
      }
      localStorage.setItem(
        "allUsers",
        JSON.stringify(Object.fromEntries(tableau))
      );
    }

    //END
   this.messages=JSON.parse(localStorage.getItem('messages'));
    //SCROLL TO  THE BOTTOM //
    Vue.nextTick(function() {
      var div = document.getElementById("scroll-target");
      div.scrollTop = div.scrollHeight;
    });
    //END SCROLL TO THE BOTTOM//
  }
};
</script>


<style scoped>
.v-progress-circular {
  position: absolute;
  right: 130px;
  top: 150px;
  z-index: 10;
}
.receiver {
  background: "#d8f4c9" !important;
  margin-left: 10px;
  padding: 3px 3px 3px 3px;
  float: left;
  margin-top: 0px;
}
.sender {
  margin-right: 10px;
  float: right;
  margin-top: 0px;
  padding: 3px 3px 3px 3px;
}
.message {
  margin-bottom: 0;
}
.text {
  padding: 6px 15px 6px 6px;
}
.time {
  margin-bottom: 0;
  padding: 0;
  margin: 5px;
  margin-bottom: 0;
  margin-left: 10px;
  color: grey;
  font-weight: 500;
}
.time,
.message {
  display: inline-block;
}
.time-content {
  font-size: 12px;
  margin-bottom: 0;
}

.text-area {
  border-radius: 20px;
  border: none;
  outline: none;
  width: 83% !important;
  padding: 0;
  color: red;
  position: absolute;
  bottom: -26px;
}
.textarea::placeholder {
  color: red;
}
.style-camera {
  position: absolute;
  right: 90px;
}
.camera-icon {
  position: absolute;
  font-size: 30px;
  right: 22%;
  bottom: 20%;
  z-index: 10;
}
.footer-content {
  width: 100%;
  position: relative;
  height: 50px;
  display: inline-block;
}
.send-btn {
  position: absolute;
  right: -10px;
  bottom: 6%;
  font-size: 30px;
}

.main {
  min-height: 83vh !important;
  max-height: 30vh !important;
}

/* ----------- iPhone X ----------- */

/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (orientation: portrait) {
  .main {
    min-height: 85vh !important;
    max-height: 83vh !important;
  }
}
</style>
<template>
   <v-list three-line class="users">
      <template v-for="time in $store.state.orderer">
          <v-divider
             inset
            ></v-divider>
        <v-list-item  @click="Goto($store.state.allUsers[time].id,$store.state.allUsers[time].username,time)"
         style="position:relative">
          <v-list-item-avatar size="60">
         <v-btn
            icon
            x-large
          >
            <v-avatar
              color="brown"
              size="76"
            >
              <span class="white--text headline">{{$store.state.allUsers[time].username[0] }}</span>
            </v-avatar>
          </v-btn>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="username" >{{$store.state.allUsers[time].username}}</v-list-item-title>

            <v-list-item-subtitle v-if="$store.state.allUsers[time].type==='text'">{{$store.state.allUsers[time].message}}</v-list-item-subtitle>
            <v-list-item-subtitle  v-else><span style="font-size:20px" class="material-icons">
photo
</span><span style="position:absolute;top:8">Photo</span></v-list-item-subtitle>
          </v-list-item-content>
        <v-tab class="counter">
        <v-badge v-if="$store.state.allUsers[time].count!=0"
          color="cyan"
          :content="$store.state.allUsers[time].count"
        >
        </v-badge>
      </v-tab>
      <h5 style="position:absolute;right:25px;bottom:15px;">
      {{toDateTime(time)| formatDate }}
      </h5>
        </v-list-item>
      </template>
    </v-list>
</template>

<script>
import moment from 'moment';
import Vue from 'vue'

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('HH:mm')
    }
});
import axios from 'axios'
import store from '../store/index.js'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://api.dassam.net";
import Echo from 'laravel-echo';
 window.Pusher = require('pusher-js');
 window.Echo = new Echo({
    broadcaster: "pusher",
    cluster: 'ap2',
     useTLS :false,
    key:'bc1f892da84753f0772a',
     authorizer: (channel,options) => {
      console.log(options)
        return {
            authorize: (socketId, callback) => {
                axios.post('api/broadcasting/auth', {
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
    },
})
  
export default {
  
  data(){
    return{
        fans:'',
        users:[],
        count:[1,2,3,4],
        loaded:false,
        messages:'',
        counts:[],
        Ids:[],
        id:'',
    }
  },

    methods:{

    toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
 },
      Goto(id,name){
        this.$router.push('chat-room')
        this.$store.commit('Goto',{id,name})
      
      },
      GetMessages(){
          axios.get('api/messages')//Get all the user's messages
         .then(response=>{
            store.state.allMessages=response.data;
            localStorage.setItem('messages',JSON.stringify(response.data))
         })
      },
      
         },
    
  created(){
    axios.defaults.headers.common['Authorization']=`Bearer ${store.state.isAuth}`;
    axios.get('api/user')
          .then(response=>{
            store.state.userId=response.data.id,
            this.id=response.data.id;
            localStorage.setItem('username',response.data.name);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('userimage',response.data.picture);
            localStorage.setItem('myid',response.data.id)
        
    
     window.Echo.private('chat.'+this.id)
     .listen('MessageEvent', (e) => {
   
            var cle=Math.round(Date.now()/1000);
       if(Object.keys(store.state.allUsers).length === 0){ //CHECK  IF THERE ARE NOT PREVIOUS  USERS IF SO,WE CREATE A NEW ONE ELSE WE GO TO NEXT STEP OF CONDITIONS
        (store.state.allUsers)={
          [cle]:{
            'message':e.message.message,
           'count':1,
           'id':e.message.from,
           'username':e.username,
           'created_at':new Date(),
          }
           
          }
          localStorage.setItem('allUsers',JSON.stringify(store.state.allUsers));
          store.state.orderer=Object.keys(store.state.allUsers).sort().reverse();
          this.GetMessages()

       //Store the new user in the local storage for further use,
       }
       else{ 
          var userAlreadyExists=false;
          var userAlreadyExistsKey='';
          var count='';
          var tableau=Object.entries(store.state.allUsers);
           for(const property in tableau){  //My array is like that [1688883,{message:'hello",'from'...
                                                 //                   177373,{message:'coucou','from'}}]
              if(e.message.from==tableau[property][1].id){
                userAlreadyExists=true;
                count=tableau[property][1].count;
                userAlreadyExistsKey=tableau[property][0]//referes to 168883 or 177373
                break;
             }
           }
       if(userAlreadyExists){  //  Check if user is in my welcome list
        
         delete (store.state.allUsers)[userAlreadyExistsKey];
          (store.state.allUsers)[cle]={
           'message':e.message.message,
           'count':count+1,
           'type':e.message.type,
           'id':e.message.from,
           'username':e.username,
           'created_at':new Date(),
          }
          
          store.state.orderer=Object.keys(store.state.allUsers).sort().reverse();
          localStorage.setItem('allUsers',JSON.stringify(store.state.allUsers));
             this.GetMessages()
       }
       else{// Else I  add  him
         (store.state.allUsers)[cle]={
           'message':e.message.message,
           'count':1,
           'type':e.message.type,
           'id':e.message.from,
           'username':e.username,
           'created_at':new Date(),
          }
          
           store.state.orderer=Object.keys(store.state.allUsers).sort().reverse();
          localStorage.setItem('allUsers',JSON.stringify(store.state.allUsers));//Store the new user in the local storage for further use,
             this.GetMessages()
       }
          
        
       } 
  });
  
    
    
          });
  }
  ,
  mounted(){
     axios.get('api/getusers')//Get list of users 
        .then(response=>{
           localStorage.setItem('allUsers',JSON.stringify(response.data));//Users on welcome page//
           store.state.allUsers=response.data;
           store.state.orderer=Object.keys(store.state.allUsers).sort().reverse();
           this.loaded=true;
           })
           .catch(error=>{
              if(error.response.status===401) {
             store.state.isAuth=' ';
             localStorage.removeItem('isLoggedIn');
             this.$router.push('/register');
           }
           })
      axios.get('api/messages')//Get all the user's messages
         .then(response=>{
          
            store.state.allMessages=response.data;
            localStorage.setItem('messages',JSON.stringify(response.data))
         
         })
          .catch(error=>{
           if(error.response.status===401) {
             store.state.isAuth=' ';
             localStorage.removeItem('isLoggedIn');
             this.$router.push('/register');
           }
          })
        
  
        

        
  }
};
</script>

<style scoped>
.counter{
    position:absolute;
    right:0px;
}
.username{
  color: black;
  font-weight: 500;
}
</style>

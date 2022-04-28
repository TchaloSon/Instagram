import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";

export default new Vuex.Store({

     
  
    state:{
      orderer:Object.keys(JSON.parse(localStorage.getItem('allUsers'))||[]).sort().reverse(),
      allUsers:JSON.parse(localStorage.getItem('allUsers'))||null,
      welcomePage:true,
      userIsSelected:'',
      selectedName:localStorage.getItem('selectedName'),
      isSelectedEvent:false,
      selectedId:localStorage.getItem('id'),
      nopharma:true,//Will display the icon
      isAuth: localStorage.getItem('isLoggedIn')||null,
      userId:localStorage.getItem('myid')||null,
      userName:localStorage.getItem('name')||null,
      AllMessages:JSON.parse(localStorage.getItem('messages'))||null,
      selectedMessages:'',
      selectedKeyInUsers:false,
      hasSubscribedTo:localStorage.getItem('subscribevent')||null

    },
    mutations:{
    
     Back(state){
         localStorage.removeItem('id');
         state.nopharma=true;
         localStorage.setItem('id','null');
         state.welcomePage=true;
         state.isSelectedEvent=false;
         state.selectedKeyInUsers=false;

     },
     ToPharamcies(state){
      state.nopharma=false;
     },
     FromFavorites(state,{id,name}){
       state.nopharma=false;
        state.isSelectedEvent=true;
         state.selectedId=id;
         localStorage.setItem('id',id);
         state.selectedName=name;
         state.userIsSelected
         =true;
         
     },
     Goto(state,{id,name,time}){
      
        state.nopharma=false;
        state.isSelectedEvent=true;
         state.selectedId=id;
         localStorage.setItem('id',id);
         localStorage.setItem('selectedName',name);
         state.selectedName=name;
         state.userIsSelected
         =true;
         state.selectedKeyInUsers=time//The key in the object allUsers is by the time of each user;
        
     }
    }
});

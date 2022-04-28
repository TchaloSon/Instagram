
<template>
  <v-card class="card">
    <!--ORIGINAL TOOLBAR-->
    <v-app-bar v-if="!expand"
      fixed
      color="cyan"
      dark
      flat
    >
      <v-toolbar-title class="title">DassamMedic</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="closed()">
        <span class="material-icons" v-if="!isclosed">
wifi
</span>
 <span class="material-icons" v-if="isclosed">
wifi_off
</span>
      </v-btn>

     
         <v-menu transition="fab-transition">
      <template v-slot:activator="{ on, attrs }">
      
        
        <v-icon   v-bind="attrs"
          v-on="on">mdi-dots-vertical</v-icon>
     
     
      </template>
      <v-list>
        <v-list-item
          v-for="(setting,index) in settings"
          :key="index"
        >
         <router-link :to="'/'+index"> <v-list-item-title class="links" >{{setting}}</v-list-item-title></router-link>
        </v-list-item>
      </v-list>
    </v-menu>

      <template v-slot:extension>
        <v-tabs v-model="model" slider-color="yellow" fixed-tabs>
          <v-tab class="tabs" style="display:inline-block;" href="#tab-1">
            <v-icon class="icon-tab"> mdi-message-text </v-icon>
            <p>CHAT</p>
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab class="tabs" href="#tab-2" style="display:inline-block">
            <span class="material-icons">
              groups
            </span>
            <p>RESEAU</p>
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab class="tabs" href="#tab-3" style="display:inline-block">
            <span class="material-icons">
              notifications_active
            </span>
            <p>NEWS</p>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <!--END ORIGINAL TOOLBAR-->

  <!--TOOLBAR FOR EXPAND PHARMACIES-->
   <v-app-bar v-if="expand" height="50px"
      fixed
      color="cyan"
      dark
      flat
    >
      <v-btn icon   @click="expand = !expand">
        <span class="material-icons">
          arrow_back
        </span>
      </v-btn>
      <v-toolbar-title class="title"><h3 class="pharmacy_title">Pharmacies</h3> <p class="count_pharmacies"> {{pharmacies.length}} pharmacies</p></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
<!--END TOOLBAR FOR PHARMACIES EXPAND-->
    <!--LIST OF PHARMACIES --!-->
        <v-btn v-if="!expand"
         @click="expand = !expand"
       
          class="mx-2"
          fixed
          style="position:fixed;bottom:2vh;z-index:10;right:0"
          fab
          dark
          large
          color="cyan"
        >
          <span class="material-icons">
            local_pharmacy
          </span>
        </v-btn>
      
    <!--LIST TO DISPLAY PHARMACIES-->
     <v-expand-transition>
     <v-card 
       v-show="expand"
          style="margin-top:35px"
          height="100%"
          width="100%"
          class="mx-auto">
    <v-list two-line style="position:relative">
      <template v-for="pharmacy in pharmacies">
        <v-list-item  :key="pharmacy.username" @click="Goto(pharmacy.id,pharmacy.username)">
          <v-list-item-avatar>
         <v-btn
            icon
            x-large
          >
           <v-avatar>
        <v-icon  size="30">mdi-account-circle</v-icon> 
      </v-avatar>
    </v-btn>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="username" >{{pharmacy.username}}
              
            </v-list-item-title>
               <v-list-item-title class="username" > 
            </v-list-item-title>
          </v-list-item-content>
          <v-chip
      class="ma-2"
      color="indigo"
      text-color="white"
    >
      
      <span class="material-icons">
location_on
</span> {{pharmacy.distance.toFixed(1)}} km
    </v-chip>
             <!--ACTIVE BADGE-->  
                   <span class="material-icons" style="position:absolute;font-size:10px;left:50px;bottom:22px;color:green">
                 fiber_manual_record
              </span>
        
        <!--END ACTIVE BADGE-->
        </v-list-item>
       
      </template>
      
    
    </v-list>
      </v-card>
    <!--END LIST FOR DISPLAYING PHARMACIES-->
</v-expand-transition>
    <!--LIST OF MENU CONTENT-->
    <v-tabs-items v-model="model" class="items" v-if="!expand">
      <!--CHAT-->
      <v-tab-item value="tab-1">
        <v-card flat>
          <users style="margin-top:24%;"></users>
        </v-card>
      </v-tab-item>
     <!--END CHAT-->
      <v-tab-item value="tab-2">
        <v-card flat>
          <users style="margin-top:24%;"></users>
        </v-card>
      </v-tab-item>

      <!--NEWS -->
      <v-tab-item value="tab-3" style=" background-color:#78909C">
        <div class="news">
   <v-card
    class="mx-auto"
    color="#385F73"
    dark
    max-width="90%"
  >
    <v-card-title>
      <span class="title font-weight-light">Equipe DassamMedic</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      "Turl."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
        </div>
      </v-tab-item>
     <!--END NEWS-->
    </v-tabs-items>
    <!--SNACKBAR-->
     <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!--END SNACKBAR-->
  </v-card>
</template>


<script>
import users from "../views/users.vue";
import axios from 'axios'
axios.defaults.baseURL = "http://api.dassam.net";
export default {
  components: { users },
  data() {
    return {
        text:'',
      snackbar:false,
      isclosed:false,
      ex11:'',
      settings:{
       gift: 'Faire un don',
       settings:'Paramètres',
       politics:'Politique de confidentialité',
       conditions:'Les conditions',
       how:'Comment ça marche?'},
      expand: false,
      loaded:false,
      pharmacies:'',
      model: "tab-1",
      sheet: false
    };
  },
  methods:{
    closed(){
     this.snackbar=true
      this.isclosed=!this.isclosed
      if(this.isclosed) {
        this.text="Votre pharmacie est fermée"
      }
      else{
           this.text="Votre pharmacie vient de s'ouvrir"
      }

       setTimeout(()=>{
         this.snackbar=false;
       },2000)
    },
     Goto(id,name){
        this.$router.push('chat-room')
        this.$store.commit('Goto',{id,name})
      
      }
  },
  created(){
     axios.defaults.headers.common['Authorization']=`Bearer ${this.$store.state.isAuth}`;
     axios.get('api/pharmacies',)
      .then(response=>{
        this.pharmacies=response.data;
        this.loaded=true;
       
      })
      .catch(error=>{
          if(error.response.status===401) {
             this.$store.state.isAuth=' ';
             localStorage.removeItem('messages');
             localStorage.removeItem('isLoggedIn');
             this.$router.push('/register');
           }
           })
  }
};
</script>
<style scoped>
.title {
  font-weight: 600;
}
.appbar {
  max-width: 100% !important;
  padding: 0 0 0 0;
  margin-left: 0;
  margin-right: 0;
}

.segment {
  border: none;
}
.tabs {
  width: 100%;
}
.items {
  overflow: scroll;
}

.toolbar {
  position: sticky;
}
.card {
  height: 100vh;
}
.count_pharmacies{
  font-size: 10px;
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
}
.pharmacy_title{
  padding-bottom: 0px;
  font-size: 15px;
  margin-bottom: -8px;
}
.username{
  font-weight: 600;
}
.news{
  margin-top: 120px;
}
.links,a{
  list-style: none;
  text-decoration: none;
}
.links{
  color: black;
}

</style>
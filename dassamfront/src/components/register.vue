<template>
 <div>
       <v-app-bar color="cyan" flat dark fixed height="60px">
    
      <v-toolbar-title>DASSAM,vous souhaite la bienvenue</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
  <div class="container" style="margin-top:60px">
    <v-row class="avatar">
      <v-avatar size="150" class="avatar-child">
        <img
          src="img/undraw_medical_care_movn.svg"
          height="200px"
          width="200px"
        />
      </v-avatar>
    </v-row>
    <v-row>
      <div class="register">
       <router-link to="/login">  <v-chip
      class="ma-2"
      color="primary"
      pill
    >
      Dejà inscrit?
      <v-icon right>
        mdi-account-outline
      </v-icon>
    </v-chip></router-link>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Nom"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
          v-model="password"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Mot de passe"
            hint="Au moins 6 caractères"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
            <v-checkbox
              v-model="user.type"
              color="success"
              value="pharmacy"
              label="Cochez cette case si vous etes une pharmacie"
              hide-details
            ></v-checkbox>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Acceptez-vous les conditions d'utilisation et nos politiques?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>

          <v-btn class="mr-4" color="#009688" style="color:white" @click="submit"> SUIVANT </v-btn> 
        <v-overlay :value="overlay">
      <v-progress-circular indeterminate
        size="64"
      >
       Veuillez patientez!
     </v-progress-circular>
    </v-overlay>
         
        </form>
      </div>
    </v-row>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from "vuelidate";
import { required, maxLength, email, sameAS } from "vuelidate/lib/validators";
axios.defaults.withCredentials = true;


export default {
  name: "register",
  mixins: [validationMixin],

  validations: {
    password_confirmation: {
      confirm
    },
    name: { required, maxLength: maxLength(15) },
    email: { required, email },
    username: { required, maxLength: maxLength(15) },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    user:{
      name:'',
      type:'',
      password:'',
      email:'',
      device_name:'ANDROID',
    },
    overlay: false,
    pharmacy:"",
    name: "",
    email: "",
    show3: false,
    checkbox: false,
    password_confirmation: "",
    password:'',
    rules: {
      required: value => !!value || "Obligatoire",
      min: v => v.length >= 8 || "Au moins 6 caracteres"
    }
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked &&
        errors.push("Vous devez accepter les conditions avant de continuer!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Le nom  ne doit pas depasser 15 caracteres");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Veuillez utiliser un email valide");
      !this.$v.email.required && errors.push("Ce champ email est obligatoire");
      return errors;
    }
  },

  methods: {
    submit() {
     
    
      this.user.name=this.name;
      this.user.password=this.password;
      this.user.email=this.email;
      this.user.device='ANDROID'; 
       this.overlay=true;
       { axios.post('http://api.dassam.net/api/sanctum/register',this.user).
       then(response=>{
             this.$store.state.isAuth=response.data[1].split('|')[1]
               localStorage.setItem('isLoggedIn',response.data[1].split('|')[1]);
            this.overlay=false;
            this.clear();
            this.$router.push('/');
       })
       .catch(error=>{
         this.errors=error.response.data.errors;
       });}
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
      this.password="";
      this.pharmacy=false
    }
  } ,

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');

.register {
  width: 94%;
  margin-right: 3%;
  margin-left: 3%;
}
.container {
 background:#ffffff;
 height: 100vh;
 overflow: hidden;
  font-family: 'Arvo', serif;
  font-weight:550;

}
.avatar{
  margin-top: 5%;
  height:170px;
  position:relative;
}
.avatar-child {
  background: #009688;
  position: absolute;
  margin-left: 30%;
}
</style>
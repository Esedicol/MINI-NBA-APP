<template>
    <div id="app">
        <v-app id="inspire">
            <v-toolbar dark class="primary">
                <v-title><img class="logo" src="https://www.stickpng.com/assets/images/58428defa6515b1e0ad75ab4.png"/></v-title>

                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-xs-only">
                    <v-btn flat to="/home"><v-icon left>home</v-icon>GSW-Home</v-btn>
                    <v-btn flat to="/players"><v-icon left dark>child_care</v-icon>View Players</v-btn>
                    <v-btn flat to="/champs"><v-icon left dark>airplanemode_active</v-icon>World Champions</v-btn>
                    <v-btn v-if="!isLogIn" flat to="signUp"><v-icon left dark>person</v-icon>SingUp</v-btn>
                    <v-btn v-if="!isLogIn" flat to="login"><v-icon left dark>person</v-icon>Login</v-btn>

                </v-toolbar-items>
            </v-toolbar>
            <main style="height: 100% !important;">
                <router-view></router-view>
            </main>

            <v-footer height="180px" color="indigo" dark>
                <v-layout justify-center row wrap>
                    <v-flex color="indigo" dark py-3 text-xs-center white--text xs12>
                        <strong>Git Repo: <a href="https://github.com/Esedicol/Mini-GSW">https://github.com/Esedicol/Mini-GSW</a></strong>
                    </v-flex>
                    <v-flex>
                        <v-btn v-if="!isLogIn" round v-on:click="logout">Logout</v-btn>
                    </v-flex>
                </v-layout>
            </v-footer>
        </v-app>
    </div>

</template>

<script>
    import firebase from 'firebase'

    export default {
        data () {
            return {
                isLogIn: false,
                currentUser: false,
            }
        },
        methods: {
            logout: function () {
                firebase
                    .auth()
                    .signOut()
                    .then( () => {
                        this.isLogIn = false;
                        this.$router.push('/login')
                    });
            }
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLogIn = true;
                this.currentUser = firebase.auth().currentUser.email;
            }
        }
    }
</script>

<style>
    .container {
        padding: 0px !important;
        max-width: 100% !important;
    }
    .v-toolbar__content {
        background-color: #232323 !important;
        padding: 0px 50px !important;
    }

    .v-btn__content {
        background-color: transparent;
        border: none !important;
        box-shadow: none;
        font-family: "Roboto", sans-serif !important;
    }

    .v-toolbar__content:hover {
        height: 75px !important;
    }

    body {
        margin: 0px !important;
    }
    img.logo {
        width: 100px;
    }
    main {
        background-color: #022327 !important;
        padding: 100px 30px !important;
    }

    .layout.justify-center.row.wrap {
        text-align: center !important;
        font-family: "Roboto", sans-serif !important;
    }
</style>

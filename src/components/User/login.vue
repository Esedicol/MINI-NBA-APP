<template>
    <v-layout>
        <v-flex md6 offset-md3>
            <v-card style="padding: 20px; background-image: url('https://www.nbaevents.com/summerleague/wp-content/uploads/sites/12/2019/05/Trapezoids_onRedBg.png');">
                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex md10 offset-md1>
                                <v-title>
                                    <h1>USER LOGIN</h1>
                                </v-title>
                            </v-flex>
                            <v-flex md11>
                                <v-text-field
                                        v-model="email"
                                        label=". Enter Email*"
                                        prepend-icon="edit"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md11>
                                <v-text-field
                                        v-model="password"
                                        label=". Enter Password*"
                                        prepend-icon="edit"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md10 offset-md1>
                            <small>*indicates required field</small>
                            </v-flex>
                            <v-flex md4 offset-md9>
                                <v-card-actions>
                                    <v-btn round v-on:click="login">Login</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
    import firebase from 'firebase';
    export default {
        name: 'login',
        data: function() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            login: function(e) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        user => {
                            alert(`You are logged in as ${user.user.email}`);
                            this.$router.push('/home');
                        },
                        err => {
                            alert(err.message);
                        }
                    );
                e.preventDefault();
            }
        }
    };
</script>

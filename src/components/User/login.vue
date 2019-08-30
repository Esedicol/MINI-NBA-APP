<template>
    <v-layout>
        <v-flex md6 offset-md3>
            <v-card style="margin: 20px">
                <v-card-title>
                    <h1>User Login</h1>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-layout wrap>
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
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round v-on:click="register">Login</v-btn>
                </v-card-actions>
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

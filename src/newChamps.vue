<template>
    <v-layout>
        <v-flex md6 offset-md3>
            <v-snackbar v-model="snackbar" timeout="4000" top>
                New Record Added!!!!
                <v-btn round @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-layout row>
                <p>Add a new NBA Record </p>
            </v-layout>

            <v-card>
                <v-card-title>
                    <h1>New NBA World Record</h1>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md11>
                                <v-text-field :rules="r1" v-model="name" label=". Team name*" required counter="30" prepend-icon="edit"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md11>
                                <v-text-field :rules="r3" v-model="year" label=". Year*" required prepend-icon="folder"></v-text-field>
                            </v-flex>

                            <v-flex xs12  md11>
                                <v-text-field :rules="r2" v-model="location" label=". Location *" required prepend-icon="star"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1"  round to="/champs" >Back</v-btn>
                    <v-btn color="blue darken-1"  :loading="loading" round @click="submit()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import db from '@/firebase'

    export default {
        data () {
            return {
                name: '',
                year: '',
                location: '',
                loading: false,
                snackbar: false,
                r1: [
                    n => n.length >= 5 && n.length <= 30 || 'Invalid Name length'
                ]
            }
        },
        methods: {
            submit () {
                    this.loading = true;
                    const newRecord = {
                        name: this.name,
                        year: this.year,
                        location: this.location

                    };
                    db.collection('worldChampions').add(newRecord).then( () => {
                        console.log('Added to db', newRecord);
                        this.loading = false;
                        this.snackbar = true;
                    })
            }
        }
    }
</script>

<style scoped>
h1 {
    padding-left: 20px;
}

p {
    font-size: 80px;
    font-family: Damascus,serif;
    font-style: oblique;
    color: darkblue;
    margin: 50px;
}
</style>

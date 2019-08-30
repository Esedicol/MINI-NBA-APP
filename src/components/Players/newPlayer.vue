<template>
    <v-layout>
        <v-flex md6 offset-md3>
            <v-snackbar v-model="snackbar" timeout="3000" top>
                New Player Added!!!!
                <v-btn round @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-layout row>
                <p>Add a new GSW Player </p>
            </v-layout>

            <v-card>
                <v-card-title>
                    <h1>Player Profile</h1>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md11>
                                <v-text-field
                                        v-model="name"
                                        label=". Legal name*"
                                        required
                                        counter="30"
                                        prepend-icon="edit">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md11>
                                <v-text-field
                                        v-model="url"
                                        label=". Img url*"
                                        required
                                        counter="100"
                                        multi-line
                                        prepend-icon="folder"
                                        :rules="r3" >
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12  md2>
                                <v-text-field
                                        v-model="height"
                                        label=". height *"
                                        required
                                        prepend-icon="star">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12  md2>
                                <v-text-field
                                        v-model="ppg"
                                        label=". ppg *"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12  md2>
                                <v-text-field
                                        v-model="apg"
                                        label=". apg *"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12  md2>
                                <v-text-field
                                        v-model="spg"
                                        label=". spg *"
                                        required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round to="/players" >Back</v-btn>
                    <v-btn :loading="loading" round @click="submit()">Save</v-btn>
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
                url: '',
                height: '',
                ppg: '',
                apg: '',
                spg: '',
                loading: false,
                snackbar: false,
                r3: [
                    n => n.length >= 10 && n.length <= 100 || 'Invalid URL length'
                    ]
            }
        },
        methods: {
            submit () {
                    this.loading = true;
                    const np = {
                        name: this.name,
                        url: this.url,
                        height: this.height,
                        ppg: this.ppg,
                        apg: this.apg,
                        spg: this.spg

                    };
                    db.collection('players').add(np).then( () => {
                        this.loading = false;
                        this.snackbar = true;
                        this.name = '';
                        this.url = '';
                        this.height = '';
                        this.ppg = '';
                        this.apg = '';
                        this.spg = '';
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

<template>
    <v-container>

        <v-flex offset-sm4>
            <v-layout row>
                <p style="font-size: 50px; color: aliceblue; text-align: center !important;">NBA Super Stars</p>
            </v-layout>
        </v-flex>

        <v-dialog v-model="dialog">
            <v-card>
                <v-layout>
                    <v-layout style="padding: 50px">
                        <v-flex>
                            <v-card-media
                                    :src="editedItem.url"
                                    height="300px"
                                    width="300px">
                            </v-card-media>
                        </v-flex>
                    </v-layout>
                    <v-flex sm8 offset-sm2>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex md8>
                                        <v-text-field v-model="editedItem.name" label="Player Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.height" label="Height"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.ppg" label="Points per game"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.apg" label="Assist per game"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.spg" label="Steals per Game"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn round large @click="close">Cancel</v-btn>
                            <v-btn round large @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>

        <v-layout row>
            <v-flex sm8 offset-sm2 >
                <v-toolbar flat  >
                    <p style="font-style: normal; font-size: 30px; color: aliceblue; text-align: center !important;">NBA GSW Players</p>
                    <v-spacer></v-spacer>
                    <v-btn round large to="/newPlayer" ><v-icon left>add</v-icon> New Player</v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>

        <v-layout v-for="item in this.players">
            <v-flex offset-sm2 md8>
                <v-card>
                    <v-container>
                        <v-layout row>
                            <v-flex>
                                <v-card-media
                                        :src="item.url"
                                        height="300px"
                                        width="300px">
                                </v-card-media>
                            </v-flex>
                            <v-flex md9 offset-sm1>
                                <v-card-title class="primary--text">
                                    <div>
                                        <span style="margin-bottom: 10px!important; font-style: normal; font-size: 30px; color: aliceblue; text-align: left !important;">{{item.name}}</span>
                                        <div class="player-info">Height : {{item.height}}</div>
                                        <div class="player-info">Points Per Game : {{item.ppg}}</div>
                                        <div class="player-info">Assist Per Game : {{item.apg}}</div>
                                        <div class="player-info">Steals Per Game : {{item.spg}}</div>
                                    </div>

                                </v-card-title>

                                <v-card-action>
                                    <v-btn flat round large @click="editItem(item)">
                                        <v-icon left>edit</v-icon>
                                        Edit Player
                                    </v-btn>
                                </v-card-action>
                                <v-card-action>
                                    <v-btn flat round large @click="deleteItem(item)">
                                        <v-icon left>delete</v-icon>
                                        Delete Player
                                    </v-btn>
                                </v-card-action>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import db from '@/firebase'
    export default {
        components: {
        },
        data () {
            return {
                dialog: false,
                players: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    height: '',
                    ppg: '',
                    apg: '',
                    spg: '',
                    url: ''
                }
            }
        },

        computed: {
        },

        created () {
            //get a snapshot of the change made in the db
            db.collection('players').onSnapshot(res => {
                //create a new object based on the response
                const changes = res.docChanges();

                //for every object check if the type is added (three types <added>, <removed> or <modified>)
                changes.forEach( change => {
                    if (change.type === 'added') {
                        this.players.push({
                            //'...' is to spread the data to get all the individual properties of the document
                            ...change.doc.data(),
                            id : change.doc.id
                        })
                    }
                })
            });
        },

        methods: {
            editItem (item) {
                this.editedIndex = this.players.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.players.indexOf(item);
                confirm('Are you sure you want to delete this item?') && this.players.splice(index, 1)
            },

            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.players[this.editedIndex], this.editedItem)
                } else {
                    this.players.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

<style scoped>
    .player-info {
        margin: 5px 0pc!important;
        font-style: normal;
        font-size: 16px;
        color: aliceblue;
        text-align: left !important;
    }
    p {
        font-size: 80px;
        font-family: Damascus,serif;
        font-style: oblique;
        color: darkblue;
        margin: 50px;
    }

    .theme--light.v-card {
        background-color: transparent;
        border-color: transparent;
        color: rgba(0,0,0,0.87);
        padding: 20px;

    }
</style>

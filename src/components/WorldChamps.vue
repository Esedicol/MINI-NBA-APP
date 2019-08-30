<template>
    <v-container>
        <v-flex offset-sm2>
            <v-layout row>
                <p style="font-size: 50px; color: aliceblue; text-align: center">NBA World Championship Records</p>
            </v-layout>
        </v-flex>

        <v-layout row>
            <v-flex sm8 offset-sm2>
                <v-toolbar flat color="white">
                    <p style="font-style: normal; font-size: 30px; color: aliceblue; text-align: center">NBA Champions Records</p>
                    <v-spacer></v-spacer>
                    <v-btn to="/newChamps" round>Add new Record</v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex sm8 offset-sm2>
                <v-data-table
                        :headers="headers"
                        :items="records"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.year }}</td>
                        <td class="text-xs-right">{{ props.item.location}}</td>
                        <td class="justify-center layout">
                            <v-icon
                                    small
                                    @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import db from '@/firebase'
    export default {
        data () {
            return {
                dialog: false,
                headers: [
                    {
                        text: 'Team Name',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Year of Season', value: 'year' },
                    { text: 'Game Location', value: 'location' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                records: []
            }
        },

        created () {
            //get a snapshot of the change made in the db
            db.collection('worldChampions').onSnapshot(res => {
                //create a new object based on the response
                const changes = res.docChanges();

                //for every object check if the type is added (three types <added>, <removed> or <modified>)
                changes.forEach( change => {
                    if (change.type === 'added') {
                        this.records.push({
                            //'...' is to spread the data to get all the individual properties of the document
                            ...change.doc.data(),
                            id : change.doc.id
                        })
                    }
                })
            });
        },

        methods: {
            //confirms user about deletion
            deleteItem (item) {
                const index = this.records.indexOf(item);
                confirm('Do you really want to delete this record??????') && this.records.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
    p {
        font-size: 80px;
        font-family: Damascus,serif;
        font-style: oblique;
        color: darkblue;
        margin: 50px;
    }
</style>





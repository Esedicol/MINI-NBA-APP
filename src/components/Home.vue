<template>
    <v-container>
        <v-flex offset-sm4>
            <v-layout row>
                <p style="font-size: 50px; color: aliceblue; text-align: center">Golden State Warriors</p>
            </v-layout>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs10 offset-sm1>
                <v-carousel style="height: 900px">
                    <v-carousel-item style="height: 900px"
                                     v-for=" p in this.records"
                                     :src="p.url"
                                     :key="p.id">
                        <h1>
                            {{p.name}}
                        </h1>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-flex offset-sm5>
            <v-layout row>
                <p style="font-size: 30px; color: aliceblue; text-align: center">Add a new Image</p>
            </v-layout>
        </v-flex>

        <v-layout row wrap>
            <v-flex xs5 offset-sm4>
                <v-form >
                    <v-text-field
                            name="url"
                            label="- Image URL *"
                            id="url"
                            required
                            v-model="editedItem.url"
                            counter="50"
                    >
                    </v-text-field>
                    <v-text-field
                            name="name"
                            label="- Player Name *"
                            id="name"
                            required
                            v-model="editedItem.name"
                            counter="20"
                    >
                    </v-text-field>

                    <v-btn large top round @click="save">Add new photo</v-btn>
                </v-form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    export default {
        data: () => ({
            records: [],
            editedIndex: -1,
            editedItem: {
                url: '',
                name: ''
            },
            defaultItem: {
                url: '',
                name: ''
            }
        }),

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.records = [
                    {
                        url : 'https://cmgpbpheatzone.files.wordpress.com/2016/12/stephen_curry_ap_photo_0.jpg',
                        name : 'Stephen Curry'
                    },
                    {
                        url : 'https://cdn.vox-cdn.com/thumbor/l2YIW8b6iXjrxsrV_5UE2Rr0FiI=/0x0:3591x2390/1200x800/filters:focal(1390x155:1964x729)/cdn.vox-cdn.com/uploads/chorus_image/image/59329099/usa_today_10777424.0.jpg',
                        name : 'Khlay Thompson'
                    },
                    {
                        url : 'https://static01.nyt.com/images/2016/06/02/sports/02ARATON/02ARATON-articleLarge-v2.jpg?quality=75&amp;auto=webp&amp;disable=upscale',
                        name : 'Adre Igoudola'
                    }
                ]
            },
            //dave the new item and add to screen
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.records[this.editedIndex], this.editedItem)
                } else {
                    this.records.push(this.editedItem)
                }
                this.close()
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

    h1 {
        color: gold;
        padding-left: 30px;
    }
</style>

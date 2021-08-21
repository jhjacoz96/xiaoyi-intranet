<template>
  <v-container fluid>
    <base-material-card color="primary">
      <template v-slot:heading>
        <v-row>
          <v-col
            md="2"
            cols="2"
          >
            <v-btn
              icon
              large
              @click="$router.go(-1)"
            >
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </v-col>
          <v-col md="auto">
            <div class="text-h3 font-weight-medium">
              Seguimiento de ficha familiar
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Perminite administrar las fichas familiares de la comunidad
            </div>
          </v-col>
        </v-row>
        <v-btn
          absolute
          fab
          right
          color="secondary"
          @click="$router.push('/intranet/ficha-familiar/agregar')"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-container>
        <v-card-actions class="justify-center">
          <v-form>
            <v-row>
              <!-- <v-col
                cols="4"
              >
                <v-select
                  v-model="editedItemSearch.filter"
                  label="Tipo de busqueda"
                  :items="['Número de história', 'Cédula de miembro familiar']"
                  outlined
                  dense
                />
              </v-col> -->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    class="mb-5"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-help
                  </v-icon>
                </template>
                <span>Búsqueda por número de historia, número de familia, manzana, parroquia, cédula de un miembro, número de casa</span>
              </v-tooltip>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItemSearch.search"
                  placeholder="Búsqueda"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="2"
              >
                <v-btn
                  color="primary"
                  class="ml-1"
                  :disabled="loadingSearch"
                  :loading="loadingSearch"
                  @click="addItemSearch()"
                >
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                cols="2"
              >
                <v-btn
                  color="primary"
                  outlined
                  class="ml-5"
                  @click="dialog = true"
                >
                  <v-icon>
                    mdi-filter
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-actions>
        <v-dialog
          v-model="dialog"
          width="400"
        >
          <v-card>
            <v-container>
              <v-card-text class="font-weight-bold text-center">
                Filtrar busqueda
              </v-card-text>
              <v-card-text>
                <v-subheader>
                  Familias
                </v-subheader>
                <v-select
                  v-model="editedItemFilter.zone_id"
                  outlined
                  multiple
                  dense
                  :items="zone"
                  item-text="name"
                  item-value="id"
                  label="Parroquias"
                />
                <v-select
                  v-model="editedItemFilter.level_total_id"
                  label="Niveles de riesgo"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="levelTotal"
                  multiple
                />
                <v-select
                  v-model="editedItemFilter.group_cultural_id"
                  label="Grupos culturales"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="groupCultural"
                  multiple
                />
                <v-subheader>
                  Miembros de las familias
                </v-subheader>
                <v-select
                  v-model="editedItemFilter.pathology_id"
                  label="Patologías"
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                  :items="pathology"
                  multiple
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="loadingFilter"
                  :loading="loadingFilter"
                  @click="addItemFilter()"
                >
                  Filtrar
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
        <v-card-text>
          <v-btn-toggle
            v-model="list"
            :disabled="loadingDataTable"
            mandatory
            dense
            color="primary"
            @change="listItem"
          >
            <v-btn
              text
              value="list"
            >
              Lista
            </v-btn>
            <v-btn
              text
              value="map"
            >
              Google maps
            </v-btn>
          </v-btn-toggle>
          <v-divider />
        </v-card-text>
        <list-file-family
          v-if="list === 'list'"
          :desserts="desserts"
          :loadingdatatable="loadingDataTable"
        />
        <map-file-family
          v-else
          :desserts="desserts"
          :loadingdatatable="loadingDataTable"
        />
        <!-- <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        </v-dialog> -->
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    components: {
      ListFileFamily: () => import('../fileFamily/tracingFileFamily/ListFileFamily'),
      MapFileFamily: () => import('../fileFamily/tracingFileFamily/MapFileFamily'),
    },
    data () {
      return {
        dialog: false,
        loadingSearch: false,
        loadingFilter: false,
        loadingDataTable: false,
        list: 'list',
        desserts: [],
        levelTotal: [],
        zone: [],
        pathology: [],
        groupCultural: [],
        editedItemSearch: {
          search: '',
          filter: '',
        },
        defaultItemSearch: {
          search: '',
          filter: '',
        },
        editedItemFilter: {
          zone_id: [],
          group_cultural_id: [],
          level_total_id: [],
          pathology_id: [],
        },
        defaultItemFilter: {
          zone_id: [],
          level_total_id: [],
          group_cultural_id: [],
          pathology_id: [],
        },
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.listItem()
      this.listItemZone()
      this.listItemLevelTotal()
      this.listItemPathology()
      this.listItemGroupCultural()
    },
    methods: {
      ...mapActions('fileFamily', ['fileFamilyPostActions', 'fileFamilyAllActions', 'fileFamilySearchActions', 'fileFamilyFilterActions']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('levelTotal', ['levelTotalAllActions']),
      ...mapActions('culturalGroup', ['culturalGroupAllActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        this.loadingDataTable = true
        const serviceResponse = await this.fileFamilyAllActions()
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingDataTable = false
      },
      async listItemZone () {
        const serviceResponse = await this.zoneAllActions()
        if (serviceResponse.ok) {
          this.zone = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGroupCultural () {
        const serviceResponse = await this.culturalGroupAllActions()
        if (serviceResponse.ok) {
          this.groupCultural = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemPathology () {
        const serviceResponse = await this.pathologyAllActions()
        if (serviceResponse.ok) {
          this.pathology = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemLevelTotal () {
        const serviceResponse = await this.levelTotalAllActions()
        if (serviceResponse.ok) {
          this.levelTotal = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async addItemSearch () {
        this.loadingSearch = true
        const serviceResponse = await this.fileFamilySearchActions(this.editedItemSearch)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.loadingSearch = false
        this.editedItemSearch = Object.assign({}, this.defaultItemSearch)
      },
      async addItemFilter () {
        this.loadingFilter = true
        const serviceResponse = await this.fileFamilyFilterActions(this.editedItemFilter)
        if (serviceResponse.ok) {
          this.desserts = serviceResponse.data
          this.close()
        } else {
          this.close()
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItemFilter = Object.assign({}, this.defaultItemFilter)
        })
        this.loadingFilter = false
      },
    },
  }
</script>

<template>
  <v-container>
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
              Centro de salud
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Permite configurar la información básica referente al centro de salud
            </div>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-row>
          <v-col>
            <v-subheader>
              Centro de salud
            </v-subheader>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-select
                  v-model="editedItem.institution_id"
                  item-text="name"
                  item-value="id"
                  :items="institution"
                  dense
                  outlined
                  label="Institución del sistema"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="editedItem.name"
                  dense
                  outlined
                  label="Nombre de la unidad operativa"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="editedItem.code_uo"
                  dense
                  outlined
                  label="Código de la unidad operativa"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader>
              Ubicación
            </v-subheader>
            <v-row>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-autocomplete
                  v-model="editedItem.province_id"
                  :items="province"
                  :filter="provinceFilter"
                  small
                  dense
                  label="Provincia"
                  item-text="name"
                  item-value="id"
                  outlined
                  @change="listItemCanton($event)"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-autocomplete
                  v-model="editedItem.canton_id"
                  :disabled="canton.length > 0 ? false : true"
                  :items="canton"
                  :filter="cantonFilter"
                  dense
                  small
                  label="Cantón"
                  item-text="name"
                  item-value="id"
                  outlined
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="editedItem.parroquia"
                  dense
                  outlined
                  label="Ciudad"
                />
              </v-col>
              <v-col
                sm="6"
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="editedItem.address"
                  dense
                  outlined
                  label="Dirección de la ubicación"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          :disabled="validated"
          color="primary"
          @click="addItem"
        >
          Actualizar
        </v-btn>
      </v-card-actions>
    </base-material-card>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
  } from 'vuex'
  export default {
    data () {
      return {
        editedItem: {
          name: '',
          province_id: undefined,
          canton_id: undefined,
          address: '',
          institution_id: undefined,
          code_uo: '',
          parroquia: '',
        },
        canton: [],
        institution: [],
        province: [],
      }
    },
    computed: {
      validated () {
        if (
          this.editedItem.institution_id &&
          this.editedItem.name &&
          this.editedItem.code_uo &&
          this.editedItem.province_id &&
          this.editedItem.canton_id &&
          this.editedItem.parroquia &&
          this.editedItem.address
        ) return false
        return true
      },
    },
    created () {
      this.listItem()
      this.listItemProvince()
      this.listItemInstitution()
    },
    methods: {
      ...mapActions('configWeb', ['webOrganizationPostActions', 'webOrganizationAllActions']),
      ...mapActions('zone', ['provinceAllActions', 'cantonFindActions']),
      ...mapActions('institution', ['institutionAllActions']),
      ...mapMutations(['alert']),
      async listItem () {
        const serviceResponsee = await this.webOrganizationAllActions()
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            Object.assign(this.editedItem, serviceResponsee.data)
            if (this.editedItem.province_id) this.listItemCanton(this.editedItem.province_id)
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async listItemProvince () {
        const serviceResponsee = await this.provinceAllActions()
        if (serviceResponsee.ok) {
          this.province = serviceResponsee.data
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async listItemCanton (val) {
        const serviceResponsee = await this.cantonFindActions(val)
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            this.canton = serviceResponsee.data
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async listItemInstitution () {
        const serviceResponsee = await this.institutionAllActions()
        if (serviceResponsee.ok) {
          if (serviceResponsee.data) {
            this.institution = serviceResponsee.data
          }
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async addItem () {
        const serviceResponsee = await this.webOrganizationPostActions(this.editedItem)
        if (serviceResponsee.ok) {
          Object.assign(this.editedItem, serviceResponsee.data)
          this.alert({
            text: serviceResponsee.message,
            color: 'success',
          })
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      provinceFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
      cantonFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
    },
  }
</script>

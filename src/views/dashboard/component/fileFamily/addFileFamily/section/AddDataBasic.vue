<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Datos generales
    </div>
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        justify="space-around"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.numero_historia"
            v-validate="'required'"
            disabled
            :error-messages="errors.collect('basic.numero_historia')"
            data-vv-name="numero_historia"
            outlined
            label="Número de história (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model.number="editedItem.numero_familia"
            v-validate="'required'"
            :error-messages="errors.collect('basic.numero_familia')"
            data-vv-name="numero_familia"
            outlined
            label="Número de familia (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.direccion_habitual"
            v-validate="'required'"
            :error-messages="errors.collect('basic.direccion_habitual')"
            data-vv-name="direccion_habitual"
            outlined
            label="Dirección de la familia (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.barrio"
            v-validate="'required'"
            :error-messages="errors.collect('basic.barrio')"
            data-vv-name="barrio"
            outlined
            label="Barrio (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.manzana"
            v-validate="'required'"
            :error-messages="errors.collect('basic.manzana')"
            data-vv-name="manzana"
            outlined
            label="Manzana (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.numero_casa"
            v-validate="'required'"
            :error-messages="errors.collect('basic.numero_casa')"
            data-vv-name="numero_casa"
            outlined
            label="Número de casa (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.zone_id"
            v-validate="'required'"
            :error-messages="errors.collect('basic.sector')"
            data-vv-name="parroquia"
            outlined
            label="Parroquia (*)"
            dense
            validate-on-blur
            :items="zone"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.cultural_group_id"
            v-validate="'required'"
            :error-messages="errors.collect('basic.cultural_group_id')"
            data-vv-name="cultural_group_id"
            outlined
            label="Grupo cultural (*)"
            dense
            validate-on-blur
            :items="culturalGroup"
            item-text="name"
            item-value="id"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.numero_telefono"
            v-validate="'required'"
            :error-messages="errors.collect('basic.numero_telefono')"
            data-vv-name="número telefono"
            outlined
            label="Número de telefono de casa (*)"
            dense
            validate-on-blur
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.telefono_celular_uno"
            outlined
            label="Número de telefono celular 1"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.telefono_celular_dos"
            outlined
            label="Número de telefono celular 2"
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.correo"
            outlined
            label="Correo electrónico"
            dense
          />
        </v-col>
      </v-row>
      <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
        Ubicación
      </div>
      <v-container>
        <v-row class="justify-center">
          <v-col
            cols="6"
            sm="4"
          >
            <v-text-field
              v-model="editedItem.latitud"
              v-validate="'required'"
              :error-messages="errors.collect('basic.lat')"
              data-vv-name="Latitud"
              disabled
              outlined
              label="Latitud (*)"
              dense
              validate-on-blur
            />
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <v-text-field
              v-model="editedItem.longitud"
              v-validate="'required'"
              :error-messages="errors.collect('basic.lng')"
              data-vv-name="Longitud"
              disabled
              outlined
              label="Longitud (*)"
              dense
              validate-on-blur
            />
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <v-btn
              outlined
              color="primary"
              @click="loadGeolocation()"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div>
          <base-google-map
            :prop-markers="[coordinates]"
            :clickable="true"
            :draggable="true"
            @change:coordinate="changeCoordinate($event)"
          />
        </div>
      </v-container>
    </v-form>
    <div
      class="d-none"
    >
      {{ availableSteps }}
    </div>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapState,
  } from 'vuex'
  export default {
    props: {
      click: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        id: undefined,
        value: '',
        states: [],
        canton: [],
        institution: [],
        cuturalGroup: [],
        comunity: [],
        editedItem: {
          longitud: 0,
          latitud: 0,
          numero_familia: '',
          manzana: '',
          barrio: '',
          direccion_habitual: '',
          numero_casa: '',
          numero_telefono: '',
          telefono_celular_uno: '',
          telefono_celular_dos: '',
          correo: '',
          numero_historia: '',
          zone_id: undefined,
          cultural_group_id: undefined,
          evaluacion: [],
        },
        organization: {},
        zone: [],
        culturalGroup: [],
        coordinates: {
          lat: 0,
          lng: 0,
          title: null,
        },
      }
    },
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      // progress () {
      //   var inputs = Object.values(this.editedItem)
      //   var count = inputs.filter(item => {
      //     if (item !== undefined) return item
      //   })
      //   return Math.min(100, (count.length / 16) * 100)
      // },
      availableSteps () {
        if (
          this.editedItem.numero_familia &&
          this.editedItem.manzana &&
          this.editedItem.barrio &&
          this.editedItem.direccion_habitual &&
          this.editedItem.numero_casa &&
          this.editedItem.numero_telefono &&
          this.editedItem.numero_historia &&
          this.editedItem.cultural_group_id &&
          this.editedItem.zone_id
        ) {
          this.setSteps(1)
          if (this.click) {
            if (this.id !== null) this.setFileFamily(this.editedItem)
            else this.setDataBasic(this.editedItem)
            this.$emit('next')
          }
        }
        return '33'
      },
    },
    created () {
      this.ShowFileFamily()
      this.listItem()
      this.listItemZone()
      this.listItemCulturalGroup()
    },
    methods: {
      ...mapActions('fileFamily', ['fileFamilyPostActions', 'fileFamilyShowActions']),
      ...mapActions('configWeb', ['webOrganizationPostActions', 'webOrganizationAllActions']),
      ...mapActions('zone', ['zoneAllActions']),
      ...mapActions('culturalGroup', ['culturalGroupAllActions']),
      ...mapMutations(['alert']),
      ...mapMutations('fileFamily', ['setDataBasic', 'setSteps', 'setFileFamily', 'resetFile']),
      async ShowFileFamily () {
        this.resetFile()
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          const serviceResponse = await this.fileFamilyShowActions(this.$route.params.id)
          if (serviceResponse.ok) {
            this.setFileFamily(serviceResponse.data)
            this.editedItem = Object.assign({}, serviceResponse.data)
            this.getGeolocation()
          } else {
            this.alert({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
        } else {
          this.generateCode()
          this.getGeolocation()
        }
      },
      async listItem () {
        const serviceResponsee = await this.webOrganizationAllActions()
        if (serviceResponsee.ok) {
          this.organization = serviceResponsee.data
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async listItemZone () {
        const serviceResponsee = await this.zoneAllActions()
        if (serviceResponsee.ok) {
          this.zone = serviceResponsee.data
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      async listItemCulturalGroup () {
        const serviceResponsee = await this.culturalGroupAllActions()
        if (serviceResponsee.ok) {
          this.culturalGroup = serviceResponsee.data
        } else {
          this.alert({
            text: serviceResponsee.message.text,
            color: 'warning',
          })
        }
      },
      generateCode () {
        this.editedItem.numero_historia = `FF000${Math.round(Math.random() * (900 - 100) + 100)}`
      },
      getGeolocation () {
        if (this.$route.params.id === undefined) {
          this.loadGeolocation()
        } else {
          this.coordinates.title = this.editedItem.numero_historia
          this.coordinates.lat = this.editedItem.latitud
          this.coordinates.lng = this.editedItem.longitud
        }
      },
      loadGeolocation () {
        /* this.$getLocation({})
          .then(coordinates => {
            Object.assign(this.coordinates, coordinates)
            this.coordinates.title = this.editedItem.numero_historia
            this.editedItem.latitud = this.coordinates.lat
            this.editedItem.longitud = this.coordinates.lng
          }).catch(e => {
            this.alert({
              text: e,
              color: 'warning',
            })
          }) */
        navigator.geolocation.getCurrentPosition(position => {
          this.coordinates = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
          }
        })
        this.coordinates.title = this.editedItem.numero_historia
        this.editedItem.latitud = this.coordinates.lat
        this.editedItem.longitud = this.coordinates.lng
      },
      changeCoordinate (val) {
        this.coordinates.lat = val.lat
        this.coordinates.lng = val.lng
        this.editedItem.latitud = val.lat
        this.editedItem.longitud = val.lng
      },
    },
  }
</script>

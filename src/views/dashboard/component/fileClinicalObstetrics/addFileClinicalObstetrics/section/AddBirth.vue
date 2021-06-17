<template>
  <v-container fluid>
    <!-- <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      Parto
    </div> -->
    <v-form
      ref="form"
      data-vv-scope="basic"
    >
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="12"
        >
          <v-textarea
            v-model="editedItem.observacion_parto"
            label="Observaciones del parto"
            outlined
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            ¿Presenta hemorragias?
          </p>
          <v-radio-group
            v-model="editedItem.hemorragia"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            ¿Presenta desgarro?
          </p>
          <v-radio-group
            v-model="editedItem.desgarro"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
              @click.prevent="editedItem.grado_desgarro = ''"
            />
          </v-radio-group>
        </v-col>
        <v-col
          v-if="editedItem.desgarro === true"
          cols="12"
          sm="4"
        >
          <v-select
            v-model="editedItem.grado_desgarro"
            label="Nivel de desgarro"
            :items="desgarro"
            outlined
            dense
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-select
            v-model="editedItem.tipo_parto"
            label="Tipo de parto"
            :items="['Vaginal', 'Cesarea']"
            outlined
            dense
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-subheader class="pl-0">
            Semana en que nace
          </v-subheader>
          <v-slider
            v-model="editedItem.semana_gestacion"
            :thumb-size="24"
            max="50"
            min="28"
            :thumb-label="true"
            @change="calSestacion($event)"
          />
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <v-text-field
            v-model="editedItem.descripcion_gestacion"
            label="Semana de gestación"
            outlined
            dense
            disabled
          />
        </v-col>
      </v-row>
      <div class="mt-4">
        <span class="text-h5">Características del parto</span>
      </div>
      <v-row
        class="mx-auto"
        style="max-width: 900px;"
      >
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Episiorrafia
          </p>
          <v-radio-group
            v-model="editedItem.episiorria"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Hemorroides
          </p>
          <v-radio-group
            v-model="editedItem.hemorroides"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Dolor
          </p>
          <v-radio-group
            v-model="editedItem.dolor"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <p class="text-h6 font-weight-light">
            Episiotomía/Desgarro
          </p>
          <v-radio-group
            v-model="editedItem.epitomia"
            mandatory
            row
          >
            <v-radio
              label="Si"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
              @click.prevent="editedItem.grado_epitomia = ''"
            />
          </v-radio-group>
        </v-col>
        <v-col
          v-if="editedItem.epitomia === true"
          cols="6"
          sm="4"
        >
          <v-select
            v-model="editedItem.grado_epitomia"
            label="Grado"
            :items="epitomia"
            item-text="name"
            outlined
            dense
            item-value="value"
          />
        </v-col>
      </v-row>
      <div class="mt-4 my-3">
        <div class="d-inline-block">
          <span class="text-h5">Farmacos administrados</span>
        </div>
        <v-btn
          fab
          color="secondary"
          class="float-right"
          @click="addMedicine()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <tr
          v-for="(item, k) in editedItem.tratamiento"
          :key="k"
        >
          <td>
            <v-select
              v-model="item.presentation_id"
              label="Presentación"
              item-text="name"
              item-value="id"
              outlined
              :items="presentacion"
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.medicine_id"
              label="Medicamento"
              class="ml-2"
              outlined
              :items="medicamento"
              item-text="name"
              item-value="id"
              dense
            />
          </td>
          <td>
            <v-text-field
              v-model.number="item.dosis"
              class="ml-2"
              label="Dosis"
              outlined
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.measure_id"
              class="ml-2"
              label="Unidad de medida"
              :items="medida"
              item-text="name"
              item-value="id"
              outlined
              dense
            />
          </td>
          <td>
            <v-select
              v-model="item.frequency_id"
              label="Frecuencia"
              item-text="name"
              item-value="id"
              class="ml-2"
              outlined
              dense
              :items="frecuencia"
            />
          </td>
          <td>
            <v-btn
              icon
              dark
              color="pink"
              @click="deleteMedicine(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </v-card-text>
      <div
        class="d-none"
      >
        {{ availableSteps }}
      </div>
    </v-form>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex'
  import { gestationWeekAllApi } from '@/api/modules'
  export default {
    props: {
      click: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        dialog: false,
        value: '',
        show2Date: false,
        showDate: false,
        descripcion_gestacion: '',
        gestacion: [],
        editedItem: {
          observacion_parto: '',
          hemorragia: false,
          desgarro: false,
          grado_desgarro: '',
          tipo_parto: '',
          episiorria: false,
          descripcion_gestacion: '',
          hemorroides: false,
          dolor: false,
          epitomia: false,
          grado_epitomia: '',
          tratamiento: [],
        },
        presentacion: [],
        frecuencia: [],
        medicamento: [],
        medida: [],
        desgarro: [
          'Grado 1',
          'Grado 2',
          'Grado 3',
          'Grado 4',
        ],
        epitomia: [
          'Grado 1',
          'Grado 2',
          'Grado 3',
          'Grado 4',
        ],
      }
    },
    computed: {
      ...mapState('fileClinicalObstetric', ['steps', 'fileObstetric']),
      availableSteps () {
        if (
          this.editedItem.observacion_parto &&
          this.steps.includes(4)
        ) {
          this.setSteps(5)
          if (this.click) {
            if (this.click === 'next') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:next')
            }
            if (this.click === 'save') {
              this.setFileObstetric(this.editedItem)
              this.$emit('click:save')
            }
          }
        }
        return ''
      },
    },
    created () {
      this.editedItem = Object.assign({}, this.fileObstetric)
      this.itemMedicine()
      this.itemPresentation()
      this.itemMeasure()
      this.itemFrequency()
      this.itemGestation()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapActions('fileClinicalObstetric', ['fileClinicalObstetricGetActions']),
      ...mapMutations('fileClinicalObstetric', ['setSteps', 'setFileObstetric']),
      ...mapActions('medicine', ['medicineAllActions']),
      ...mapActions('measure', ['measureAllActions']),
      ...mapActions('presentation', ['presentationAllActions']),
      ...mapActions('frequency', ['frequencyAllActions']),
      calSestacion (val) {
        var v = val
        this.gestacion.forEach(item => {
          var semana = JSON.parse(item.rank)
          if (semana[0] <= v && v <= semana[1]) {
            this.editedItem.descripcion_gestacion = item.name
          }
        })
      },
      async itemGestation () {
        const serviceResponse = await gestationWeekAllApi()
        if (serviceResponse.ok) {
          this.gestacion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemMedicine () {
        const serviceResponse = await this.medicineAllActions()
        if (serviceResponse.ok) {
          this.medicamento = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemPresentation () {
        const serviceResponse = await this.presentationAllActions()
        if (serviceResponse.ok) {
          this.presentacion = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemMeasure () {
        const serviceResponse = await this.measureAllActions()
        if (serviceResponse.ok) {
          this.medida = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async itemFrequency () {
        const serviceResponse = await this.frequencyAllActions()
        if (serviceResponse.ok) {
          this.frecuencia = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      addMedicine () {
        var tratamiento = {
          medicine_id: null,
          dosis: null,
          measure_id: null,
          frequency_id: null,
          presentation_id: null,
        }
        this.editedItem.tratamiento.push(tratamiento)
      },
      deleteMedicine (val) {
        var index = this.editedItem.tratamiento.indexOf(val)
        this.editedItem.tratamiento.splice(index, 1)
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1
      },
    },
  }
</script>

<template>
  <v-container fluid>
    <div
      class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
    >
      <div
        class=" d-inline-block"
      >
        Contaminación ambiental
      </div>
      <v-btn
        fab
        color="secondary"
        class="float-right d-inline-block"
        @click="pushContaminacion"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-card-text v-if="contaminacion.length > 0">
      <tr
        v-for="(item, index) in contaminacion"
        :key="index"
      >
        <td>
          <v-select
            v-model="item.contamination_id"
            label="Tipo/descripción de contaminante"
            outlined
            class="ml-2 mr-2"
            dense
            item-text="nombre"
            item-value="id"
            :items="type_contamination"
            @change="getCause(item)"
          />
        </td>
        <td>
          <v-select
            v-model="item.cause_contamination_id"
            label="Causas de contaminante"
            outlined
            class="ml-2 mr-2"
            dense
            item-text="nombre"
            item-value="id"
            :items="getCause(item)"
          />
        </td>
        <td>
          <v-btn
            icon
            color="pink"
            class="ml-2"
            dark
            @click="deleteContaminacion(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </v-card-text>
    <v-card-text
      v-else
      class="text-center"
    >
      <div>Sin registros</div>
    </v-card-text>
    <!-- <div
      class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
    >
      <div
        class=" d-inline-block"
      >
        10. Lugar o persona a la que acuden para tratamiento
      </div>
      <v-btn
        fab
        color="secondary"
        class="float-right d-inline-block"
        @click="pushSitios"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-card-text
      class="text-center justify-center justify-content-center"
    >
      <tr
        v-for="(item, index) in sitios_tratamiento"
        :key="index"
      >
        <td>
          <v-text-field
            v-model="item.lugar"
            label="Nombre del lugar o la persona"
            outlined
            dense
          />
        </td>
        <td>
          <v-btn
            icon
            color="pink"
            class="ml-2"
            dark
            @click="deleteLugar(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </v-card-text> -->
    <div
      class="d-none"
    >
      {{ availableSteps }}
    </div>
  </v-container>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions,
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
        showDate: false,
        show2Date: false,
        contaminacion: [],
        type_contamination: [],
        cause_contamination: [],
        sitios_tratamiento: [],
        editedItem: {
          contamination_id: null,
          cause_contamination_id: null,
        },
        editedItem1: {
          lugar: '',
        },
      }
    },
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      availableSteps () {
        if (this.steps.includes(4)) {
          this.setSteps(5)
          if (this.click) {
            this.setContaminacion({
              contaminacion: this.contaminacion,
              sitios_tratamiento: this.sitios_tratamiento,
            })
            this.$emit('next')
          }
        }
        return ''
      },
    },
    created () {
      this.listItem()
      this.listItemContamination()
    },
    methods: {
      ...mapMutations('fileFamily', ['setSteps', 'setContaminacion']),
      ...mapActions('contamination', ['contaminationAllActions']),
      ...mapActions('causeContamination', ['causeContaminationFindActions']),
      ...mapMutations(['alert']),
      listItem () {
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          this.contaminacion = this.fileFamily.contaminacion
          this.sitios_tratamiento = this.fileFamily.sitios_tratamiento
        }
      },
      async listItemContamination () {
        const serviceResponse = await this.contaminationAllActions()
        if (serviceResponse.ok) {
          this.type_contamination = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      getCause (val) {
        var c = this.type_contamination.find(item => item.id === val.contamination_id)
        var d = { ...c }
        return d.causa_contaminacions
      },
      pushContaminacion () {
        var c = {
          contamination_id: null,
          cause_contamination_id: null,
        }
        this.contaminacion.push(c)
      },
      pushSitios () {
        var s = {
          lugar: '',
        }
        this.sitios_tratamiento.push(s)
      },
      deleteContaminacion (val) {
        var index = this.contaminacion.indexOf(val)
        this.contaminacion.splice(index, 1)
      },
      deleteLugar (val) {
        var index = this.sitios_tratamiento.indexOf(val)
        this.sitios_tratamiento.splice(index, 1)
      },
    },
  }
</script>

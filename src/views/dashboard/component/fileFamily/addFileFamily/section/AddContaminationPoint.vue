<template>
  <v-container fluid>
    <div
      class="text-center text-h4 d-fleX font-weight-bold mb-6 blue--text"
    >
      <div
        class=" d-inline-block"
      >
        9. Contaminación ambiental
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
    <v-card-text>
      <tr
        v-for="(item, index) in contaminacion"
        :key="index"
      >
        <td>
          <v-select
            v-model="item.tipo_contaminación"
            label="Tipo/descripción de contaminante"
            outlined
            class="ml-2 mr-2"
            dense
            :items="['Hidrico', 'Suelo', 'acustica', 'lúminica', 'Visual', 'Terminca']"
          />
        </td>
        <td>
          <v-text-field
            v-model="item.causas"
            label="Causante de la contaminación"
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
            @click="deleteContaminacion(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </v-card-text>
    <div
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
    </v-card-text>
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
        sitios_tratamiento: [],
        editedItem: {
          tipo_contaminación: '',
          causas: '',
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
    },
    methods: {
      ...mapMutations('fileFamily', ['setSteps', 'setContaminacion']),
      ...mapMutations(['alert']),
      listItem () {
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          this.contaminacion = this.fileFamily.contaminacion
          this.sitios_tratamiento = this.fileFamily.sitios_tratamiento
        }
      },
      pushContaminacion () {
        var c = {
          tipo_contaminación: '',
          causas: '',
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

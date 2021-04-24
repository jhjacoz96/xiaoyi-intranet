<template>
  <v-container fluid>
    <div class="text-center text-h4 font-weight-bold mb-6 blue--text">
      2. Miembros de la familia por grupos de edad
    </div>
    <div
      class="text-end"
      style="max-width: 900px;"
    >
      <v-btn
        fab
        color="secondary"
        @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row
      class="mx-auto"
      justify="space-around"
      style="max-width: 900px;"
    >
      <v-col>
        <div class="d-none">
          {{ availableSteps }}
        </div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          item-key="name"
          sort-by="name"
          group-by="groupAge.name"
          group-by-value="name"
          show-group-by
          hide-default-header
        >
          <template v-slot:header="props">
            <thead>
              <tr>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[0].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[1].text }}</span>
                </th>
                <th>
                  <span
                    class="font-weight-light"
                    style="color:rgb(0,0,0,0.8)"
                  >{{ props.props.headers[2].text }}</span>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item.name="{ item }">
            {{ item.name }} {{ item.surname }} <v-chip
              v-if="item.pregnant === 'si'"
              color="pink"
              outlined
              dark
              class="ml-1"
            >
              <v-icon>mdi-human-pregnant</v-icon>
            </v-chip>
          </template>
          <template v-slot:item.age="{ item }">
            {{ item.age | ageFormat }}
          </template>
          <!-- <template v-slot:item.accion="{ item }">
            {{ item.groupAge.name }}
          </template> -->
          <template v-slot:item.accion="{ item }">
            <span class="d-none">{{ item.value }}</span>
            <v-btn
              x-small
              fab
              @click="editItem(item)"
            >
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn
              x-small
              fab
              class="ml-2"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-account-remove</v-icon>
            </v-btn>
          </template>
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <v-btn
                :ref="group"
                x-small
                icon
                @click="toggle"
              >
                <v-icon v-if="isOpen">
                  mdi-plus
                </v-icon>
                <v-icon v-else>
                  mdi-minus
                </v-icon>
              </v-btn>
              <span class="mx-5 font-weight-bold">{{ group }}</span>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              data-vv-scope="member"
              lazy-validation
            >
              <v-tabs
                v-model="tab"
                align-with-title
              >
                <v-tabs-slider color="primary" />
                <v-tab>
                  Datos generales
                </v-tab>
                <v-tab v-if="editedItem.pregnant === 'si'">
                  Datos de embarazo
                </v-tab>
                <!-- <v-tab v-if="editedItem.diabetic">
                  Datos de diabéticos
                </v-tab> -->
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-container class="mt-6">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.numberHistory"
                          v-validate="'required'"
                          label="Número de história"
                          outlined
                          dense
                          :error-messages="errors.collect('member.numberHistory')"
                          data-vv-name="número de historia"
                          validate-on-blur
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.name"
                          v-validate="'required'"
                          label="Nombres"
                          outlined
                          dense
                          :error-messages="errors.collect('member.name')"
                          data-vv-name="name"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.surname"
                          v-validate="'required'"
                          label="Apellidoa"
                          outlined
                          dense
                          :error-messages="errors.collect('member.surname')"
                          data-vv-name="surname"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col
                        class="<v-col"
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.email"
                          v-validate="'required'"
                          label="Correo electrónico"
                          outlined
                          dense
                          :error-messages="errors.collect('member.email')"
                          data-vv-name="surname"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.idTypeDocument"
                          :items="typeDomument"
                          item-text="name"
                          item-value="id"
                          label="Tipo de documento"
                          outlined
                          dense
                          :error-messages="errors.collect('member.idTypeDocument')"
                          data-vv-name="idTypeDocument"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.identificationDocument"
                          label="Cédula"
                          outlined
                          dense
                          :error-messages="errors.collect('member.identificationDocument')"
                          data-vv-name="identificationDocument"
                          validate-on-blur
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.occupation"
                          label="Ocupación"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-menu
                          v-model="show2Date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="100px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.birthday"
                              label="Fecha de nacimiento"
                              prepend-icon="mdi-calendar"
                              outlined
                              dense
                              v-bind="attrs"
                              :error-messages="errors.collect('member.birthday')"
                              data-vv-name="birthday"
                              validate-on-blur
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.birthday"
                            @input="showDate = false"
                            @change="test($event)"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          :value="editedItem.age | ageFormat"
                          label="Edad"
                          outlined
                          dense
                          disabled
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.scholarship"
                          label="Escolaridad"
                          :items="scholarship"
                          item-text="name"
                          item-value="id"
                          multiple
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.vaccination"
                          colum
                          :error-messages="errors.collect('member.vaccination')"
                          data-vv-name="vaccination"
                          validate-on-blur
                        >
                          <template v-slot:label>
                            <div>¿Esquema de vacunación completo?</div>
                          </template>
                          <v-radio
                            value="si"
                          >
                            <template v-slot:label>
                              <div>Completa</div>
                            </template>
                          </v-radio>
                          <v-radio
                            value="no"
                          >
                            <template v-slot:label>
                              <div>Incompleta</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.gender"
                          colum
                          :error-messages="errors.collect('member.gender')"
                          data-vv-name="gender"
                          validate-on-blur
                        >
                          <template v-slot:label>
                            <div>Género</div>
                          </template>
                          <v-radio
                            value="f"
                          >
                            <template v-slot:label>
                              <div>Femenino</div>
                            </template>
                          </v-radio>
                          <v-radio
                            value="m"
                          >
                            <template v-slot:label>
                              <div>Masculino</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.oralHealth"
                          colum
                          :error-messages="errors.collect('member.oralHealth')"
                          data-vv-name="oralHealth"
                          validate-on-blur
                        >
                          <template v-slot:label>
                            <div>Salud bucal</div>
                          </template>
                          <v-radio
                            value="si"
                          >
                            <template v-slot:label>
                              <div>Si</div>
                            </template>
                          </v-radio>
                          <v-radio
                            value="no"
                          >
                            <template v-slot:label>
                              <div>No</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.disease"
                          label="Enfermedades"
                          :items="disease"
                          item-text="name"
                          item-value="id"
                          multiple
                          chips
                          outlined
                          dense
                          @change="openAlert($event)"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.disability"
                          label="Discapacidades"
                          :items="disability"
                          item-text="name"
                          item-value="id"
                          multiple
                          chips
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.idRelationship"
                          :error-messages="errors.collect('member.idRelationship')"
                          data-vv-name="idRelationship"
                          validate-on-blur
                          label="Parentesco"
                          :items="relationship"
                          item-text="name"
                          item-value="id"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        v-if="infoDiabetic"
                        cols="12"
                      >
                        <v-alert
                          text
                          color="info"
                        >
                          <h3 class="text-h5">
                            Controla tu diabetes con Xiaoyi
                          </h3>
                          <div>Los pacientes diabéticos podrán controlar su patología con el uso de nuestra aplicación movil. Toda la información necesaria será enviada al correo electrónico del paciente.</div>

                          <v-divider
                            class="my-4 info"
                            style="opacity: 0.22"
                          />

                          <v-row
                            align="center"
                            no-gutters
                          >
                            <v-col class="shrink">
                              <v-btn
                                color="info"
                                outlined
                                @click="infoDiabetic = false"
                              >
                                Entendido
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-alert>
                      </v-col>
                      <v-col
                        v-if="editedItem.gender === 'f'"
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.pregnant"
                          row
                        >
                          <template v-slot:label>
                            <div>¿Se encuentra usted embarazada?</div>
                          </template>
                          <v-radio
                            value="si"
                          >
                            <template v-slot:label>
                              <div>Si</div>
                            </template>
                          </v-radio>
                          <v-radio
                            value="no"
                          >
                            <template v-slot:label>
                              <div>No</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <v-tab-item v-if="editedItem.pregnant === 'si'">
                  <v-container class="mt-6">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-menu
                          v-model="show5Date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="100px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.menstruation"
                              label="Fecha de ultima mestruación"
                              prepend-icon="mdi-calendar"
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.menstruation"
                            @input="show6Date = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-menu
                          v-model="show3Date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="100px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.birth"
                              label="Fecha pobable de parto"
                              prepend-icon="mdi-calendar"
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.birth"
                            @input="show4Date = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-subheader class="pl-0">
                          Semana de gestación
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.gestationWeeks"
                          :thumb-size="24"
                          max="42"
                          min="1"
                          :thumb-label="true"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          v-model="editedItem.vaccinationDt"
                          label="Dosis de vacunación DT"
                          :items="vaccinationDt"
                          item-text="name"
                          item-value="id"
                          multiple
                          chips
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-textarea
                          v-model="editedItem.obstetricPathologies"
                          label="Antecedentes patológías obstétricas"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-subheader>
                          Antecedentes Gineco- Obstétricos
                        </v-subheader>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-subheader class="pl-0">
                          Gestas
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.feats"
                          :thumb-size="24"
                          max="50"
                          min="0"
                          :thumb-label="true"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-subheader class="pl-0">
                          Partos
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.childbirth"
                          :thumb-size="24"
                          max="50"
                          min="0"
                          :thumb-label="true"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-subheader class="pl-0">
                          Abortos
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.misbirth"
                          :thumb-size="24"
                          max="50"
                          min="0"
                          :thumb-label="true"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <!-- <v-tab-item v-if="editedItem.diabetic">
                  <v-container class="mt-6">
                    <v-subheader>
                      Signos vitales
                    </v-subheader>
                    <v-row>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-select
                          label="Presión arterial"
                          outlined
                          dense
                          :items="presion"
                          item-text="nombre"
                          item-value="id"
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Pulso"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Respiración"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Saturación de oxígeno"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Temperatura"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-subheader>
                      Antropometría
                    </v-subheader>
                    <v-row>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Peso"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Altura"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Imc"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Circunferencia abdominal"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="6"
                      >
                        <v-text-field
                          label="Nivel de glusemia"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-subheader>
                      Tratamientos farmacológicos
                    </v-subheader>
                    <v-row>
                      <v-col
                        cols="6"
                        md="5"
                      >
                        <v-select
                          label="Tratameinto farmacológico"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="4"
                      >
                        <v-select
                          label="Frecuencia"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-subheader>
                      Tratamientos no farmacológicos
                    </v-subheader>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-textarea
                          label="Dieta"
                          outlined
                          multiple
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="4"
                      >
                        <v-text-field
                          label="Actividad fisica"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="4"
                      >
                        <v-text-field
                          label="Tiempo"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="4"
                      >
                        <v-select
                          label="Frecuencia"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item> -->
              </v-tabs-items>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="close()"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="validate"
            color="primary"
            text
            @click="addItem()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          ¿Está seguro de realizar esta acción?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="closeDelete()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="pinck"
            text
            @click="deleteItemConfirm()"
          >
            Eliminar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center text-h4 font-weight-bold my-6 blue--text">
      3. Mortalidad Familiar
    </div>
    <div
      class="text-end"
      style="max-width: 900px;"
    >
      <v-btn
        fab
        color="secondary"
        @click="dialog2 = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row
      class="mx-auto"
      justify="space-around"
      style="max-width: 900px;"
    >
      <v-col>
        <v-data-table
          :headers="headersMortality"
          :items="dessertsMortality"
          :items-per-page="5"
        >
          <template v-slot:item.relationship="{ item }">
            {{ item.name }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <div class="text-center text-h4 font-weight-bold my-6 blue--text">
      4. Responsable del llenado
    </div>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Nombres y apellidos"
            dense
            value="Ali Ferrer"
            outlined
            disabled
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Código"
            value="CSA01"
            dense
            outlined
            disabled
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog
      v-model="dialog2"
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar familiar fallecido</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="editedItemMortality.name"
                  label="Nombre"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-subheader class="pl-0 pt-0 mt-0">
                  Edad al fallecer
                </v-subheader>
                <v-slider
                  v-model="editedItemMortality.age"
                  :thumb-size="24"
                  max="150"
                  min="1"
                  :thumb-label="true"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-select
                  v-model="editedItemMortality.idRelationship"
                  label="Parentesco"
                  :items="relationship"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-textarea
                  v-model="editedItemMortality.cause"
                  label="Causa de muerte"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="close()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="addItem()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    filters: {
      ageFormat (val) {
        if (!val) return
        var f = JSON.parse(val)
        var age = `${f[0]}A ${f[1]}M ${f[2]}D`
        return age
      },
    },
    data () {
      return {
        tab: null,
        valid: false,
        dialog: false,
        dialog2: false,
        dialogDelete: false,
        show5Date: false,
        show6Date: false,
        show4Date: false,
        show3Date: false,
        show2Date: false,
        showDate: false,
        infoDiabetic: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Nombre y apellido',
            align: 'start',
            value: 'name',
            groupable: false,
          },
          {
            text: 'Cédula',
            align: 'start',
            value: 'identificationDocument',
            groupable: false,
          },
          {
            text: 'Edad',
            align: 'start',
            value: 'age',
            groupable: false,
          },
          { text: 'Grupo de edad', value: 'groupAge.name', sortable: false, align: 'right' },
          { value: 'accion', text: 'Accón', sortable: false, align: 'center' },
        ],
        desserts: [
          {
            name: 'Karol',
            surname: 'Meti',
            ci: '26378059',
            age: 24,
            pregnant: 'si',
            groupAge: {
              id: 5,
              name: '20-64 años',
              value: '[20, 64]',
            },
          },
        ],
        typeDomument: [
          {
            name: 'Ecuatoriano',
            id: 1,
          },
          {
            name: 'Extranjero',
            id: 2,
          },
        ],
        relationship: [
          {
            name: 'Esposo/a',
            id: 1,
          },
          {
            name: 'Hijo/a',
            id: 2,
          },
          {
            name: 'Suegro/a',
            id: 3,
          },
          {
            name: 'Sobrino/a',
            id: 4,
          },
          {
            name: 'Tío/a',
            id: 5,
          },
          {
            name: 'Nieto/a',
            id: 6,
          },
          {
            name: 'Abuelo/a',
            id: 7,
          },
          {
            name: 'Bisabuelo/a',
            id: 8,
          },
          {
            name: 'Otro...',
            id: 9,
          },
        ],
        scholarship: [
          {
            name: 'Básica',
            id: 1,
          },
          {
            name: 'Bachillerato',
            id: 2,
          },
          {
            name: 'Superior',
            id: 3,
          },
          {
            name: 'Especialización',
            id: 4,
          },
        ],
        disease: [
          {
            name: 'Diábetes',
            diabeticActive: true,
            id: 1,
          },
          {
            name: 'Impertención',
            diabeticActive: false,
            id: 2,
          },
        ],
        disability: [
          {
            name: 'Motora',
            id: 1,
          },
          {
            name: 'Sensorial',
            id: 2,
          },
          {
            name: 'Intelectual',
            id: 3,
          },
          {
            name: 'psíquica',
            id: 4,
          },
        ],
        vaccinationDt: [
          {
            name: 'Primera',
            id: 1,
          },
          {
            name: 'Segunda',
            id: 2,
          },
          {
            name: 'Refuerzo',
            id: 3,
          },
        ],
        groupAge: [
          {
            id: 1,
            name: '0-1 año',
            value: '[0, 1]',
          },
          {
            id: 2,
            name: '1-4 años',
            value: '[1, 4]',
          },
          {
            id: 3,
            name: '5-9 años',
            value: '[5, 9]',
          },
          {
            id: 4,
            name: '10-19 años',
            value: '[10, 19]',
          },
          {
            id: 5,
            name: '20-64 años',
            value: '[20, 64]',
          },
          {
            id: 6,
            name: '65-150 años',
            value: '[65, 150]',
          },
        ],
        editedItem: {
          name: '',
          surname: '',
          email: '',
          diabetic: false,
          numberHistory: '',
          idTypeDocument: undefined,
          identificationDocument: undefined,
          idRelationship: undefined,
          birthday: undefined,
          groupAge: {
            id: undefined,
            name: '',
            value: '',
          },
          occupation: undefined,
          gender: undefined,
          scholarship: [],
          vaccination: '',
          age: '',
          oralHealth: '',
          disease: [],
          pregnant: undefined,
          disability: [],
          menstruation: undefined,
          birth: undefined,
          gestationWeeks: 1,
          vaccinationDt: [],
          feats: 0,
          childbirth: 0,
          misbirth: 0,
          obstetricPathologies: '',
        },
        defaultItem: {
          name: '',
          surname: '',
          age: '',
          diabetic: false,
          email: '',
          numberHistory: '',
          idTypeDocument: undefined,
          identificationDocument: undefined,
          idRelationship: undefined,
          birthday: undefined,
          occupation: undefined,
          gender: undefined,
          groupAge: {
            id: undefined,
            name: '',
            value: '',
          },
          scholarship: [],
          vaccination: '',
          oralHealth: '',
          disease: [],
          pregnant: undefined,
          disability: [],
          menstruation: undefined,
          birth: undefined,
          gestationWeeks: 1,
          vaccinationDt: [],
          feats: 0,
          childbirth: 0,
          misbirth: 0,
          obstetricPathologies: '',
        },
        headersMortality: [
          {
            text: 'Nombre y apellido',
            align: 'start',
            value: 'name',
            sortable: false,
          },
          {
            text: 'Parentesco',
            align: 'start',
            value: 'relationship',
            sortable: false,
          },
          {
            text: 'Edad al fallecer',
            align: 'start',
            value: 'age',
            sortable: false,
          },
          {
            text: 'Causa',
            align: 'start',
            value: 'cause',
            sortable: false,
          },
        ],
        dessertsMortality: [
          {
            name: 'Petra Lozada',
            age: 74,
            cause: 'Paro cardíaco',
            relationship: {
              name: 'Tío/a',
              id: 5,
            },
          },
          {
            name: 'Alfonzo ramires',
            age: 94,
            cause: 'Infarto',
            relationship: {
              name: 'Bisabuelo/a',
              id: 8,
            },
          },
        ],
        editedItemMortality: {
          name: '',
          idRelationship: undefined,
          age: undefined,
          cause: '',
        },
        defaultItemMortality: {
          name: '',
          idRelationship: undefined,
          age: undefined,
          cause: '',
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar miembro' : 'Editar miembro'
      },
      availableSteps () {
        const steps = [0]
        if (
          this.desserts.length > 0
        ) steps.push(2)
        this.$emit('data', steps)
        return steps
      },
      validate () {
        if (
          !this.editedItem.name ||
          !this.editedItem.surname ||
          !this.editedItem.email ||
          !this.editedItem.numberHistory ||
          !this.editedItem.idTypeDocument ||
          !this.editedItem.identificationDocument ||
          !this.editedItem.idRelationship ||
          !this.editedItem.birthday ||
          !this.editedItem.gender ||
          !this.editedItem.vaccination ||
          !this.editedItem.oralHealth
        ) return true
        else return false
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      addItem () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      openAlert (val) {
        var diabetic = this.disease.find(item => item.diabeticActive)
        if (val.includes(diabetic.id)) {
          this.infoDiabetic = true
          this.editedItem.diabetic = true
        } else {
          this.infoDiabetic = false
          this.editedItem.diabetic = false
        }
      },
      calGroupAge (val) {
        this.groupAge.forEach(item => {
          var groupAge = []
          groupAge = JSON.parse(item.value)
          if (val[0] >= groupAge[0] && val[0] <= groupAge[1]) {
            Object.assign(this.editedItem.groupAge, item)
          }
        })
      },
      calAge (birthday) {
        const age = [this.calYear(birthday), this.calMonth(birthday), this.calDay(birthday)]
        return age
      },
      calYear (birthday) {
        const hoy = new Date()
        const fechaNacimiento = new Date(birthday)
        let ano = hoy.getFullYear() - fechaNacimiento.getFullYear()
        const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
          diferenciaMeses < 0 ||
          (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          ano--
        }
        return ano
      },
      calMonth (birthday) {
        const hoy = new Date()
        const fechaNacimiento = new Date(birthday)
        const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        var meses = 0
        if (diferenciaMeses < 0) {
          meses = 12 - (fechaNacimiento.getMonth() - hoy.getMonth())
          if (hoy.getDate() < fechaNacimiento.getDate()) {
            meses--
          }
        } else if (diferenciaMeses > 0) {
          meses = diferenciaMeses
          if (hoy.getDate() < fechaNacimiento.getDate()) {
            meses--
          }
        }
        return meses
      },
      calDay (birthday) {
        const hoy = new Date()
        const fechaNacimiento = new Date(birthday)
        fechaNacimiento.setMinutes(fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset())
        const diferenciaDias = hoy.getDate() - fechaNacimiento.getDate()
        var day = 0
        if (diferenciaDias < 0) {
          day = 31 - (fechaNacimiento.getDate() - hoy.getDate())
        } else {
          day = diferenciaDias
        }
        return day
      },
      test (val) {
        var age = this.calAge(this.editedItem.birthday)
        this.editedItem.age = JSON.stringify(age)
        this.calGroupAge(age)
      },
    },
  }
</script>

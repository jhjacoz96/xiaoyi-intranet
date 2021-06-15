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
          :items="miembros"
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
          <template v-slot:item.nombre="{ item }">
            {{ item.nombre }} {{ item.apellido }} <v-chip
              v-if="item.embarazo"
              color="pink"
              outlined
              dark
              class="ml-1"
            >
              <v-icon>mdi-human-pregnant</v-icon>
            </v-chip>
          </template>
          <template v-slot:item.edad="{ item }">
            {{ age(item.fecha_nacimiento) }}
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
            <!-- <v-btn
              x-small
              fab
              class="ml-2"
              @click="deleteItem(item)"
            >
              <v-icon>mdi-account-remove</v-icon>
            </v-btn> -->
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
                <v-tab v-if="editedItem.embarazo">
                  Datos obstetricos
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
                          v-model="editedItem.nombre"
                          v-validate="'required'"
                          label="Nombres (*)"
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
                          v-model="editedItem.apellido"
                          v-validate="'required'"
                          label="Apellidos (*)"
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
                          v-model="editedItem.correo"
                          v-validate="'required'"
                          label="Correo electrónico"
                          outlined
                          dense
                          :error-messages="errors.collect('member.email')"
                          data-vv-name="surname"
                          validate-on-blur
                          @blur="verifyEmail()"
                        />
                        <div
                          v-if="msotrarMensajeCorreo"
                          class="red--text text-h6 font-weight-light mt-0"
                        >
                          {{ mensajeCorreo }}
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.type_document_id"
                          :items="typeDocument"
                          item-text="nombre"
                          item-value="id"
                          label="Tipo de documento (*)"
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
                          v-model="editedItem.cedula"
                          label="Cédula (*)"
                          outlined
                          dense
                          @blur="verifyDocument()"
                        />
                        <div
                          v-if="msotrarMensajeCedula"
                          class="red--text text-h6 font-weight-light mt-0"
                        >
                          {{ mensajeCedula }}
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.ocupacion"
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
                              v-model="editedItem.fecha_nacimiento"
                              label="Fecha de nacimiento (*)"
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
                            v-model="editedItem.fecha_nacimiento"
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
                          :value="editedItem.edad | ageFormat"
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
                          v-model="editedItem.scholarship_id"
                          label="Escolaridad"
                          :items="scholarship"
                          item-text="name"
                          item-value="id"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-select
                          v-model="editedItem.gender_id"
                          dense
                          outlined
                          label="Género (*)"
                          item-value="id"
                          item-text="nombre"
                          :items="gender"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.vacunacion"
                          colum
                          :error-messages="errors.collect('member.vaccination')"
                          data-vv-name="vaccination"
                          validate-on-blur
                          mandatory
                        >
                          <template v-slot:label>
                            <div>¿Esquema de vacunación completo? (*)</div>
                          </template>
                          <v-radio
                            :value="true"
                          >
                            <template v-slot:label>
                              <div>Completa</div>
                            </template>
                          </v-radio>
                          <v-radio
                            :value="false"
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
                          v-model="editedItem.salud_bucal"
                          colum
                          :error-messages="errors.collect('member.oralHealth')"
                          data-vv-name="oralHealth"
                          validate-on-blur
                          mandatory
                        >
                          <template v-slot:label>
                            <div>Salud bucal (*)</div>
                          </template>
                          <v-radio
                            :value="true"
                          >
                            <template v-slot:label>
                              <div>Si</div>
                            </template>
                          </v-radio>
                          <v-radio
                            :value="false"
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
                          v-model="editedItem.patologias"
                          label="Patologías"
                          :items="pathology"
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
                          v-model="editedItem.discapacidades"
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
                          v-model="editedItem.relationship_id"
                          :error-messages="errors.collect('member.idRelationship')"
                          data-vv-name="idRelationship"
                          validate-on-blur
                          label="Parentesco (*)"
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
                        v-if="editedItem.gender_id === 2"
                        cols="12"
                        sm="4"
                      >
                        <v-radio-group
                          v-model="editedItem.embarazo"
                          row
                          mandatory
                        >
                          <template v-slot:label>
                            <div>¿Se encuentra usted embarazada?</div>
                          </template>
                          <v-radio
                            :value="0"
                            :disabled="editedItem.embarazo === 1 ? true : false"
                          >
                            <template v-slot:label>
                              <div>No</div>
                            </template>
                          </v-radio>
                          <v-radio
                            :value="1"
                            :disabled="editedItem.embarazo === 1 ? true : false"
                            @click.prevent="generateCode()"
                          >
                            <template v-slot:label>
                              <div>Si</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      {{ editedItem.pregnant }}
                      <v-col
                        v-if="infoPregnant"
                        cols="12"
                      >
                        <v-alert
                          text
                          color="info"
                        >
                          <h3 class="text-h5">
                            Ficha clínica de obsteticia
                          </h3>
                          <div>Se creará automaticamente una ficha clínica de obstetricia, para ello, diríjase a la parte superior de la ventana y seleccione <span class="font-weight-bold">Datos obstetricos</span> y procesa a llenar los campos.</div>
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
                                @click="infoPregnant = false"
                              >
                                Entendido
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-alert>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
                <v-tab-item v-if="editedItem.embarazo === 1">
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
                              v-model="editedItem.prenatal.fum"
                              label="Fecha de ultima mestruación"
                              prepend-icon="mdi-calendar"
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.prenatal.fum"
                            @input="show6Date = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-text-field
                          :value="moment(date).locale('es').format('dddd, MMMM Do YYYY')"
                          dense
                          outlined
                          disabled
                          label="Fecha probable de parto"
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        sm="4"
                      >
                        <v-text-field
                          v-model="editedItem.prenatal.numero_historia"
                          disabled
                          outlined
                          label="Número de história"
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-subheader class="pl-0">
                          Semana de gestación
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.prenatal.semana_gestacion"
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
                          v-model="editedItem.prenatal.vaccine_dt"
                          label="Dosis de vacunación DT"
                          :items="vaccione"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-textarea
                          v-model="editedItem.prenatal.antecedentes_patologicos"
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
                          v-model="editedItem.prenatal.gestas"
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
                          v-model="editedItem.prenatal.partos"
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
                          v-model="editedItem.prenatal.abortos"
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
                          Cesarias
                        </v-subheader>
                        <v-slider
                          v-model="editedItem.prenatal.cesarias"
                          :thumb-size="24"
                          max="50"
                          min="0"
                          :thumb-label="true"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
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
          :items="mortalidad"
          :items-per-page="5"
        >
          <template v-slot:item.relationship_id="{ item }">
            {{ getRelationship(item.relationship_id) }}
          </template>
          <template v-slot:item.accion="{ item }">
            <v-btn
              x-small
              fab
              @click="deleteItemMortality(item)"
            >
              <v-icon>mdi-account-remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <!-- <div class="text-center text-h4 font-weight-bold my-6 blue--text">
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
    </v-card-text> -->
    <v-dialog
      v-model="dialogDeleteMortlity"
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
            @click="closeDeleteMortality()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="pinck"
            text
            @click="deleteItemMortalityConfirm()"
          >
            Eliminar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar familiar fallecido</span>
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          data-vv-scope="mortality"
          lazy-validation
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItemMortality.nombre"
                    v-validate="'required'"
                    label="Nombres (*)"
                    outlined
                    dense
                    :error-messages="errors.collect('mortality.nombres')"
                    data-vv-name="nombres"
                    validate-on-blur
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItemMortality.apellido"
                    v-validate="'required'"
                    label="Apellidos (*)"
                    outlined
                    dense
                    :error-messages="errors.collect('mortality.apellidos')"
                    data-vv-name="apellidos"
                    validate-on-blur
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-subheader class="pl-0 pt-0 mt-0">
                    Edad al fallecer (*)
                  </v-subheader>
                  <v-slider
                    v-model="editedItemMortality.edad"
                    v-validate="'required'"
                    :thumb-size="24"
                    max="150"
                    min="1"
                    :thumb-label="true"
                    :error-messages="errors.collect('mortality.edad')"
                    data-vv-name="edad"
                    validate-on-blur
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <v-select
                    v-model="editedItemMortality.relationship_id"
                    v-validate="'required'"
                    label="Parentesco (*)"
                    :items="relationship"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    :error-messages="errors.collect('mortality.parentesco')"
                    data-vv-name="parentesco"
                    validate-on-blur
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-textarea
                    v-model="editedItemMortality.causa"
                    v-validate="'required'"
                    label="Causa de muerte (*)"
                    outlined
                    dense
                    :error-messages="errors.collect('mortality.causa')"
                    data-vv-name="causa"
                    validate-on-blur
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="black darken-1"
            text
            @click="closeMortality()"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="validateMortality"
            color="primary"
            text
            @click="addItemMortality()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {
    mapMutations,
    mapActions,
    mapState,
  } from 'vuex'
  import {
    calAge,
    calFpp,
  } from '@/utils/calAge'
  import {
    relationshipAllApi,
    scholarshipAllApi,
  } from '@/api/modules'
  export default {
    filters: {
      ageFormat (val) {
        if (!val) return
        var f = JSON.parse(val)
        var age = `${f[0]}A ${f[1]}M ${f[2]}D`
        return age
      },
    },
    props: {
      click: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        id: undefined,
        editedIndexMortality: -1,
        tab: null,
        valid: false,
        dialog: false,
        dialog2: false,
        dialogDelete: false,
        dialogDeleteMortlity: false,
        show5Date: false,
        show6Date: false,
        show4Date: false,
        show3Date: false,
        show2Date: false,
        showDate: false,
        infoDiabetic: false,
        infoPregnant: false,
        editedIndex: -1,
        mensajeCedula: 'Esta cédula ya se encuentra asociada a una ficha familiar existente',
        msotrarMensajeCedula: false,
        mensajeCorreo: 'Este correo no está disponible',
        msotrarMensajeCorreo: false,
        headers: [
          {
            text: 'Nombre y apellido',
            align: 'start',
            value: 'nombre',
            groupable: false,
          },
          {
            text: 'Cédula',
            align: 'start',
            value: 'cedula',
            groupable: false,
          },
          {
            text: 'Edad',
            align: 'start',
            value: 'edad',
            groupable: false,
          },
          { text: 'Grupo de edad', value: 'groupAge.name', sortable: false, align: 'right' },
          { value: 'accion', text: 'Accón', sortable: false, align: 'center' },
        ],
        miembros: [],
        mortalidad: [],
        typeDocument: [],
        relationship: [],
        scholarship: [],
        pathology: [],
        disability: [],
        gender: [],
        vaccione: [
          'Primera',
          'Segunda',
          'Refuerzo',
        ],
        groupAge: [],
        editedItem: {
          nombre: '',
          apellido: '',
          type_document_id: null,
          cedula: '',
          correo: '',
          ocupacion: '',
          fecha_nacimiento: null,
          edad: '',
          vacunacion: false,
          salud_bucal: false,
          scholarship_id: null,
          relationship_id: null,
          gender_id: null,
          patologias: [],
          discapacidades: [],
          embarazo: false,
          ficha_obstetric: false,
          prenatal: {
            fum: null,
            fpp: null,
            antecedentes_patologicos: '',
            semana_gestacion: 0,
            gestas: 0,
            numero_historia: null,
            partos: 0,
            vaccine_dt: '',
            abortos: 0,
            cesarias: 0,
          },
          groupAge: {
            id: null,
            name: '',
            rank: '',
          },
        },
        defaultItem: {
          nombre: '',
          apellido: '',
          type_document_id: null,
          cedula: '',
          correo: '',
          ocupacion: '',
          fecha_nacimiento: null,
          edad: '',
          vacunacion: false,
          salud_bucal: false,
          scholarship_id: null,
          relationship_id: null,
          gender_id: null,
          patologias: [],
          discapacidades: [],
          embarazo: false,
          ficha_obstetric: false,
          prenatal: {
            fum: null,
            fpp: null,
            antecedentes_patologicos: '',
            semana_gestacion: 0,
            numero_historia: null,
            gestas: 0,
            partos: 0,
            vaccine_dt: '',
            abortos: 0,
            cesarias: 0,
          },
          groupAge: {
            id: null,
            name: '',
            rank: '',
          },
        },
        headersMortality: [
          {
            text: 'Nombre y apellido',
            align: 'start',
            value: 'nombre',
            sortable: false,
          },
          {
            text: 'Parentesco',
            align: 'start',
            value: 'relationship_id',
            sortable: false,
          },
          {
            text: 'Edad al fallecer',
            align: 'start',
            value: 'edad',
            sortable: false,
          },
          {
            text: 'Causa',
            align: 'start',
            value: 'causa',
            sortable: false,
          },
          {
            text: 'Acción',
            align: 'start',
            value: 'accion',
            sortable: false,
          },
        ],
        editedItemMortality: {
          nombre: '',
          relationship_id: null,
          edad: 0,
          causa: '',
        },
        defaultItemMortality: {
          nombre: '',
          relationship_id: null,
          edad: 0,
          causa: '',
        },
      }
    },
    computed: {
      ...mapState('fileFamily', ['steps', 'fileFamily']),
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar miembro' : 'Editar miembro'
      },
      availableSteps () {
        if (
          this.miembros.length > 0 &&
          this.steps.includes(1)
        ) {
          this.setSteps(2)
          if (this.click === true) {
            this.setMember(this.miembros)
            this.setMortality(this.mortalidad)
            this.$emit('next')
          }
        }
        return 'ddd'
      },
      validate () {
        if (
          !this.editedItem.nombre ||
          !this.editedItem.apellido ||
          !this.editedItem.type_document_id ||
          !this.editedItem.cedula ||
          !this.editedItem.fecha_nacimiento ||
          !this.editedItem.relationship_id ||
          !this.editedItem.gender_id
        ) return true
        else return false
      },
      validateMortality () {
        if (
          !this.editedItemMortality.nombre ||
          !this.editedItemMortality.apellido ||
          !this.editedItemMortality.edad ||
          !this.editedItemMortality.causa ||
          !this.editedItemMortality.relationship_id
        ) return true
        else return false
      },
      date () {
        var date = new Date(calFpp(this.editedItem.prenatal.fum))
        return date
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.ShowFileFamily()
      this.listItemRelationship()
      this.listItempScholarship()
      this.listItemPathology()
      this.listItemDisability()
      this.listItemTypeDocument()
      this.listItemGroupAge()
      this.listItemGender()
    },
    methods: {
      ...mapMutations(['alert']),
      ...mapMutations('fileFamily', ['setMember', 'setMortality', 'setSteps']),
      ...mapActions('fileFamily', ['fileFamilyVerifyDocumentActions', 'fileFamilyVerifyEmailActions']),
      ...mapActions('pathology', ['pathologyAllActions']),
      ...mapActions('disability', ['disabilityAllActions']),
      ...mapActions('typeDocument', ['typeDocumentAllActions']),
      ...mapActions('groupAge', ['groupAgeAllActions']),
      ...mapActions('gender', ['genderAllActions']),
      async ShowFileFamily () {
        this.id = this.$route.params.id
        if (this.id !== undefined) {
          this.miembros = this.fileFamily.miembros
          this.mortalidad = this.fileFamily.mortalidad
        }
      },
      async listItemGroupAge () {
        const serviceResponse = await this.groupAgeAllActions()
        if (serviceResponse.ok) {
          this.groupAge = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemRelationship () {
        const serviceResponse = await relationshipAllApi()
        if (serviceResponse.ok) {
          this.relationship = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemTypeDocument () {
        const serviceResponse = await this.typeDocumentAllActions()
        if (serviceResponse.ok) {
          this.typeDocument = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItempScholarship () {
        const serviceResponse = await scholarshipAllApi()
        if (serviceResponse.ok) {
          this.scholarship = serviceResponse.data
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
      async listItemDisability () {
        const serviceResponse = await this.disabilityAllActions()
        if (serviceResponse.ok) {
          this.disability = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async listItemGender () {
        const serviceResponse = await this.genderAllActions()
        if (serviceResponse.ok) {
          this.gender = serviceResponse.data
        } else {
          this.alert({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      editItem (item) {
        this.editedIndex = this.miembros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if (this.id !== null) this.test(this.editedItem.fecha_nacimiento)
        this.dialog = true
      },
      addItem () {
        if (this.editedIndex > -1) {
          Object.assign(this.miembros[this.editedIndex], this.editedItem)
        } else {
          this.miembros.push(this.editedItem)
        }
        this.close()
      },
      addItemMortality () {
        this.mortalidad.push(this.editedItemMortality)
        this.closeMortality()
      },
      deleteItem (item) {
        this.editedIndex = this.miembros.indexOf(item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.miembros.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.infoPregnant = false
          this.infoDiabetic = false
          this.editedItem = Object.assign({}, this.defaultItem)
        })
      },
      closeMortality () {
        this.dialog2 = false
        this.$nextTick(() => {
          this.editedItemMortality = Object.assign({}, this.defaultItemMortality)
        })
      },
      deleteItemMortality (item) {
        this.editedIndexMortality = this.mortalidad.indexOf(item)
        this.dialogDeleteMortlity = true
      },
      deleteItemMortalityConfirm () {
        this.mortalidad.splice(this.editedIndexMortality, 1)
        this.closeDeleteMortality()
      },
      closeDeleteMortality () {
        this.dialogDeleteMortlity = false
        this.$nextTick(() => {
          this.editedItemMortality = Object.assign({}, this.defaultItemMortality)
          this.editedIndexMortality = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.infoDiabetic = false
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      openAlert (val) {
        var diabetic = this.pathology.find(item => item.capture)
        if (val.includes(diabetic.id)) {
          this.infoDiabetic = true
        } else {
          this.infoDiabetic = false
        }
      },
      calGroupAge (val) {
        this.groupAge.forEach(item => {
          var groupAge = []
          groupAge = JSON.parse(item.rank)
          if (val[0] >= groupAge[0] && val[0] < groupAge[1]) {
            this.editedItem.groupAge = Object.assign({}, item)
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
        var age = this.calAge(this.editedItem.fecha_nacimiento)
        this.editedItem.edad = JSON.stringify(age)
        this.calGroupAge(age)
      },
      age (val) {
        return calAge(val)
      },
      getRelationship (val) {
        if (this.relationship.length > 0) {
          const v = this.relationship.find(item => {
            return item.id === val
          })
          return v.name
        } else {
          return ''
        }
      },
      async verifyDocument () {
        if (this.editedItem.cedula) {
          const serviceResponse = await this.fileFamilyVerifyDocumentActions(this.editedItem.cedula)
          if (serviceResponse.ok) {
            this.msotrarMensajeCedula = true
          } else {
            this.msotrarMensajeCedula = false
          }
        }
      },
      async verifyEmail () {
        if (this.editedItem.correo) {
          const serviceResponse = await this.fileFamilyVerifyEmailActions(this.editedItem.correo)
          if (serviceResponse.ok) {
            this.msotrarMensajeCorreo = true
          } else {
            this.msotrarMensajeCorreo = false
          }
        }
      },
      generateCode () {
        this.infoPregnant = true
        if (this.editedItem.prenatal !== null) {
          if (this.$route.params.id && this.editedItem.prenatal.id) {
            this.editedItem.prenatal.id = null
          }
          this.editedItem.prenatal.numero_historia = `FO000${Math.round(Math.random() * (900 - 100) + 100)}`
        }
        if (this.$route.params.id && this.editedItem.prenatal === null) {
          var prenatal = {
            fum: '',
            fpp: '',
            antecedentes_patologicos: '',
            semana_gestacion: 0,
            numero_historia: '',
            gestas: 0,
            partos: 0,
            vaccine_dt: '',
            abortos: 0,
            cesarias: 0,
          }
          this.editedItem.prenatal = Object.assign({}, prenatal)
          this.editedItem.prenatal.numero_historia = `FO000${Math.round(Math.random() * (900 - 100) + 100)}`
        }
      },
    },
  }
</script>

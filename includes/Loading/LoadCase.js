// ToDo create prototypes for load case types
/**
 * Creates load case
 * @class
 * @constructor
 * @param {Number} no
 * @param {String} name
 * @param {String} comment
 * @param {Object} params
 * @returns Object of LoadCase
 */
function LoadCase(no,
  name,
  comment,
  params) {

  if (arguments.length !== 0) {
    var LoadCase = CreateLoadCase(no, name);
    set_comment_and_parameters(LoadCase, comment, params);
    return LoadCase;
  }
}

/**
 *
 * @param {Number} no
 * @param {String} name
 * @param {Number} staticAnalysisSettingsNo
 * @param {String} ActionCategory
 * @param {Array}  selfWeighParams
 * @param {Number} stabilityAnalysisSettingsNo
 * @param {String} comment
 * @param {Object} params
 * @returns Object of LoadCase
 */
LoadCase.prototype.StaticAnalysis = function (no, name, staticAnalysisSettingsNo, ActionCategory, selfWeighParams, stabilityAnalysisSettingsNo, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_STATIC"];
  SetStaticAnalysisSettings(this.LoadCase, staticAnalysisSettingsNo);
  SetStabilityAnalysisSettings(this.LoadCase, stabilityAnalysisSettingsNo);
  SetActionCategory(this.LoadCase, ActionCategory);
  SetSelfWeightParams(this.LoadCase, selfWeighParams);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param {Number}  no
 * @param {String}  name
 * @param {Number}  modalAnalysisSettingsNo
 * @param {Boolean} importMassesFrom
 * @param {Array}   selfWeighParams
 * @param {String}  comment
 * @param {Object}  params
 * @returns Object of LoadCase
 */
LoadCase.prototype.ModalAnalysis = function (no, name, modalAnalysisSettingsNo, importMassesFrom, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_MODAL"];
  SetModalAnalysisSettings(this.LoadCase, modalAnalysisSettingsNo);
  ImportMassesFrom(this.LoadCase, importMassesFrom);
  //SetSelfWeightParams(this.LoadCase, selfWeighParams);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};
/**
 *
 * @param {Number}  no
 * @param {String}  name
 * @param {Number}  responseSpectrumAnalysisSettingsNo
 * @param {Number}  importModalAnalysisFrom
 * @param {Array}   responseSpectrums
 * @param {String}  comment
 * @param {Object}  params
 * @returns Object of LoadCase
 */
LoadCase.prototype.ResponseSpectrumAnalysis = function (no, name, responseSpectrumAnalysisSettingsNo, importModalAnalysisFrom, responseSpectrums, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_RESPONSE_SPECTRUM"];
  SetResponseSpectrumAnalysisSettings(this.LoadCase, responseSpectrumAnalysisSettingsNo);
  ImportModalAnalysisFrom(this.LoadCase, importModalAnalysisFrom);
  SetResponseSpectrums(this.LoadCase, responseSpectrums);
  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param {Number}  no
 * @param {String}  name
 * @param {Number}  staticAnalysisSettingsNo
 * @param {Number}  windAnalysisSettingsNo
 * @param {Number}  windProfileNo
 * @param {String}  windDirection
 * @param {Number}  terrainOffset
 * @param {Number}  stabilityAnalysisSettingsNo
 * @param {String}  comment
 * @param {Object}  params
 * @returns Object of LoadCase
 */
LoadCase.prototype.WindSimulation = function (no, name, staticAnalysisSettingsNo, windAnalysisSettingsNo, windProfileNo, windDirection, stabilityAnalysisSettingsNo, comment, params) {

  this.LoadCase = CreateLoadCase(no, name);
  this.LoadCase.analysis_type = load_cases["ANALYSIS_TYPE_WIND_SIMULATION"];
  SetActionCategory(this.LoadCase, "WIND_QW");
  SetStaticAnalysisSettings(this.LoadCase, staticAnalysisSettingsNo);
  SetWindAnalysisSettings(this.LoadCase, windAnalysisSettingsNo);
  SetWindProfile(this.LoadCase, windProfileNo);
  SetWindLoadParameters(this.LoadCase, windDirection);
  SetStabilityAnalysisSettings(this.LoadCase, stabilityAnalysisSettingsNo);

  set_comment_and_parameters(this.LoadCase, comment, params);
  var self = this;
  return self;
};

/**
 *
 * @param {Number} imperfectionCaseNo
 */
LoadCase.prototype.ConsiderImperfection = function (imperfectionCaseNo) {
  if (this.LoadCase !== undefined) {
    if (imperfectionCaseNo !== undefined) {
      if (imperfection_cases.exist(imperfectionCaseNo)) {
        this.LoadCase.consider_imperfection = true;
        this.LoadCase.imperfection_case = imperfection_cases[imperfectionCaseNo];
      } else {
        this.LoadCase.consider_imperfection = false;
      }

    }
    else {
      this.LoadCase.consider_imperfection = false;
    }

  }
};

/**
 *
 * @param {Number} structureModificationNo
 */
LoadCase.prototype.SetStructureModification = function (structureModificationNo) {
  if (this.LoadCase !== undefined) {
    if (imperfectionCaseNo !== undefined) {
      if (structure_modifications.exist(structureModificationNo)) {
        this.LoadCase.structure_modification_enabled = true;
        this.LoadCase.structure_modification = structure_modifications[structureModificationNo];
      } else {
        this.LLoadCaseC.structure_modification_enabled = false;
      }

    }
    else {
      this.LoadCase.structure_modification_enabled = false;
    }
  }
};

/**
 *
<<<<<<< HEAD
 * @returns List of action categories
 */
LoadCase.prototype.GetActionCategoryList = function () {
  return actionCategory_dict;
};

/**
 *
=======
>>>>>>> 197138568d3 (Before rebase)
 * @returns Load case object
 */
LoadCase.prototype.GetLoadCase = function(){
  return this.LoadCase;
};

/**
 *
 * @returns Number of Load case
 */
LoadCase.prototype.GetNo = function(){
  return this.LoadCase.no;
};

// private methods
function CreateLoadCase(no, name) {

  var LoadCase = undefined;
  if (no === undefined) {
    LoadCase = load_cases.create();
  }
  else {
    LoadCase = load_cases.create(no);
  }

  if (name !== undefined) {
    LoadCase.name = name;
  }
  return LoadCase;
}

function SetActionCategory(LC, actionCategory) {
  if (LC !== undefined) {
    LC.action_category = GetLoadCaseActionCategory(actionCategory);
  }
  else {
    console.log("Load case is undefined in " + arguments.callee.name);
  }
}

function SetWindAnalysisSettings(LC, windAnalysisSettingsNo) {
  ASSERT(typeof windAnalysisSettingsNo !== undefined || typeof windAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (wind_simulation_analysis_settings.exist(windAnalysisSettingsNo)) {
      LC.wind_simulation_analysis_settings = wind_simulation_analysis_settings[windAnalysisSettingsNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetStabilityAnalysisSettings(LC, stabilityAnalysisSettingsNo) {
  ASSERT(typeof stabilityAnalysisSettingsNo !== undefined || typeof stabilityAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (stability_analysis_settings.exist(stabilityAnalysisSettingsNo)) {
      LC.calculate_critical_load = true;
      LC.stability_analysis_settings = stability_analysis_settings[stabilityAnalysisSettingsNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetWindProfile(LC, windProfileNo) {
  ASSERT(typeof windProfileNo !== undefined || typeof windProfileNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (wind_profiles.exist(windProfileNo)) {
      LC.wind_simulation_wind_profile = wind_profiles[windProfileNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetWindLoadParameters(LC, windDirection) {
  if (LC !== undefined) {
    if (windDirection !== undefined) {
      LC.wind_simulation_wind_direction_angle = windDirection;
    }
    else{
      LC.wind_simulation_wind_direction_angle = 0.0;
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetStaticAnalysisSettings(LC, staticAnalysisSettingsNo) {
  ASSERT(typeof staticAnalysisSettingsNo !== undefined || typeof staticAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (static_analysis_settings.exist(staticAnalysisSettingsNo)) {
      LC.static_analysis_settings = static_analysis_settings[staticAnalysisSettingsNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetModalAnalysisSettings(LC, modalAnalysisSettingsNo) {
  ASSERT(typeof modalAnalysisSettingsNo !== undefined || typeof modalAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (modal_analysis_settings.exist(modalAnalysisSettingsNo)) {
      LC.modal_analysis_settings = modal_analysis_settings[modalAnalysisSettingsNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}
function SetResponseSpectrumAnalysisSettings(LC, responseAnalysisSettingsNo) {
  ASSERT(typeof responseAnalysisSettingsNo !== undefined || typeof responseAnalysisSettingsNo != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (spectral_analysis_settings.exist(responseAnalysisSettingsNo)) {
      LC.spectral_analysis_settings = spectral_analysis_settings[responseAnalysisSettingsNo];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetSelfWeightParams(LC, selfWeighParams) {
  if (LC !== undefined) {
    if (selfWeighParams !== undefined && selfWeighParams.length !== 0) {
      if (selfWeighParams[0] === true && selfWeighParams.length === 4) {
        LC.self_weight_active = true;
        LC.self_weight_factors.x = selfWeighParams[1];
        LC.self_weight_factors.y = selfWeighParams[2];
        LC.self_weight_factors.z = selfWeighParams[3];
      }
      else {
        LC.self_weight_active = false;
      }
    }
    else {
      LC.self_weight_active = false;
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function ImportMassesFrom(LC, importMassesFrom) {
  ASSERT(typeof importMassesFrom !== undefined || typeof importMassesFrom != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (load_cases.exist(importMassesFrom)) {
      LC.import_masses_from = load_cases[importMassesFrom];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function ImportModalAnalysisFrom(LC, importModalAnalysisFrom) {
  ASSERT(typeof importModalAnalysisFrom !== undefined || typeof importModalAnalysisFrom != "number", "Parameter must be assigned as an integer.");
  if (LC !== undefined) {
    if (load_cases.exist(importModalAnalysisFrom)) {
      LC.import_modal_analysis_from = load_cases[importModalAnalysisFrom];
    }
  }
  else {
    console.log("LoadCase is undefined in " + arguments.callee.name);
  }
}

function SetResponseSpectrums(LC, responseSpectrums) {
  if (LC !== undefined) {
    if (responseSpectrums.length === 3) {
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[0][0] !== 0 && response_spectra.exist(responseSpectrums[0][0])) {
          LC.response_spectrum_is_enabled_in_direction_x = true;
          LC.response_spectrum_in_direction_x = response_spectra[responseSpectrums[0][0]];
          LC.response_spectrum_scale_factor_in_direction_x = responseSpectrums[0][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_x = false;
        console.log("Response spectrum in direction x is disabled due to insufficient number of parameters.");
      }
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[1][0] !== 0 && response_spectra.exist(responseSpectrums[1][0])) {
          LC.response_spectrum_is_enabled_in_direction_y = true;
          LC.response_spectrum_in_direction_y = response_spectra[responseSpectrums[1][0]];
          LC.response_spectrum_scale_factor_in_direction_y = responseSpectrums[1][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_y = false;
        console.log("Response spectrum in direction y is disabled due to insufficient number of parameters.");
      }
      if (responseSpectrums[0].length === 2) {
        if (responseSpectrums[2][0] !== 0 && response_spectra.exist(responseSpectrums[2][0])) {
          LC.response_spectrum_is_enabled_in_direction_z = true;
          LC.response_spectrum_in_direction_z = response_spectra[responseSpectrums[2][0]];
          LC.response_spectrum_scale_factor_in_direction_z = responseSpectrums[2][1];
        }
      }
      else {
        LC.response_spectrum_is_enabled_in_direction_z = false;
        console.log("Response spectrum in direction z is disabled due to insufficient number of parameters.");
      }
    }
    else {
      console.log("Response spectrum input have to have 3 parameters.");
    }
  }
  else {
    console.log("LoadCase is undefined " + arguments.callee.name);
  }
}

function GetLoadCaseActionCategory(action_category) {
	const action_categories_dict = {
    "PERMANENT_G": load_cases.ACTION_CATEGORY_PERMANENT_G,
    "PERMANENT_SMALL_FLUCTUATIONS_G_ASTERISK": load_cases.ACTION_CATEGORY_PERMANENT_SMALL_FLUCTUATIONS_G_ASTERISK,
    "WEIGHT_OF_ICE_DI": load_cases.ACTION_CATEGORY_WEIGHT_OF_ICE_DI,
    "DEAD_LOAD_D": load_cases.ACTION_CATEGORY_DEAD_LOAD_D,
    "DEAD_LOAD_DL": load_cases.ACTION_CATEGORY_DEAD_LOAD_DL,
    "DEAD_LOAD_GK": load_cases.ACTION_CATEGORY_DEAD_LOAD_GK,
    "PERMANENT_FROM_CRANES_G_CR": load_cases.ACTION_CATEGORY_PERMANENT_FROM_CRANES_G_CR,
    "PERMANENT_IMPOSED_GQ": load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_GQ,
    "PRESTRESS_P": load_cases.ACTION_CATEGORY_PRESTRESS_P,
    "SELF_STRAINING_FORCE_VARIABLE_TV": load_cases.ACTION_CATEGORY_SELF_STRAINING_FORCE_VARIABLE_TV,
    "IMPOSED_DEFORMATIONS_DUE_TO_PRE_STRESSING_P": load_cases.ACTION_CATEGORY_IMPOSED_DEFORMATIONS_DUE_TO_PRE_STRESSING_P,
    "VARIABLE_Q": load_cases.ACTION_CATEGORY_VARIABLE_Q,
    "LIVE_LOAD_L": load_cases.ACTION_CATEGORY_LIVE_LOAD_L,
    "ROOF_LIVE_LOAD_LR": load_cases.ACTION_CATEGORY_ROOF_LIVE_LOAD_LR,
    "NOTIONAL_LOAD_FOR_STRUCTURAL_INTEGRITY_N": load_cases.ACTION_CATEGORY_NOTIONAL_LOAD_FOR_STRUCTURAL_INTEGRITY_N,
    "IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_A_DOMESTIC_RESIDENTIAL_AREAS_QI_A,
    "IMPOSED_LOADS_CATEGORY_B_OFFICE_AREAS_QI_B": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_B_OFFICE_AREAS_QI_B,
    "IMPOSED_LOADS_CATEGORY_C_CONGREGATION_AREAS_QI_C": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_C_CONGREGATION_AREAS_QI_C,
    "IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_D_SHOPPING_AREAS_QI_D,
    "IMPOSED_LOADS_CATEGORY_E_STORAGE_AREAS_QI_E": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_STORAGE_AREAS_QI_E,
    "IMPOSED_LOADS_LIVE_LOADS_LL": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_LIVE_LOADS_LL,
    "IMPOSED_LOAD_QK": load_cases.ACTION_CATEGORY_IMPOSED_LOAD_QK,
    "ACTIONS_WITH_LIMITED_MAXIMUM_VALUES_Q_LI": load_cases.ACTION_CATEGORY_ACTIONS_WITH_LIMITED_MAXIMUM_VALUES_Q_LI,
    "GENERAL_VARIABLE_ACTIONS_Q_GE": load_cases.ACTION_CATEGORY_GENERAL_VARIABLE_ACTIONS_Q_GE,
    "IMPOSED_LOADS_CATEGORY_F_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_F": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_F,
    "IMPOSED_LOADS_CATEGORY_G_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_160_KN_QI_G": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_160_KN_QI_G,
    "IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_QI_H,
    "IMPOSED_LOADS_CATEGORY_I_ROOFS_HELICOPTER_QI_I": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_HELICOPTER_QI_I,
    "IMPOSED_LOADS_CATEGORY_J_ROOFS_HELIPORT_EQUIPMENT_QI_J": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_J_ROOFS_HELIPORT_EQUIPMENT_QI_J,
    "IMPOSED_LOADS_CATEGORY_H_INACCESSIBLE_ROOFS_QI_H": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_INACCESSIBLE_ROOFS_QI_H,
    "IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_HELICOPTER_QI_K": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_HELICOPTER_QI_K,
    "IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_OTHER_QI_K": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_FLAT_ROOFS_OTHER_QI_K,
    "SNOW_ICE_LOADS_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_QS,
    "SNOW_ICE_LOADS_FINLAND_ICELAND_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_FINLAND_ICELAND_QS,
    "SNOW_ICE_LOADS_H_GREATER_THAN_1000_M_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_H_GREATER_THAN_1000_M_QS,
    "SNOW_ICE_LOADS_H_LESS_OR_EQUAL_TO_1000_M_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_H_LESS_OR_EQUAL_TO_1000_M_QS,
    "ICE_QI": load_cases.ACTION_CATEGORY_ICE_QI,
    "SNOW_ICE_LOADS_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS,
    "SNOW_ICE_LOADS_SK_GREATER_THAN_2_75_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_THAN_2_75_KN_M2_QS,
    "SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_LESS_OR_EQUAL_TO_2_75_KN_M2_QS,
    "SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_GREATER_THAN_2_75_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_OUTDOOR_TERRACES_AND_BALCONIES_SK_GREATER_THAN_2_75_KN_M2_QS,
    "SNOW_LOAD_S": load_cases.ACTION_CATEGORY_SNOW_LOAD_S,
    "WIND_QW": load_cases.ACTION_CATEGORY_WIND_QW,
    "WIND_LOAD_W": load_cases.ACTION_CATEGORY_WIND_LOAD_W,
    "WIND_ON_ICE_DETERMINED_IN_ACCORDANCE_WITH_SECTION_10_WI": load_cases.ACTION_CATEGORY_WIND_ON_ICE_DETERMINED_IN_ACCORDANCE_WITH_SECTION_10_WI,
    "LIVE_LOAD_DUE_TO_WIND_W": load_cases.ACTION_CATEGORY_LIVE_LOAD_DUE_TO_WIND_W,
    "WIND_LOAD_WL": load_cases.ACTION_CATEGORY_WIND_LOAD_WL,
    "WIND_LOAD_WK": load_cases.ACTION_CATEGORY_WIND_LOAD_WK,
    "WIND_LOAD_ACCORDING_TO_8_1_4_W": load_cases.ACTION_CATEGORY_WIND_LOAD_ACCORDING_TO_8_1_4_W,
    "TEMPERATURE_NON_FIRE_QT": load_cases.ACTION_CATEGORY_TEMPERATURE_NON_FIRE_QT,
    "INFLUENCES_RESULTING_FROM_TEMPERATURE_CHANGES_SHRINKAGE_OR_CREEP_ETC_T": load_cases.ACTION_CATEGORY_INFLUENCES_RESULTING_FROM_TEMPERATURE_CHANGES_SHRINKAGE_OR_CREEP_ETC_T,
    "TEMPERATURE_SHRINKAGE_CREEP_ETC_T": load_cases.ACTION_CATEGORY_TEMPERATURE_SHRINKAGE_CREEP_ETC_T,
    "THERMAL_ACTION_ACCORDING_TO_9_1_3_T": load_cases.ACTION_CATEGORY_THERMAL_ACTION_ACCORDING_TO_9_1_3_T,
    "FOUNDATION_SUBSIDENCE_QF": load_cases.ACTION_CATEGORY_FOUNDATION_SUBSIDENCE_QF,
    "ACTION_FROM_SOIL_PERMANENT_EARTH_LOADS_GS": load_cases.ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_LOADS_GS,
    "ACTION_FROM_SOIL_PERMANENT_EARTH_PRESSURE_GS": load_cases.ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_EARTH_PRESSURE_GS,
    "FROM_SOIL_PERMANENT_WATER_PRESSURE_GS": load_cases.ACTION_CATEGORY_ACTION_FROM_SOIL_PERMANENT_WATER_PRESSURE_GS,
    "ACTION_FROM_SOIL_VARIABLE_EARTH_PRESSURE_GS": load_cases.ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_EARTH_PRESSURE_GS,
    "ACTION_FROM_SOIL_VARIABLE_WATER_PRESSURE_GS": load_cases.ACTION_CATEGORY_ACTION_FROM_SOIL_VARIABLE_WATER_PRESSURE_GS,
    "LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_GROUND_WATER_PRESSURE_H": load_cases.ACTION_CATEGORY_LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_GROUND_WATER_PRESSURE_H,
    "LATERAL_EARTH_PRESSURE_H": load_cases.ACTION_CATEGORY_LATERAL_EARTH_PRESSURE_H,
    "GEOTECHNICAL_LOADS_PERMANENT_GEP": load_cases.ACTION_CATEGORY_GEOTECHNICAL_LOADS_PERMANENT_GEP,
    "GEOTECHNICAL_LOADS_VARIABLE_GEV": load_cases.ACTION_CATEGORY_GEOTECHNICAL_LOADS_VARIABLE_GEV,
    "OTHER_ACTIONS_QO": load_cases.ACTION_CATEGORY_OTHER_ACTIONS_QO,
    "LOAD_DUE_TO_FLUIDS_WITH_WELL_DEFINED_PRESSURES_AND_MAXIMUM_HEIGHTS_F": load_cases.ACTION_CATEGORY_LOAD_DUE_TO_FLUIDS_WITH_WELL_DEFINED_PRESSURES_AND_MAXIMUM_HEIGHTS_F,
    "FLOOD_LOAD_FA": load_cases.ACTION_CATEGORY_FLOOD_LOAD_FA,
    "RAIN_LOAD_R": load_cases.ACTION_CATEGORY_RAIN_LOAD_R,
    "CRANE_LOAD_CL": load_cases.ACTION_CATEGORY_CRANE_LOAD_CL,
    "ERECTION_LOAD_ER": load_cases.ACTION_CATEGORY_ERECTION_LOAD_ER,
    "NOTIONAL_HORIZONTAL_FORCES_ACCORDING_TO_BS_5950_NK": load_cases.ACTION_CATEGORY_NOTIONAL_HORIZONTAL_FORCES_ACCORDING_TO_BS_5950_NK,
    "ACTIONS_DURING_EXECUTION_Q_EX": load_cases.ACTION_CATEGORY_ACTIONS_DURING_EXECUTION_Q_EX,
    "RAIN_LOAD_QR": load_cases.ACTION_CATEGORY_RAIN_LOAD_QR,
    "ACCIDENTAL_ACTIONS_A": load_cases.ACTION_CATEGORY_ACCIDENTAL_ACTIONS_A,
    "ACCIDENTAL_LOAD_AL": load_cases.ACTION_CATEGORY_ACCIDENTAL_LOAD_AL,
    "EXCEPTIONAL_EXC": load_cases.ACTION_CATEGORY_EXCEPTIONAL_EXC,
    "LOAD_ARISING_FROM_EXTRAORDINARY_EVENT_AK": load_cases.ACTION_CATEGORY_LOAD_ARISING_FROM_EXTRAORDINARY_EVENT_AK,
    "SEISMIC_ACTIONS_AE": load_cases.ACTION_CATEGORY_SEISMIC_ACTIONS_AE,
    "EARTHQUAKE_LOAD_E": load_cases.ACTION_CATEGORY_EARTHQUAKE_LOAD_E,
    "LIVE_LOAD_DUE_TO_EARTHQUAKE_E": load_cases.ACTION_CATEGORY_LIVE_LOAD_DUE_TO_EARTHQUAKE_E,
    "EARTHQUAKE_LOAD_EL": load_cases.ACTION_CATEGORY_EARTHQUAKE_LOAD_EL,
    "SEISMIC_AE": load_cases.ACTION_CATEGORY_SEISMIC_AE,
    "EARTHQUAKE_LOAD_VERTICAL_EV": load_cases.ACTION_CATEGORY_EARTHQUAKE_LOAD_VERTICAL_EV,
    "EARTHQUAKE_LOAD_HORIZONTAL_EH": load_cases.ACTION_CATEGORY_EARTHQUAKE_LOAD_HORIZONTAL_EH,
    "UNEVEN_SETTLEMENTS_G_US": load_cases.ACTION_CATEGORY_UNEVEN_SETTLEMENTS_G_US,
    "GR1A_LM1_PEDESTRIAN_CYCLE_TRACK_GR1A": load_cases.ACTION_CATEGORY_GR1A_LM1_PEDESTRIAN_CYCLE_TRACK_GR1A,
    "GR1B_SINGLE_AXLE_GR1B": load_cases.ACTION_CATEGORY_GR1B_SINGLE_AXLE_GR1B,
    "GR2_HORIZONTAL_FORCES_LM1_GR2": load_cases.ACTION_CATEGORY_GR2_HORIZONTAL_FORCES_LM1_GR2,
    "GR3_PEDESTRIAN_LOAD_GR3": load_cases.ACTION_CATEGORY_GR3_PEDESTRIAN_LOAD_GR3,
    "GR4_CROWD_LOADING_PEDESTRIAN_LOAD_GR4": load_cases.ACTION_CATEGORY_GR4_CROWD_LOADING_PEDESTRIAN_LOAD_GR4,
    "GR5_SPECIAL_VEHICLES_LM1_GR5": load_cases.ACTION_CATEGORY_GR5_SPECIAL_VEHICLES_LM1_GR5,
    "WIND_LOADS_FWK_PERSISTENT_DESIGN_SITUATIONS_QWP": load_cases.ACTION_CATEGORY_WIND_LOADS_FWK_PERSISTENT_DESIGN_SITUATIONS_QWP,
    "WIND_LOADS_FWK_EXECUTION_QWE": load_cases.ACTION_CATEGORY_WIND_LOADS_FWK_EXECUTION_QWE,
    "WIND_LOADS_FW_QW": load_cases.ACTION_CATEGORY_WIND_LOADS_FW_QW,
    "CONSTRUCTION_LOADS_DUE_TO_WORKING_PERSONNEL_Q_CP": load_cases.ACTION_CATEGORY_CONSTRUCTION_LOADS_DUE_TO_WORKING_PERSONNEL_Q_CP,
    "SNOW_ICE_LOADS_SK_GREATER_OR_EQUAL_TO_3_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_SK_GREATER_OR_EQUAL_TO_3_KN_M2_QS,
    "SNOW_ICE_LOADS_2_LESS_OR_EQUAL_TO_SK_LESSER_THAN_3_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_2_LESS_OR_EQUAL_TO_SK_LESSER_THAN_3_KN_M2_QS,
    "SNOW_ICE_LOADS_1_LESS_OR_EQUAL_TO_SK_LESSER_THAN_2_KN_M2_QS": load_cases.ACTION_CATEGORY_SNOW_ICE_LOADS_1_LESS_OR_EQUAL_TO_SK_LESSER_THAN_2_KN_M2_QS,
    "SNOW_REGION_SAINT_PIERRE_AND_MIQUELON_QS": load_cases.ACTION_CATEGORY_SNOW_REGION_SAINT_PIERRE_AND_MIQUELON_QS,
    "SNOW_ICE_AND_RAIN_S": load_cases.ACTION_CATEGORY_SNOW_ICE_AND_RAIN_S,
    "SNOW_LOAD_ZONE_I_S": load_cases.ACTION_CATEGORY_SNOW_LOAD_ZONE_I_S,
    "SNOW_LOAD_ZONE_II_S": load_cases.ACTION_CATEGORY_SNOW_LOAD_ZONE_II_S,
    "SNOW_LOAD_ZONE_III_S": load_cases.ACTION_CATEGORY_SNOW_LOAD_ZONE_III_S,
    "OTHER_CONSTRUCTION_LOADS_Q_CO": load_cases.ACTION_CATEGORY_OTHER_CONSTRUCTION_LOADS_Q_CO,
    "SETTLEMENTS_OF_SUPPORTS_SHRINKAGE_SETT": load_cases.ACTION_CATEGORY_SETTLEMENTS_OF_SUPPORTS_SHRINKAGE_SETT,
    "CRANE_LOADS_WORKING_GRADES_A1_A3_Q_CR": load_cases.ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A1_A3_Q_CR,
    "CRANE_LOADS_WORKING_GRADES_A4_A5_Q_CR": load_cases.ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A4_A5_Q_CR,
    "CRANE_LOADS_WORKING_GRADES_A6_A7_Q_CR": load_cases.ACTION_CATEGORY_CRANE_LOADS_WORKING_GRADES_A6_A7_Q_CR,
    "CRANE_LOADS_LIFTING_HOOK_CRANES_OF_WORKING_GRADE_A8_Q_CR": load_cases.ACTION_CATEGORY_CRANE_LOADS_LIFTING_HOOK_CRANES_OF_WORKING_GRADE_A8_Q_CR,
    "CIVIL_BUILDINGS_DWELLING_HOSTEL_HOTEL_OFFICE_HOSPITAL_WARD_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_DWELLING_HOSTEL_HOTEL_OFFICE_HOSPITAL_WARD_Q_CB,
    "CIVIL_BUILDINGS_CLASSROOM_LABORATORY_READING_ROOM_MEETING_ROOM_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_CLASSROOM_LABORATORY_READING_ROOM_MEETING_ROOM_Q_CB,
    "CIVIL_BUILDINGS_CANTEEN_DINING_HALL_ORDINARY_ARCHIVES_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_CANTEEN_DINING_HALL_ORDINARY_ARCHIVES_Q_CB,
    "CIVIL_BUILDINGS_ASSEMBLY_HALL_THEATER_CINEMA_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_ASSEMBLY_HALL_THEATER_CINEMA_Q_CB,
    "CIVIL_BUILDINGS_LAUNDRY_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_LAUNDRY_Q_CB,
    "CIVIL_BUILDINGS_STORES_AND_SHOPS_EXHIBITION_HALLS_STATION_PORT_AIRPORT_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_STORES_AND_SHOPS_EXHIBITION_HALLS_STATION_PORT_AIRPORT_Q_CB,
    "CIVIL_BUILDINGS_STANDS_WITHOUT_FIXED_SEAT_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_STANDS_WITHOUT_FIXED_SEAT_Q_CB,
    "CIVIL_BUILDINGS_GYMNASIUM_ARENA_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_GYMNASIUM_ARENA_Q_CB,
    "CIVIL_BUILDINGS_DANCE_HALL_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_DANCE_HALL_Q_CB,
    "CIVIL_BUILDINGS_STOREHOUSE_FOR_COLLECTING_BOOKS_ARCHIVES_STOREROOMS_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_STOREHOUSE_FOR_COLLECTING_BOOKS_ARCHIVES_STOREROOMS_Q_CB,
    "CIVIL_BUILDINGS_WAREHOUSE_WITH_A_DENSE_CONCENTRATION_OF_SHELVING_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_WAREHOUSE_WITH_A_DENSE_CONCENTRATION_OF_SHELVING_Q_CB,
    "CIVIL_BUILDINGS_VENTILATOR_MOTOR_ROOM_ELEVATOR_MOTOR_ROOM_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_VENTILATOR_MOTOR_ROOM_ELEVATOR_MOTOR_ROOM_Q_CB,
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_BUS_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_BUS_Q_CB,
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_ROOF_BUS_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_ROOF_BUS_Q_CB,
    "CIVIL_BUILDINGS_KITCHEN_FOR_DINING_HALL_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_FOR_DINING_HALL_Q_CB,
    "CIVIL_BUILDINGS_KITCHEN_OTHER_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_KITCHEN_OTHER_Q_CB,
    "CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_BUILDINGS_IN_ITEM_NO_1_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_BUILDINGS_IN_ITEM_NO_1_Q_CB,
    "CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_FOR_OTHER_BUILDINGS_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_BATHROOM_TOILET_AND_WASHROOM_FOR_OTHER_BUILDINGS_Q_CB,
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_HOSTEL_HOTEL_NURSERY_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_HOSTEL_HOTEL_NURSERY_Q_CB,
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_OFFICE_CLASSROOM_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_OFFICE_CLASSROOM_Q_CB,
    "CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_THICK_STREAM_OF_PEOPLE_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_PASSAGE_ENTRANCE_HALL_STAIRCASE_THICK_STREAM_OF_PEOPLE_Q_CB,
    "CIVIL_BUILDINGS_BALCONY_POPULATION_MAY_BE_CONCENTRATED_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_POPULATION_MAY_BE_CONCENTRATED_Q_CB,
    "CIVIL_BUILDINGS_BALCONY_OTHER_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_BALCONY_OTHER_Q_CB,
    "INDUSTRIAL_BUILDINGS_METAL_WORKING_WORKSHOP_TABLE_D_0_1_1_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_METAL_WORKING_WORKSHOP_TABLE_D_0_1_1_Q_IB,
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_1_2_4_6_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_1_2_4_6_Q_IB,
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_3_5_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_3_5_Q_IB,
    "INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_7_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_MANUFACTURING_WORKSHOP_TABLE_D_0_1_2_ITEM_NO_7_Q_IB,
    "INDUSTRIAL_BUILDINGS_SEMICONDUCTOR_PRODUCTION_WORKSHOP_TABLE_D_0_1_3_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_SEMICONDUCTOR_PRODUCTION_WORKSHOP_TABLE_D_0_1_3_Q_IB,
    "INDUSTRIAL_BUILDINGS_COTTON_MILLING_WORKSHOP_TABLE_D_0_1_4_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_COTTON_MILLING_WORKSHOP_TABLE_D_0_1_4_Q_IB,
    "INDUSTRIAL_BUILDINGS_PREPARATORY_WORKSHOP_FOR_TIRE_PLANT_TABLE_D_0_1_5_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_PREPARATORY_WORKSHOP_FOR_TIRE_PLANT_TABLE_D_0_1_5_Q_IB,
    "INDUSTRIAL_BUILDINGS_GRAIN_PROCESSING_WORKSHOP_TABLE_D_0_1_6_Q_IB": load_cases.ACTION_CATEGORY_INDUSTRIAL_BUILDINGS_GRAIN_PROCESSING_WORKSHOP_TABLE_D_0_1_6_Q_IB,
    "LIVE_LOADS_ON_ROOFS_UNMANNED_ROOF_Q_LR": load_cases.ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_UNMANNED_ROOF_Q_LR,
    "LIVE_LOADS_ON_ROOFS_MANNED_ROOF_Q_LR": load_cases.ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_MANNED_ROOF_Q_LR,
    "LIVE_LOADS_ON_ROOFS_ROOF_GARDEN_Q_LR": load_cases.ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_GARDEN_Q_LR,
    "LIVE_LOADS_ON_ROOFS_HELICOPTER_ON_THE_ROOF_ACC_TO_5_3_2_Q_LR": load_cases.ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_HELICOPTER_ON_THE_ROOF_ACC_TO_5_3_2_Q_LR,
    "ASH_LOAD_ON_ROOFINGS_TABLE_5_4_1_1_Q_AS": load_cases.ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_TABLE_5_4_1_1_Q_AS,
    "ASH_LOAD_ON_ROOFINGS_ADJACENT_TO_BLAST_FURNACE_TABLE_5_4_1_2_Q_AS": load_cases.ACTION_CATEGORY_ASH_LOAD_ON_ROOFINGS_ADJACENT_TO_BLAST_FURNACE_TABLE_5_4_1_2_Q_AS,
    "IMPOSED_LOADS_FROM_CRANES_CLASS_1_7_Q_CR": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_1_7_Q_CR,
    "IMPOSED_LOADS_FROM_CRANES_CLASS_8_Q_CR": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_8_Q_CR,
    "IMPOSED_LOADS_FROM_CRANES_CLASS_9_10_Q_CR": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_9_10_Q_CR,
    "IMPOSED_LOADS_FROM_CRANES_CLASS_11_12_13_Q_CR": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_CLASS_11_12_13_Q_CR,
    "IMPOSED_LOADS_FROM_CRANES_SUPPORT_FORCES_Q_CR": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FROM_CRANES_SUPPORT_FORCES_Q_CR,
    "SELF_WEIGHT_OF_METAL_STRUCTURES_G_ME": load_cases.ACTION_CATEGORY_SELF_WEIGHT_OF_METAL_STRUCTURES_G_ME,
    "SELF_WEIGHT_OF_PREFABRICATED_STRUCTURES_G_PR": load_cases.ACTION_CATEGORY_SELF_WEIGHT_OF_PREFABRICATED_STRUCTURES_G_PR,
    "SELF_WEIGHT_OF_STRUCTURES_BUILT_ON_SITE_G_SI": load_cases.ACTION_CATEGORY_SELF_WEIGHT_OF_STRUCTURES_BUILT_ON_SITE_G_SI,
    "INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_G_IN": load_cases.ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_G_IN,
    "INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_WITH_ADDITION_ON_SITE_G_IS": load_cases.ACTION_CATEGORY_INDUSTRIALIZED_CONSTRUCTION_ELEMENTS_WITH_ADDITION_ON_SITE_G_IS,
    "GENERAL_CONSTRUCTION_ELEMENTS_AND_EQUIPMENT_G_GE": load_cases.ACTION_CATEGORY_GENERAL_CONSTRUCTION_ELEMENTS_AND_EQUIPMENT_G_GE,
    "PERMANENT_SELF_WEIGHT_SELF_WEIGHT_OF_SOIL_G": load_cases.ACTION_CATEGORY_PERMANENT_SELF_WEIGHT_SELF_WEIGHT_OF_SOIL_G,
    "PERMANENT_EARTH_PRESSURE_G_E": load_cases.ACTION_CATEGORY_PERMANENT_EARTH_PRESSURE_G_E,
    "PERMANENT_WATER_PRESSURE_G_W": load_cases.ACTION_CATEGORY_PERMANENT_WATER_PRESSURE_G_W,
    "SELF_WEIGHT_G": load_cases.ACTION_CATEGORY_SELF_WEIGHT_G,
    "PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_G_GU": load_cases.ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_G_GU,
    "PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_G_GF": load_cases.ACTION_CATEGORY_PERMANENT_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_G_GF,
    "PERMANENT_LOADS_FROM_FLUIDS_G_FL": load_cases.ACTION_CATEGORY_PERMANENT_LOADS_FROM_FLUIDS_G_FL,
    "OTHER_IMPOSED_PERMANENT_DEFORMATIONS_FOR_EXAMPLE_SETTLEMENT_G_OT": load_cases.ACTION_CATEGORY_OTHER_IMPOSED_PERMANENT_DEFORMATIONS_FOR_EXAMPLE_SETTLEMENT_G_OT,
    "IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_E_TRAFFIC_AREA_VEHICLE_WEIGHT_LESS_OR_EQUAL_TO_30_KN_QI_E,
    "IMPOSED_LOADS_CATEGORY_F_ROOFS_ACCESSIBLE_ONLY_PRIVATELY_QI_F": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_F_ROOFS_ACCESSIBLE_ONLY_PRIVATELY_QI_F,
    "IMPOSED_LOADS_CATEGORY_G1_ROOFS_SLOPE_LESS_THAN_20_Q_G1": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G1_ROOFS_SLOPE_LESS_THAN_20_Q_G1,
    "IMPOSED_LOADS_CATEGORY_G2_ROOFS_SLOPE_MORE_THAN_40_Q_G2": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_G2_ROOFS_SLOPE_MORE_THAN_40_Q_G2,
    "GR6_LOADS_FOR_BEARINGS_EXCHANGE_GR6": load_cases.ACTION_CATEGORY_GR6_LOADS_FOR_BEARINGS_EXCHANGE_GR6,
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_ONE_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB,
    "CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_AUTOMOBILE_PASSAGE_AND_GARAGE_TWO_WAY_SLAB_FLOOR_FIRE_ENGINE_Q_CB,
    "CIVIL_BUILDINGS_STAIRS_APARTMENT_HOUSE_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_APARTMENT_HOUSE_Q_CB,
    "CIVIL_BUILDINGS_STAIRS_OTHER_Q_CB": load_cases.ACTION_CATEGORY_CIVIL_BUILDINGS_STAIRS_OTHER_Q_CB,
    "LIVE_LOADS_ON_ROOFS_ROOF_SPORTS_GROUND_Q_LR": load_cases.ACTION_CATEGORY_LIVE_LOADS_ON_ROOFS_ROOF_SPORTS_GROUND_Q_LR,
    "CONSTRUCTION_AND_MAINTENANCE_LOADS_AND_HORIZONTAL_LOAD_ON_RAILINGS_ACC_TO_5_5_3_Q_CM": load_cases.ACTION_CATEGORY_CONSTRUCTION_AND_MAINTENANCE_LOADS_AND_HORIZONTAL_LOAD_ON_RAILINGS_ACC_TO_5_5_3_Q_CM,
    "IMPOSED_LOADS_DOMESTIC_AND_RESIDENTIAL_AREAS_Q_A": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_DOMESTIC_AND_RESIDENTIAL_AREAS_Q_A,
    "IMPOSED_LOADS_PUBLIC_AREAS_NOT_SUSCEPTIBLE_TO_CROWDING_Q_B": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_PUBLIC_AREAS_NOT_SUSCEPTIBLE_TO_CROWDING_Q_B,
    "IMPOSED_LOADS_AREAS_WHERE_PEOPLE_CAN_CONGREGATE_Q_C": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_AREAS_WHERE_PEOPLE_CAN_CONGREGATE_Q_C,
    "IMPOSED_LOADS_SHOPPING_AREAS_Q_D": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_SHOPPING_AREAS_Q_D,
    "IMPOSED_LOADS_LIGHT_INDUSTRIAL_USE_Q_E1": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_LIGHT_INDUSTRIAL_USE_Q_E1,
    "IMPOSED_LOADS_INDUSTRIAL_USE_Q_E2": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_INDUSTRIAL_USE_Q_E2,
    "IMPOSED_LOADS_STORAGE_AREAS_Q_E3": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_STORAGE_AREAS_Q_E3,
    "IMPOSED_LOADS_FORK_LIFTS_Q_FL": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_FORK_LIFTS_Q_FL,
    "IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_Q_F": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_Q_F,
    "IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_TO_160_KN_Q_G": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_TRAFFIC_AND_PARKING_AREAS_FOR_VEHICLES_25_KN_TO_160_KN_Q_G,
    "IMPOSED_LOADS_INACCESSIBLE_ROOFS_Q_H": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_INACCESSIBLE_ROOFS_Q_H,
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_EXCLUDING_CATEGORIES_A_TO_D_Q_J": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_EXCLUDING_CATEGORIES_A_TO_D_Q_J,
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_A_Q_KA": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_A_Q_KA,
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_B_Q_KB": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_B_Q_KB,
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_C_Q_KC": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_C_Q_KC,
    "IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_D_Q_KD": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_ACCESSIBLE_FLAT_ROOFS_WITH_OCCUPANCY_D_Q_KD,
    "IMPOSED_LOADS_HELICOPTER_LOAD_Q_HC": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_HELICOPTER_LOAD_Q_HC,
    "THERMAL_ACTIONS_QT": load_cases.ACTION_CATEGORY_THERMAL_ACTIONS_QT,
    "ACTIONS_DUE_TO_CRANES_HORIZONTAL_AND_VERTICAL_Q_CR": load_cases.ACTION_CATEGORY_ACTIONS_DUE_TO_CRANES_HORIZONTAL_AND_VERTICAL_Q_CR,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUNDWATER_GEU1": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUNDWATER_GEU1,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUND_WATER_FLUIDS_GEU2": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_GROUND_WATER_FLUIDS_GEU2,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_OTHER_ACTIONS_GEU3": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_UN_FACTORED_OTHER_ACTIONS_GEU3,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUNDWATER_GEF1": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUNDWATER_GEF1,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUND_WATER_FLUIDS_GEF2": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_GROUND_WATER_FLUIDS_GEF2,
    "VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_OTHER_ACTIONS_GEF3": load_cases.ACTION_CATEGORY_VARIABLE_GEOTECHNICAL_ACTIONS_SOIL_PARAMETERS_FACTORED_OTHER_ACTIONS_GEF3,
    "VARIABLE_LOADS_FROM_FLUIDS_Q_FL": load_cases.ACTION_CATEGORY_VARIABLE_LOADS_FROM_FLUIDS_Q_FL,
    "OTHER_TYPES_OF_VARIABLE_LOADS_Q_OT": load_cases.ACTION_CATEGORY_OTHER_TYPES_OF_VARIABLE_LOADS_Q_OT,
    "PERMANENT_G1": load_cases.ACTION_CATEGORY_PERMANENT_G1,
    "PERMANENT_NON_STRUCTURAL_G2": load_cases.ACTION_CATEGORY_PERMANENT_NON_STRUCTURAL_G2,
    "PERMANENT_IMPOSED_NON_STRUCTURAL_G2": load_cases.ACTION_CATEGORY_PERMANENT_IMPOSED_NON_STRUCTURAL_G2,
    "IMPOSED_LOADS_CATEGORY_H_ROOFS_ACCESSIBLE_ONLY_FOR_MAINTENANCE_QI_H": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_H_ROOFS_ACCESSIBLE_ONLY_FOR_MAINTENANCE_QI_H,
    "IMPOSED_LOADS_CATEGORY_I_ROOFS_ACCESSIBLE_QI_I": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_I_ROOFS_ACCESSIBLE_QI_I,
    "IMPOSED_LOADS_CATEGORY_K_ROOFS_FOR_SPECIAL_USES_HELIPORTS_QI_K": load_cases.ACTION_CATEGORY_IMPOSED_LOADS_CATEGORY_K_ROOFS_FOR_SPECIAL_USES_HELIPORTS_QI_K,
    "SELF_WEIGHT_Q1_1": load_cases.ACTION_CATEGORY_SELF_WEIGHT_Q1_1,
    "SOIL_Q1_2": load_cases.ACTION_CATEGORY_SOIL_Q1_2,
    "SUPPORTED_CONSTRUCTION_Q2_1": load_cases.ACTION_CATEGORY_SUPPORTED_CONSTRUCTION_Q2_1,
    "STORAGE_AREAS_Q2_2": load_cases.ACTION_CATEGORY_STORAGE_AREAS_Q2_2,
    "CONSTRUCTION_OPERATIONS_LOADING_Q2_3": load_cases.ACTION_CATEGORY_CONSTRUCTION_OPERATIONS_LOADING_Q2_3,
    "SNOW_AND_ICE_Q2_4": load_cases.ACTION_CATEGORY_SNOW_AND_ICE_Q2_4,
    "VARIABLE_PERSISTENT_HORIZONTAL_IMPOSED_ACTIONS_Q3": load_cases.ACTION_CATEGORY_VARIABLE_PERSISTENT_HORIZONTAL_IMPOSED_ACTIONS_Q3,
    "IN_SITU_CONCRETE_LOADING_ALLOWANCE_Q4_1": load_cases.ACTION_CATEGORY_IN_SITU_CONCRETE_LOADING_ALLOWANCE_Q4_1,
    "CONCRETE_PRESSURE_Q4_2": load_cases.ACTION_CATEGORY_CONCRETE_PRESSURE_Q4_2,
    "MAXIMUM_WIND_Q5_1": load_cases.ACTION_CATEGORY_MAXIMUM_WIND_Q5_1,
    "WORKING_WIND_Q5_2": load_cases.ACTION_CATEGORY_WORKING_WIND_Q5_2,
    "LOADS_PRODUCED_BY_FLOWING_WATER_Q6_1": load_cases.ACTION_CATEGORY_LOADS_PRODUCED_BY_FLOWING_WATER_Q6_1,
    "DEBRIS_EFFECT_Q6_2": load_cases.ACTION_CATEGORY_DEBRIS_EFFECT_Q6_2,
    "SEISMIC_EFFECTS_Q7": load_cases.ACTION_CATEGORY_SEISMIC_EFFECTS_Q7,
    "TEMPERATURE_Q8_1": load_cases.ACTION_CATEGORY_TEMPERATURE_Q8_1,
    "SETTLEMENT_Q8_2": load_cases.ACTION_CATEGORY_SETTLEMENT_Q8_2,
    "PRESTRESSING_Q8_3": load_cases.ACTION_CATEGORY_PRESTRESSING_Q8_3,
    "OTHER_LOADS_Q9": load_cases.ACTION_CATEGORY_OTHER_LOADS_Q9,
    "SELF_WEIGHT_STEEL_CONSTRUCTIONS_G_S1": load_cases.ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_G_S1,
    "SELF_WEIGHT_STEEL_CONSTRUCTIONS_OVER_50_OF_TOTAL_LOAD_G_S2": load_cases.ACTION_CATEGORY_SELF_WEIGHT_STEEL_CONSTRUCTIONS_OVER_50_OF_TOTAL_LOAD_G_S2,
    "SELF_WEIGHT_CONCRETE_MORE_THAN_1600_KG_M3_STONE_TIMBER_G_C1": load_cases.ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_MORE_THAN_1600_KG_M3_STONE_TIMBER_G_C1,
    "SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_PREFABRICATED_G_C2": load_cases.ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_PREFABRICATED_G_C2,
    "SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_ON_BUILDING_SITE_G_C3": load_cases.ACTION_CATEGORY_SELF_WEIGHT_CONCRETE_1600_KG_M3_AND_LESS_ON_BUILDING_SITE_G_C3,
    "SELF_WEIGHT_SOIL_NATURAL_G_SN": load_cases.ACTION_CATEGORY_SELF_WEIGHT_SOIL_NATURAL_G_SN,
    "SELF_WEIGHT_SOIL_MODIFIED_G_SM": load_cases.ACTION_CATEGORY_SELF_WEIGHT_SOIL_MODIFIED_G_SM,
    "EQUIPMENT_PERMANENT_EQUIPMENT_Q_E1": load_cases.ACTION_CATEGORY_EQUIPMENT_PERMANENT_EQUIPMENT_Q_E1,
    "EQUIPMENT_ISOLATION_OF_EQUIPMENT_Q_E2": load_cases.ACTION_CATEGORY_EQUIPMENT_ISOLATION_OF_EQUIPMENT_Q_E2,
    "EQUIPMENT_CHARGES_OF_CONTAINERS_LIQUID_Q_E3": load_cases.ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LIQUID_Q_E3,
    "EQUIPMENT_CHARGES_OF_CONTAINERS_LOOSE_Q_E4": load_cases.ACTION_CATEGORY_EQUIPMENT_CHARGES_OF_CONTAINERS_LOOSE_Q_E4,
    "EQUIPMENT_FORKLIFTS_AND_ELECTRIC_TRUCKS_Q_E5": load_cases.ACTION_CATEGORY_EQUIPMENT_FORKLIFTS_AND_ELECTRIC_TRUCKS_Q_E5,
    "EQUIPMENT_STORED_MATERIALS_AND_PRODUCTS_Q_M": load_cases.ACTION_CATEGORY_EQUIPMENT_STORED_MATERIALS_AND_PRODUCTS_Q_M,
    "PREMISES_OF_BUILDINGS_UNIFORM_LOADS_LESS_THAN_2_KN_M2_Q_U1": load_cases.ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_LESS_THAN_2_KN_M2_Q_U1,
    "PREMISES_OF_BUILDINGS_UNIFORM_LOADS_2_KN_M2_AND_MORE_Q_U2": load_cases.ACTION_CATEGORY_PREMISES_OF_BUILDINGS_UNIFORM_LOADS_2_KN_M2_AND_MORE_Q_U2,
    "CONCENTRATED_AND_RAILING_LOADS_Q_CO": load_cases.ACTION_CATEGORY_CONCENTRATED_AND_RAILING_LOADS_Q_CO,
    "LOADS_FROM_VEHICLES_Q_V": load_cases.ACTION_CATEGORY_LOADS_FROM_VEHICLES_Q_V,
    "LOADS_FROM_CRANES_IN_GENERAL_Q_C1": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_IN_GENERAL_Q_C1,
    "LOADS_FROM_CRANES_GROUP_8K_RIGID_Q_C1": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_RIGID_Q_C1,
    "LOADS_FROM_CRANES_GROUP_8K_ELASTIC_Q_C2": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_8K_ELASTIC_Q_C2,
    "LOADS_FROM_CRANES_GROUP_7K_Q_C3": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_7K_Q_C3,
    "LOADS_FROM_CRANES_GROUP_6K_Q_C4": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_GROUP_6K_Q_C4,
    "LOADS_FROM_CRANES_OTHER_GROUPS_Q_C5": load_cases.ACTION_CATEGORY_LOADS_FROM_CRANES_OTHER_GROUPS_Q_C5,
    "SNOW_LOADINGS_Q_S": load_cases.ACTION_CATEGORY_SNOW_LOADINGS_Q_S,
    "WIND_LOADINGS_Q_W": load_cases.ACTION_CATEGORY_WIND_LOADINGS_Q_W,
    "ICE_LOADINGS_Q_I": load_cases.ACTION_CATEGORY_ICE_LOADINGS_Q_I,
    "TEMPERATURE_CLIMATIC_INFLUENCES_Q_T": load_cases.ACTION_CATEGORY_TEMPERATURE_CLIMATIC_INFLUENCES_Q_T,
    "NONE_NONE": load_cases.ACTION_CATEGORY_NONE_NONE,
    "UNIT_LOADS_QU": load_cases.ACTION_CATEGORY_UNIT_LOADS_QU,
    "PLACEMENT_LOADS_QP": load_cases.ACTION_CATEGORY_PLACEMENT_LOADS_QP,
    "OTHER_LIVE_LOADS_QO": load_cases.ACTION_CATEGORY_OTHER_LIVE_LOADS_QO,
    "HORIZONTAL_EARTHQUAKE_ACTION_EH": load_cases.ACTION_CATEGORY_HORIZONTAL_EARTHQUAKE_ACTION_EH,
    "VERTICAL_EARTHQUAKE_ACTION_EV": load_cases.ACTION_CATEGORY_VERTICAL_EARTHQUAKE_ACTION_EV,
    "EFFECTS_OF_HORIZONTAL_EARTHQUAKE_FORCES_QE": load_cases.ACTION_CATEGORY_EFFECTS_OF_HORIZONTAL_EARTHQUAKE_FORCES_QE,
    "PERMANENT_SOIL_GS":load_cases.ACTION_CATEGORY_PERMANENT_SOIL_GS,
    "DEAD_LOAD_SOIL_DS": load_cases.ACTION_CATEGORY_DEAD_LOAD_SOIL_DS,
    "DEAD_LOAD_SOIL_DLS": load_cases.ACTION_CATEGORY_DEAD_LOAD_SOIL_DLS,
    "DEAD_LOAD_SOIL_GKS": load_cases.ACTION_CATEGORY_DEAD_LOAD_SOIL_GKS,
    "IMPOSED_ACTION_Q": load_cases.ACTION_CATEGORY_IMPOSED_ACTION_Q,
    "ULTIMATE_WIND_ACTION_WU": load_cases.ACTION_CATEGORY_ULTIMATE_WIND_ACTION_WU,
    "SERVICEABILITY_WIND_ACTION_WS": load_cases.ACTION_CATEGORY_SERVICEABILITY_WIND_ACTION_WS,
    "SNOW_ACTION_FSN": load_cases.ACTION_CATEGORY_SNOW_ACTION_FSN,
    "ICE_ACTION_FICE": load_cases.ACTION_CATEGORY_ICE_ACTION_FICE,
    "ULTIMATE_EARTHQUAKE_ACTION_EU": load_cases.ACTION_CATEGORY_ULTIMATE_EARTHQUAKE_ACTION_EU,
    "SERVICEABILITY_EARTHQUAKE_ACTION_ES": load_cases.ACTION_CATEGORY_SERVICEABILITY_EARTHQUAKE_ACTION_ES,
    "LIQUID_PRESSURE_FLP": load_cases.ACTION_CATEGORY_LIQUID_PRESSURE_FLP,
    "GROUND_WATER_FGW": load_cases.ACTION_CATEGORY_GROUND_WATER_FGW,
    "RAINWATER_PONDING_FPND": load_cases.ACTION_CATEGORY_RAINWATER_PONDING_FPND,
    "EARTH_PRESSURE_FE": load_cases.ACTION_CATEGORY_EARTH_PRESSURE_FE,
    "ACTIONS_ARISING_FROM_THE_FIRE_T": load_cases.ACTION_CATEGORY_THERMAL_ACTIONS_ARISING_FROM_THE_FIRE_T,
    "SPECIAL_LOADINGS_PS": load_cases.ACTION_CATEGORY_SPECIAL_LOADINGS_PS,
    "LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_OR_PRESSURE_OF_BULK_MATERIALS_HEB": load_cases.ACTION_CATEGORY_LOAD_DUE_TO_LATERAL_EARTH_PRESSURE_OR_PRESSURE_OF_BULK_MATERIALS_HEB,
    "LOAD_DUE_TO_GROUND_WATER_PRESSURE_HW": load_cases.ACTION_CATEGORY_LOAD_DUE_TO_GROUND_WATER_PRESSURE_HW,
    "TORNADO_LOAD_WT": load_cases.ACTION_CATEGORY_TORNADO_LOAD_WT,
    "ACCIDENTAL_ACTION_A": load_cases.ACTION_CATEGORY_ACCIDENTAL_ACTION_A,
    "LIVE_LOAD_Q": load_cases.ACTION_CATEGORY_LIVE_LOAD_Q,
    "ROOF_LIVE_LOAD_QR": load_cases.ACTION_CATEGORY_ROOF_LIVE_LOAD_QR,
    "SELF_STRAINING_FORCE_PERMANENT_TP": load_cases.ACTION_CATEGORY_SELF_STRAINING_FORCE_PERMANENT_TP
	};

	if (action_category !== undefined) {
	  var category = action_categories_dict[action_category];
	  if (category === undefined) {
		  console.log("Wrong action category type. Value was: " + action_category);
		  console.log("Correct values are: ( " + Object.keys(action_categories_dict) + ")");
		  category = load_cases.ACTION_CATEGORY_PERMANENT_G;
	  }
	  return category;
	}
	else {
	  return load_cases.ACTION_CATEGORY_PERMANENT_G;
	}
}

function SetPeriodicCombinationRule(rule) {

  const CombinationRule_dict = {
    "SRSS": spectral_analysis_settings.SRSS,
    "CQC": spectral_analysis_settings.CQC,
    "ABSOLUTE_SUM": spectral_analysis_settings.ABSOLUTE_SUM,
  };
  if (rule != undefined) {
    var CombinationRule = CombinationRule_dict[rule];
    if (CombinationRule === undefined) {
      CombinationRule = spectral_analysis_settings.SRSS;
      console.log("Wrong periodic combination rule method input. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    }
    return CombinationRule;
  }
  else {
    return spectral_analysis_settings.SRSS;
  }
}

function SetDirectionalCombinationRule(rule) {

  const CombinationRule_dict = {
    "SRSS": spectral_analysis_settings.SRSS,
    "SCALED_SUM": spectral_analysis_settings.SCALED_SUM,
    "ABSOLUTE_SUM": spectral_analysis_settings.ABSOLUTE_SUM,
  };
  if (rule != undefined) {
    var CombinationRule = CombinationRule_dict[rule];
    if (CombinationRule === undefined) {
      CombinationRule = spectral_analysis_settings.SRSS;
      console.log("Wrong direction combination rule method input. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    }
    return CombinationRule;
  }
  else {
    return spectral_analysis_settings.SRSS;
  }
}

function SetRuleForMissingMasses(rule) {

  const CombinationRule_dict = {
    "SRSS": spectral_analysis_settings.SRSS,
    "ABSOLUTE_SUM": spectral_analysis_settings.ABSOLUTE_SUM,
  };
  if (rule != undefined) {
    var CombinationRule = CombinationRule_dict[rule];
    if (CombinationRule === undefined) {
      CombinationRule = spectral_analysis_settings.SRSS;
      console.log("Wrong rule for missing masses. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    }
    return CombinationRule;
  }
  else {
    return spectral_analysis_settings.SRSS;
  }
}

function DampingRuleForCQCType(rule) {

  const CombinationRule_dict = {
    "CONSTANT_FOR_EACH_MODE": spectral_analysis_settings.CONSTANT_FOR_EACH_MODE,
    "DIFFERENT_FOR_EACH_MODE": spectral_analysis_settings.DIFFERENT_FOR_EACH_MODE,
  };
  if (rule != undefined) {
    var CombinationRule = CombinationRule_dict[rule];
    if (CombinationRule === undefined) {
      CombinationRule = spectral_analysis_settings.CONSTANT_FOR_EACH_MODE;
      console.log("Wrong damping rule for CQCS. Value was: " + rule);
      console.log("Correct values are: ( " + Object.keys(CombinationRule_dict) + ")");
    }
    return CombinationRule;
  }
  else {
    return spectral_analysis_settings.CONSTANT_FOR_EACH_MODE;
  }
}

function SetZeroPeriodAccelerationType(type) {

  const PeriodTypes_dict = {
    "ACCORDING_TO_RESPONSE_SPECTRUM": spectral_analysis_settings.ACCORDING_TO_RESPONSE_SPECTRUM,
    "SPECTRAL_ACCELERATION_OF_LAST_CALCULATED_FREQUENCY": spectral_analysis_settings.SPECTRAL_ACCELERATION_OF_LAST_CALCULATED_FREQUENCY,
    "USER_DEFINED": spectral_analysis_settings.USER_DEFINED
  };
  if (type !== undefined) {
    var periodType = PeriodTypes_dict[type];
    if (periodType === undefined) {
      periodType = spectral_analysis_settings.ACCORDING_TO_RESPONSE_SPECTRUM;
      console.log("Wrong direction combination rule method input. Value was: " + type);
      console.log("Correct values are: ( " + Object.keys(PeriodTypes_dict) + ")");
    }
    return periodType;
  }
  else {
    return spectral_analysis_settings.ACCORDING_TO_RESPONSE_SPECTRUM;
  }
}

/**
 *
 * @param {*} dampingRule
 * @param {*} dampingConstantForEachMode
 */
SpectralAnalysisSettings.prototype.SetDampingRuleForCQC = function (dampingRule, dampingConstantForEachMode) {
  if (this.Settings !== undefined) {
    this.Settings.damping_for_cqc_rule = DampingRuleForCQCType(dampingRule);
    if (this.Settings.damping_for_cqc_rule === spectral_analysis_settings.CONSTANT_FOR_EACH_MODE) {
      if (dampingConstantForEachMode !== undefined) {
        this.Settings.constant_d_for_each_mode = dampingConstantForEachMode;
      }
      else {
        this.Settings.constant_d_for_each_mode = 0.03;
      }
    }
  }
};

/**
 *
 * @param {*} ruleForMasses
 * @param {*} zeroPeriodicAccelerationType
 * @param {*} userDefinedValue
 */
SpectralAnalysisSettings.prototype.IncludeMissingMasses = function (ruleForMasses, zeroPeriodicAccelerationType, userDefinedValue) {

  if (this.Settings !== undefined) {
    this.Settings.include_missing_masses = true;
    this.Settings.combination_rule_for_missing_masses = SetRuleForMissingMasses(ruleForMasses);
    this.Settings.zero_periodic_acceleration_type = SetZeroPeriodAccelerationType(zeroPeriodicAccelerationType);
    if (this.Settings.zero_periodic_acceleration_type === spectral_analysis_settings.USER_DEFINED) {
      if (userDefinedValue !== undefined) {
        this.Settings.user_defined_zpa = userDefinedValue;
      }
      else {
        this.Settings.user_defined_zpa = 0.05;
      }
    }
  }
};

/**
 * Constructor creates basic spectral analysis settings
 * @class
 * @classdesc Class for setting up the spectral analysis settings.
 * @constructor
 * @param {*} no
 * @param {*} name
 * @param {*} combinationRulePeriodic
 * @param {*} combinationRuleDirectional
 * @param {*} scaledSumDirectionalComponentValue
 * @param {*} useEquivalentLinearCombination
 * @param {*} signedResultsUsingDominantMode
 * @param {*} saveResultsOfAllSelectedModes
 * @param {*} comment
 * @param {*} params
 * @@returns Object SpectralAnalysisSettings
 */
function SpectralAnalysisSettings(no,
  name,
  combinationRulePeriodic,
  combinationRuleDirectional,
  scaledSumDirectionalComponentValue,
  useEquivalentLinearCombination,
  signedResultsUsingDominantMode,
  saveResultsOfAllSelectedModes,
  comment,
  params) {
  if (arguments.length !== 0) {
    ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
    ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

    if (no === undefined) {
     this.Settings = spectral_analysis_settings.create();
    }
    else {
      this.Settings = spectral_analysis_settings.create(no);
    }

    if (name !== undefined) {
     this.Settings.user_defined_name_enabled = true;
     this.Settings.name = name;
    }

    // console.log("New spectral analysis settings no. " +this.Settings.no + " was created");

    // Spectral anlysis settings : combination rules
   this.Settings.combination_rule_for_periodic_responses = SetPeriodicCombinationRule(combinationRulePeriodic);

   this.Settings.combination_rule_for_directional_components = SetDirectionalCombinationRule(combinationRuleDirectional);
    if (this.Settings.combination_rule_for_directional_components === spectral_analysis_settings.SCALED_SUM) {
      if (scaledSumDirectionalComponentValue !== undefined) {
       this.Settings.combination_rule_for_directional_components_value = scaledSumDirectionalComponentValue;
      }
      else {
       this.Settings.combination_rule_for_directional_components_value = 0.3;
      }
    }
    if (useEquivalentLinearCombination === true) {
     this.Settings.use_equivalent_linear_combination = true;
    }

    if (signedResultsUsingDominantMode === true) {
    //  this.Settings.signed_results_using_dominant_mode = true; //not allowed
    }

    if (saveResultsOfAllSelectedModes === true) {
     this.Settings.save_results_of_all_selected_modes = true;
    }

    // Spectral analysis settings
    set_comment_and_parameters(this.Settings, comment, params);
    // console.log("-- Done. spectral analysis settings no. " +this.Settings.no + " all initial params set.");

    var self = this;
    return self;
  }
}

/**
 *
 * @returns No
 */
SpectralAnalysisSettings.prototype.GetNo = function () {

  return this.Settings.no;
};


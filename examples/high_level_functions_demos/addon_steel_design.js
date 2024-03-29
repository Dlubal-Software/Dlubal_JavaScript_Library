/*
Effective length	Boundary condition	Local section red.	Ultimate conf.	Serviceability conf.	Fire resistance conf.	Strength conf.	Seismic configuration
EN	                EN	                EN	                EN	            EN	                    EN		
AISC		                            AISC		                        AISC		                                    AISC	        AISC
IS		                                IS	                IS	            IS			
BS		                                BS	                BS	            BS			
GB		                                GB	                GB	            GB			
CSA		                                CSA	                CSA	            CSA			                                                    CSA
AS		                                AS	                AS	            AS			
SP		                                SP	                SP	            SP			
NTC                 NTC	                NTC	                NTC	            NTC	                    NTC		
NBR		                                NBR	                NBR	            NBR			
SIA		                                SIA	                SIA	            SIA
*/

include("../../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
run("../includes/Tools/clearAll.js");

function currentStandard () {
    return general.current_standard_for_steel_design.match(/\w+/);
}

function IsCurrent (current_standard) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design add-on must be active");
	var current = general.current_standard_for_steel_design.match(/\w+/);
    return current == current_standard;  // Don't use "===" (we don't want compare types of strings, only its string's values)
}

var t1 = new Date().getTime();

if (standard_index === undefined) {
    standard_index = 1;
}

var steel_design_standards = {
    0: "EN 1993 | CEN | 2015-06",
    1: "AISC 360 | 2016",
    2: "IS 800 | 2007-12",
    3: "BS 5950 | 2001-05",
    4: "GB 50017 | 2017-12",
    5: "CSA S16 | 2019",
    6: "AS 4100 | 2016-06",
    7: "SP 16.13330 | 2017-02",
    10: "SIA 263 | 2013-01"
}

if (PRERELEASE_MODE) {
    steel_design_standards[8] = "NTC | 2018-01";
    steel_design_standards[9] = "NBR 8800 | 2008-08";
}

ASSERT(standard_index in steel_design_standards, "Standard index " + standard_index + " is not supported");

var material = new Material(undefined, "S235");
var section = new Section(undefined, "IPE 80", material.GetNo());
var memberList = [];

var nodeForMembers = createNodesGrid(-28, -28, [12, 3], [3, 2]);
for (var i = 0; i < nodeForMembers.length; i+=2) {
    var member = new Member();
    memberList.push(member);
    member.Beam(undefined, [i + 1, i + 2], section.GetNo());
}

STEEL_DESIGN.setActive(true);
general.current_standard_for_steel_design = steel_design_standards[standard_index];

/********************************************** Ultimate, Serviceability, Fire resistance configurations *****************************************************************/
//if (RFEM) 
{
    var steelDesignServiceabilityConfiguration = new SteelDesignServiceabilityConfiguration(undefined, [2]);
    steelDesignServiceabilityConfiguration.SetName(currentStandard() + " Serviceability configuration for testing");

    switch (general.current_standard_for_steel_design)
    {
        case "EN 1993 | CEN | 2015-06": // 0
            var steelDesignUltimateConfigurationEC3 = new SteelDesignUltimateConfigurationEC3(undefined, [1]);
            steelDesignUltimateConfigurationEC3.SetName("EC3 Ultimate configuration for testing");
            steelDesignUltimateConfigurationEC3.SetGeneral(true);
            steelDesignUltimateConfigurationEC3.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationEC3.SetThinWalledAnalysis(5, 0.015, true, true);
            steelDesignUltimateConfigurationEC3.SetOptions(true, true, true);
            steelDesignUltimateConfigurationEC3.SetDesignOfColdFormedSection(true, "OTHER_METHODS_OF_FORMING");
            steelDesignUltimateConfigurationEC3.SetDesignOfShearBuckling(true);
            steelDesignUltimateConfigurationEC3.SetStabilityAnalyses(true);
            steelDesignUltimateConfigurationEC3.SetCalculationMethod(true, true, false, true, undefined, true, false);
            steelDesignUltimateConfigurationEC3.SetSecondOrderEffects(true, 1.250, true, 1.350);
            steelDesignUltimateConfigurationEC3.SetPositionOfPositiveTransverse(undefined, undefined, undefined, true);
            steelDesignUltimateConfigurationEC3.SetLateralTorsionalBuckling(true, undefined, false, false);
            steelDesignUltimateConfigurationEC3.SetParameters(true);
            steelDesignServiceabilityConfiguration.SetDesignParametersEC3(400, 500, 600, 450, 550, 650, 0.006, true, undefined, true);
            var steelDesignFireResistanceConfigurationEC3 = new SteelDesignFireResistanceConfiguration(undefined, [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationEC3.SetName("Fire resistance configuration EC3");
            steelDesignFireResistanceConfigurationEC3.SetFinalTemperature("ANALYTICALLY");
            steelDesignFireResistanceConfigurationEC3.SetAnalyticallyDesignSettings(1200, 6.5, "3_SIDES", undefined, true, 1.5);
            steelDesignFireResistanceConfigurationEC3.SetAnalyticallyFireProtection("HOLLOW", 333, 0.111, 1222, 0.011);
            steelDesignFireResistanceConfigurationEC3.SetAnalyticallyTemperatureCurve(undefined, true, undefined, 30);
            steelDesignFireResistanceConfigurationEC3.SetAnalyticallyThermalActions(0.999, 0.8, 0.5, 0.777, undefined, 0.888);
            var steelDesignFireResistanceConfigurationEC3_2 = new SteelDesignFireResistanceConfiguration(undefined, [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationEC3.SetName("Fire resistance configuration EC3");
            steelDesignFireResistanceConfigurationEC3_2.SetFinalTemperature("MANUALLY");
            steelDesignFireResistanceConfigurationEC3_2.SetManuallyFinalTemperature(undefined, "3_SIDES", true);
            break;
        case "AISC 360 | 2016": // 1
            var steelDesignStrengthConfigurationAISC = new SteelDesignStrengthConfigurationAISC(undefined, [1]);
            steelDesignStrengthConfigurationAISC.SetName("AICS Strength configuration for testing");
            steelDesignStrengthConfigurationAISC.SetGeneral(true);
            steelDesignStrengthConfigurationAISC.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignStrengthConfigurationAISC.SetLocalBuckling(true);
            steelDesignStrengthConfigurationAISC.SetLocalBuckling(true, 13.5, 42.5);
            steelDesignStrengthConfigurationAISC.SetPositionOfPositiveTransverse(undefined, undefined, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersAISC(200, 300);
            break;
        case "IS 800 | 2007-12":    // 2
            var steelDesignUltimateConfigurationIS = new SteelDesignUltimateConfigurationIS(undefined, [1]);
            steelDesignUltimateConfigurationIS.SetName("IS Ultimate configuration for testing");
            steelDesignUltimateConfigurationIS.SetGeneral(true);
            steelDesignUltimateConfigurationIS.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationIS.SetElasticDesign(true);
            steelDesignUltimateConfigurationIS.SetDesignOfShearBuckling(true, undefined, true);
            steelDesignUltimateConfigurationIS.SetCombined(true);
            steelDesignUltimateConfigurationIS.SetCalculationMethod(true, true);
            steelDesignUltimateConfigurationIS.SetPositionOfPositiveTransverse(undefined, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersIS(200, 300);
            break;
        case "BS 5950 | 2001-05":   // 3
            var steelDesignUltimateConfigurationBS = new SteelDesignUltimateConfigurationBS(undefined, [1]);
            steelDesignUltimateConfigurationBS.SetName("BS Ultimate configuration for testing");
            steelDesignUltimateConfigurationBS.SetGeneral(true);
            steelDesignUltimateConfigurationBS.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationBS.SetOptions(true,true);
            steelDesignUltimateConfigurationBS.SetPositionOfPositiveTransverse(undefined, undefined, true);
            steelDesignUltimateConfigurationBS.SetEquivalentUniformMomentFactors(undefined, true, 0.500, undefined, true, 0.600, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersBS(300, 400, 0.01);
            break;
        case "GB 50017 | 2017-12":  // 4
            var steelDesignUltimateConfigurationGB = new SteelDesignUltimateConfigurationGB(undefined, [1]);
            steelDesignUltimateConfigurationGB.SetName("GB Ultimate configuration for testing");
            steelDesignUltimateConfigurationGB.SetGeneral(true);
            steelDesignUltimateConfigurationGB.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationGB.SetOptions(true, false, true);
            steelDesignUltimateConfigurationGB.SetImportanceFactorOfStructure(true, 1.5);
            steelDesignUltimateConfigurationGB.SetAnotherStandard(true, 1.1);
            steelDesignUltimateConfigurationGB.SetStabilityAnalysis(undefined, undefined, true);
            steelDesignUltimateConfigurationGB.SetOverallStabilityFactor(true, 0.1);
            steelDesignUltimateConfigurationGB.SetPositionOfPositiveTransverse(undefined, undefined, undefined, true);
            steelDesignUltimateConfigurationGB.SetLocalStability(true);
            steelDesignUltimateConfigurationGB.SetWeldedSection(undefined, undefined, true);
            steelDesignUltimateConfigurationGB.SetGeneralSections("A", "B");
            steelDesignUltimateConfigurationGB.SetImaginaryAxis(0.3);
            steelDesignUltimateConfigurationGB.SetEquivalentMomentFactors(true, true, 0.5, undefined, true, true, 0.4, undefined, 0.1, 0.2);
            steelDesignServiceabilityConfiguration.SetDesignParametersGB(1100, 1200, 501, 502);
            break;
        case "CSA S16 | 2019":  // 5
            var steelDesignUltimateConfigurationCSA = new SteelDesignUltimateConfigurationCSA(undefined, [1])
            steelDesignUltimateConfigurationCSA.SetName("CSA Ultimate configuration for testing");
            steelDesignUltimateConfigurationCSA.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationCSA.SetOptions(true, undefined, true, undefined, true, 0.9, 0.95);
            steelDesignUltimateConfigurationCSA.SetStructureType(true, true);
            steelDesignUltimateConfigurationCSA.SetPositionOfPositiveTransverse(undefined, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersCSA(300, 400);
            break;
        case "AS 4100 | 2016-06":   // 6
            var steelDesignUltimateConfigurationAS = new SteelDesignUltimateConfigurationAS(undefined, [1]);
            steelDesignUltimateConfigurationAS.SetName("AS Ultimate configuration for testing");
            steelDesignUltimateConfigurationAS.SetGeneral(true);
            steelDesignUltimateConfigurationAS.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationAS.SetOptions(true, true, true);
            steelDesignUltimateConfigurationAS.SetSectionManufacture(true, "CF");
            steelDesignUltimateConfigurationAS.SetPositionOfPositiveTransverse(undefined, undefined, true);
            steelDesignUltimateConfigurationAS.SetFabricationOfWeldedSections(undefined, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersAS(101, 102, 103, 104);
            break;
        case "SP 16.13330 | 2017-02":   // 7
            var steelDesignUltimateConfigurationSP = new SteelDesignUltimateConfigurationSP(undefined, [1]);
            steelDesignUltimateConfigurationSP.SetName("SP Ultimate configuration for testing");
            steelDesignUltimateConfigurationSP.SetGeneral(true);
            steelDesignUltimateConfigurationSP.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07);
            steelDesignUltimateConfigurationSP.SetServiceFactor(0.95);
            steelDesignUltimateConfigurationSP.SetPartialSafetyFactor(1.12);
            steelDesignUltimateConfigurationSP.SetOptions(true);
            steelDesignUltimateConfigurationSP.SetLoadSafetyCoefficient(true, 1.1);
            steelDesignUltimateConfigurationSP.SetDesignParameters(0.06, 0.07, undefined, true);
            steelDesignServiceabilityConfiguration.SetDesignParametersSP(101, 102);
            break;
        case "NTC | 2018-01":   // 8 (API support is missing)
            var steelDesignUltimateConfigurationNTC = new SteelDesignUltimateConfigurationNTC(undefined, [1]);
            var steelDesignFireResistanceConfigurationNTC = new SteelDesignFireResistanceConfiguration(undefined, [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationNTC.SetName("NTC Fire resistance configuration for testing");
            steelDesignFireResistanceConfigurationNTC.SetFinalTemperature("ANALYTICALLY");
            steelDesignFireResistanceConfigurationNTC.SetAnalyticallyDesignSettings(1200, 6.5, "3_SIDES", undefined, true, 1.5);
            steelDesignFireResistanceConfigurationNTC.SetAnalyticallyFireProtection("HOLLOW", 333, 0.111, 1222, 0.011);
            steelDesignFireResistanceConfigurationNTC.SetAnalyticallyTemperatureCurve(undefined, true, undefined, 30);
            steelDesignFireResistanceConfigurationNTC.SetAnalyticallyThermalActions(0.999, 0.8, 0.5, 0.777, undefined, 0.888);
            var steelDesignFireResistanceConfigurationNTC_2 = new SteelDesignFireResistanceConfiguration(undefined, [1], undefined, "Fire resistance configuration can be set now only for EC3 or NTC standard");
            steelDesignFireResistanceConfigurationNTC_2.SetFinalTemperature("MANUALLY");
            steelDesignFireResistanceConfigurationNTC_2.SetManuallyFinalTemperature(undefined, "3_SIDES", true);
            break;
        case "NBR 8800 | 2008-08":  // 9
            var steelDesignUltimateConfigurationNBR = new SteelDesignUltimateConfigurationNBR(undefined, [1]);
            steelDesignUltimateConfigurationNBR.SetName("NBR Ultimate configuration for testing");
            steelDesignUltimateConfigurationNBR.SetLimitValues(0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08);
            steelDesignUltimateConfigurationNBR.SetOptions(0.9, false);
            steelDesignUltimateConfigurationNBR.SetPositionOfPositiveTransverse(undefined, true);
            break;
        case "SIA 263 | 2013-01":   // 10
            var steelDesignUltimateConfigurationSIA = new SteelDesignUltimateConfigurationSIA(undefined, [1]);
            steelDesignUltimateConfigurationSIA.SetName("SIA Ultimate configuration for testing");
            steelDesignUltimateConfigurationSIA.SetLimitValues(0.002, 0.003, 0.004, 0.05, 0.006, 0.007);
            steelDesignUltimateConfigurationSIA.SetPositionOfPositiveTransverse(undefined, undefined, true);
            break;
        default:
            ASSERT(false);
    }
}

if (IsCurrentCodeOfStandard("EN") || IsCurrentCodeOfStandard("NTC")) {
    /******************************************************* Types for Steel designs - Boundary conditions ********************************************************/
    var boundaryCondition = new SteelDesignBoundaryCondition(undefined, [3], undefined, "Steel design boundary condition");
    boundaryCondition.SetDifferentPropertiesForNodalSupports();
    boundaryCondition.SetNodalSupportsStartWithSupportType("FIXED_IN_Y");                          // Node sequence Start
    boundaryCondition.SetAdditionalParametersForStart(0.1, "AT_UPPER_FLANGE", 0.05);
    boundaryCondition.SetNodalSupportsEndWithIndividuallySupportType(true, true, true, false);     // Node sequence End
    boundaryCondition.SetAdditionalParametersForEnd(0.2, "USER_VALUE", 0.1, 0.05);
    boundaryCondition.IsNodalSupportsEndEdit();
    boundaryCondition.SetMemberHingesForStart(true, true, true, true);
    boundaryCondition.SetMemberHingesForEnd(false, true, false, true);
    boundaryCondition.SetDifferentPropertiesForMemberHinges(false);

    var boundaryCondition2 = new SteelDesignBoundaryCondition(undefined, [4], undefined, "Steel design boundary condition with intermediate nodes");
    boundaryCondition2.SetName("User defined name");
    boundaryCondition2.SetDifferentPropertiesForNodalSupports(false);
    boundaryCondition2.SetNodalSupportsStartWithSupportType("FIXED_IN_Y");                              // Node sequence Start
    boundaryCondition2.SetAdditionalParametersForStart(0.1, "AT_UPPER_FLANGE", 0.05);
    boundaryCondition2.SetNodalSupportsEndWithIndividuallySupportType(true, true, true, true);     // Node sequence End
    boundaryCondition2.SetAdditionalParametersForEnd(0.2, "USER_VALUE", 0.1, 0.05);
    boundaryCondition2.SetIntermediateNodes();
    boundaryCondition2.InsertNodalSupportIntermediateNode(true, true, true, true);
    boundaryCondition2.InsertNodalSupportIntermediateNode(true, true, true, true);
    boundaryCondition2.SetAdditionalParametersForIntermediateRow(3, 0.1, "USER_VALUE", 0.2, 0.07);  // second intermediate node
    boundaryCondition2.IsNodalSupportsEndEdit();
    boundaryCondition2.SetDifferentPropertiesForMemberHinges();
    boundaryCondition2.SetMemberHingesForStart(true, true, true, true);
    boundaryCondition2.SetMemberHingesForEnd(false, true, false, true);
    boundaryCondition2.SetMemberHingeIntermediateNode(5, true, false, true, false);
}

/******************************************************* Types for Steel designs - Effective lengths ********************************************************/
switch (general.current_standard_for_steel_design)
{
    case "EN 1993 | CEN | 2015-06": // 0
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (EN)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(false, false, true, true, "EUROPE_USER_DEFINED");
        effectiveLength.SetBucklingAxes(false, true);
        effectiveLength.SetDifferentPropertiesForNodalSupports(false);
        effectiveLength.SetNodalSupportsStartWithSupportType("FIXED_IN_Y");
        effectiveLength.SetNodalSupportsEndWithSupportType("FIXED_ALL");
        break;
    case "AISC 360 | 2016": // 1
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (AISC)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetBucklingFactorType("RECOMMENDED");
        effectiveLength.SetEffectiveLengthsAccToStandard("AISI_S100");
        effectiveLength.SetDeterminationType(true, false, false, true, "ACC_TO_CHAPTERS_E2_F21");
        effectiveLength.SetModificationFactor("CB_USER_DEFINED", 1.5);
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Z_AND_TORSION");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Z");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Y");
        effectiveLength.SetEccentricity(4, "USER_VALUE", 0.055);
        break;
    case "IS 800 | 2007-12":    // 2
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (IS)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(true, false, undefined, false);
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("NONE");
        break;
    case "BS 5950 | 2001-05":   // 3
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (BS)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(true, true, undefined, true, "BS5_ACC_TO_ANNEX_B");
        effectiveLength.SetBucklingAxes(undefined, true);
        effectiveLength.SetNodalSupportsStartWithSupportType("FIXED_IN_Y");
        effectiveLength.SetNodalSupportsEndWithSupportType("FIXED_IN_Z");
        const support_types = ["FIXED_IN_Z", "FIXED_IN_Y", "RESTRAINT_ABOUT_X", "FIXED_IN_Z_AND_TORSION",
            "FIXED_IN_Z_Y_AND_TORSION", "FIXED_IN_Z_AND_TORSION_AND_WARPING", "FIXED_IN_Z_Y_AND_TORSION_AND_WARPING",
            "FIXED_ALL"];
        for (var i = 0; i < support_types.length; ++i) {
            effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType(support_types[i]);
        }
        // Start node sequence
        effectiveLength.SetOverwriteEffectiveLengths(1, 1.001, 1.002, 1.003, 1.004, undefined, 1.005);
        // Node seq. .1
        effectiveLength.SetOverwriteEffectiveLengths(2, 1.006, undefined, 1.007, undefined, undefined);
        break;
    case "GB 50017 | 2017-12":  // 4
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (GB)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(false, false, false, true, "GB50_NOT_USED");
        effectiveLength.SetMemberType(undefined, "CANTILEVER", "CANTILEVER");
        effectiveLength.InsertNodalSupportIntermediateNodeWithSupportType("FIXED_IN_Y");
        effectiveLength.SetEccentricity(2, "AT_UPPER_FLANGE");
        // Start node sequence
        effectiveLength.SetEffectiveLengthFactors(1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1.01, 1.02);
        // Node seq. .1
        // Bug 78360
        //effectiveLength.EffectiveLengthFactors(2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1.5);
        break;
    case "CSA S16 | 2019":  // 5
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (CSA)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(undefined, undefined, undefined, undefined, "CSA_ACC_TO_CHAPTER_13_6");
        effectiveLength.SetMemberType("CANTILEVER");
        effectiveLength.SetBucklingFactorType("RECOMMENDED");
        //effectiveLength.ModificationFactor("CB_USER_DEFINED", 2.5); There is no support for Modification factor for CSA and NBR standards? Only for AISC?
        break;
    case "AS 4100 | 2016-06":   // 6
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (AS)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetBucklingFactorType("RECOMMENDED");
        effectiveLength.SetBucklingAxes(false, true);
        effectiveLength.SetSegmentsRestrainedBothEnds("USER_DEFINED", 2.0/*, "EIGENVALUE_METHOD"*/);   // Bug 97157
        effectiveLength.SetSegmentsUnrestrainedOneEnd("USER_DEFINED", 2.5);
        break;
    case "SP 16.13330 | 2017-02":   // 7
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (SP)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(false, false, undefined, true);
        effectiveLength.SetMemberType("CANTILEVER");
        break;
    case "NTC | 2018-01":   // 8
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (NTC)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(undefined, undefined, undefined, undefined);  // No API enum for Determination of Mcr (NTC standard)
        break;
    case "NBR 8800 | 2008-08":  // 9
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (NBR)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDeterminationType(false, false, false);
        //effectiveLength.ModificationFactor("CB_USER_DEFINED", 1.8); There is no support for Modification factor for CSA and NBR standards? Only for AISC?
        break;
    case "SIA 263 | 2013-01":   // 10
        var effectiveLength = new SteelDesignEffectiveLength(undefined, [5], undefined, "Steel design effective length (SIA)");
        effectiveLength.SetName("User defined name for effective length");
        effectiveLength.SetDifferentPropertiesForNodalSupports();
        effectiveLength.SetNodalSupportsStartWithSupportType("FIXED_IN_Z_Y_AND_TORSION");
        effectiveLength.SetNodalSupportsEndWithSupportType("RESTRAINT_ABOUT_X");
        break;
    default:
        ASSERT(false, "Unknown general.current_standard_for_steel_design");
}

/******************************************************* Types for Steel designs - Member local section reduction ********************************************************/
var memberLocalSectionReduction = new SteelDesignMemberLocalSectionReduction(undefined, [6], undefined, "Member local section reduction");
memberLocalSectionReduction.SetName("User defined name for member local section reduction");
memberLocalSectionReduction.AddReductionType("DESIGN_PARAMETERS", 1.5);
memberLocalSectionReduction.AddReductionType("DESIGN_PARAMETERS", 1.6, true);
memberLocalSectionReduction.AddReductionType("SECTION_VALUES", 2.5);
memberLocalSectionReduction.AddReductionType("SECTION_VALUES", 2.6, true);
memberLocalSectionReduction.SetDesignParameters(1, undefined, 0.00075);
memberLocalSectionReduction.SetDesignParameters(2, "RELATIVE", 0.025);
if (PRERELEASE_MODE) {
    memberLocalSectionReduction.SetSectionValues(3, "RELATIVE", 0.019, 0.02, 0.021, 0.022, 0.023, 0.024, 0.025);
    memberLocalSectionReduction.SetSectionValues(4, "ABSOLUTE", 1.1, 1.2, 1.3, 0.0001, 0.0002, 0.0003);
}
memberLocalSectionReduction.SetMultipleDefinition(2, 3, "ABSOLUTE", 0.1);
memberLocalSectionReduction.SetMultipleDefinition(4, undefined, "RELATIVE", 0.02);

/******************************************************************** Steel design add-on **************************************************************************************/
var member = new Member();
member.Beam(undefined, [16, 17], section.GetNo());
var memberSet = new MemberSet();
memberSet.ContinuousMembers(undefined, [memberList[7].GetNo(), member.GetNo(), memberList[8].GetNo()]);
memberSet.SetSteelDesignProperties();

/********************************************************* Member, Member set - Design types (Steel design add-on) ********************************************************/
var effectiveLengthNo = 1;
var boundaryConditionNo = (IsCurrent("EN") || IsCurrent("NTC")) ? 2 : undefined;
var localSectionReductionNo = 1;

memberList[6].SetSteelDesignProperties();
memberList[6].SetSteelDesignTypes(effectiveLengthNo, boundaryConditionNo, localSectionReductionNo);
memberSet.SetSteelDesignTypes(effectiveLengthNo, boundaryConditionNo, localSectionReductionNo);

/********************************************************* Member, Member set - Design configurations (Steel design add-on) ********************************************************/
var ultimateConfigurationNo = !IsCurrent("AISC") ? 2 : undefined;
var serviceabilityConfigurationNo = 2;
var fireResistanceConfigurationNo = (IsCurrent("EN") || IsCurrent("NTC")) ? 2 : undefined;
//var strengthConfiguration = IsCurrent("AISC") ? 1 : undefined;    There is no API support for Strength configuration?
//var seismicConfigurationNo = (IsCurrent("AISC") || IsCurrent("CSA")) ? 1 : undefined; There is no API support for Seismic configuration?

memberList[6].SetSteeleDesignConfigurations(ultimateConfigurationNo, serviceabilityConfigurationNo, fireResistanceConfigurationNo);
memberSet.SetSteeleDesignConfigurations(ultimateConfigurationNo, serviceabilityConfigurationNo, fireResistanceConfigurationNo);

/**************************************************** Members - Design support & deflection (Steel design add-on) ******************************************************/
var memberDesignSupport = new MemberDesignSupport(undefined, undefined, [memberSet.GetNo()], [15, 16, 17, 18]);
memberDesignSupport.Name("Member design support");
memberDesignSupport.SetGeneralInZ(true, 0.25, false, 0.15, "ZAXIS_NEGATIVE");
memberDesignSupport.SetGeneralInY(true, undefined, undefined, undefined, "YAXIS_BOTH", false);

memberList[9].SetSteelDesignProperties();
memberList[9].SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());

memberList[11].SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());
memberList[11].SetDeflectionAnalysis("LOCAL_AXIS_Z_AND_Y", "DEFORMED_UNDEFORMED_SYSTEM", false, 1.5, 0.02, true, 2.5, 0.05);

/**************************************************** Member Sets - Design support & deflection (Steel design add-on) **************************************************/
var member = new Member();
member.Beam(undefined, [26, 27], section.GetNo());
var member2 = new Member();
member2.Beam(undefined, [28, 29], section.GetNo());
memberSet.ContinuousMembers(undefined, [memberList[12].GetNo(), member.GetNo(), memberList[13].GetNo(), member2.GetNo(), memberList[14].GetNo()]);
memberSet.SetSteelDesignProperties();
memberSet.SetDesignSupport(memberDesignSupport.GetNo(), memberDesignSupport.GetNo());
memberSet.SetDesignSupportAtInternalNodes(memberDesignSupport.GetNo(), undefined, undefined, memberDesignSupport.GetNo());
memberSet.SetDeflectionAnalysis("LOCAL_AXIS_Z_AND_Y", "DEFORMED_SEGMENT_ENDS", [undefined, [undefined, 8.0, 0.02]], false, 10, 0.05);

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");
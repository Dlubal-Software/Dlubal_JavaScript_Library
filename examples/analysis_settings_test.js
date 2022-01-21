run("/clearAll.js");

/*  #### static analysis
//function StaticAnalysisSettings(no,
                                analysisType,
                                equationSolver,
                                nonlinearMethod,
                                comment,
                                params)

Access to settings via .settings
                                 /*/

// create empty instance
var SAS = new StaticAnalysisSettings();

// set parameters via HL functions
SAS.SetMaxNumberOfItrations(600);
SAS.SetNumberOfLoadIncremets(4);

// dirrect access to  static analysis settings
SAS.settings.comment = "Access via .settings";
SAS.settings.analysis_type = static_analysis_settings.SECOND_ORDER_P_DELTA;

// create instance with parameters
var SAS0 = new StaticAnalysisSettings(undefined, "linear", "neco");
var SAS1 = new StaticAnalysisSettings(undefined,  "fde", "direct");
var SAS2 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Postcritical" );
SAS2.SetMaxNumberOfItrations(600);
SAS2.SetNumberOfLoadIncremets(4);
var SAS3 = new StaticAnalysisSettings(undefined, "large deformations", hgfgf, "Dynamic");
SAS3.SetMaxNumberOfItrations(600);
SAS3.SetNumberOfLoadIncremets(4);
var SAS4 = new StaticAnalysisSettings(undefined,2, 3, 4, 5, []);
var SAS5 = new StaticAnalysisSettings(undefined, 45, "second order", "ges");
var SAS6 = new StaticAnalysisSettings(undefined, "large deformations", "esss");

var someParams = {
	//calculation_diagrams_enabled				: true,
	//mass_conversion_enabled						: true,
	//mass_conversion_acceleration_in_direction_z	: 30,
	max_number_of_iterations					: 200,
	number_of_load_increments					: 20,
	plate_bending_theory						: static_analysis_settings.PLATE_BENDING_THEORY_KIRCHHOFF,
	//maximum_number_of_reactivations				:20
};

var SAS7 = new StaticAnalysisSettings(undefined, "second order", "iterative", "Newton", "Analysis settings with params" ,someParams);
var SAS8 = new StaticAnalysisSettings(undefined, "second order", "Picard");
var SAS9 = new StaticAnalysisSettings(undefined, "large deformations", "Combined");
var SAS10 = new StaticAnalysisSettings();
var SAS11 = new StaticAnalysisSettings(undefined, "second order", "Newton");
var SAS12 = new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Dynamic");
var SAS13 = new StaticAnalysisSettings(undefined, "large deformations", čwd, "Picard");
var SAS14 = new StaticAnalysisSettings(undefined, "second order", "direct", "Postcritical");
var SAS15 = new StaticAnalysisSettings(undefined, "second order", "Combined");
var SAS16 = new StaticAnalysisSettings(undefined, "large deformations", "iterative", "Postcritical", "Iterative Postcritical");


/*  #### modal analysis
function ModalAnalysisSettings( no,
                                numberOfModes,
                                solverMethod,
                                beyondFrequency,
                                maximalFrequency,
                                comment,
                                params)
{

Access to settings via .settings
                                 /*/

DYNAMIC_ANALYSIS.MODAL.setActive(true);
var MAS = new ModalAnalysisSettings();

// dirrect access to  static analysis settings
MAS.settings.comment = "Access via .settings";
MAS.settings.mass_conversion_type = modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS;

var MAS1 = new ModalAnalysisSettings(undefined, 6);
var MAS2 = new ModalAnalysisSettings(undefined, "auto");
var MAS3 = new ModalAnalysisSettings(undefined, x);
var MAS4 = new ModalAnalysisSettings(10, 8);
var MAS5 = new ModalAnalysisSettings(12);
MAS5.SetBeyondFrequency(30);

var MAS6 = new ModalAnalysisSettings(undefined, "auto", "subspace");
MAS6.SetBeyondFrequency(120);
MAS6.SetMaximalFrequency(400);
var MAS7 = new ModalAnalysisSettings(undefined, "auto", "root");
var MAS8 = new ModalAnalysisSettings(undefined, 11, "subspace");
var MAS9 = new ModalAnalysisSettings(undefined, 7, "root");
var MAS10 = new ModalAnalysisSettings(undefined, "11", "subspace");
var MAS11 = new ModalAnalysisSettings(undefined, "17", "root");
var MAS12 = new ModalAnalysisSettings(undefined, "3", "root", 10);
var MAS13 = new ModalAnalysisSettings(undefined, "auto", "root", 50, 500);
var MAS13 = new ModalAnalysisSettings(undefined, 5, "root", 50, 500);

someParams = {
	mass_conversion_type					: modal_analysis_settings.MASS_CONVERSION_TYPE_FULL_LOADS_AS_MASS,
	mass_matrix_type						: modal_analysis_settings.MASS_MATRIX_TYPE_DIAGONAL,
	activate_minimum_initial_prestress		: true,
	minimum_initial_strain					: 0.003
};

var MAS14 = new ModalAnalysisSettings(undefined, 5, "root", 50, 500, "with parameters", someParams);

//  #### stability analysis
//### function StabilityAnalysisSettings(no,
//                                isEigenvalueSolver,
//                                isIncremental,
//                                eigenvalueMethod,
//                                comment,
 //                               params) ###/

STRUCTURE_STABILITY.setActive(true);

var StAS = new StabilityAnalysisSettings();

StAS.settings.comment = "Access via .settings";
StAS.settings.matrix_type = stability_analysis_settings.MATRIX_TYPE_UNIT;

var StAS01 = new StabilityAnalysisSettings(undefined,true,true);
var StAS02 = new StabilityAnalysisSettings(undefined,true,false);
var StAS03 = new StabilityAnalysisSettings(undefined,false);
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"root");
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"subspace");
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"Lanczos");
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"ICG");
var StAS03 = new StabilityAnalysisSettings(undefined,false,true,"root");
var StAS03 = new StabilityAnalysisSettings(undefined,true,false,"subspace");
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"Lanczos");
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"ICG");
var StAS03 = new StabilityAnalysisSettings(undefined,false,true,"root",5);
var StAS03 = new StabilityAnalysisSettings(undefined,true,false,"subspace",8);
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"Lanczos",3);
var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"ICG",2);

someParams = {
	activate_stopping_of_load_increasing					: true,
	stopping_of_load_increasing_limit_result_displacement 	: 0.02,
	matrix_type												: stability_analysis_settings.MATRIX_TYPE_UNIT,
	activate_minimum_initial_prestress						: true,
	minimum_initial_strain									: 0.003,
	save_results_of_all_increments							: true
};

var StAS03 = new StabilityAnalysisSettings(undefined,true,true,"ICG",3,"With parameters", someParams);

/* #### response spectrum analysis
//### function SpectralAnalysisSettings(no,
                                combinationRulePeriodic,
                                combinationRuleDirrectional,
                                useEquivalentLinearCombination,
                                signedResultsUsingDominantMode,
                                saveResultsOfAllSelectedModes,
                                comment,
                                params) ###/*/
   /**
  * Creates stability analysis settings hight level function 

  * @param   {Boolean}   isEigenvalueSolver             is eigenvalue solver
  * @param   {Boolean}   isIncremental                  is incremental method
  * @param   {String}    eigenvalueMethod               Definition of eigenvalue method
  * @param   {Integer}   numberOfLowestEigenvalues      Number of lowest eigenvalues
  * @param   {String}     comment       Comment, empty by default
  * @param   {Object}  params        Stability analysis settings parameters, empty by default
  */

DYNAMIC_ANALYSIS.SPECTRAL.setActive(true);

var SpAS = new SpectralAnalysisSettings();

SpAS.settings.save_results_of_all_selected_modes = true;

var SpAS01 = new SpectralAnalysisSettings(undefined, "CQC", "Scaled");
var SpAS01 = new SpectralAnalysisSettings(undefined, "Absolute", "Absolute");
var SpAS01 = new SpectralAnalysisSettings(undefined, "Absolute", "Absolute", true, true, true);

someParams = {
	constant_d_for_each_mode							: 0.03,
	combination_rule_for_directional_components_value 	: 0.02,
};

var SpAS01 = new SpectralAnalysisSettings(undefined, "SRSj", "gfgfd", x, f, x,"With comment.");
var SpAS01 = new SpectralAnalysisSettings(undefined, "CQC", "Scaled", true, f, true,"With parameters.", someParams );

// WIND SIMULATION
WIND_SIMULATION.setActive(true);

/* #### WIND SIMULATION analysis
// Main function
function WindSimulationSettings(no,
                                density,
                                kinematicViscosity,
                                consider_turbulence,
                                comment,
                                params)
{

   /**
  * Creates stability analysis settings hight level function 

  * @param   {Float}      density                 number between 1 and 2
  * @param   {Float}      kinematicViscosity      number between 1e-6 and 1e-4
  * @param   {Boolean}    consider_turbulence     consider turbulence
  * @param   {String}     comment       Comment, empty by default
  * @param   {Object}  params        Spectral analysis settings parameters, empty by default
  */

var WSAS = new WindSimulationSettings();
WSAS.settings.maximum_number_of_iterations = 1000;
WSAS.settings.use_second_order_numerical_scheme = true;
WSAS.settings.consider_wall_roughness = true;
WSAS.settings.roughness_constant = 0.75;
WSAS.settings.sand_grain_roughness_height = 0.4;

var WSAS01 = new WindSimulationSettings(undefined, 1.3, 32e-6);
var WSAS01 = new WindSimulationSettings(undefined, 1.3, 4e-6, false);
var WSAS01 = new WindSimulationSettings(undefined, 1.3, 4e-6, false, "with comment");

someParams = {
	turbulence_model_type							: wind_simulation_analysis_settings.TURBULENCE_TYPE_OMEGA,
	slip_boundary_condition_on_bottom_boundary 		: true,
	member_load_distribution						: wind_simulation_analysis_settings.TRAPEZOIDAL,
	boundary_layers_checked							: true,
	boundary_layers_value							: 7,
	target_residue									: 1e-6,
	finite_volume_mesh_density						: 0.15
};

var WSAS01 = new WindSimulationSettings(undefined, 1.3, 4e-6, fs,"with parameters", someParams);
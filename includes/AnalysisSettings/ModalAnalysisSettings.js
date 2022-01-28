function SetSolverMethod(solverMethod	) {

  const SolverMethod_dict = {
  "root"     : "METHOD_LANCZOS",
  "Lanczos"  : "METHOD_OF_EQUATION_SYSTEM_ITERATIVE",
  "subspace" : "METHOD_SUBSPACE_ITERATION"
  };

  var equationSolver = SolverMethod_dict[solverMethod	];
  if (equationSolver === undefined) {
    console.log("Wrong equation solver input. Value was: " + solverMethod	);
    console.log("Correct values are: ( " + Object.keys(EquationSolver_dict) + ")");
    equationSolver = "METHOD_LANCZOS";
  };
  return equationSolver 
};


// Main function ModalAnalysisSettings (MAS)
function ModalAnalysisSettings( no,
                                numberOfModes,
                                solverMethod,
                                beyondFrequency,
                                maximalFrequency,
                                comment,
                                params)
{

   /**
  * Creates nodal support hight level function 

  * @param   {Integer}              no              unique ID of MAS
  * @param   {String or Integer}    numberOfModes   number of modes calculated
  * @param   {String}               SolverMethod    solver method values are "root", "Lanczos", "subspace"
  * @param   {String}               comment         Comment, empty by default
  * @param   {Object}               params          Nodal support parameters, empty by default
  */

  ASSERT(typeof no != undefined || typeof no != "number", "No must be assigned as an integer.");
  ASSERT(typeof type != undefined || typeof name != "string", "Name must be assigned as a string.");

  if (no === undefined) {
    	var MAS = modal_analysis_settings.create();	
    }
    else {
    	var MAS = modal_analysis_settings.create(no);
	};
  console.log("New modal analysis settings no. " + MAS.no + " was created");
  // Modal anlysis number of modes calculated
  if (typeof numberOfModes === "string") {
    if (isNaN(parseInt(numberOfModes))) {
      MAS.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY;
      console.log("Natural frequencies will be calculated up to the limit 1600Hz");
      }
    else {
      MAS.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_USER_DEFINED;
      MAS.number_of_modes = parseInt(numberOfModes);
      console.log("First " + parseInt(numberOfModes) + " natural frequencies will be calculated");
    }
    }
    else if (typeof numberOfModes === "number") {
      MAS.number_of_modes_method = modal_analysis_settings.NUMBER_OF_MODES_METHOD_USER_DEFINED;
      MAS.number_of_modes = numberOfModes;
      console.log("First " + numberOfModes + " natural frequencies will be calculated");
    };

  if (solverMethod != undefined) {
    MAS.solution_method = modal_analysis_settings[SetSolverMethod(solverMethod)];
  };

  if (beyondFrequency != undefined) {
      MAS.find_eigenvectors_beyond_frequency = true;
      MAS.frequency = beyondFrequency;
    };

  if (maximalFrequency != undefined) {
    if (MAS.number_of_modes_method === modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY) {
        MAS.maxmimum_natural_frequency = maximalFrequency;
      };
  }; 

	this.settings = MAS;
  set_comment_and_parameters(this.settings, comment, params);
  console.log("-- Done. Modal analysis settings no. " + MAS.no + " all initial params set.");
  // object for creation new MAS with callback link to instance
  var self = this;
  return self;
};



ModalAnalysisSettings.prototype.SetMaximalFrequency = function(frequency) {
  // * @param   {integer}   frequency         Maximal number of frequency
  ASSERT(typeof frequency != undefined || typeof frequency != "number", "Parameter must be assigned as an integer.");  
  if (this.settings.number_of_modes_method === modal_analysis_settings.NUMBER_OF_MODES_METHOD_MAXIMUM_FREQUENCY) {
      this.settings.maxmimum_natural_frequency = frequency;
      };
  };


ModalAnalysisSettings.prototype.SetBeyondFrequency = function(frequency) {
  // * @param   {integer}   frequency         Maximal number of frequency
  ASSERT(typeof frequency != undefined || typeof frequency != "number", "Parameter must be assigned as an integer.");  
  this.settings.find_eigenvectors_beyond_frequency = true;
  this.settings.frequency = frequency;
  };
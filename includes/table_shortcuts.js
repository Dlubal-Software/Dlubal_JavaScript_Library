
var USER_ID_MIN = 1;
var USER_ID_MAX = 1000000;
var MAXIMUM = 2.14748e+9;
var NAN = "nan";

// units
var UNIT = {
    NONE: "",

    EG_MODULE: "EG_MODULE",
    STRESSES: "STRESSES",
    MATERIAL_SPECIFIC_WEIGHT: "MATERIAL_SPECIFIC_WEIGHT",
    THERMAL_EXPANSION_COEFFICIENT: "THERMAL_EXPANSION_COEFFICIENT",
    DENSITY: "DENSITY",
    POISSONS_RATIO: "POISSONS_RATIO",
    HARDENING_FACTOR: "HARDENING_FACTOR",
    REFERENCE_ELEMENT_SIZE: "REFERENCE_ELEMENT_SIZE",
    MATERIAL_FACTOR: "MATERIAL_FACTOR",
    MATERIAL_THICKNESS: "MATERIAL_THICKNESS",
    MATERIAL_DEFORMATION: "MATERIAL_DEFORMATION",
    STRAIN: "STRAIN",
    GRAVITATIONAL_ACCELERATION: "GRAVITATIONAL_ACCELERATION",
    FRACTURE_ENERGY: "FRACTURE_ENERGY",
    MATERIAL_QUANTITY_INTEGER: "MATERIAL_QUANTITY_INTEGER",
    MATERIAL_ANGLE: "MATERIAL_ANGLE",

    // SUBCATEGORY_MATERIALS_GAS
    THERMAL_CONDUCTIVIY: "THERMAL_CONDUCTIVIY",
    GAS_DENSITY: "GAS_DENSITY",
    MATERIAL_TEMPERATURE: "MATERIAL_TEMPERATURE",
    GAS_PRESSURE: "GAS_PRESSURE",
    MOLAR_MASS: "MOLAR_MASS",
    HEAT_CAPACITY: "HEAT_CAPACITY",
    DYNAMIC_VISCOSITY: "DYNAMIC_VISCOSITY",
    DYNAMIC_INCREASE_FACTOR: "DYNAMIC_INCREASE_FACTOR",
    STRAIN_RATE: "STRAIN_RATE",

    // CATEGORY_SECTIONS
    // SUBCATEGORY_SECTIONS_GENERAL
    SECTION_DIMENSION: "SECTION_DIMENSION",
    SECTION_PERIMETER: "SECTION_PERIMETER",
    SECTION_COMPLIANCE: "SECTION_COMPLIANCE",
    SECTION_AREA: "SECTION_AREA",
    SECTION_ANGLE: "SECTION_ANGLE",
    SECTION_MOMENT_OF_INERTIA: "SECTION_MOMENT_OF_INERTIA",
    SECTION_SECTION_FACTOR: "SECTION_SECTION_FACTOR",
    SECTION_SECTION_MODULUS: "SECTION_SECTION_MODULUS",
    SECTION_EFFECTIVE_SECOND_MOMENT_OF_AREA: "SECTION_EFFECTIVE_SECOND_MOMENT_OF_AREA",
    SECTION_STATICAL_MOMENT_OF_AREA: "SECTION_STATICAL_MOMENT_OF_AREA",
    SECTION_TENSION_FIELD_COEFFICIENT_1: "SECTION_TENSION_FIELD_COEFFICIENT_1",
    SECTION_TENSION_FIELD_COEFFICIENT_2: "SECTION_TENSION_FIELD_COEFFICIENT_2",
    SECTION_WARPING_CONSTANT: "SECTION_WARPING_CONSTANT",
    SECTION_NORMALIZED_WARPING_CONSTANT: "SECTION_NORMALIZED_WARPING_CONSTANT",
    SECTION_WARPING_STATICAL_MOMENT: "SECTION_WARPING_STATICAL_MOMENT",
    SECTION_BIMOMENT: "SECTION_BIMOMENT",
    SECTION_FORCE: "SECTION_FORCE",
    SECTION_MOMENT: "SECTION_MOMENT",
    SECTION_UNIT_STRESSES: "SECTION_UNIT_STRESSES",
    SECTION_UNIT_WARPING_FUNCTION: "SECTION_UNIT_WARPING_FUNCTION",
    SECTION_QUANTITY: "SECTION_QUANTITY",

    // SUBCATEGORY_SECTIONS_UNIT_PARAMETERS
    SECTION_VOLUME: "SECTION_VOLUME",
    SECTION_SURFACE: "SECTION_SURFACE",
    SECTION_WEIGHT: "SECTION_WEIGHT",

    // SUBCATEGORY_SECTIONS_ADDON_CONCRETE
    MATERIAL_HUMIDITY: "MATERIAL_HUMIDITY",
    SECTION_COEFFICIENT: "SECTION_COEFFICIENT",
    MATERIAL_TIME: "MATERIAL_TIME",
    MATERIAL_COEFFICIENT: "MATERIAL_COEFFICIENT",
    SECTION_STRAIN: "SECTION_STRAIN",

    // CATEGORY_MODEL
    // SUBCATEGORY_MODEL_GENERAL
    LENGTH: "LENGTH",
    RSECTION_LENGTH: "RSECTION_LENGTH",
    AREA: "AREA",
    RSECTION_AREA: "RSECTION_AREA",
    VOLUME: "VOLUME",
    ANGLE: "ANGLE",
    GEOGRAPHIC_COORDINATES: "GEOGRAPHIC_COORDINATES",
    MASS: "MASS",
    THICKNESS: "THICKNESS",
    TIME: "TIME",

    // SUBCATEGORY_MODEL_DIMENSIONLESS
    DIMENSIONLESS: "DIMENSIONLESS",
    RELATIVE_LENGTH: "RELATIVE_LENGTH",
    PARTIAL_FACTOR: "PARTIAL_FACTOR",
    WEIGHT_AND_KNOT: "WEIGHT_AND_KNOT",
    RATIO: "RATIO",
    PRECISION_FACTOR: "PRECISION_FACTOR",
    FRICTION_COEFFICIENT: "FRICTION_COEFFICIENT",
    STIFFNESS_MULTIPLICATION_FACTOR: "STIFFNESS_MULTIPLICATION_FACTOR",
    QUANTITY: "QUANTITY",
    QUANTITY_WITH_FIXED_PRECISION: "QUANTITY_WITH_FIXED_PRECISION",

    // SUBCATEGORY_MODEL_SUPPORTS_ELASTIC_FOUNDATION_ORTHOTROPY
    SPRING_STIFFNESS: "SPRING_STIFFNESS",
    SPRING_ROTATIONAL_STIFFNESS: "SPRING_ROTATIONAL_STIFFNESS",
    LINE_SPRING_CONSTANT: "LINE_SPRING_CONSTANT",
    LINE_SPRING_ROTATIONAL_STIFFNESS: "LINE_SPRING_ROTATIONAL_STIFFNESS",
    SURFACE_SPRING_CONSTANT: "SURFACE_SPRING_CONSTANT",
    SHEAR_SPRING_CONSTANT: "SHEAR_SPRING_CONSTANT",
    ORTHOTROPY_BENDING_MOMENT: "ORTHOTROPY_BENDING_MOMENT",
    ORTHOTROPY_LINE_MOMENT: "ORTHOTROPY_LINE_MOMENT",
    MASS_PER_UNIT_AREA: "MASS_PER_UNIT_AREA",
    MASS_MOMENT_PER_UNIT_AREA: "MASS_MOMENT_PER_UNIT_AREA",
    SURFACES_CONTACT_TYPE_SHEAR_STIFFNESS: "SURFACES_CONTACT_TYPE_SHEAR_STIFFNESS",
    SOLID_SHEAR_STIFFNESS: "SOLID_SHEAR_STIFFNESS",

    // SUBCATEGORY_MODEL_MEMBER_TRANSVERSE_STIFFENERS
    MEMBER_TRANSVERSE_STIFFENERS_WELD_SIZE: "MEMBER_TRANSVERSE_STIFFENERS_WELD_SIZE",

    // SUBCATEGORY_MODEL_MEMBER_MATRIX_STIFFNESS_ELEMENTS
    MEMBER_BENDING_TORSION_STIFFNESS_ELEMENT: "MEMBER_BENDING_TORSION_STIFFNESS_ELEMENT",
    MEMBER_SHEAR_STIFFNESS_ELEMENT: "MEMBER_SHEAR_STIFFNESS_ELEMENT",
    MEMBER_ECCENTRIC_STIFFNESS_ELEMENT: "MEMBER_ECCENTRIC_STIFFNESS_ELEMENT",
    MEMBER_DEVIATORIC_STIFFNESS_ELEMENT: "MEMBER_DEVIATORIC_STIFFNESS_ELEMENT",

    // SUBCATEGORY_MODEL_SURFACE_MATRIX_STIFFNESS_ELEMENTS
    SURFACE_BENDING_TORSION_STIFFNESS_ELEMENT: "SURFACE_BENDING_TORSION_STIFFNESS_ELEMENT",
    SURFACE_SHEAR_STIFFNESS_ELEMENT: "SURFACE_SHEAR_STIFFNESS_ELEMENT",
    SURFACE_MEMBRANE_STIFFNESS_ELEMENT: "SURFACE_MEMBRANE_STIFFNESS_ELEMENT",
    SURFACE_ECCENTRIC_STIFFNESS_ELEMENT: "SURFACE_ECCENTRIC_STIFFNESS_ELEMENT",

    //SUBCATEGORY_MODEL_SURFACE_THICKNESS_LAYERS
    SURFACE_SPECIFIC_WEIGHT: "SURFACE_SPECIFIC_WEIGHT",
    SURFACE_WEIGHT: "SURFACE_WEIGHT",

    // CATEGORY_CONSTRUCTION_STAGES
    // SUBCATEGORY_CONSTRUCTION_STAGES_GENERAL
    CONSTRUCTION_STAGES_TIME: "CONSTRUCTION_STAGES_TIME",

    // CATEGORY_BUILDING_MODEL
    // SUBCATEGORY_BUILDING_MODEL_BUILDING_STORIES
    BUILDING_STORIES_LENGTH: "BUILDING_STORIES_LENGTH",
    BUILDING_STORIES_AREA: "BUILDING_STORIES_AREA",
    BUILDING_STORIES_VOLUME: "BUILDING_STORIES_VOLUME",
    BUILDING_STORIES_MASS: "BUILDING_STORIES_MASS",

    // SUBCATEGORY_BUILDING_MODEL_TIMBER_FRAME_WALL
    TIMBER_FRAME_WALL_LENGTH: "TIMBER_FRAME_WALL_LENGTH",
    TIMBER_FRAME_WALL_THICKNESS: "TIMBER_FRAME_WALL_THICKNESS",
    TIMBER_FRAME_WALL_CONNECTOR_DIMENSION: "TIMBER_FRAME_WALL_CONNECTOR_DIMENSION",
    TIMBER_FRAME_WALL_CONNECTOR_SPACING: "TIMBER_FRAME_WALL_CONNECTOR_SPACING",

    // CATEGORY_LOADS
    // SUBCATEGORY_LOADS_LOADS
    LOADS_FORCE: "LOADS_FORCE",
    LOADS_MOMENT: "LOADS_MOMENT",
    LOADS_MASS: "LOADS_MASS",
    LOADS_DISPLACEMENT: "LOADS_DISPLACEMENT",
    LOADS_ROTATION: "LOADS_ROTATION",
    LOADS_LENGTH: "LOADS_LENGTH",
    LOADS_RELATIVE_LENGTH: "LOADS_RELATIVE_LENGTH",
    LOADS_TEMPERATURE: "LOADS_TEMPERATURE",
    LOADS_TEMPERATURE_CHANGE: "LOADS_TEMPERATURE_CHANGE",
    LOADS_AXIAL_STRAIN: "LOADS_AXIAL_STRAIN",
    LOADS_FORCE_PER_UNIT_LENGTH: "LOADS_FORCE_PER_UNIT_LENGTH",
    LOADS_MOMENT_PER_UNIT_LENGTH: "LOADS_MOMENT_PER_UNIT_LENGTH",
    LOADS_DISPLACEMENT_PER_UNIT_LENGTH: "LOADS_DISPLACEMENT_PER_UNIT_LENGTH",
    LOADS_ROTATION_PER_UNIT_LENGTH: "LOADS_ROTATION_PER_UNIT_LENGTH",
    LOADS_SURFACE_TYPE_LOAD: "LOADS_SURFACE_TYPE_LOAD",
    LOADS_SOLID_TYPE_LOAD: "LOADS_SOLID_TYPE_LOAD",
    LOADS_DENSITY: "LOADS_DENSITY",
    LOADS_PRESSURE: "LOADS_PRESSURE",
    SELF_WEIGHT_FACTOR: "SELF_WEIGHT_FACTOR",
    LOADS_PRECAMBER: "LOADS_PRECAMBER",
    LOADS_AREA_MASS: "LOADS_AREA_MASS",
    LOADS_IMPOSED_DISPLACEMENT: "LOADS_IMPOSED_DISPLACEMENT",
    LOADS_IMPOSED_ROTATION: "LOADS_IMPOSED_ROTATION",
    LOADS_ANGULAR_VELOCITY: "LOADS_ANGULAR_VELOCITY",
    LOADS_ANGULAR_ACCELERATION: "LOADS_ANGULAR_ACCELERATION",
    LOADS_VELOCITY: "LOADS_VELOCITY",
    LOADS_KINEMATIC_VISCOSITY: "LOADS_KINEMATIC_VISCOSITY",
    LOADS_KINETIC_ENERGY: "LOADS_KINETIC_ENERGY",
    LOADS_SPECIFIC_ENERGY: "LOADS_SPECIFIC_ENERGY",

    // SUBCATEGORY_LOADS_LOAD_COMBINATIONS
    LOADING_FACTOR: "LOADING_FACTOR",

    // CATEGORY_IMPERFECTIONS
    // SUBCATEGORY_IMPERFECTIONS_GENERAL
    IMPERFECTIONS_MAGNITUDE: "IMPERFECTIONS_MAGNITUDE",
    IMPERFECTIONS_RELATIVE_LENGTH: "IMPERFECTIONS_RELATIVE_LENGTH",
    IMPERFECTIONS_RATIO: "IMPERFECTIONS_RATIO",
    IMPERFECTIONS_FORCE: "IMPERFECTIONS_FORCE",

    // CATEGORY_RESULTS
    // SUBCATEGORY_RESULTS_GENERAL
    RESULTS_DISPLAY_FACTOR: "RESULTS_DISPLAY_FACTOR",

    // SUBCATEGORY_RESULTS_RESULT_DIAGRAMS
    RESULTS_RESULT_DIAGRAMS_SMOOTHING_FORCES: "RESULTS_RESULT_DIAGRAMS_SMOOTHING_FORCES",
    RESULTS_RESULT_DIAGRAMS_SMOOTHING_MOMENTS: "RESULTS_RESULT_DIAGRAMS_SMOOTHING_MOMENTS",

    // SUBCATEGORY_RESULTS_DESIGN_OVERVIEW
    RESULTS_DESIGN_OVERVIEW_DESIGN_RATIO: "RESULTS_DESIGN_OVERVIEW_DESIGN_RATIO",

    // CATEGORY_DIMENSIONS
    // SUBCATEGORY_DIMENSIONS_GENERAL
    DIMENSIONS_LENGTH: "DIMENSIONS_LENGTH",
    DIMENSIONS_ANGLE: "DIMENSIONS_ANGLE",
    DIMENSIONS_SLOPE: "DIMENSIONS_SLOPE",
    DIMENSIONS_ALTITUDE: "DIMENSIONS_ALTITUDE",

    // CATEGORY_CONCRETE_REINFORCEMENT
    // SUBCATEGORY_CONCRETE_REFINFORCEMENT_GENERAL
    CONCRETE_REINFORCEMENT_AREA: "CONCRETE_REINFORCEMENT_AREA",
    CONCRETE_REINFORCEMENT_DIAMETER: "CONCRETE_REINFORCEMENT_DIAMETER",
    CONCRETE_REINFORCEMENT_CONCRETE_COVER: "CONCRETE_REINFORCEMENT_CONCRETE_COVER",
    CONCRETE_REINFORCEMENT_LENGTH: "CONCRETE_REINFORCEMENT_LENGTH",
    CONCRETE_REINFORCEMENT_AREA_PER_UNIT_LENGTH: "CONCRETE_REINFORCEMENT_AREA_PER_UNIT_LENGTH",
    CONCRETE_REINFORCEMENT_AREA_PER_SQUARE_METER: "CONCRETE_REINFORCEMENT_AREA_PER_SQUARE_METER",
    CONCRETE_REINFORCEMENT_RATIO: "CONCRETE_REINFORCEMENT_RATIO",
    CONCRETE_REINFORCEMENT_WEIGHT: "CONCRETE_REINFORCEMENT_WEIGHT",

    // SUBCATEGORY_CONCRETE_EFFECTIVE_LENGTHS
    CONCRETE_EFFECTIVE_LENGTHS_FACTOR: "CONCRETE_EFFECTIVE_LENGTHS_FACTOR",
    CONCRETE_EFFECTIVE_LENGTHS_ECCENTRICITY: "CONCRETE_EFFECTIVE_LENGTHS_ECCENTRICITY",

    // SUBCATEGORY_CONCRETE_DESIGN_GENERAL
    CONCRETE_DESIGN_CRACK_WIDTHS: "CONCRETE_DESIGN_CRACK_WIDTHS",
    CONCRETE_DESIGN_DIMENSIONLESS: "CONCRETE_DESIGN_DIMENSIONLESS",
    CONCRETE_TEMPERATURE: "CONCRETE_TEMPERATURE",
    CONCRETE_DESIGN_PUNCHING_LENGTH: "CONCRETE_DESIGN_PUNCHING_LENGTH",
    CONCRETE_DESIGN_RATIOS: "CONCRETE_DESIGN_RATIOS",
    CONCRETE_DURATION_OF_LONG_TERM_LOAD: "CONCRETE_DURATION_OF_LONG_TERM_LOAD",
    CONCRETE_DURATION_OF_LOAD: "CONCRETE_DURATION_OF_LOAD",
    CONCRETE_LIMIT_OF_ALLOWABLE_DEFLECTION: "CONCRETE_LIMIT_OF_ALLOWABLE_DEFLECTION",

    // CATEGORY_STATIC_ANALYSIS
    // SUBCATEGORY_STATIC_ANALYSIS_GENERAL
    STATIC_ANALYSIS_LOAD_INCREMENT_FACTORS: "STATIC_ANALYSIS_LOAD_INCREMENT_FACTORS",
    STATIC_ANALYSIS_DESIGN_RATIO: "STATIC_ANALYSIS_DESIGN_RATIO",

    // SUBCATEGORY_STATIC_ANALYSIS_DEFORMATIONS_AND_STRAINS
    STATIC_ANALYSIS_DISPLACEMENT: "STATIC_ANALYSIS_DISPLACEMENT",
    STATIC_ANALYSIS_ROTATION: "STATIC_ANALYSIS_ROTATION",
    STATIC_ANALYSIS_WARPING: "STATIC_ANALYSIS_WARPING",
    STATIC_ANALYSIS_AXIAL_AND_SHEAR_STRAIN: "STATIC_ANALYSIS_AXIAL_AND_SHEAR_STRAIN",
    STATIC_ANALYSIS_TORSIONAL_AND_BENDING_STRAIN: "STATIC_ANALYSIS_TORSIONAL_AND_BENDING_STRAIN",
    STATIC_ANALYSIS_STRAIN_ANGLES: "STATIC_ANALYSIS_STRAIN_ANGLES",

    // SUBCATEGORY_STATIC_ANALYSIS_SUPPORT_AND_INTERNAL_FORCES
    STATIC_ANALYSIS_MEMBER_FORCE: "STATIC_ANALYSIS_MEMBER_FORCE",
    STATIC_ANALYSIS_MEMBER_MOMENT: "STATIC_ANALYSIS_MEMBER_MOMENT",
    STATIC_ANALYSIS_MEMBER_BIMOMENT: "STATIC_ANALYSIS_MEMBER_BIMOMENT",
    STATIC_ANALYSIS_MEMBER_PRESSURE: "STATIC_ANALYSIS_MEMBER_PRESSURE",
    STATIC_ANALYSIS_RIB_FORCE: "STATIC_ANALYSIS_RIB_FORCE",
    STATIC_ANALYSIS_SURFACE_FORCE: "STATIC_ANALYSIS_SURFACE_FORCE",
    STATIC_ANALYSIS_SURFACE_MOMENT: "STATIC_ANALYSIS_SURFACE_MOMENT",
    STATIC_ANALYSIS_ANGLES: "STATIC_ANALYSIS_ANGLES",
    STATIC_ANALYSIS_RESULTANT_FORCE: "STATIC_ANALYSIS_RESULTANT_FORCE",
    STATIC_ANALYSIS_RESULTANT_MOMENT: "STATIC_ANALYSIS_RESULTANT_MOMENT",

    // SUBCATEGORY_STATIC_ANALYSIS_STRESSES
    STATIC_ANALYSIS_STRESSES_ON_SURFACES: "STATIC_ANALYSIS_STRESSES_ON_SURFACES",
    STATIC_ANALYSIS_STRESSES_ON_SOLIDS: "STATIC_ANALYSIS_STRESSES_ON_SOLIDS",

    // SUBCATEGORY_STATIC_ANALYSIS_ELASTIC_FOUNDATION
    STATIC_ANALYSIS_MEMBER_CONTACT_FORCE: "STATIC_ANALYSIS_MEMBER_CONTACT_FORCE",
    STATIC_ANALYSIS_MEMBER_CONTACT_MOMENT: "STATIC_ANALYSIS_MEMBER_CONTACT_MOMENT",
    STATIC_ANALYSIS_SURFACE_CONTACT_STRESS: "STATIC_ANALYSIS_SURFACE_CONTACT_STRESS",

    // SUBCATEGORY_STATIC_ANALYSIS_ADDON_CONCRETE
    STATIC_ANALYSIS_TIME: "STATIC_ANALYSIS_TIME",

    // SUBCATEGORY_STATIC_ANALYSIS_GAS,
    STATIC_ANALYSIS_GAS_PRESSURE: "STATIC_ANALYSIS_GAS_PRESSURE",
    STATIC_ANALYSIS_GAS_TEMPERATURE: "STATIC_ANALYSIS_GAS_TEMPERATURE",
    STATIC_ANALYSIS_GAS_VOLUME: "STATIC_ANALYSIS_GAS_VOLUME",

    // SUBCATEGORY_STATIC_ANALYSIS_CALCULATION_STATISTIC
    STATIC_ANALYSIS_VALUES_OF_STIFFNESS_MATRIX_DIAGONAL_ELEMENTS: "STATIC_ANALYSIS_VALUES_OF_STIFFNESS_MATRIX_DIAGONAL_ELEMENTS",
    STATIC_ANALYSIS_STIFFNESS_MATRIX_DETERMINANT: "STATIC_ANALYSIS_STIFFNESS_MATRIX_DETERMINANT",
    STATIC_ANALYSIS_INFINITY_NORM: "STATIC_ANALYSIS_INFINITY_NORM",

    // SUBCATEGORY_STATIC_ANALYSIS_OTHER,
    STATIC_ANALYSIS_CRITERIA_RATIO: "STATIC_ANALYSIS_CRITERIA_RATIO",

    // CATEGORY_STRESS_ANALYSIS
    // SUBCATEGORY_STRESS_ANALYSIS_GENERAL
    STRESS_ANALYSIS_STRESSES: "STRESS_ANALYSIS_STRESSES",
    STRESS_ANALYSIS_STRAINS: "STRESS_ANALYSIS_STRAINS",
    STRESS_ANALYSIS_BENDING_STRAIN: "STRESS_ANALYSIS_BENDING_STRAIN",
    STRESS_ANALYSIS_RATIOS: "STRESS_ANALYSIS_RATIOS",

    //CATEGORY_RSECTION_RESULTS
    //SUBCATEGORY_RSECTION_RESULT_STRESSES
    RSECTION_RESULT_LOCATIONS: "RSECTION_RESULT_LOCATIONS",
    RSECTION_RESULT_STRESSES: "RSECTION_RESULT_STRESSES",
    RSECTION_RESULT_RATIOS: "RSECTION_RESULT_RATIOS",

    // CATEGORY_ALUMINUM_DESIGN
    // SUBCATEGORY_ALUMINUM_DESIGN_GENERAL
    ALUMINUM_DESIGN_AXIAL_AND_SHEAR_STRAIN: "ALUMINUM_DESIGN_AXIAL_AND_SHEAR_STRAIN",
    ALUMINUM_DESIGN_TORSIONAL_AND_BENDING_STRAIN: "ALUMINUM_DESIGN_TORSIONAL_AND_BENDING_STRAIN",
    ALUMINUM_DESIGN_STRESSES: "ALUMINUM_DESIGN_STRESSES",
    ALUMINUM_DESIGN_RATIOS: "ALUMINUM_DESIGN_RATIOS",
    ALUMINUM_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS: "ALUMINUM_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS",

    // CATEGORY_STEEL_DESIGN
    // SUBCATEGORY_STEEL_DESIGN_GENERAL
    STEEL_DESIGN_AXIAL_AND_SHEAR_STRAIN: "STEEL_DESIGN_AXIAL_AND_SHEAR_STRAIN",
    STEEL_DESIGN_TORSIONAL_AND_BENDING_STRAIN: "STEEL_DESIGN_TORSIONAL_AND_BENDING_STRAIN",
    STEEL_DESIGN_STRESSES: "STEEL_DESIGN_STRESSES",
    STEEL_DESIGN_RATIOS: "STEEL_DESIGN_RATIOS",
    STEEL_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS: "STEEL_DESIGN_GLOBAL_BUCKLING_SLENDERNESS_RATIOS",
    STEEL_DESIGN_LOCAL_BUCKLING_SLENDERNESS_RATIOS: "STEEL_DESIGN_LOCAL_BUCKLING_SLENDERNESS_RATIOS",
    STEEL_DESIGN_GENERAL_FACTORS: "STEEL_DESIGN_GENERAL_FACTORS",
    STEEL_DESIGN_PERCENTAGE: "STEEL_DESIGN_PERCENTAGE",

    // SUBCATEGORY_STEEL_DESIGN_RESULTS
    STEEL_DESIGN_RESULTS_FACTORS: "STEEL_DESIGN_RESULTS_FACTORS",
    STEEL_DESIGN_RESULTS_MOMENT_RATIO: "STEEL_DESIGN_RESULTS_MOMENT_RATIO",

    // SUBCATEGORY_STEEL_DESIGN_FIRE_PROTECTION
    STEEL_DESIGN_FP_TEMPERATURE: "STEEL_DESIGN_FP_TEMPERATURE",
    STEEL_DESIGN_FP_TIME: "STEEL_DESIGN_FP_TIME",
    STEEL_DESIGN_FP_TIME_INTERVAL: "STEEL_DESIGN_FP_TIME_INTERVAL",
    STEEL_DESIGN_FP_UNIT_MASS: "STEEL_DESIGN_FP_UNIT_MASS",
    STEEL_DESIGN_FP_THERMAL_CONDUCTIVITY: "STEEL_DESIGN_FP_THERMAL_CONDUCTIVITY",
    STEEL_DESIGN_FP_SPECIFIC_HEAT: "STEEL_DESIGN_FP_SPECIFIC_HEAT",
    STEEL_DESIGN_FP_THICKNESS: "STEEL_DESIGN_FP_THICKNESS",
    STEEL_DESIGN_FP_COEF_OF_HEAT_TRANSFER: "STEEL_DESIGN_FP_COEF_OF_HEAT_TRANSFER",
    STEEL_DESIGN_FP_STEFAN_BOLTZMANN_CONSTANT: "STEEL_DESIGN_FP_STEFAN_BOLTZMANN_CONSTANT",

    // CATEGORY_STEEL_JOINTS
    // SUBCATEGORY_STEEL_JOINTS_GENERAL
    STEEL_JOINTS_RATIOS: "STEEL_JOINTS_RATIOS",
    STEEL_JOINTS_PERCENTAGE: "STEEL_JOINTS_PERCENTAGE",
    STEEL_JOINTS_PARTIAL_FACTORS: "STEEL_JOINTS_PARTIAL_FACTORS",

    // SUBCATEGORY_STEEL_JOINTS_GEOMETRY
    STEEL_JOINTS_GEOMETRY_LENGTHS: "STEEL_JOINTS_GEOMETRY_LENGTHS",
    STEEL_JOINTS_GEOMETRY_THICKNESSES: "STEEL_JOINTS_GEOMETRY_THICKNESSES",
    STEEL_JOINTS_GEOMETRY_ANGLES: "STEEL_JOINTS_GEOMETRY_ANGLES",
    STEEL_JOINTS_GEOMETRY_COORDINATES: "STEEL_JOINTS_GEOMETRY_COORDINATES",

    // SUBCATEGORY_STEEL_JOINTS_WELDS
    STEEL_JOINTS_WELD_SIZES: "STEEL_JOINTS_WELD_SIZES",

    // SUBCATEGORY_STEEL_JOINTS_BOLTS
    STEEL_JOINTS_BOLT_SECTION_AREAS: "STEEL_JOINTS_BOLT_SECTION_AREAS",
    STEEL_JOINTS_BOLT_DIAMETER: "STEEL_JOINTS_BOLT_DIAMETER",

    // SUBCATEGORY_STEEL_JOINTS_MISCELLANEOUS
    STEEL_JOINTS_MISCELLANEOUS_VECTORS: "STEEL_JOINTS_MISCELLANEOUS_VECTORS",

    // CATEGORY_STEEL_OBJECTS
    // SUBCATEGORY_STEEL_OBJECTS_ROTATIONAL_RESTRAINTS
    STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS: "STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS",
    STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS: "STEEL_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS",

    // SUBCATEGORY_STEEL_OBJECTS_SHEAR_PANELS
    STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1: "STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1",
    STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2: "STEEL_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2",
    STEEL_OBJECTS_SHEAR_PANELS_STIFFNESS: "STEEL_OBJECTS_SHEAR_PANELS_STIFFNESS",

    // SUBCATEGORY_STEEL_OBJECTS_WELDS
    STEEL_OBJECTS_WELD_SIZE: "STEEL_OBJECTS_WELD_SIZE",

    // SUBCATEGORY_STEEL_OBJECTS_EFFECTIVE_LENGTHS
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_FACTORS: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_FACTORS",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_SPRING: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_SPRING",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_WARPING: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_WARPING",
    STEEL_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY: "STEEL_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY",

    // SUBCATEGORY_STEEL_OBJECTS_BOUNDARY_CONDITIONS
    STEEL_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY: "STEEL_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY",
    STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATION: "STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATION",
    STEEL_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS: "STEEL_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS",
    STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS: "STEEL_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS",
    STEEL_OBJECTS_BOUNDARY_CONDITIONS_WARPING: "STEEL_OBJECTS_BOUNDARY_CONDITIONS_WARPING",

    // CATEGORY_TIMBER_DESIGN
    // SUBCATEGORY_TIMBER_DESIGN_GENERAL
    TIMBER_DESIGN_AXIAL_AND_SHEAR_STRAIN: "TIMBER_DESIGN_AXIAL_AND_SHEAR_STRAIN",
    TIMBER_DESIGN_TORSIONAL_AND_BENDING_STRAIN: "TIMBER_DESIGN_TORSIONAL_AND_BENDING_STRAIN",
    TIMBER_DESIGN_STRESSES: "TIMBER_DESIGN_STRESSES",
    TIMBER_DESIGN_RATIOS: "TIMBER_DESIGN_RATIOS",
    TIMBER_DESIGN_FACTORS: "TIMBER_DESIGN_FACTORS",
    TIMBER_DESIGN_FP_TIME: "TIMBER_DESIGN_FP_TIME",
    TIMBER_DESIGN_FP_TIME_HOUR: "TIMBER_DESIGN_FP_TIME_HOUR",
    TIMBER_DESIGN_LIFETIME: "TIMBER_DESIGN_LIFETIME",
    TIMBER_DESIGN_CHARRING_RATE: "TIMBER_DESIGN_CHARRING_RATE",

    // SUBCATEGORY_TIMBER_OBJECTS_EFFECTIVE_LENGTHS
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_FACTORS: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_FACTORS",
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT",
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_SPRING: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_SPRING",
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS",
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_WARPING: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_WARPING",
    TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY: "TIMBER_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY",

    // SUBCATEGORY_TIMBER_OBJECTS_SHEAR_PANELS
    TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1: "TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1",
    TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2: "TIMBER_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2",
    TIMBER_OBJECTS_SHEAR_PANELS_STIFFNESS: "TIMBER_OBJECTS_SHEAR_PANELS_STIFFNESS",

    // SUBCATEGORY_TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS
    TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS: "TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS",
    TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS: "TIMBER_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS",

    // CATEGORY_ALUMINUM_OBJECTS
    // SUBCATEGORY_ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_FACTORS: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_FACTORS",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_CRITICAL_MOMENT",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_LATERAL_TORSIONAL_BUCKLING_MOMENT: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_LATERAL_TORSIONAL_BUCKLING_MOMENT",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_TOLERANCE",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_SPRING: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_SPRING",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ROTATIONAL_STIFFNESS",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_WARPING: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_WARPING",
    ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY: "ALUMINUM_OBJECTS_EFFECTIVE_LENGTHS_ECCENTRICITY",

    // SUBCATEGORY_ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS
    ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY: "ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ECCENTRICITY",
    ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATION: "ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATION",
    ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS: "ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_STIFFNESS",
    ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS: "ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_ROTATIONAL_STIFFNESS",
    ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_WARPING: "ALUMINUM_OBJECTS_BOUNDARY_CONDITIONS_WARPING",

    // SUBCATEGORY_ALUMINUM_OBJECTS_SHEAR_PANELS
    ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1: "ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K1",
    ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2: "ALUMINUM_OBJECTS_SHEAR_PANELS_COEFFICIENT_K2",
    ALUMINUM_OBJECTS_SHEAR_PANELS_STIFFNESS: "ALUMINUM_OBJECTS_SHEAR_PANELS_STIFFNESS",

    // SUBCATEGORY_ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS
    ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS: "ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_SPRING_STIFFNESS",
    ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS: "ALUMINUM_OBJECTS_ROTATIONAL_RESTRAINTS_ROTATIONAL_STIFFNESS",

    // SUBCATEGORY_ALUMINUM_OBJECTS_WELDS
    ALUMINUM_OBJECTS_WELD_SIZE: "ALUMINUM_OBJECTS_WELD_SIZE",

    // SUBCATEGORY_STABILITY_ANALYSIS_STABILITY_ANALYSIS
    STABILITY_ANALYSIS_FACTORS: "STABILITY_ANALYSIS_FACTORS",
    STABILITY_ANALYSIS_EIGENVECTORS: "STABILITY_ANALYSIS_EIGENVECTORS",
    STABILITY_ANALYSIS_INITIAL_STRAIN: "STABILITY_ANALYSIS_INITIAL_STRAIN",

    //CATEGORY_DYNAMIC_ANALYSIS
    //SUBCATEGORY_DYNAMIC_ANALYSIS_GENERAL
    DYNAMIC_ANALYSIS_GENERAL_ACCELERATIONS: "DYNAMIC_ANALYSIS_GENERAL_ACCELERATIONS",
    DYNAMIC_ANALYSIS_GENERAL_ANGULAR_ACCELERATIONS: "DYNAMIC_ANALYSIS_GENERAL_ANGULAR_ACCELERATIONS",
    DYNAMIC_ANALYSIS_GENERAL_VELOCITIES: "DYNAMIC_ANALYSIS_GENERAL_VELOCITIES",
    DYNAMIC_ANALYSIS_GENERAL_ANGULAR_VELOCITIES: "DYNAMIC_ANALYSIS_GENERAL_ANGULAR_VELOCITIES",
    DYNAMIC_ANALYSIS_GENERAL_MULTIPLIERS: "DYNAMIC_ANALYSIS_GENERAL_MULTIPLIERS",
    DYNAMIC_ANALYSIS_GENERAL_FREQUENCIES: "DYNAMIC_ANALYSIS_GENERAL_FREQUENCIES",
    DYNAMIC_ANALYSIS_GENERAL_ROTATIONS: "DYNAMIC_ANALYSIS_GENERAL_ROTATIONS",
    DYNAMIC_ANALYSIS_GENERAL_FACTORS: "DYNAMIC_ANALYSIS_GENERAL_FACTORS",
    DYNAMIC_ANALYSIS_GENERAL_TIME: "DYNAMIC_ANALYSIS_GENERAL_TIME",
    DYNAMIC_ANALYSIS_GENERAL_EIGENVECTORS: "DYNAMIC_ANALYSIS_GENERAL_EIGENVECTORS",
    DYNAMIC_ANALYSIS_GENERAL_EIGENVALUES: "DYNAMIC_ANALYSIS_GENERAL_EIGENVALUES",
    DYNAMIC_ANALYSIS_GENERAL_ANGULAR_FREQUENCIES: "DYNAMIC_ANALYSIS_GENERAL_ANGULAR_FREQUENCIES",
    DYNAMIC_ANALYSIS_GENERAL_DAMPING: "DYNAMIC_ANALYSIS_GENERAL_DAMPING",
    DYNAMIC_ANALYSIS_GENERAL_COMBINATION_PERCENTAGE: "DYNAMIC_ANALYSIS_GENERAL_COMBINATION_PERCENTAGE",
    DYNAMIC_ANALYSIS_GENERAL_G_FACTOR: "DYNAMIC_ANALYSIS_GENERAL_G_FACTOR",

    //SUBCATEGORY_DYNAMIC_ANALYSIS_MASSES
    DYNAMIC_ANALYSIS_MASSES_MODAL_MASSES: "DYNAMIC_ANALYSIS_MASSES_MODAL_MASSES",
    DYNAMIC_ANALYSIS_MASSES_TRANSLATIONAL_MASSES: "DYNAMIC_ANALYSIS_MASSES_TRANSLATIONAL_MASSES",
    DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_MASSES: "DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_MASSES",
    DYNAMIC_ANALYSIS_MASSES_PERCENTAGE_EFFECTIVE_MODAL_MASSES: "DYNAMIC_ANALYSIS_MASSES_PERCENTAGE_EFFECTIVE_MODAL_MASSES",
    DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_PARTICIPATION_FACTORS: "DYNAMIC_ANALYSIS_MASSES_ROTATIONAL_PARTICIPATION_FACTORS",
    DYNAMIC_ANALYSIS_MASSES_MODAL_MASS_FACTORS: "DYNAMIC_ANALYSIS_MASSES_MODAL_MASS_FACTORS",

    //CATEGORY_CRANEWAY_DESIGN
    //SUBCATEGORY_CRANEWAY_DESIGN_GENERAL
    CRANEWAY_LENGTH: "CRANEWAY_LENGTH",
    CRANEWAY_DESIGN_RATIOS: "CRANEWAY_DESIGN_RATIOS",
};

// parameters shortcuts

function category(name, multiplicity_counter_key, parent) {
    if (parent === undefined) {
        current_category = block.add_category(name, multiplicity_counter_key);
    }
    else {
        current_category = parent.add_category(name, multiplicity_counter_key);
    }
    current_row = current_category;

    return current_category;
}

function loading_category(name) {
    current_category = block.add_loading_category(name);
    current_row = current_category;
    return current_category;
}

function add_parameter(key, description, multiplicity_counter_key) {
    current_parameter = current_category.add_parameter(key, description, multiplicity_counter_key);
    current_row = current_parameter;
    return current_parameter;
}

function parameter_int(name, key, symbol, value, unit, minimum, step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key) {
    add_parameter(key, name, multiplicity_counter_key);

    current_parameter.set_definition_type(INTEGER);
    if (symbol === undefined || symbol.length == 0) {
        current_parameter.set_symbol(key);
    }
    else {
        current_parameter.set_symbol(symbol);
    }

    current_parameter.set_value(value);
    current_parameter.set_unit(unit);
    current_parameter.set_step(step);
    current_parameter.set_minimum(minimum, minimum_inclusive);
    current_parameter.set_maximum(maximum, maximum_inclusive);
    return current_parameter;
}

function parameter_float(name, key, symbol, value, unit, minimum, step, maximum, minimum_inclusive, maximum_inclusive, multiplicity_counter_key) {
    add_parameter(key, name, multiplicity_counter_key);

    current_parameter.set_definition_type(FLOAT);
    if (symbol === undefined || symbol.length == 0) {
        current_parameter.set_symbol(key);
    }
    else {
        current_parameter.set_symbol(symbol);
    }

    current_parameter.set_value(value);
    current_parameter.set_unit(unit);
    current_parameter.set_step(step);
    current_parameter.set_minimum(minimum, minimum_inclusive);
    current_parameter.set_maximum(maximum, maximum_inclusive);
    return current_parameter;
}

function input_object(key, object_type, description, multiplicity_counter_key) {
    add_parameter(key, description, multiplicity_counter_key);

    current_parameter.set_definition_type(OBJECT);
    current_parameter.set_object_type(object_type);
    current_parameter.set_object_id("-1");
    return current_parameter;
}

function material(no, name, multiplicity_counter_key) {
    return input_object("material_" + no, MATERIAL, name, multiplicity_counter_key);
}

function section(no, name, multiplicity_counter_key, category) {
    return input_object("section_" + no, SECTION, name, multiplicity_counter_key);
}

function thickness(no, name, multiplicity_counter_key) {
    return input_object("thickness_" + no, THICKNESS, name, multiplicity_counter_key);
}

function nodal_support(no, name, multiplicity_counter_key) {
    return input_object("nodal_support_" + no, NODAL_SUPPORT, name, multiplicity_counter_key);
}

function line_support(no, name, multiplicity_counter_key) {
    return input_object("line_support_" + no, LINE_SUPPORT, name, multiplicity_counter_key);
}

function member_support(no, name, multiplicity_counter_key) {
    return input_object("member_support_" + no, MEMBER_SUPPORT, name, multiplicity_counter_key);
}

function surface_support(no, name, multiplicity_counter_key) {
    return input_object("surface_support_" + no, SURFACE_SUPPORT, name, multiplicity_counter_key);
}

function load_case(no, name, multiplicity_counter_key) {
    return input_object("load_case_" + no, LOAD_CASE, name, multiplicity_counter_key);
}

function parameter_check(description, key, value) {
    add_parameter(key, description);

    current_parameter.set_definition_type(CHECKBOX);
    current_parameter.set_value(value);
    return current_parameter;
}

function condition(value) {
    current_row.set_condition(value);
}

function editable_condition(value) {
    current_row.set_editable_condition(value);
}

function set_global_parameter(value) {
    current_row.set_global_parameter(value);
}

function editable(value) {
    current_row.set_editable(value);
}

function combobox(description, key) {
    add_parameter(key, description);

    current_parameter.set_definition_type(ENUM_COMBOBOX);
    return current_parameter;
}

function combobox_value(description, value, is_default) {
    current_parameter.add_popup_value(description, value, is_default);
}

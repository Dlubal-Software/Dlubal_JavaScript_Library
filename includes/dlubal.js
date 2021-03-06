include("table_shortcuts.js");
include("block.js");
// Global Parameters
include("GlobalParameters/FormulaGlobalParameter.js");
include("GlobalParameters/OptimizationGlobalParameter.js");
include("GlobalParameters/OptimizationAscendingGlobalParameter.js");
include("GlobalParameters/OptimizationDescendingGlobalParameter.js");
include("GlobalParameters/ValueGlobalParameter.js");
// Analysis settings
include("AnalysisSettings/ModalAnalysisSettings.js");
include("AnalysisSettings/SpectralAnalysisSettings.js");
include("AnalysisSettings/StabilityAnalysisSettings.js");
include("AnalysisSettings/StaticAnalysisSettings.js");
include("AnalysisSettings/WindSimulationSettings.js");
// Basic objects
if (RFEM) {
    include("BasicObjects/LineSet.js");
    include("BasicObjects/Line.js");
    include("BasicObjects/SolidSet.js");
    include("BasicObjects/Solid.js");
    include("BasicObjects/SurfaceSet.js");
    include("BasicObjects/Surface.js");
    include("BasicObjects/Opening.js");
    include("BasicObjects/Thickness.js");
}
if (RSECTION) {
    include("BasicObjects/rsection_point.js");
    include("BasicObjects/rsection_line.js");
    include("BasicObjects/rsection_part.js");
    include("BasicObjects/rsection_opening.js");
    include("BasicObjects/rsection_element.js");
    include("BasicObjects/rsection_stress_point.js");
}
include("BasicObjects/Material.js");
include("BasicObjects/MemberSet.js");
include("BasicObjects/Member.js");
include("BasicObjects/Node.js");
include("BasicObjects/Section.js");
// Load wizards
include("LoadWizards/MemberLoadFromAreaLoadWizard.js");
include("LoadWizards/MemberLoadFromFreeLineLoadWizard.js");
include("LoadWizards/SnowLoadWizard.js");
include("LoadWizards/WindLoadWizard.js");
// Special objects
include("SpecialObjects/StructureModification.js");
// Supports
include("Supports/Functions.js");
include("Supports/Nonlinearities/Nonlinearities.js");
include("Supports/Nonlinearities/NonlinearitiesX.js");
include("Supports/Nonlinearities/NonlinearitiesY.js");
include("Supports/Nonlinearities/NonlinearitiesZ.js");
include("Supports/Nonlinearities/NonlinearitiesRx.js");
include("Supports/Nonlinearities/NonlinearitiesRy.js");
include("Supports/Nonlinearities/NonlinearitiesRz.js");
// Types for Nodes
include("TypesForNodes/NodalMeshRefinement.js");
include("TypesForNodes/NodalSupport.js");
// Types for Lines
if (RFEM) {
    include("TypesForLines/LineHinge.js");
    include("TypesForLines/LineMeshRefinement.js");
    include("TypesForLines/LineSupport.js");
}
// Types for Members
include("TypesForMembers/MemberDefinableStiffness.js");
include("TypesForMembers/MemberEccentricity.js");
include("TypesForMembers/MemberHinge.js");
include("TypesForMembers/MemberNonlinearity.js");
include("TypesForMembers/MemberResultIntermediatePoint.js");
include("TypesForMembers/MemberStiffnessModification.js");
include("TypesForMembers/MemberSupport.js");
include("TypesForMembers/MemberTransverseStiffener.js");
// Types for Surfaces
if (RFEM) {
    include("TypesForSurfaces/SurfaceEccentricity.js");
    include("TypesForSurfaces/SurfaceMeshRefinement.js");
    include("TypesForSurfaces/SurfaceSupport.js");
	include("TypesForSurfaces/SurfaceStiffnessModification.js");
// Types for solids
	include("TypesForSolids/ContactSolids.js");
	include("TypesForSolids/GasSolids.js");
	include("TypesForSolids/SolidMeshRefinement.js");
}
// Loading
include("Loading/LoadCombination.js");
include("Loading/LoadCase.js");
include("Loading/DesignSituation.js")
// Loads
if (RFEM) {
    include("Loads/FreeCircularLoad.js");
    include("Loads/FreeConcentratedLoad.js");
    include("Loads/FreeLineLoad.js");
    include("Loads/FreePolygonLoad.js");
    include("Loads/FreeRectangularLoad.js");
    include("Loads/LineLoad.js");
    include("Loads/LineSetLoad.js");
    include("Loads/OpeningLoad.js");
    include("Loads/SolidLoad.js");
    include("Loads/SolidSetLoad.js");
    include("Loads/SurfaceLoad.js");
    include("Loads/SurfaceSetLoad.js");
}
include("Loads/ImposedLineDeformation.js");
include("Loads/ImposedNodalDeformation.js");
include("Loads/MemberLoad.js");
include("Loads/MemberSetLoad.js");
include("Loads/NodalLoad.js");
// Guide objects
include("GuideObjects/CoordinateSystem.js");
// Dimensions
include("Dimensions/AngularDimension.js");
include("Dimensions/ArcLengthDimension.js");
include("Dimensions/DiameterDimension.js");
include("Dimensions/LinearDimension.js");
include("Dimensions/RadiusDimension.js");
include("Dimensions/SlopeDimension.js");

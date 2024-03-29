var t1 = new Date().getTime();
if (!RFEM) {
    throw new Error("This script is only for RFEM, it creates types for members.");
}
include("../includes/Tools/high_level_functions_support.js");

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../includes/Tools/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");

var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);
var nodesForSurfaces = createNodesGrid(-28, -28, [10, 10], [3, 2]);
createSurfacesFromNodesGrid(nodesForSurfaces, [5, 5], surfaces.TYPE_STANDARD, thickness);

/*****************************************Surface eccentricity********************************/
var surfaceEccentricity = new SurfaceEccentricity(undefined, [1, 2, 3, 4, 5], "Surface eccentricity for surfaces no. 1 - 5");
surfaceEccentricity.OffsetAndThicknessAssignment(20mm, "THICKNESS_ALIGNMENT_BOTTOM", "Surface eccentricity for surfaces no. 1 - 5");
var surfaceEccentricity2 = new SurfaceEccentricity(undefined, [6]);
var member = new Member();
member.Beam(undefined, 21, 1);
surfaceEccentricity2.TransverseOffset("REFERENCE_TYPE_MEMBER", 1, "TRANSVERSE_OFFSET_TOP");
/*********************************************************************************************/

/********************************Surface stiffness modification*******************************/
var no = 1;
var structureModification = structure_modifications.create();
var surfaceStiffnessModificationDefault = new SurfaceStiffnessModification(no++, 1, "Default surface stiffness modification");
var surfaceStiffnessModification = new SurfaceStiffnessModification();
surfaceStiffnessModification.TotalStiffnessFactor(no++, 1, 20);
surfaceStiffnessModification.PartialStiffnessesFactors(no++, 1, 1.01, 1.02, 1.03, 1.04, 1.1);
surfaceStiffnessModification.StiffnessMatrixElementsFactors(no++, 1, [1.1, 1.2, 1.3, 1.4, 1.5, 1.6]);	// Bending/Torsional Stiffness Elements
surfaceStiffnessModification.StiffnessMatrixElementsFactors(no++, 1, undefined, [1.1, 1.2, 1.3]);	// Shear stiffness elements
surfaceStiffnessModification.StiffnessMatrixElementsFactors(no++, 1, undefined, undefined, [1.01, 1.02, 1.03, 1.04, 1.1, 1.12]);	// Membrane stiffness elements
surfaceStiffnessModification.StiffnessMatrixElementsFactors(no++, 1, undefined, undefined, undefined, [1.01, 1.02, 1.03, 1.04, 1.1, 1.12]);	// Eccentric stiffness elements
surfaceStiffnessModification.ConcreteStructuresACI(no++, 1);	// With default WALLS_UNCRACKED component type
surfaceStiffnessModification.ConcreteStructuresACI(no++, 1, "WALLS_CRACKED");
surfaceStiffnessModification.ConcreteStructuresCSA(no++, 1, "PLATES_AND_FLAT_SLABS");
/*********************************************************************************************/

/**********************************Surface mesh refinement************************************/
var surfaceMeshRefinement = new SurfaceMeshRefinement(undefined, [16, 17, 18, 19], 0.025);
/*********************************************************************************************/
var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");

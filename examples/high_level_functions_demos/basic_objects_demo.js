include("../includes/Tools/high_level_functions_support.js");
/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/
//!!! There are two bugs (random generation of nodes on line/member)!!!
run("../includes/Tools/clearAll.js");
var t1 = new Date().getTime();

var material = new Material(1, "S235");
var materialConcrete = new Material(2, "C25/30");

var section = new Section(1, "IPE 80", material.GetNo());
var section2 = new Section(2, "IPE 100", material.GetNo());
section2.Rotation(Math.PI / 4);
var section3 = new Section(3, "IPE 120", material.GetNo());
TORSIONAL_WARPING.setActive(true);
section3.DeactivateWarpingStiffness(false);	// Warping property is enable to set
section3.SectionProperties(undefined, undefined, 10-E4, 0.065, 0.121);
var section4 = new Section(4, "R_M1 0.5/1.0", materialConcrete.GetNo());
COST_ESTIMATION.setActive(true);
section4.EmissionEstimationValues(1, 2, 3, 4);

var nodesForMembers = createNodesGrid(-28, -28, [10, 6], [3, 4]);

if (RFEM) {
	var nodeForLines = createNodesGrid(-28, -6, [10, 10], [3, 4]);
	var thickness = createThickness("0.250", materialConcrete.GetNo(), thicknesses.TYPE_UNIFORM);
	var solid = makeSolid([[8, -16, 0], [20, -16, 0], [20, -8, 0], [8, -8, 0], [8, -16, -5], [20, -16, -5], [20, -8, -5], [8, -8, -5]]);
	var nodesForSurfaces = createNodesGrid(1, 10, [10, 10], [3, 2]);
	var linesForSurfaces = createSurfacesFromNodesGrid(nodesForSurfaces, [5, 5], undefined, undefined, true);

	/*For line welded joints
				   line1			line2
			   +-------------+-------------+node3
			  /node1		 /|	node2	   /
			 /				/ |			  /
			/			   /  |			 /line3
	 line6	/		line7 /	  |	line9   /
		  /			     /	  |		   /
		 /	node6		/node5|		  /
		+----line5----+-----line4---+node4
					  |	      |
							  +node8
					  |	     /
			   line8  |	    /
					  |	   /line10
					  |   /
					  |  /
					  | /
					  +node7
   */
	var node1 = createNode(8, -5, 0);
	var node2 = createNode(13, -5, 0);
	var node3 = createNode(18, -5, 0);
	var node4 = createNode(18, 0, 0);
	var node5 = createNode(13, 0, 0);
	var node6 = createNode(8, 0, 0);
	var node7 = createNode(node5.coordinate_1, node5.coordinate_2, 5);
	var node8 = createNode(node2.coordinate_1, node2.coordinate_2, 5);
	var line1 = createLine(node1.no, node2.no);
	var linearc = createLine(node2.no, node3.no);
	var line3 = createLine(node3.no, node4.no);
	var line4 = createLine(node5.no, node4.no);
	var line5 = createLine(node6.no, node5.no);
	var line6 = createLine(node6.no, node1.no);
	var lineForWeldedJoint = new Line();
	lineForWeldedJoint.Polyline(100000, [node5.no, node2.no]);
	var lineForWeldedJointNo = lineForWeldedJoint.GetNo();
	var line8 = createLine(node5.no, node7.no);
	var line9 = createLine(node2.no, node8.no);
	var line10 = createLine(node7.no, node8.no);
	var surfaceForWeldedJoint = createSurface([line1.no, 100000, line5.no, line6.no], surfaces.TYPE_STANDARD, thickness);
	var surface2ForWeldedJoint = createSurface([linearc.no, line3.no, line4.no, lineForWeldedJointNo], surfaces.TYPE_STANDARD, thickness);
	var surface3ForWeldedJoint = createSurface([lineForWeldedJointNo, line9.no, line10.no, line8.no], surfaces.TYPE_STANDARD, thickness);
}

/*************************************** Members *********************************************/
var member = new Member();
if (RFEM) {
	// Member defined by line
	var line = new Line(undefined, [1, 2]);
	member.Beam(undefined, line.no, 1);
} else {
	// Member defined by nodes
	member.Beam(undefined, [1, 2], 2);
}
member.Rigid(undefined, [3, 4], "Beam member");
member.Truss(undefined, [5, 6], 1, "Truss member");
member.TrussOnlyN(undefined, [7, 8], 1, "Truss only N member");
member.Tension(undefined, [9, 10], 1, "Tension members");
member.Compression(undefined, [11, 12], 1, "Compression member");
member.Buckling(undefined, [13, 14], 1, "Buckling member");
member.Cable(undefined, [15, 16], 1, "Cable member");
member.CouplingRigidRigid(undefined, [17, 18], "Coupling rigid-rigid member");
member.CouplingRigidHinge(undefined, [19, 20], "Coupling rigid-hinge member");
member.CouplingHingeRigid(undefined, [21, 22], "Coupling hinge-rigid member");
member.CouplingHingeHinge(undefined, [23, 24], "Coupling hinge-hinge member");

var surfaceMember = new Member();
var section10 = new Section(10, "", material.GetNo());
section10.SectionType("STANDARDIZED_STEEL");
surfaceMember.SurfaceModel(1100, [160, 150], section10.GetNo(), 2, "Surface model member");

// Result beam with "Integrate stresses and forces within block with square area" (1), with included objects
if (RFEM) {
	member.ResultBeam(undefined, [25, 26], 1, "INTEGRATE_WITHIN_CUBOID_QUADRATIC", [1.5], [[1], [1, 2], true]);
	// Result beam with "Integrate stresses and forces within cuboid" (2), with excluded members
	member.ResultBeam(undefined, [27, 28], 1, "INTEGRATE_WITHIN_CUBOID_GENERAL", [0, 1.1, 0, 1.2], undefined, [undefined, [1], undefined]);
}
// Definable stiffness member (set via member definable stiffness object)
var member2 = new Member(undefined, [29, 30]);
member2.type = members.TYPE_DEFINABLE_STIFFNESS;
var member3 = new Member(undefined, [31, 32]);
member3.type = members.TYPE_DEFINABLE_STIFFNESS;
var memberDefinableStiffness = new MemberDefinableStiffness(undefined, [member2.no, member3.no]);
// Option: nodes on member
var member4 = new Member();
member4.Beam(undefined, [33, 34], 1);
//var nodeOnMember = new Node();
//nodeOnMember.OnMember(undefined, member4.member.no, "XY", [true, 10, true, 90]);
//nodeOnMember.OnMember(undefined, member4.member.no, "XY", [true, 20, true, 80]);
//member4.NodesOnMember([[undefined, "XY", 0.1, 0.9], [undefined, "XY", 0.2, 0.8]]);	// Bug?
// Option: member hinges
var member5 = new Member();
member5.Beam(undefined, [35, 36], 1);
var memberEccentricity = new MemberEccentricity();
memberEccentricity.RelativeToSection(undefined, [], [], "RIGHT_TOP");
memberEccentricity.RelativeAndAbsolute(undefined, [], [], "RIGHT_BOTTOM", 0.005, 0.0015, 0.002);
member5.Eccentricities(1, 2);
// Option: member support
var member6 = new Member();
member6.Beam(undefined, [37, 38], 1);
var memberSupport = new MemberSupport();
memberSupport.Fixed();
member6.Supports(1);
// Option: nonlinearity
var member7 = new Member();
member7.Beam(undefined, [39, 40], 1);
var memberNonlinearity = new MemberNonlinearity();
memberNonlinearity.FailureIfTensionWithSlippage(undefined, [], 0.05);
member7.Nonlinearity(1);
// Option: member result intermediate points
var memberResultIntermediatePoint = new MemberResultIntermediatePoint(undefined, [], "MemberResultIntermediatePoint with uniform distances");
memberResultIntermediatePoint.UniformDistances(5, ["ord. 1", "ord. 2", "ord. 3", "ord. 4", "ord. 5"]);
var member8 = new Member();
member8.Beam(undefined, [41, 42], 1);
member8.ResultIntermediatePoints(1);
// Option: End modifications
var member9 = new Member();
if (RFEM) {
	member9.Beam(undefined, [43, 44, 56, 46, 47], 1);
}
else {
	member9.Beam(undefined, [43, 44], 1);
}
member9.EndModifications([0.1, 0.2, 0.2], [0.5, 0.2, 0.3]);
// Option: Deactivate for calculation
member9.DeactivateForCalculation();
// Section distribution
var member10 = new Member();
member10.Beam(undefined, [48, 49], 1);
member10.SectionDistributionUniform();
var member12 = new Member();
member12.Beam(undefined, [51, 52], 2);
member12.SectionDistributionLinear(section.no, section2.no, "TOP");
var member13 = new Member();
member13.Beam(undefined, [53, 54], 1);
member13.SectionDistributionTaperedAtBothSides(section.no, section2.no, section3.no, "XY", [0.30, true], [1.5, false], "BOTTOM");//add sections
var member14 = new Member();
member14.Beam(undefined, [55, 56], 1);
member14.SectionDistributionTaperedAtStart(section3.no, section2.no, "XY", [0.30, true], "TOP");
var member15 = new Member();
member15.Beam(undefined, [57, 58], 1);
member15.SectionDistributionTaperedAtEnd(section.no, section2.no, undefined, [1.5, false], "BOTTOM");	// With default reference type (L)
var member16 = new Member();
member16.Beam(undefined, [59, 60], 1);
member16.SectionDistributionSaddle(section.no, section3.no, section2.no, "XY", [2, false]);
var member17 = new Member();
member17.Beam(undefined, [76, 77], 1);
member17.SectionDistributionOffsetAtBothSides(section.no, section3.no, section2.no, "XY", [0.30, true], [1.5, false], "BOTTOM");
var member18 = new Member();
member18.Beam(undefined, [115, 116], 1);
member18.SectionDistributionOffsetAtStart(section2.no, section.no, "XY", [0.30, true]);	// With default section alignment (top)
var member19 = new Member();
member19.Beam(undefined, [117, 118], 1);
member19.SectionDistributionOffsetAtEnd(section.no, section2.no, "XZ", [2.5, false], "CENTRIC");
/*********************************************************************************************/

if (RFEM) {
	/***************************************** Lines *********************************************/
	var line = new Line(undefined, [61, 62], "First line with default type");
	var linearc = new Line();
	linearc.Polyline(undefined, [63, 74, 64, 75, 65]);
	linearc.Arc(undefined, [66, 68], [-10, 7, 0]);
	linearc.Arc(undefined, [69, 70], [-8, 7, 0], [undefined, undefined, 2.5]);	// with α parameter defined
	linearc.Arc(undefined, [71, 72], [-24, 8, 0], undefined, [-29, 7.5, 0]);		// with moved center of arc
	linearc.Circle(undefined, [nodes[83].coordinate_1, nodes[83].coordinate_2, nodes[83].coordinate_3], 2, [1, 0, 0]); // with normal parallel to X-Axis
	linearc.EllipticalArc(undefined, [nodes[84].coordinate_1, nodes[84].coordinate_2, nodes[84].coordinate_3], [nodes[87].coordinate_1, nodes[87].coordinate_2, nodes[87].coordinate_3], [nodes[96].coordinate_1, nodes[96].coordinate_2, nodes[96].coordinate_3]);
	linearc.Ellipse(undefined, [88, 100], [nodes[98].coordinate_1, nodes[98].coordinate_2, nodes[98].coordinate_3]);
	linearc.Parabola(undefined, [81, 93], [nodes[101].coordinate_1, nodes[101].coordinate_2, nodes[101].coordinate_3]);
	linearc.Spline(undefined, [103, 94, 105, 95, 106]);
	linearc.NURBS(undefined, [107, 109], [[-7, 14, 0, undefined], [-7, 10, 0, undefined], [-4, 14, 0, undefined]], 3);
	// Option: rotation
	var line3 = new Line();
	line3.Polyline(undefined, [121, 122]);
	line3.Rotation([20]);	// type: angle
	line3.Polyline(undefined, [123, 124]);
	line3.Rotation([113, "x-z"], 2);	// type: help node
	line3.Circle(undefined, [nodes[126].coordinate_1, nodes[126].coordinate_2, nodes[126].coordinate_3], 3);
	line3.Rotation(["x-z"], 3);	// Inside (non-straight line)
	// Option: member
	var line4 = new Line();
	line4.Polyline(undefined, [128, 129]);
	// line4.AssignMember();
	// Option: nodes on line
	var line5 = new Line();
	line5.Polyline(undefined, [131, 132]);
	//line5.NodesOnLine([[undefined, "XY", 0.1, 0.9], [undefined, "XZ", 0.2, 0.8]]); // Bug?
	// Option: Supports
	var lineSupport = new LineSupport();
	lineSupport.Hinged();
	var line6 = new Line();
	line6.Spline(undefined, [142, 133, 144, 134, 145]);
	line6.Supports(1);
	// Option: line mesh refinement
	var lineMeshRefinement = new LineMeshRefinement();
	var line7 = new Line();
	line7.Polyline(undefined, [146, 147]);
	line7.MeshRefinement(lineMeshRefinement.settings.no);
	// Option: welded joints
	var lineWeldedJoint = line_welded_joints.create();
	lineForWeldedJoint.WeldedJoints([[lineWeldedJoint.no, surfaceForWeldedJoint.no, surface2ForWeldedJoint.no, undefined]]);
	// Other
	var line8 = new Line();
	line8.RectangularPolygon(undefined, [nodes[114].coordinate_1, nodes[114].coordinate_2, nodes[114].coordinate_3], 2, 4);
	line8.nPolygon(undefined, [nodes[149].coordinate_1, nodes[149].coordinate_2, nodes[149].coordinate_3], 5, 2);
	/*********************************************************************************************/

	/*************************************** Surfaces ********************************************/
	// Default plane surfaces
	var surface = new Surface();
	surface.Standard(undefined, linesForSurfaces[1][0], 1, "With default plane geometry type");
	surface.WithoutThickness(undefined, linesForSurfaces[2][0], "With default plane geometry type");
	surface.Rigid(undefined, linesForSurfaces[3][0], "With default plane geometry type");
	surface.Membrane(undefined, linesForSurfaces[4][0], 1, "With default plane geometry type");
	surface.WithoutMembraneTension(undefined, linesForSurfaces[5][0], 1, "With default plane geometry type");
	var surfaceLoadTransfer = new Surface();
	surfaceLoadTransfer.LoadTransfer(undefined, linesForSurfaces[6][0], "DIRECTION_IN_Y", "UNIFORM", "With default plane geometry type");
	// Load transfer surface options
	surfaceLoadTransfer.RemoveInfluenceFrom(undefined, undefined, [13, 14, 15, 16], undefined, [189,190,199,200]);	// with lines and nodes defined
	surfaceLoadTransfer.SurfaceWeight(2000);
	surfaceLoadTransfer.ConsiderMemberEccentricity();
	surfaceLoadTransfer.ConsiderSectionDistribution();
	surfaceLoadTransfer.AdvancedDistribution(0.05);
	surfaceLoadTransfer.NeglectEquilibriumOfMoments();
	// Geometry type: quadrangle
	nodes[202].coordinate_3 = 0.5;
	surface.Quadrangle(undefined, linesForSurfaces[7][0], "STANDARD", 1);
	// Geometry type NURBS
	surface.Standard(undefined, linesForSurfaces[8][0], 1);
	var coreSurface = surface.GetSurface();
	for (var i = 0; i < coreSurface.boundary_lines.length; ++i) {
		coreSurface.boundary_lines[i].type = lines.TYPE_NURBS;
	}
	surface.NURBS();
	// Geometry type: rotated
	surface.Rotated(undefined, linesForSurfaces[9][0], "STANDARD", 1, 56, 0.2, [nodes[120].coordinate_1, nodes[120].coordinate_2, nodes[120].coordinate_3], [nodes[130].coordinate_1, nodes[130].coordinate_2, nodes[130].coordinate_3]);
	// TODO
	// Geometry type: pipe
	surface.Standard(undefined, linesForSurfaces[10][0], 1);
	// TODO
	// Option: grid for results
	// TODO
	// Option: hinges
	surface.Standard(undefined, linesForSurfaces[11][0], 1);
	var surfaceWithHingesNo = surface.GetNo();
	var lineHinge = new LineHinge(undefined, undefined);
	surface.Hinges([[surfaces[surfaceWithHingesNo].boundary_lines[1], lineHinge.lineHinge.no]]);
	// Option: support
	var surfaceSupport = new SurfaceSupport();
	surfaceSupport.Fixed();
	surface.Rigid(undefined, linesForSurfaces[12][0]);
	surface.Support(1);
	// Option: eccentricity
	var surfaceEccentricity = new SurfaceEccentricity();
	surface.Standard(undefined, linesForSurfaces[13][0]);
	surface.Eccentricity(1);
	// Option: mesh refinement (free meshing type)
	var meshRefinement = new SurfaceMeshRefinement(undefined, undefined);
	surface.WithoutThickness(undefined, linesForSurfaces[14][0]);
	surface.MeshRefinement(1, 3);
	// Option: specific axes
	surface.Standard(undefined, linesForSurfaces[15][0]);
	var inputAxesValues = [1, [45, undefined, undefined]];
	surface.SpecificAxes(inputAxesValues);	// Angular rotation category
	surface.Standard(undefined, linesForSurfaces[16][0]);
	inputAxesValues = [2, [[surface.surface.boundary_lines[0], surface.surface.boundary_lines[1]], "AXIS_Y"]];
	surface.SpecificAxes(inputAxesValues);	// Axis parallel to lines category
	surface.Standard(undefined, linesForSurfaces[17][0]);
	var node1 = linesForSurfaces[17][1][0];
	var node2 = linesForSurfaces[17][1][1];
	inputAxesValues = [3, [[node1.coordinate_1, node1.coordinate_2, node1.coordinate_3], [node2.coordinate_1, node2.coordinate_2, node2.coordinate_3], undefined]];
	surface.SpecificAxes(inputAxesValues);	// Axis directed to point category, with default "Axis x"
	surface.Standard(undefined, linesForSurfaces[18][0]);
	surface.SpecificAxes([4, [], true]);	// Axis parallel to coordinate system category, with default global axis and reverse local z-axis
	// Option: integrated objects
	var integratedLine = new Line();
	integratedLine.Polyline(undefined, [linesForSurfaces[19][1][0], linesForSurfaces[19][1][2]]);
	surface.Standard(undefined, linesForSurfaces[19][0]);
	surface.IntegratedObjects(false, undefined, [integratedLine.line.no]);

	/*********************************************************************************************/

	var surface2 = new Surface();
	surface2.Standard(undefined, linesForSurfaces[20][0]);
	var material2 = createMaterial("C16/20");
	var thickness2 = new Thickness();
	thickness2.Uniform(undefined, "Thickness2", material2, 0.180);
	surface2.SurfaceType("MEMBRANE", undefined, thickness2.thickness);

	member.Rib(undefined, [239, 240], 4, "ALIGNMENT_ON_Z_SIDE_NEGATIVE", true, true, [[1.0, "REFERENCE_LENGTH_TYPE_SEGMENT_LENGTH", "REFERENCE_LENGTH_WIDTH_SIXTH", 3.0, 3.0]]);
}

// Sets
if (RSTAB) {
	var member1000 = new Member();
	member1000.Beam(1000, [25, 26], 1);
	var member1001 = new Member();
	member1001.Beam(1001, [26, 27], 1);
	var member1002 = new Member();
	member1002.Beam(1002, [45, 46], 1);
	var member1003 = new Member();
	member1003.Beam(1003, [46, 47], 1);
	var memberSet = new MemberSet(1, [1000, 1001]);
	var memberSetContinuous = new MemberSet();
	memberSetContinuous.ContinuousMembers(2, [1003, 1002]);
	var memberSetGroup = new MemberSet();
	memberSetGroup.GroupOfMembers(3, [6, 8]);
}

if (RFEM) {
	var member1000 = new Member();
	member1000.Beam(1000, [157, 158], 1);
	var member1001 = new Member();
	member1001.Beam(1001, [158, 159], 1);
	var member1002 = new Member();
	member1002.Beam(1002, [155, 156], 1);
	var member1003 = new Member();
	member1003.Beam(1003, [156, 157], 1);
	var memberSet = new MemberSet(1, [1000, 1001]);
	var memberSetContinuous = new MemberSet();
	memberSetContinuous.ContinuousMembers(2, [1003, 1002]);
	var memberSetGroup = new MemberSet();
	memberSetGroup.GroupOfMembers(3, [6, 8]);
	var line10000 = new Line(10000, [151, 152], "First line with default type");
	var line10001 = new Line(10001, [152, 153], "First line with default type");
	var line10002 = new Line(10002, [153, 154], "First line with default type");
	var line10003 = new Line(10003, [154, 155], "First line with default type");
	var lineSet = new LineSet(1, [10000, 10001]);
	var lineSetContinuous = new LineSet().ContinuousLines(2, [10002, 10003]);
	var lineSetGroup = new LineSet().GroupOfLines(3, [165, 166]);

	var surfaceSetContinuous = new SurfaceSet().ContinuousSurfaces(1, [7, 8]);
	var surfaceSetGroup = new SurfaceSet().GroupOfSurfaces(2, [22, 27]);

	var solidSet = new SolidSet().GroupOfSolids(1, [1]);
}

if (RFEM) {
	/*************************************** Openings ********************************************/
	var nodesForOpening = [
		createNode(linesForSurfaces[4][1][0].coordinate_1 - 0.5, linesForSurfaces[4][1][0].coordinate_2 + 0.5, linesForSurfaces[4][1][0].coordinate_3),
		createNode(linesForSurfaces[4][1][1].coordinate_1 + 0.5, linesForSurfaces[4][1][1].coordinate_2 + 0.5, linesForSurfaces[4][1][1].coordinate_3),
		createNode(linesForSurfaces[4][1][2].coordinate_1 + 0.5, linesForSurfaces[4][1][2].coordinate_2 - 0.5, linesForSurfaces[4][1][1].coordinate_3),
		createNode(linesForSurfaces[4][1][3].coordinate_1 - 0.5, linesForSurfaces[4][1][3].coordinate_2 - 0.5, linesForSurfaces[4][1][3].coordinate_3)
	]
	var linesForOpenings = [
		createLine(nodesForOpening[0], nodesForOpening[1]),
		createLine(nodesForOpening[1], nodesForOpening[2]),
		createLine(nodesForOpening[2], nodesForOpening[3]),
		createLine(nodesForOpening[3], nodesForOpening[0])
	]
	var opening = new Opening(undefined, linesForOpenings);

}

var t2 = new Date().getTime();
var time = (t2 - t1) / 1000;
console.log("Elapsed time: " + time + "s");

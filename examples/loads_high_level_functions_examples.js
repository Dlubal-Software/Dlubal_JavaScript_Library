/**********************************************************************************************
************************************* Support functions****************************************
**********************************************************************************************/

function createMaterial(name)
{
	var material = materials.create();
	material.name = name;
	return material;
}

function createSection(material, databaseName)
{
	var section = sections.create();
	section.material = material.no;
	section.name = databaseName;
	return section;
}

function createNode(x, y, z)
{
	var node = nodes.create();
	node.coordinates = $V(x, y, z);
	return node;
}

function createLine(startNode, endNode)
{
	var line = lines.create();
	line.definition_nodes = [startNode, endNode];
	return line;
}

function createThickness(thick, material, type)
{
	var thickness = thicknesses.create();
	thickness.type = type;
	thickness.material = material;
	thickness.uniform_thickness = thick;
	return thickness;
}

function createSurface(boundaryLines, surfaceType, surfaceThickness)
{
	var surface = surfaces.create();
	surface.boundary_lines = boundaryLines;
	surface.type = surfaceType;
	if (surfaceType==surfaces.TYPE_STANDARD)
	{
		surface.thickness = surfaceThickness;
	}
	return surface;
}

function createMember(nodes, section, memberType, line)
{
	if (RFEM)
    {
		if (typeof line == "undefined")
        {
			var line = lines.create();
			line.definition_nodes = nodes;
		}
    }

	var member =  members.create();

	if (RFEM)
    {
        member.line = line;
    }
    else
    {
        member.node_start = nodes[0];
        member.node_end = nodes[nodes.length - 1];
    }

	member.type = memberType;
	member.section_start = section;

    return member;
}

function createNodesGrid(x, y, gridSize, gridSpace)
{
	var nodes = [];
	for (var i = 0; i < gridSize[1]; ++i)
	{
		for (var j = 0; j < gridSize[0]; ++j)
		{
			nodes.push(createNode(x + gridSpace[0] * j, y + gridSpace[1] * i, 0.000));
		}
	}
	return nodes;
}

/*
Returns array (dictionary):
	key = surface no
	value =
		[0] - surfaces object
		[1] - list of surface nodes
	surfaceGridSize = [3, 2]
	surfaceGridSpace = [5, 5] (this value is same for surface weight and height)
	surfaceNodes (nodes in picture)

	 nodes[1]	nodes[0]	nodes[5]	nodes[4]	nodes[9]	nodes[8]
		x-----------x			x-----------x			x-----------x
		|			|			|			|			|			|
		|			|			|			|			|			|
		|	  S1	|			|	  S2	|			|	  S3	|
		|			|			|			|			|			|
		|			|			|			|			|			|
		x-----------x			x-----------x			x-----------x
	 nodes[2]	nodes[3]	nodes[6]	nodes[7]	nodes[10]	nodes[11]

		x-----------x			x-----------x			x-----------x
		|			|			|			|			|			|
		|			|			|			|			|			|
		|	  S1	|			|	  S2	|			|	  S3	|
		|			|			|			|			|			|
		|			|			|			|			|			|
		x-----------x			x-----------x			x-----------x
*/
function createSurfacesFromNodesGrid(nodes, surfaceGridSize, surfaceType, surfaceThickness)
{
	var boundaryLines = [];
	var surfacesCount = surfaceGridSize[0] * surfaceGridSize[1];
	var moveToNode = 0;
	var surfaceNodes = [];

	for (var i = 0; i < surfacesCount; ++i)
	{
		surfaceNodes.push(nodes[i * 2 + 1 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + surfaceGridSize[0] * 2 + moveToNode]);
		surfaceNodes.push(nodes[i * 2 + surfaceGridSize[0] * 2 + 1 + moveToNode]);
		boundaryLines.push(createLine(surfaceNodes[i * 4], surfaceNodes[i * 4 + 1]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 1], surfaceNodes[i * 4 + 2]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 2], surfaceNodes[i * 4 + 3]));
		boundaryLines.push(createLine(surfaceNodes[i * 4 + 3], surfaceNodes[i * 4]));

		if ((i + 1) % surfaceGridSize[0] == 0)
		{
			moveToNode += surfaceGridSize[0] * 2;
		}
	}

	var surfaceList = {};
	var surfsNodes = {};

	for (var i = 0; i < surfacesCount; ++i)
	{
		var lines = boundaryLines.slice(i * 4, i * 4 + 4);
		var surface = createSurface([lines[0].no, lines[1].no, lines[2].no, lines[3].no], surfaceType, surfaceThickness);
		surfaceList[surface.no] = [surface, surfaceNodes.slice(i * 4, i * 4 + 4)];
	}

	return surfaceList;
}

function createMembersFromNodesGrid(nodes, memberGridSize, memberType, section)
{
	var membersCount = memberGridSize[0] * memberGridSize[1];
	var moveToNode = 0;
	var memberList = [];

	for (var i = 0; i < membersCount; ++i)
	{
		memberList.push(createMember([nodes[i + moveToNode], nodes[i + moveToNode + 1]], section, memberType));
		moveToNode += 1;
	}

	return memberList;
}

function createLinesFromNodesGrid(nodes, lineGridSize)
{
	var linesCount = lineGridSize[0] * lineGridSize[1];
	var moveToNode = 0;
	var linesList = [];

	for (var i = 0; i < linesCount; ++i)
	{
		linesList.push(createLine(nodes[i + moveToNode], nodes[i + moveToNode + 1]));
		moveToNode += 1;
	}

	return linesList;
}

// Function to change node's z-coordinates
function modifyNodesToZCoord(nodes, nodeIndexes, z)
{
	for (var i = 0; i < nodeIndexes.length; ++i)
	{
		nodes[nodeIndexes[i][0]].coordinates = $V(nodes[nodeIndexes[i][0]].global_coordinate_1, nodes[nodeIndexes[i][0]].global_coordinate_2, z);
		nodes[nodeIndexes[i][1]].coordinates = $V(nodes[nodeIndexes[i][1]].global_coordinate_1, nodes[nodeIndexes[i][1]].global_coordinate_2, z);
	}
}

function makeSolid()
{
	var material = createMaterial("S235");
	var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);

	var node1 = createNode(8, -16, 0);
	var node2 = createNode(20, -16, 0);
	var node3 = createNode(20, -8, 0);
	var node4 = createNode(8, -8, 0);
	var node5 = createNode(8, -16, -5);
	var node6 = createNode(20, -16, -5);
	var node7 = createNode(20, -8, -5);
	var node8 = createNode(8, -8, -5);
	
	var solidLines = [
		// Bottopm cap
		createLine(node1.no, node2.no).no,	// line1
		createLine(node2.no, node3.no).no,	// line2
		createLine(node3.no, node4.no).no,	// line3
		createLine(node4.no, node1.no).no, 	// line4
		// Top cap
		createLine(node5.no, node6.no).no,	// line5
		createLine(node6.no, node7.no).no,	// line6
		createLine(node7.no, node8.no).no,	// line7
		createLine(node8.no, node5.no).no,	// line8
		// Corber lines
		createLine(node1.no, node5.no).no,	// line9
		createLine(node2.no, node6.no).no,	// line10
		createLine(node3.no, node7.no).no,	// line11
		createLine(node4.no, node8.no).no	// line12
	];
	
	var solidSurfaces = [
		createSurface([solidLines[0], solidLines[1], solidLines[2], solidLines[3]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[4], solidLines[5], solidLines[6], solidLines[7]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[0], solidLines[8], solidLines[4], solidLines[9]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[1], solidLines[9], solidLines[5], solidLines[10]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[2], solidLines[10], solidLines[6], solidLines[11]], surfaces.TYPE_STANDARD, thickness),
		createSurface([solidLines[3], solidLines[8], solidLines[7], solidLines[11]], surfaces.TYPE_STANDARD, thickness)
	];
	
	var solid = solids.create();
	solid.boundary_surfaces = solidSurfaces;
	solid.type = solids.TYPE_STANDARD;
	solid.material = createMaterial("C25/30");
	
	return solid;
}

function makeOpenings(surfaceList, nodeList)
{
	var openingList = [];
	
	for (var i = 0; i < 3; ++i)
	{
		var node = createNode(nodeList[i * 2].coordinate_1 + (nodeList[1 + i * 2].coordinate_1 - nodeList[i * 2].coordinate_1) / 2, nodeList[i * 2].coordinate_2 + (nodeList[6 + i * 2].coordinate_2 - nodeList[i * 2].coordinate_2) / 2, 0);
		var line = lines.create();
		line.type = lines.TYPE_CIRCLE;
		line.circle_center = $V(node.coordinate_1, node.coordinate_2, node.coordinate_3);
		line.circle_radius = 2;
		var opening = openings.create();
		opening.boundary_lines = [line];
		openingList.push(opening);
	}
	
	return openingList;
}
/************************************* Support functions end *********************************/

/*********************************************************************************************
****************************************** Main **********************************************
*********************************************************************************************/

run("../internal/clearAll.js");

var material = createMaterial("S235");
var section = createSection(material, "IPE 80");
var thickness = createThickness("0.250", material, thicknesses.TYPE_UNIFORM);

var nodesForNodes = createNodesGrid(-28, -28, [8, 1], [4, 2]);
var nodesForLines = createNodesGrid(-28, -18, [8, 2], [4, 4]);
var nodesForMembers = createNodesGrid(-28, -8, [10, 4], [3, 5]);
var nodesForSurfaces = createNodesGrid(-28, 12, [6, 4], [5, 5]);
var nodesForSurfacesForOpenings = createNodesGrid(2, 8, [6, 2], [5, 5]);

modifyNodesToZCoord(nodesForLines, [[0, 8]]);
var surfaceListForLines = createSurfacesFromNodesGrid(nodesForLines, [4, 1], surfaces.TYPE_STANDARD, thickness);
var memberList = createMembersFromNodesGrid(nodesForMembers, [5, 4], members.TYPE_BEAM, section);
modifyNodesToZCoord(nodesForSurfaces, [[4, 10]], -3.0);
var surfaceList = createSurfacesFromNodesGrid(nodesForSurfaces, [3, 2], surfaces.TYPE_STANDARD, thickness);
var surfaceForOpeningsList = createSurfacesFromNodesGrid(nodesForSurfacesForOpenings, [3, 1], surfaces.TYPE_STANDARD, thickness);

var solid = makeSolid();
var openingList = makeOpenings(surfaceForOpeningsList, nodesForSurfacesForOpenings);

var lc = new LoadCase();

/**************************************** Nodal loads *******************************************
* Common information:
* - all loads are created with default (generated) index
* - load distribution, load direction and axis can be set via property or its string representation
*/
var nodalLoad = new NodalLoad();
// Two force nodal loads (nodes 1, 2) with default "X" load direction
nodalLoad.Force(undefined, lc, [1, 2], 1500);
// Force nodal load with "Z" load direction
nodalLoad.Force(undefined, lc, [3], 1000, "W");
// Add specific direction with Rotated via 3 angles direction type (1), sequence = Z'Y'X'
// Parameter values: 1, [αZ', αY', αX', "Z'Y'X'"]
nodalLoad.specific_direction(1, [10, 5, 0, "Z'Y'X'"]);
// Force nodal load
nodalLoad.Force(undefined, lc, [4], 1800);
// Add shifted display
// Parameter values: [ΔX, ΔY, ΔZ], Δ
nodalLoad.shifted_display([1, 0.5, 0], 0.1);

var nodalLoad2 = new NodalLoad();
// Moment nodal load with default "Z" load direction
nodalLoad2.Moment(undefined, lc, [5], 2000);

var nodalLoad3 = new NodalLoad();
// Two components nodal loads
nodalLoad3.Components(undefined, lc, [6, 7], [10,20,30], [30,40,50]);
// Add eccentricity (ex, ey, ez)
nodalLoad3.force_eccentricity(0.5, 0.2, 0);

var nodalLoad4 = new NodalLoad();
// Mass nodal load with comment
nodalLoad4.Mass(undefined, lc, [8], 1500, "Mass nodal load example");

/***************************************** Line loads *******************************************/
var lineLoad = new LineLoad();
// Force uniform line load, with global in X on projected length
lineLoad.Force(undefined, lc, [1], "Uniform", [1500], line_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED);
// Force trapezoidal line load with default values (absolute distances, only p1 with b distance can be specified)
lineLoad.Force(undefined, lc, [4], "Trapezoidal", [1000, 3]);
// Add reference to list of lines, true is default
lineLoad.reference_to_list_of_lines();
// Force trapezoidal line load with relative distances
// [p1, distance_b, p2, distance_a, distance_a_relative, distance_b_relative]
lineLoad.Force(undefined, lc, [3], "Trapezoidal", [1000, 0.9, 1500, 0.1, true, true]);
// Force trapezoidal line load with relative distances
lineLoad.Force(undefined, lc, [2], "Trapezoidal", [1000, 0.9, 1500, 0.1, true, true]);
// Set load over total length of line
lineLoad.load_over_line();
// Force varying line load
//Parameter values: [p1, x1, p2, x2, p3, x3, p4, x4, p5, x5]
lineLoad.Force(undefined, lc, [5, 7], "Varying", [500, 0, 1000, 1, 1500, 2, 2000, 3, 5, 1000]);
// Force concentrated - 2 x 2 load with two relative and one absolute distances
lineLoad.Force(undefined, lc, [6, 8], line_loads.LOAD_DISTRIBUTION_CONCENTRATED_2x2, [1000, 1, 0.4, 0.5, false, false, true]);
// Refer distance to the line end
lineLoad.refer_distance_line_end();

var lineLoad2 = new LineLoad();
//Moment parabolic line load with global in X on true length
lineLoad2.Moment(undefined, lc, [9], "Parabolic", [1500, 2000, 1000], "X_L (U_L )");

var lineLoad3 = new LineLoad();
// Mass uniform line load
lineLoad3.Mass(undefined, lc, [13], 2500);
// Add individual mass components
lineLoad3.individual_mass_componnets(1000, 1500, 2000);

var lineLoad4 = new LineLoad();
lineLoad.Mass(undefined, lc, [15], 1500);
lineLoad.Mass(undefined, lc, [16], 2000);
// Add individual mass components
lineLoad.individual_mass_componnets(5, 10, 15);

/***************************************** Member loads ******************************************/
// Default member load with magnitude sets via load parameters
var memberLoad = new MemberLoad(undefined, lc, [1], "Deafult member load sets via parameters", { "magnitude" : 500 });
var memberLoad2 = new MemberLoad();
// Force concentrated - 1 member load with reůative distance
memberLoad2.Force(undefined, lc, [2], member_loads.LOAD_DISTRIBUTION_CONCENTRATED_1, [500, 0.5, true]);
// Force concentrated - varying member load
// Parameter values: [P1, x1, P2, x2 ... Pn, xn]
memberLoad2.Force(undefined, lc, [3], "Concentrated - Varying", [100, 0.5, 200, 1.5, 1000, 3]);
// Add reference to list of members
memberLoad2.reference_to_list_of_members();
// Force trapezoidal member force with absolute distances
// Parameter values: [p1, B, p2, A, is_b_relative, is_a_relative]
memberLoad2.Force(undefined, lc, [4], "Trapezoidal", [1000, 3, 1500, 1]);
// Force parabolic member load
memberLoad2.Force(undefined, lc, [5], member_loads.LOAD_DISTRIBUTION_PARABOLIC, [1500, 200, 1600]);
// Force uniform load
memberLoad2.Force(undefined, lc, [17], "Uniform", [2500]);
// Add eccentricity
memberLoad2.eccentricity("right_bottom", 0.01, 0.02, 0.03, 0.04);

// Moment parabolic load sets via parameters
var memberLoad3 = new MemberLoad(undefined, lc, [6], "Moment parabolic load sets via parameters", 
	{ "load_type" : "Moment", "load_distribution" : "Parabolic", "magnitude_1" : 500, "magnitude_2" : 700, "magnitude_3" : 1500, "load_direction" : "X_L (U_L )" });
var memberLoad4 = new MemberLoad();
// Moment varying load with global in X on true length
memberLoad4.Moment(undefined, lc, [7], "Varying", [500, 0.1, 800, 1, 1200, 2, 600, 3], "X_L (U_L )");

var memberLoad5 = new MemberLoad();
// Temperature trapezoidal member load with default values
// Parameter values: [Tt1, B, Tb1, Tt2, Tb2, A, is_b_relative, is_a_relative]
memberLoad5.Temperature(undefined, lc, [8], "Trapezoidal", [50, 2]);
// Temperature trapezoidal member load with absolute and realtive distances and local in z
memberLoad5.Temperature(undefined, lc, [9], "Trapezoidal", [300, 2.9, 280, 320, 290, 0.2, false, true], "z");
// Temperature varying member load
memberLoad5.Temperature(undefined, lc, [10, 11], "Varying", [300, 330, 0.1, 310, 330, 2, 300, 340, 2.9], "z");

var memberLoad6 = new MemberLoad();
// Temperature change parabolic member load with local direction in z
// Parameter values: [Tt1, ΔT1, Tt2, ΔT2, Tt3, ΔT3]
memberLoad6.TemperatureChange(undefined, lc, [12], "Parabolic", [60, 10, 50, 20, 100, 10], "z");

var memberLoad7 = new MemberLoad();
// Rotary motion member load
/* Parameter values: 	[axis_definition, ω, α, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB] (axis definition 1 == "Two points")
 				[axis_definition, ω, α, ([Node1] | XA, YA, ZA), parallel_axis] (axis definition 2 == "Point and axis")*/
// Rotary motion with "two points" axes definition, both defined by node indexes				
memberLoad7.RotaryMotion(undefined, lc, [13], [1, 10, 12, [49, 50]]);
// Rotary motion with "two points" axes definition, both defined by its coordinates
memberLoad7.RotaryMotion(undefined, lc, [14], [1, 10, 12, 0.1, 0.2, 0, 2.0, 2.0, 0]);
// Rotary motion with "point and axes" definition, point is defined by node index, point and parallel axis is set to "+Y"
memberLoad7.RotaryMotion(undefined, lc, [15], [2, 10, 12, [53], "+Y"]);
// Rotary motion with "point and axes" definition, point is defined by coordinates, point and parallel axis is set to "+Y"
memberLoad7.RotaryMotion(undefined, lc, [16], [2, 10, 12, 0.5, 0.6, 0.3, "+Y"]);

/***************************************** Surface loads ******************************************/
var surfaceLoad = new SurfaceLoad()
// Force linear surface load
// Parameter values: [Node1, Node2, Node3, p1, p2, p3]
surfaceLoad.Force(undefined, lc, [5], "Linear", [71, 72, 66, 500, 1500, 1000]);
// Force radial surface load with "two points" axes definition, both defined by node indexes
// Parameter values: [axis_definition, p1, p2, Node1, Node2, [Node1, Node2] | XA, YA, ZA, XB, YB, ZB]
surfaceLoad.Force(undefined, lc, [6], "Radial", [1, 1000, 500, 74, 68, [67, 68]]);
// Force radial surface load with "point and axis" definition, point is defined by coordinates, parallel axis "Z"
// Parameter values: [axis_definition, p1, p2, Node1, Node2, ([Node1] | XA, YA, ZA), parallel_axis]
surfaceLoad.Force(undefined, lc, [6], "Radial", [2, 1000, 500, 74, 68, 0.5, 0.5, 0, "Z"]);
// Force varying in Z surface load
// Parameter values: [p1, z1, p2, z2, ... pn, zn]
surfaceLoad.Force(undefined, lc, [7], "Varying in Z", [2000, -3, 1000, -2, 1500, -1.5, 1500, -0.5, 500, 0]);

var surfaceLoad2 = new SurfaceLoad();
// Temperature linear in X surface load
// Parameter values: [Node1, Node2, Tc1, Tc2, ΔT1, ΔT2]
surfaceLoad2.Temperature(undefined, lc, [8], "Linear in X", [77, 78, 100, 10, 120, 20]);

var surfaceLoad3 = new SurfaceLoad();
// Axial strain linear surface load
// Parameter values: [Node1, Node2, Node3, ε1x, ε1y, ε2x, ε2y, ε3x, ε3y]
// Using only required values (Node1, Node2, Node3, ε1x, ε1y)
surfaceLoad2.AxialStrain(undefined, lc, [9], surface_loads.LOAD_DISTRIBUTION_LINEAR, [85, 79, 80, 0.01, 0.1]);

var surfaceLoad4 = new SurfaceLoad();
// Mass surface load with individual mass components
surfaceLoad4.Mass(undefined, lc, [10], 500);
surfaceLoad4.individual_mass_components(500, 600, 800);

/***************************************** Solid loads ******************************************/
var solidLoad = new SolidLoad();
// Force uniform solid load
solidLoad.Force(undefined, lc, [1], 2000);
// Temperature linear in X solid load
// Parameter values: [T1, T2, Node1, Node2]
solidLoad.Temperature(undefined, lc, [1], "Linear in X", [91, 92, 100, 150]);
// Strain linear in Z solid load
// Parameter values: [Node1, Node2, ε1x, ε1y, ε1z, ε2x, ε2y, ε2z]
solidLoad.Strain(undefined, lc, [1], "Linear in Z", [90, 94, 0.2]);

// Buoyancy solid load set via parameters with air density defined by attitude
var solidLoad2 = new SolidLoad(undefined, lc, [1], "Load set via parameters", { "load_type" : "Buoyancy", "uniform_magnitude" : 1500} );
solidLoad2.air_density(10);

/***************************************** Opening loads ****************************************/
var openingLoad = new OpeningLoad()
// Force uniforme/trapezoidal opening load
openingLoad.Force(undefined, lc, [1], "Uniform/Trapezoidal", [1500]);
// Force uniforme/trapezoidal opening load with smooth concentrated load
openingLoad.Force(undefined, lc, [1], "Uniform/Trapezoidal", [1500]);
openingLoad.smooth_concentrated_load(true);
// Force linear / trapezoidal opening load
openingLoad.Force(undefined, lc, [3], "Linear/Trapezoidal", [97, 66, 92, 500, 1000, 1500]);
// Force linear /trapezoidal opening load with other direction
openingLoad.Force(undefined, lc, [2], "Linear/Trapezoidal", [97, 66, 92, 500, 1000, 1500], "X_A (U_A )");
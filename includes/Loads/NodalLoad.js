include("BaseLoad.js");

/**
* Creates nodal load
* @class
* @constructor
* @param 	{Number}	no					Index of nodal load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		nodes				List of node indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created nodal load
*/
function NodalLoad(no,
				   load_case,
				   nodes,
				   comment,
				   params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Nodal_Load", no, load_case, nodes, comment, params);
	}
}

/**
 * Creates nodal force load
 * @param 	{Number}	no					Index of nodal load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		nodes				List of node indexes
 * @param	{Number}	force				Load force value
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created nodal force load
*/
NodalLoad.prototype.Force = function (no,
	load_case,
	nodes,
	force,
	load_direction,
	comment,
	params) {
	this.load = createSimplyValueLoad("Nodal_Load", no, load_case, nodes, force, undefined, undefined, GetNodalLoadDirectionType(load_direction), comment, params);
	return this.load;
};

/**
 * Creates nodal moment load
 * @param 	{Number}	no					Index of nodal load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		nodes				List of node indexes
 * @param	{Number}	moment				Load moment value
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created nodal moment load
*/
NodalLoad.prototype.Moment = function (no,
	load_case,
	nodes,
	moment,
	load_direction,
	comment,
	params) {
	this.load = createSimplyValueLoad("Nodal_Load", no, load_case, nodes, undefined, moment, undefined, GetNodalLoadDirectionType(load_direction), comment, params);
	return this.load;
};

/**
 * Creates nodal moment load
 * @param 	{Number}	no					Index of nodal load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		nodes				List of node indexes
 * @param	{Array}		forces				List of forces [FX, FX, FY]
 * @param 	{Array}		moments				List of moments [MX, MY, MZ]
 * @param	{String}	comment				Comment, van be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Create nodal components load
*/
NodalLoad.prototype.Components = function (no,
	load_case,
	nodes,
	forces,
	moments,
	comment,
	params) {
	ASSERT(forces.length === 3, "The force must have three components");
	ASSERT(moments.length === 3, "The moment must have three components");

	this.load = createBaseLoad("Nodal_Load", no, load_case, nodes, comment, params);

	this.load.load_type = nodal_loads.LOAD_TYPE_COMPONENTS;
	this.load.components_force_x = forces[0];
	this.load.components_force_y = forces[1];
	this.load.components_force_z = forces[2];
	this.load.components_moment_x = moments[0];
	this.load.components_moment_y = moments[1];
	this.load.components_moment_z = moments[2];

	return this.load;
};

/**
 * Creates nodal moment load
 * @param 	{Number}	no					Index of nodal load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		nodes				List of node indexes
 * @param	{Number}	mass				Load mass value
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Create nodal mass load
*/
NodalLoad.prototype.Mass = function (no,
	load_case,
	nodes,
	mass,
	comment,
	params) {
	this.load = createSimplyValueLoad("Nodal_Load", no, load_case, nodes, undefined, undefined, mass, undefined, comment, params);
	return this.load;
};

/**
 * Adds specific direction to load
 * @param	{Number}	type	Specific direction type, can be one of:
 *								- 1 (Rotated view 3 angles)
 *								- 2 (Directed to node)
 *								- 3 (Parallel to two nodes)
 *								- 4 (Parallel to CS of line)
 *								- 4 (Parallel to CS of line)
 *								- 5 (Parallel to CS of member)
 * @param	{Array}		values	List of values for specified direction:
 *								- [αX',αY',αZ',sequence] (for 1), example: [0.1,0.2,0.1,"X'Y'Z'"], sequence can be empty by default
 *								- [node_index] (for 2)
 *								- [node1_index, node2_index] (for 3)
 *								- [line_no] (for 4)
 *								- [member_no] (for 5)
*/
NodalLoad.prototype.SpecificDirection = function (type,
	values) {
	ASSERT(this.load.load_type !== nodal_loads.LOAD_TYPE_MASS, "Specific direction cannot be set to mass load");

	switch (type) {
		case 1:	// Rotated view 3 angles
			ASSERT(values.length >= 3, "Wrong number of value parameters, three at least are required");
			this.load.specific_direction_type = nodal_loads.DIRECTION_TYPE_ROTATED_VIA_3_ANGLES;
			this.load.rotated_about_angle_x = values[0];
			this.load.rotated_about_angle_y = values[1];
			this.load.rotated_about_angle_z = values[2];
			if (values.length > 3) {
				this.load.axes_sequence = values[3];
			}
			break;
		case 2:	// Directed to node
			ASSERT(values.length === 1, "Wrong number of value parameter, one is required");
			this.load.specific_direction_type = nodal_loads.DIRECTION_TYPE_DIRECTED_TO_NODE;
			this.load.directed_to_node_direction_node = values[0];
			break;
		case 3:	// Parallel to two nodes
			ASSERT(values.length === 2, "Wrong number of value parameters, two are required");
			this.load.specific_direction_type = nodal_loads.DIRECTION_TYPE_PARALLEL_TO_TWO_NODES;
			this.load.parallel_to_two_nodes_first_node = values[0];
			this.load.parallel_to_two_nodes_second_node = values[1];
			break;
		case 4:	// Parallel to CS of line
			ASSERT(RFEM, "This type can be used only for RFEM");
			ASSERT(values.length === 1, "Wrong number of value parameter, one is required");
			this.load.specific_direction_type = nodal_loads.DIRECTION_TYPE_PARALLEL_TO_CS_OF_LINE;
			this.load.parallel_to_line = values[0];
			break;
		case 5:	// Parallel to CS of member
			ASSERT(values.length === 1, "Wrong number of value parameter, one is required");
			this.load.specific_direction_type = nodal_loads.DIRECTION_TYPE_PARALLEL_TO_CS_OF_MEMBER;
			this.load.parallel_to_member = values[0];
			break;
		default:
			ASSERT(false, "Unknown specific direction type");
	}
};

/**
 * Adds eccentricity to load
 * @param	{Number}		eccentricity_x	Eccentricity eX
 * @param	{Number}		eccentricity_y	Eccentricity eY
 * @param	{Number}		eccentricity_z	Eccentricity eZ
*/
NodalLoad.prototype.ForceEccentricity = function (eccentricity_x,
	eccentricity_y,
	eccentricity_z) {
	ASSERT(this.load.load_type === nodal_loads.LOAD_TYPE_FORCE || this.load.load_type === nodal_loads.LOAD_TYPE_COMPONENTS, "Eccentricity can be used only for load force or load components");

	if (typeof eccentricity_x === "undefined" && typeof eccentricity_y === "undefined" && typeof eccentricity_z === "undefined") {
		this.load.has_force_eccentricity = false;
	}
	else {
		this.load.has_force_eccentricity = true;
		this.load.force_eccentricity = $V(eccentricity_x, eccentricity_y, eccentricity_z);
	}
};

/**
 * Adds shifted display to load
 * @param	{Array}		offset		Offset [ΔX,ΔY,ΔZ], example [0.1,0.2,0]
 * @param	{Number}	distance	Distance Δ
*/
NodalLoad.prototype.ShiftedDisplay = function (offset,
	distance) {
	ASSERT(this.load.load_type !== nodal_loads.LOAD_TYPE_MASS, "Shifted display cannot be set to mass load");

	if (arguments.length === 0) {
		this.load.has_shifted_display = false;
		return;
	}

	ASSERT(offset.length === 3, "Wrong number of offset parameters, three are required");
	this.load.has_shifted_display = true;
	this.load.offset_x = offset[0];
	this.load.offset_y = offset[1];
	this.load.offset_z = offset[2];
	this.load.size_or_distance = distance;
};

/**
 * Adds individual mass components to load
 * @param	{Array}		mass		mass [MX,MY,MZ], example [0.1,0.2,0]
 * @param	{Number}	distance	mass_moment_of_inertia [IX,IY,IZ], example [0.1,0.2,0]			-
*/
NodalLoad.prototype.IndividualMassComponents = function (mass,
	mass_moment_of_inertia) {
	ASSERT(this.load.load_type === nodal_loads.LOAD_TYPE_MASS, "Individual mass components be set only to mass load");

	if (arguments.length === 0) {
		this.load.individual_mass_components = false;
		return;
	}

	ASSERT(mass.length === 3, "Wrong number of mass parameters, three are required");
	ASSERT(mass_moment_of_inertia.length === 3, "Wrong number of mass of inertia parameters, three are required");
	this.load.individual_mass_components = true;
	this.load.mass_x = mass[0];
	this.load.mass_y = mass[1];
	this.load.mass_z = mass[2];
	this.load.mass_moment_of_inertia_x = mass_moment_of_inertia[0];
	this.load.mass_moment_of_inertia_y = mass_moment_of_inertia[1];
	this.load.mass_moment_of_inertia_z = mass_moment_of_inertia[2];
};

function GetNodalLoadDirectionType(direction_type) {
	var direction_types_dict = {
		"GLOBAL_X_OR_USER_DEFINED_U": nodal_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U,
		"GLOBAL_Y_OR_USER_DEFINED_V": nodal_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V,
		"GLOBAL_Z_OR_USER_DEFINED_W": nodal_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W
	};

	if (typeof direction_type !== "undefined") {
		var type = direction_types_dict[direction_type];
		if (type === undefined) {
		  console.log("Wrong direction type. Value was: " + direction_type);
		  console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
		  type = nodal_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U;
		}
		return type;
	}
	return nodal_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U;
}

include("BaseLoad.js");

/**
* Creates line set load
* @class
* @constructor
* @param 	{Number}	no					Index of line set load, can be undefined
* @param 	{Object}	load_case			Load case
* @param 	{Array}		line_sets			List of line set indexes
* @param	{String}	comment				Comment, can be undefined
* @param	{Object}	params				Load parameters, can be undefined
* @return	{Object}	Created line set load
*/
function SurfaceSetLoad(no,
                        load_case,
                        surface_sets,
                        comment,
                        params)
{
	if (arguments.length !== 0)
	{
		return this.load = createBaseLoad("Surface_Set_Load", no, load_case, line_sets, comment, params);
	}
}

/**
 * Creates surface set force load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param 	{String}	load_direction		Load direction, can be undefined
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set force load
*/
SurfaceSetLoad.prototype.Force = function (no,
	load_case,
	surface_sets,
	load_distribution,
	load_values,
	load_direction,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_FORCE, load_distribution, load_values);

	if (typeof load_direction !== "undefined") {
		this.load.load_direction = GetSurfaceSetLoadDirectionType(surface_set_loads.LOAD_TYPE_FORCE, load_direction);
	}

	return this.load;
};

/**
 * Creates surface set temperature load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set temperature load
*/
SurfaceSetLoad.prototype.Temperature = function (no,
	load_case,
	surface_sets,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_TEMPERATURE, load_distribution, load_values);

	return this.load;
};

/**
 * Creates surface set axial strain load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param 	{String}	load_distribution	Load distribution
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set axial strain load
*/
SurfaceSetLoad.prototype.AxialStrain = function (no,
	load_case,
	surface_sets,
	load_distribution,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_AXIAL_STRAIN, load_distribution, load_values);

	return this.load;
};

/**
 * Creates surface set precamber load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set precamber load
*/
SurfaceSetLoad.prototype.Precamber = function (no,
	load_case,
	surface_sets,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_PRECAMBER, undefined, [load_value]);

	return this.load;
};

/**
 * Creates surface set rotary motion load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param	{Array}		load_values			Load parameters depend on load distribution (for more information look at setSurfaceLoadDistribution function)
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set rotary motion load
*/
SurfaceSetLoad.prototype.RotaryMotion = function (no,
	load_case,
	surface_sets,
	load_values,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_ROTARY_MOTION, undefined, load_values);

	return this.load;
};

/**
 * Creates surface set mass load
 * @param 	{Number}	no					Index of surface set load, can be undefined
 * @param 	{Object}	load_case			Load case
 * @param 	{Array}		surface_sets		List of surface set indexes
 * @param	{Array}		load_value			Uniform load parameter
 * @param	{String}	comment				Comment, can be undefined
 * @param	{Object}	params				Load parameters, can be undefined
 * @return	{Object}	Created surface set mass load
*/
SurfaceSetLoad.prototype.Mass = function (no,
	load_case,
	surface_sets,
	load_value,
	comment,
	params) {
	this.load = createBaseLoad("Surface_Set_Load", no, load_case, surface_sets, comment, params);
	this.load = setSurfaceLoadDistribution(this.load, surface_set_loads.LOAD_TYPE_MASS, undefined, [load_value]);

	return this.load;
};

/**
* Sets individual mass components (only for mass load)
* @param	{Number}	MX		Mass in X coordination, can be undefined
* @param	{Number}	MY		Mass in Y coordination, can be undefined
* @param	{Number}	MZ		Mass in Z coordination, can be undefined
*/
SurfaceSetLoad.prototype.IndividualMassComponents = function (MX,
	MY,
	MZ) {
	ASSERT(this.load.load_type === surface_set_loads.LOAD_TYPE_MASS, "Can be set only for mass load type");

	if (arguments.length === 0) {
		this.load.individual_mass_components = false;
		return;
	}

	this.load.individual_mass_components = true;

	if (typeof MX !== "undefined") {
		this.load.magnitude_mass_x = MX;
	}

	if (typeof MY !== "undefined") {
		this.load.magnitude_mass_y = MY;
	}

	if (typeof MZ !== "undefined") {
		this.load.magnitude_mass_z = MZ;
	}
};

function GetSurfaceSetLoadDirectionType(load_type, direction_type) {
	var direction_types_dict = {};
	switch (load_type)
	{
		case surface_set_loads.LOAD_TYPE_FORCE:
			direction_types_dict = {
				"GLOBAL_X_OR_USER_DEFINED_U_TRUE": surface_set_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_TRUE,
				"GLOBAL_Y_OR_USER_DEFINED_V_TRUE": surface_set_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_TRUE,
				"GLOBAL_Z_OR_USER_DEFINED_W_TRUE": surface_set_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_TRUE,
				"GLOBAL_X_OR_USER_DEFINED_U_PROJECTED": surface_set_loads.LOAD_DIRECTION_GLOBAL_X_OR_USER_DEFINED_U_PROJECTED,
				"GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED": surface_set_loads.LOAD_DIRECTION_GLOBAL_Y_OR_USER_DEFINED_V_PROJECTED,
				"GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED": surface_set_loads.LOAD_DIRECTION_GLOBAL_Z_OR_USER_DEFINED_W_PROJECTED
			}
			break;
	}

	var type = direction_types_dict[direction_type];
	if (type === undefined) {
	  console.log("Wrong direction type. Value was: " + direction_type);
	  console.log("Correct values are: ( " + Object.keys(direction_types_dict) + ")");
	}
	return type;
}

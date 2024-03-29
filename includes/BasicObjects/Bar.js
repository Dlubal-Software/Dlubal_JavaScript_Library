if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Bars.");
}

// Bar.MultiVariable function - cannot set bar.info_number_of_bars??

/**
 * Creates RSECTION Bar
 * @class
 * @constructor
 * @param {Number} no               Number of Bar, can be undefined
 * @param {Number} material_no      Material number
 * @param {Number} layer_no         Layer number
 * @param {String} comment          Comment, can be undefined
 * @param {Object} params           Parameters, can be undefined
 */
function Bar(no,
    material_no,
    layer_no,
    comment,
    params) {
    if (arguments.length > 0) {
        this.bar = createBaseBar(no, "MULTI_UNIFORM", material_no, layer_no, comment, params);
    }
}

/**
 * @returns Bar's number
 */
Bar.prototype.GetNo = function () {
    return this.bar.no;
};

/**
 * @returns Bar object
 */
Bar.prototype.GetBar = function () {
    return this.bar;
};

Bar.prototype.StartAndEndPoint = function (start_point_no, end_point_no) {
    ASSERT(typeof start_point_no !== "undefined", "Start point must be defined");
    // if (points.exist(start_point_no)) {
    this.bar.start_point = start_point_no;
    // }
    // else {
    //
    // else {
    //     console.log("Point no. " + start_point_no + " doesn't exist");
    // }
    ASSERT(typeof end_point_no !== "undefined", "End point must be defined");
    //     // if (points.exist(end_point_no)) {
    this.bar.end_point = end_point_no;
    //     // }
    //     // else {
    //     //     console.log("Point no. " + end_point_no + " doesn't exist");
    //     // }

};

Bar.prototype.StartPoint = function (start_point_no) {
    ASSERT(typeof start_point_no !== "undefined", "Start point must be defined");
    // if (points.exist(start_point_no)) {
    this.bar.start_point = start_point_no;
    // }
    // else {
    //     console.log("Point no. " + start_point_no + " doesn't exist");
    // }
};

// Bar.prototype.EndPoint = function (end_point_no) {
//     // ASSERT(typeof end_point_no !== "undefined", "End point must be defined");
//     // if (points.exist(end_point_no)) {
//         this.bar.end_point = end_point_no;
//     // }
//     // else {
//     //     console.log("Point no. " + end_point_no + " doesn't exist");
//     // }
// };

/**
 * Creates Multi uniform Bar
 * @param {Number} no                               Number of Bar, can be undefined
 * @param {Number} material_no                      Material's number
 * @param {Number} layer_no                         Number of layer
 * @param {String} distance_between_i_and_j_type    Distance between i and j reference type, can be undefined ("REFERENCE_TYPE_L" as default)
 * @param {Number} diameter                         Bar diameter, can be undefined (12 mm as default)
 * @param {Number} offset                           Offset, can be undefined (0 by default)
 * @param {Number} number_of_bars                   Number of Bars, can be undefined (2 as default)
 * @param {String} comment                          Comment, can be undefined
 * @param {Object} params                           Parameters, can be undefined
 */
Bar.prototype.MultiUniform = function (no,
    material_no,
    layer_no,
    distance_between_i_and_j_type,
    diameter,
    offset,
    number_of_bars,
    comment,
    params) {
    this.bar = createBaseBar(no, "MULTI_UNIFORM", material_no, layer_no, comment, params);
    if (typeof distance_between_i_and_j_type !== "undefined") {
        this.bar.distance_between_i_and_j_type = GetDistanceBetweenIAndJType(distance_between_i_and_j_type);
    }
    if (typeof diameter !== "undefined") {
        this.bar.diameter = diameter;
    }
    if (typeof offset !== "undefined") {
        this.bar.offset = offset;
    }
    if (typeof number_of_bars !== "undefined") {
        this.bar.multi_uniform_bar_count = number_of_bars;
    }
};

/**
 * Creates Multi variable Bar
 * @param {Number} no                               Number of Bar, can be undefined
 * @param {Number} material_no                      Material's number
 * @param {Number} layer_no                         Number of layer
 * @param {String} distance_between_i_and_j_type    Distance between i and j reference type, can be undefined ("REFERENCE_TYPE_L" as default)
 * @param {Number} diameter                         Bar diameter, can be undefined (12 mm as default)
 * @param {Number} offset                           Offset, can be undefined (0 by default)
 * @param {Number} number_of_bars                   Number of Bars, can be undefined (2 as default)
 * @param {Number} axial_distance_si                Axial distance of bars, can be undefined (empty by default)
 * @param {Number} axial_distance_sn                Axial distance of bars, can be undefined (100 mm by default)
 * @param {Number} axial_distance_sj                Axial distance of bars, can be undefined (50 mm by default)
 * @param {Number} comment                          Comment, can be undefined
 * @param {Number} params                           Comment, can be undefined
 */
Bar.prototype.MultiVariable = function (no,
    material_no,
    layer_no,
    distance_between_i_and_j_type,
    diameter,
    offset,
    number_of_bars,
    axial_distance_si,
    axial_distance_sn,
    axial_distance_sj,
    comment,
    params) {
    this.bar = createBaseBar(no, "MULTI_VARIABLE", material_no, layer_no, comment, params);
    if (typeof distance_between_i_and_j_type !== "undefined") {
        this.bar.distance_between_i_and_j_type = GetDistanceBetweenIAndJType(distance_between_i_and_j_type);
    }
    if (typeof diameter !== "undefined") {
        this.bar.diameter = diameter;
    }
    if (typeof offset !== "undefined") {
        this.bar.offset = offset;
    }
    if (typeof number_of_bars !== "undefined") {
        this.bar.multi_variable_bar_count = number_of_bars;
    }
    if (typeof axial_distance_si !== "undefined") {
        this.bar.axial_distance_si = axial_distance_si;
    }
    if (typeof axial_distance_sn !== "undefined") {
        this.bar.axial_distance_sn = axial_distance_sn;
    }
    if (typeof axial_distance_sj !== "undefined") {
        this.bar.axial_distance_sj = axial_distance_sj;
    }
};

/**
 * Creates Single between two points Bar
 * @param {Number}  no                              Number of Bar, can be undefined
 * @param {Number}  material_no                     Material's number
 * @param {Number}  layer_no                        Number of layer
 * @param {String}  distance_between_i_and_j_type   Distance between i and j reference type, can be undefined ("REFERENCE_TYPE_L" as default)
 * @param {Number}  diameter                        Bar diameter, can be undefined (12 mm as default)
 * @param {Number}  offset                          Offset, can be undefined (0 by default)
 * @param {Number}  distance_from_type              Type of distance from  - "DISTANCE_FROM_START"or "DISTANCE_FROM_END"
 * @param {Number}  distance                        Distance between point k and Xj-k
 * @param {Boolean} relative                        Distance Xi-k or Xj-k are specified as relative or absolute, can be undefined (true as default)
 * @param {String}  comment                         Comment, can be undefined
 * @param {Object}  params                          Parameters, can be undefined
 */
Bar.prototype.SingleBetweenTwoPoints = function (no,
    material_no,
    layer_no,
    distance_between_i_and_j_type,
    diameter,
    offset,
    distance_from_type,
    distance,
    relative,
    comment,
    params) {
    this.bar = createBaseBar(no, "BETWEEN_TWO_POINTS", material_no, layer_no, comment, params);
    if (typeof distance_between_i_and_j_type !== "undefined") {
        this.bar.distance_between_i_and_j_type = GetDistanceBetweenIAndJType(distance_between_i_and_j_type);
    }
    if (typeof diameter !== "undefined") {
        this.bar.diameter = diameter;
    }
    if (typeof offset !== "undefined") {
        this.bar.offset = offset;
    }
    SetDistance(this.bar, distance_from_type, distance, relative);
};

/**
 * Creates Single point Bar
 * @param {Number}  no                  Number of Bar, can be undefined
 * @param {Number}  material_no         Material's number
 * @param {Number}  layer_no            Number of layer
 * @param {Number}  diameter            Bar diameter, can be undefined (12 mm as default)
 * @param {Number}  offset_y            Offset Y, can be undefined (0 as default)
 * @param {Number}  offset_z            Offset Z, can be undefined (0 as default)
 * @param {String}  comment             Comment, can be undefined
 * @param {Object}  params              Parameters, can be undefined
 */
Bar.prototype.SinglePoint = function (no,
    material_no,
    layer_no,
    diameter,
    offset_y,
    offset_z,
    comment,
    params) {
    this.bar = createBaseBar(no, "SINGLE_POINT", material_no, layer_no, comment, params);
    if (typeof diameter !== "undefined") {
        this.bar.diameter = diameter;
    }
    if (typeof offset_y !== "undefined") {
        this.bar.offset_y = offset_y;
    }
    if (typeof offset_z !== "undefined") {
        this.bar.offset_z = offset_z;
    }
};

function createBaseBar(no,
    definition_type,
    material_no,
    layer_no,
    comment,
    params) {
    if (typeof no === "undefined") {
        var bar = bars.create();
    }
    else {
        var bar = bars.create(no);
    }
    bar.definition_type = GetBarDefinitionType(definition_type);
    ASSERT(typeof material_no !== "undefined", "Material number must be defined");
    if (!materials.exist(material_no)) {
        console.log("Material no. " + material_no + " doesn't exist");
    }
    bar.material = material_no;
    ASSERT(typeof layer_no !== "undefined", "Number of layer must be specified");
    if (layers.exist(layer_no)) {
        bar.layer = layer_no;
    }
    else {
        console.log("Layer no. " + layer_no + " doesn't exist");
    }
    set_comment_and_parameters(bar, comment, params);
    return bar;
}

function GetBarDefinitionType(definition_type) {
    const definition_types = {
        "MULTI_UNIFORM": bars.TYPE_MULTI_UNIFORM,
        "MULTI_VARIABLE": bars.TYPE_MULTI_VARIABLE,
        "BETWEEN_TWO_POINTS": bars.TYPE_SINGLE_BETWEEN_TWO_POINTS,
        "SINGLE_POINT": bars.TYPE_SINGLE_POINT
    };
    if (definition_type !== "undefined") {
        if (!(definition_type in definition_types)) {
            console.log("Wrong bar definition type. Value was: " + definition_type);
            console.log("Correct values are: ( " + Object.keys(definition_types) + ")");
            definition_type = "MULTI_UNIFORM";
        }
        return definition_types[definition_type];
    }
    else {
        return bars.TYPE_MULTI_UNIFORM;
    }
}

function GetDistanceBetweenIAndJType(distance_type) {
    const distance_types = {
        "REFERENCE_TYPE_L": bars.REFERENCE_TYPE_L,
        "REFERENCE_TYPE_Y": bars.REFERENCE_TYPE_Y,
        "REFERENCE_TYPE_Z": bars.REFERENCE_TYPE_Z
    };
    if (distance_type !== "undefined") {
        if (!(distance_type in distance_types)) {
            console.log("Wrong bar distance type. Value was: " + distance_type);
            console.log("Correct values are: ( " + Object.keys(distance_types) + ")");
            distance_type = "REFERENCE_TYPE_L";
        }
        return distance_types[distance_type];
    }
    else {
        return bars.REFERENCE_TYPE_L;
    }
}

function GetDistanceFrom(distance_from_type) {
    const distance_from_types = {
        "DISTANCE_FROM_START": "DISTANCE_FROM_START",
        "DISTANCE_FROM_END": "DISTANCE_FROM_END"
    };
    if (distance_from_type !== "undefined") {
        if (!(distance_from_type in distance_from_types)) {
            console.log("Wrong bar distance from type. Value was: " + distance_from_type);
            console.log("Correct values are: ( " + Object.keys(distance_from_types) + ")");
            distance_from_type = "DISTANCE_FROM_START";
        }
        return distance_from_types[distance_from_type];
    }
    else {
        return "DISTANCE_FROM_START";
    }
}

function SetDistance(bar, distance_from_type, distance, relative) {

    // ASSERT(typeof distance_from_type !== "undefined" && typeof distance === "undefined", "Type of d");
    if (typeof relative === "undefined") {
        relative = true;
    }

    var distanceType = GetDistanceFrom(distance_from_type);

    switch (distanceType) {
        case "DISTANCE_FROM_START":
            bar.distance_from_start_is_defined_as_relative = relative;
            if (relative) {
                bar.distance_from_start_relative = distance;

            }
            else {
                bar.distance_from_start_absolute = distance;
            }
            break;
        case "DISTANCE_FROM_END":
            bar.distance_from_start_is_defined_as_relative = relative;
            if (relative) {
                bar.distance_from_end_relative = distance;
            }
            else {
                bar.distance_from_end_absolute = distance;//???
            }
            break;
        default:
            if (relative) {
                bar.distance_from_start_relative = distance;
            }
            else {
                bar.distance_from_start_absolute = distance_from_type;
            }
            break;
    }
}

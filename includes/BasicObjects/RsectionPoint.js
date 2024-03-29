if (!RSECTION) {
    throw new Error("This script is only for RSECTION, it creates RSection Points.");
}

/**
 * Creates RSection Point
 * @class
 * @constructor
 * @param {Number}      no              Number of Point, can be undefined
 * @param {Number}      coordinate_y    Coordinate Y
 * @param {Number}      coordinate_z    Coordinate Z
 * @param {String}      comment         Comment, can be undefined
 * @param {Object}      params          Parameters, can be undefined
 * @returns Point
 */
function RSectionPoint(no,
    coordinate_y,
    coordinate_z,
    comment,
    params) {
    if (arguments.length !== 0) {
        return this.point = createBasePoint(no, coordinate_y, coordinate_z, comment, params);
    }
}

/**
 * @returns Point number
 */
RSectionPoint.prototype.GetNo = function () {
    return this.point.no;
};

/**
 * @returns Point object
 */
RSectionPoint.prototype.GetPoint = function () {
    return this.point;
};

/**
 * Returns y coordinate
 */
RSectionPoint.prototype.y = function() {
    return this.point.coordinate_1;
};

/**
 * Returns z coordinate
 */
RSectionPoint.prototype.z = function () {
    return this.point.coordinate_2;
};

/**
 * Creates standard RSection Point
 * @param {Number}      no                      Number of Point, can be undefined
 * @param {Number}      coordinate_y            Coordinate Y
 * @param {Number}      coordinate_z            Coordinate Z
 * @param {Number}      reference_point         Reference point number, can be undefined
 * @param {String}      comment                 Comment, can be undefined
 * @param {Object}      params                  Parameters, can be undefined
 * @returns Point
 */
RSectionPoint.prototype.Standard = function (no,
    coordinate_y,
    coordinate_z,
    reference_point,
    comment,
    params) {
    this.point = createBasePoint(no, coordinate_y, coordinate_z, comment, params);
    this.type = points.TYPE_STANDARD;
    if (typeof reference_point !== "undefined") {
        this.point.reference_point = reference_point;
    }
    this.point.coordinate_system_type = points.COORDINATE_SYSTEM_CARTESIAN;
    return this.point;
};

 /**
 * Creates Between two locations RSection Point
 * @param {Number}      no                              Number of Point, can be undefined
 * @param {Array}       start_location                  Coordinates for start location [y, z]
 * @param {Array}       end_location                    Coordinates for end location [y, z]
 * @param {Number}      distance_from_start             Distance from start
 * @param {Number}      distance_from_end               Distance from end
 * @param {Boolean}     distance_from_start_relative    Distance from start point, can be undefined (True as default)
 * @param {String}      reference_type                  Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default)
 * @param {Number}      offset_in_local_direction       Offset in local direction, can be undefined (0 as default)
 * @param {String}      comment                         Comment, can be undefined
 * @param {Object}      params                          Parameters, can be undefined
 * @returns Point
 */
  RSectionPoint.prototype.BetweenTwoLocations = function (no,
    start_location,
    end_location,
    distance_from_start,
    distance_from_end,
    distance_from_start_relative,
    reference_type,
    offset_in_local_direction,
    comment,
    params) {
    this.point = engine.create_rsection_point(no);
    ASSERT(typeof start_location !== "undefined", "start_location must be defined");
    ASSERT(typeof end_location !== "undefined", "end_location must be defined");
    ASSERT(Array.isArray(start_location), "start_location [y, z]");
    ASSERT(Array.isArray(end_location), "end_location [y, z]");
    this.point.type = points.TYPE_BETWEEN_TWO_LOCATIONS;
    this.point.between_two_locations_start_point_coordinate_1 = start_location[0];
    this.point.between_two_locations_start_point_coordinate_2 = start_location[1];
    this.point.between_two_locations_end_point_coordinate_1 = end_location[0];
    this.point.between_two_locations_end_point_coordinate_2 = end_location[1];
    if (typeof distance_from_start_relative === "undefined") {
        distance_from_start_relative = True;
    }
    this.point.distance_from_start_is_defined_as_relative = distance_from_start_relative;
    if (distance_from_start_relative) {
        this.point.distance_from_start_relative = distance_from_start;
        this.point.distance_from_end_relative = distance_from_end;
    }
    else {
        this.point.distance_from_start_absolute = distance_from_start;
        this.point.distance_from_end_absolute = distance_from_end;
    }
    if (typeof reference_type !== "undefined") {
        this.reference_type = reference_type;
    }
    if (typeof offset_in_local_direction !== "undefined") {
        this.point.offset_in_local_direction = offset_in_local_direction;
    }
    set_comment_and_parameters(this.point, comment, params);
    return this.point;
};

 /**
 * Creates Between two points RSection Point
 * @param {Number}      no                              Number of Point, can be undefined
 * @param {Object}      start_point                     Number of start point
 * @param {Object}      end_point                       Number of end point
 * @param {Number}      distance_from_start             Distance from start
 * @param {Number}      distance_from_end               Distance from end
 * @param {Boolean}     distance_from_start_relative    Distance from start point, can be undefined (True asy default)
 * @param {String}      reference_type                  Reference type, distance of start and end location along the length, in Y or Z coordination, can be undefined ("L" by default)
 * @param {Number}      offset_in_local_direction       Offset in local direction, can be undefined (0 as default)
 * @param {String}      comment                         Comment, can be undefined
 * @param {Object}      params                          Parameters, can be undefined
 * @returns Point
 */
  RSectionPoint.prototype.BetweenTwoPoints = function (no,
    start_point,
    end_point,
    distance_from_start,
    distance_from_end,
    distance_from_start_relative,
    reference_type,
    offset_in_local_direction,
    comment,
    params) {
    ASSERT(typeof start_point !== "undefined", "start_point must be defined");
    ASSERT(typeof end_point !== "undefined", "end_point must be defined");
    ASSERT(points.exist(start_point), "start_point doesn't exist");
    ASSERT(points.exist(end_point), "end_point doesn't exist");
    this.point = engine.create_rsection_point(no);
    this.point.type = points.TYPE_BETWEEN_TWO_POINTS;
    this.point.between_two_points_start_point = start_point;
    this.point.between_two_points_end_point = end_point;
    if (typeof distance_from_start_relative === "undefined") {
        distance_from_start_relative = True;
    }
    this.point.distance_from_start_is_defined_as_relative = distance_from_start_relative;
    if (distance_from_start_relative) {
        this.point.distance_from_start_relative = distance_from_start;
        this.point.distance_from_end_relative = distance_from_end;
    }
    else {
        this.point.distance_from_start_absolute = distance_from_start;
        this.point.distance_from_end_absolute = distance_from_end;
    }
    if (typeof reference_type !== "undefined") {
        this.reference_type = reference_type;
    }
    if (typeof offset_in_local_direction !== "undefined") {
        this.point.offset_in_local_direction = offset_in_local_direction;
    }
    set_comment_and_parameters(this.point, comment, params);
    return this.point;
};

/**
 * Creates On lines RSection Point
 * @param {Number}      no                              Number of Point, can be undefined
 * @param {Number}      line                            Line number
 * @param {Number}      distance_from_start             Distance from start
 * @param {Number}      distance_from_end               Distance from end
 * @param {Boolean}     distance_from_start_relative    Distance from start point, can be undefined (True as default)
 * @param {String}      reference_type                  Reference type, can be undefined ("L" by default)
 * @param {String}      comment                         Comment, can be undefined
 * @param {Object}      params                          Parameters, can be undefined
 * @returns Point
 */
RSectionPoint.prototype.OnLine = function (no,
    line,
    distance_from_start,
    distance_from_end,
    distance_from_start_relative,
    reference_type,
    comment,
    params) {
    ASSERT(typeof line !== "undefined", "line must be defined");
    ASSERT(lines.exist(line), "line doesn't exist");
    this.point = engine.create_rsection_point(no);
    this.point.type = points.TYPE_ON_LINE;
    if (typeof distance_from_start_relative === "undefined") {
        distance_from_start_relative = True;
    }
    this.point.distance_from_start_is_defined_as_relative = distance_from_start_relative;
    if (distance_from_start_relative) {
        this.point.distance_from_start_relative = distance_from_start;
        this.point.distance_from_end_relative = distance_from_end;
    }
    else {
        this.point.distance_from_start_absolute = distance_from_start;
        this.point.distance_from_end_absolute = distance_from_end;
    }
    set_comment_and_parameters(this.point, comment, params);
    return this.point;
};

    /**
 * Creates base RSection Point (private)
 * @param {Number}      no              Number of Point, can be undefined
 * @param {Number}      coordinate_y    Coordinate Y
 * @param {Number}      coordinate_z    Coordinate Z
 * @param {String}      comment         Comment, can be undefined
 * @param {Object}      params          Parameters, can be undefined
 * @returns Point
 */
function createBasePoint (no,
    coordinate_y,
    coordinate_z,
    comment,
    params) {
    ASSERT(typeof coordinate_y !== "undefined", "coordinate_y must be defined");
    ASSERT(typeof coordinate_z !== "undefined", "coordinate_z must be defined");
    var point = engine.create_rsection_point(no);
    point.coordinate_1 = typeof coordinate_y !== 'undefined' ? coordinate_y : 0.0;
    point.coordinate_2 = typeof coordinate_z !== 'undefined' ? coordinate_z : 0.0;
    set_comment_and_parameters(point, comment, params);
    return point;
}

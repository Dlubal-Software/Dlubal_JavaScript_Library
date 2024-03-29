/*
Member sets cannot be set?? What condition for member sets?
*/

include("../../Tools/global.js");

function createBaseSteelDesignConfiguration (object_to_create,
    no,
    members_no,
    member_sets_no,
    comment,
    params) {
    ASSERT(STEEL_DESIGN.isActive(), "Steel design must be active");
    if (typeof no === "undefined") {
        addon = object_to_create.create();
    }
    else {
        addon = object_to_create.create(no);
    }
    setSteelDesign_Members(addon, members_no, member_sets_no);
    set_comment_and_parameters(addon, comment, params);
    return addon;
}

setSteelDesign_Members = function (object_to_set,
    members_no,
    member_sets_no) {
    if (typeof members_no !== "undefined") {
        ASSERT(Array.isArray(members_no), "Member list must be array if member indexes");
        member_list = members_no;
        members_no = [];
        for (var i = 0; i < member_list.length; ++i) {
            if (members.exist(member_list[i])) {
                ASSERT(__hasSteelSection(members[member_list[i]].section_start) && __hasSteelSection(members[member_list[i]].section_end), "Member no. " + member_list[i] + " must have section with " + materials.TYPE_STEEL + " material type");
                members_no.push(member_list[i]);
            }
            else {
                console.log("Member no. " + member_list[i] + " doesn't exist");
            }
        }
        object_to_set.assigned_to_members = members_no;
    }
    if (typeof member_sets_no !== "undefined") {
        ASSERT(Array.isArray(member_sets_no), "Member set list must be array of member sets indexes");
        member_sets_list = member_sets_no;
        member_sets_no = [];
        for (var i = 0; i < member_sets_list.length; ++i) {
            if (member_sets.exist(member_sets_list[i])) {
                for (var j = 0; j < member_sets[member_sets_list[i]].members.length; ++j) {
                    ASSERT(__hasSteelSection(member_sets[member_sets_list[i]].members[j].section_start) && __hasSteelSection(member_sets[member_sets_list[i]].members[j].section_end), "Member no. " + member_sets_list[i].members[j] + " (member set no. " + member_sets_list[i] + ") must have section with " + materials.TYPE_STEEL + " material type");
                }
                member_sets_no.push(member_sets_list[i]);
            }
            else {
                console.log("Member set no. " + member_sets_list[i] + " doesn't exist");
            }
        }
        object_to_set.assigned_to_member_sets = member_sets_no;
    }
}

setSteelDesignUltimateConfiguration_LimitValues = function (addon_settings,
    property_limit_values_tension,
    property_limit_values_compression,
    property_limit_values_shear_y,
    property_limit_values_shear_z,
    property_limit_values_torsion,
    property_limit_values_bending_about_major_axis_y,
    property_limit_values_bending_about_minor_axis_z) {
    ASSERT(addon_settings.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_limit_values_tension !== "undefined") {
        addon_settings.property_limit_values_tension = property_limit_values_tension;
    }
    if (typeof property_limit_values_compression !== "undefined") {
        addon_settings.property_limit_values_compression = property_limit_values_compression;
    }
    if (typeof property_limit_values_shear_y !== "undefined") {
        addon_settings.property_limit_values_shear_y = property_limit_values_shear_y;
    }
    if (typeof property_limit_values_shear_z != "undefined") {
        addon_settings.property_limit_values_shear_z = property_limit_values_shear_z;
    }
    if (typeof property_limit_values_torsion !== "undefined") {
        addon_settings.property_limit_values_torsion = property_limit_values_torsion;
    }
    if (typeof property_limit_values_bending_about_major_axis_y !== "undefined") {
        addon_settings.property_limit_values_bending_about_major_axis_y = property_limit_values_bending_about_major_axis_y;
    }
    if (typeof property_limit_values_bending_about_minor_axis_z !== "undefined") {
        addon_settings.property_limit_values_bending_about_minor_axis_z = property_limit_values_bending_about_minor_axis_z;
    }
};

setSteelDesignUltimateConfiguration_PositionOfPositiveTransverse = function (addon_settings,
    property_load_acts_vp_downwards_on_top_flange,
    property_load_acts_vp_at_shear_point,
    property_load_acts_vp_at_center_point,
    property_load_acts_vp_downwards_on_bottom_flange) {
    ASSERT(addon_settings.property_perform_stability_analysis, "Perform stability design must be on");
    if (typeof property_load_acts_vp_downwards_on_top_flange !== "undefined") {
        addon_settings.property_load_acts_vp_downwards_on_top_flange = property_load_acts_vp_downwards_on_top_flange
    }
    if (typeof property_load_acts_vp_at_shear_point !== "undefined") {
        addon_settings.property_load_acts_vp_at_shear_point = property_load_acts_vp_at_shear_point;
    }
    if (typeof property_load_acts_vp_at_center_point !== "undefined") {
        addon_settings.property_load_acts_vp_at_center_point = property_load_acts_vp_at_center_point;
    }
    if (typeof property_load_acts_vp_downwards_on_bottom_flange !== "undefined") {
        addon_settings.property_load_acts_vp_downwards_on_bottom_flange = property_load_acts_vp_downwards_on_bottom_flange;
    }
};

function GetCurrentCodeOfStandard () {
    return general.current_standard_for_steel_design.match(/\w+/);
}

function IsCurrentCodeOfStandard (current_standard) {
    return GetCurrentCodeOfStandard() == current_standard;  // Don't use === (we don't want compare types of strings)
}
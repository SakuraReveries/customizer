include <BOSL2/std.scad>

$fn = 64;

wire_diameter = 4.2;
jacket_diameter = 0.6;
cable_diameter = wire_diameter + jacket_diameter;

coil_turns = 16;
coil_packing_factor = 5.1;
coil_outer_diameter = 16;

straight_length = 50;
connector_length = 60.7;

rotate([0, 180, 0]) union() {
    rotate([0, 90, 0]) path_sweep(circle(d = cable_diameter), helix(turns=coil_turns, h=coil_turns * coil_packing_factor, d = coil_outer_diameter));
    translate([0, 0.25, -coil_outer_diameter / 2]) rotate([0, 90, -90]) cylinder(d = cable_diameter, h = straight_length);
    translate([coil_turns * coil_packing_factor, 0.25, -coil_outer_diameter / 2]) sphere(d = cable_diameter);
    translate([coil_turns * coil_packing_factor, 0.25, -coil_outer_diameter / 2]) rotate([0, 90, 0]) cylinder(d = cable_diameter, h = straight_length);
    translate([coil_turns * coil_packing_factor + connector_length + straight_length, 0.25, -coil_outer_diameter / 2]) rotate([0, 90, 0]) cylinder(d = cable_diameter, h = straight_length);
}
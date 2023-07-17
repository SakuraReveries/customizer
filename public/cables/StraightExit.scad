include <BOSL2/std.scad>

$fn = 64;

wire_diameter = 4.28;
jacket_diameter = 0.6;
cable_diameter = wire_diameter + jacket_diameter;

coil_turns = 16.5;
coil_packing_factor = 5.3;
coil_outer_diameter = 16;

r = cable_diameter / 2;

curve = [for(i=[0:10:180]) [i/20, sin(i)]];
curve_two = [for(i=[0:10:180]) [i/45, sin(i)]];

union() {
    rotate([0, 90, 0]) path_sweep(circle(d = cable_diameter), helix(turns=coil_turns, h=coil_turns * coil_packing_factor, d = coil_outer_diameter));
    translate([0, 0, -coil_outer_diameter / 2]) rotate([0, 0, 245]) path_sweep2d(circle(d=cable_diameter), curve);
    translate([-3.8, -8.15, -coil_outer_diameter / 2]) rotate([0, 0, 188]) path_sweep2d(circle(d=cable_diameter), curve_two);
    translate([-7.75, -8.7, -coil_outer_diameter / 2]) rotate([0, 90, 150]) cylinder(d = cable_diameter, h = 30);
    translate([83.45, -0.6, 1]) rotate([5, 210, 0]) {
        translate([0, 0, -coil_outer_diameter / 2]) rotate([0, 0, 245]) path_sweep2d(circle(d=cable_diameter), curve);
        translate([-3.8, -8.15, -coil_outer_diameter / 2]) rotate([0, 0, 188]) path_sweep2d(circle(d=cable_diameter), curve_two);
        translate([-7.75, -8.7, -coil_outer_diameter / 2]) rotate([0, 90, 150]) cylinder(d = cable_diameter, h = 30);
    }
}
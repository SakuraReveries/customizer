include <BOSL2/std.scad>

$fn = 64;

wire_diameter = 4.2;
jacket_diameter = 0.6;
cable_diameter = wire_diameter + jacket_diameter;

rotate([0, 90, 0]) union() {
    translate([-20, 20, 15.25]) cylinder(d = cable_diameter, h = 15);
    rotate([90, 0, 90]) translate([0, 30, -20]) path_sweep(circle(d = cable_diameter), helix(turns = 2.25, h = 20, d = 40));
    translate([0, 0, 50]) sphere(d = cable_diameter);
    translate([0, 0, 50]) cylinder(d = cable_diameter, h = 30);
}
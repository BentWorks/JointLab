# JointLab development roadmap

JointLab is an educational joinery atlas and an experimental FDM modular-connector workshop. Source for the public GitHub Pages site is the repository root; `index.html`, `generator.html`, `fit-lab.html` and `joint-visuals.js` are published there. The working copy in this task uses a `dist/` directory.

## Available now

- A 77-pattern searchable woodworking and printable-joint atlas, with application filters and a suitability guide.
- Representative SVG exploded/assembled diagrams for joint families. These are **not** dimensionally exact drawings for every individual joint.
- A parametric sliding-dovetail tongue/socket generator with rotated and exploded views, dimensions, and separate STL exports.
- A three-position rectangular clearance gauge producing matching male/female STL plates. Tests clearance per side, not tensile strength.

## Verification so far

- Both dovetail STL solids were checked for unmatched mesh edges and enclosed signed volume.
- Both clearance-gauge STL solids were checked for unmatched mesh edges (0 unmatched edges at representative defaults).
- Browser UI of the published dovetail generator was checked for loading and assembled-view switching.
- **No physical fit, wear, strength, or fatigue tests have been performed.** STL mesh validity alone does not establish printability, dimensional accuracy, or load capacity.

## Next implementation candidates

1. A captive sliding-dovetail module with a **separate replaceable stop/key** and positive lengthwise retention.
2. A replaceable cantilever latch pair, with root radii, strain estimates, print-direction guidance and breakaway test coupons. Avoid declaring a universal fatigue life.
3. A bayonet or quarter-turn coupling with an independently removable locking detent.
4. A catalog-to-generator link for only those patterns whose actual geometry is implemented, and clearer distinction between representative illustrations and exact models.
5. Export bundle/3MF support, saved parameter presets and versioned design provenance.
6. Automated STL regression checks across minimum/maximum parameter combinations and slicer imports.
7. Mobile and keyboard accessibility QA, richer material guidance and measured A1 calibration data.

## Print-test log template

Record these after a physical print: printer / nozzle, material and brand, dry/wet filament condition, layer height, line width, wall count, infill, outer-wall order, X-Y hole compensation, orientation, peg/slot dimensions, nominal clearance per side, observed insertion force, removal cycles, visible whitening/cracks, and fit result. Record slicer version.

## Safety notes

Do not use unvalidated parts for overhead loads, life safety, elevated temperatures, high impact or other safety-critical assemblies. FDM behavior depends strongly on material, print orientation, slicer settings and repeated cycling. A printable geometry or visually convincing assembled preview does not prove mechanical retention.

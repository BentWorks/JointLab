# JointLab

An interactive atlas of woodworking joints and mechanical connections, with practical guidance for adapting the ideas to **modular FDM 3D printing** (including the Bambu A1).

## Live site

After GitHub Pages is enabled, visit: https://bentworks.github.io/JointLab/

## Features

- Search and filter traditional and modern joint designs by use, origin, lock type, filament suitability, and reusability.
- Purpose-based joint recommender for frames, furniture, boxes, shelves, and beams.
- Notes about how woodworking joints translate to PLA, PETG, and TPU.
- Trial fit-clearance calculator for printed sliding connections.
- References to traditional woodworking research.

## Local development

No build dependencies. Open `index.html` in a modern browser or serve the folder with any static HTTP server.

## Roadmap

1. Split joint data and UI logic into independently testable modules.
2. Add precise dimensioned diagrams and a printability validation checklist.
3. Introduce parametric profiles (sliding dovetail, keyed T-slot, tusk tenon, bayonet).
4. Export test coupons and paired connectors as STL/3MF.
5. Maintain empirical Bambu A1 fit profiles and repeated-assembly results.

**Safety:** Joint ratings are qualitative design heuristics, not certified mechanical load data. Prototype and test; never trust unverified printed joints for safety-critical loads.

Licensed under the MIT License.

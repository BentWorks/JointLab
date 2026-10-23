/* JointLab candidate audit. These ratings refer to design maturity, not strength.
   good = credible adaptation; adapt = requires significant rework or supporting joint;
   prototype = related working geometry exists but retention not implemented;
   planned = concept without implemented printable geometry. */
window.JOINT_GUIDANCE={
  "Wedged through mortise-and-tenon": [
    "adapt",
    "Knockdown frame corner with replaceable wedge",
    "Wedge can loosen, and concentrated force may split printed layers."
  ],
  "Drawbored mortise-and-tenon": [
    "adapt",
    "Pinned frame joints with a separately printed, replaceable peg",
    "Offset-bore drawboring deliberately strains parts; reduce or eliminate interference for brittle PLA."
  ],
  "Tusk tenon": [
    "good",
    "Knockdown shelving and frame rails",
    "Accessible wedge space and sufficient tenon root thickness are required."
  ],
  "Keyed through-tenon": [
    "good",
    "Reusable right-angle frame construction",
    "Keep the retaining key replaceable and accessible."
  ],
  "Through dovetail": [
    "adapt",
    "Small modular enclosure corners",
    "A conventional drawer corner commonly needs glue or external capture; add deliberate retention."
  ],
  "Half-blind dovetail": [
    "adapt",
    "Cases where the connection must be concealed on one face",
    "Complex support and assembly geometry; not a default recommendation."
  ],
  "Dovetail bridle": [
    "adapt",
    "Interlocking corner frame",
    "Needs a well-defined sliding direction, stop and printed test coupon."
  ],
  "Sliding dovetail": [
    "good",
    "Rails, panels and removable shelves",
    "Resists transverse separation but needs a stop to prevent reverse sliding."
  ],
  "Tapered sliding dovetail": [
    "adapt",
    "Short, self-centering interchangeable rails",
    "Long tapers can bind and over-stress FDM walls; test engagement length."
  ],
  "Housed dovetail / Ari-otoshi": [
    "adapt",
    "Captured shelves and structural brackets",
    "Often complex to support and print; evaluate geometry and insertion axis."
  ],
  "Dovetail housing": [
    "good",
    "Removable shelf or panel slots",
    "Add a positive end stop if longitudinal withdrawal is possible."
  ],
  "Shachi-sen key": [
    "adapt",
    "Removable locking insert for a separate connection",
    "This is a locking component, not a stand-alone joint."
  ],
  "Komisen draw peg": [
    "adapt",
    "Replaceable cross pin holding a tenon",
    "Offset-bore strain is not automatically suitable for printed plastic."
  ],
  "Hanasen external peg": [
    "adapt",
    "Accessible exposed retaining peg for a modular frame",
    "Pins can shear across layer lines; orient carefully."
  ],
  "Sashikomi-sen inserted key": [
    "adapt",
    "Inserted retainer for a printable mortise/slot assembly",
    "Needs a compatible printed receiving joint."
  ],
  "Wedge-locked Nuki": [
    "good",
    "Beams passing through repeated modular posts",
    "Printed wedge compression and creep require physical testing."
  ],
  "Three-way castle joint": [
    "adapt",
    "Three-axis corner node for modular frames",
    "Complex print orientation and assembly order; prototype before promising captive retention."
  ],
  "Three-way corner tenon": [
    "adapt",
    "Three-direction printed frame intersection",
    "Locking depends on assembly sequence and added capture."
  ],
  "Floating-panel frame": [
    "adapt",
    "Replaceable panels captured inside a printed frame",
    "This is an assembly technique, not one standalone fastener-free joint."
  ],
  "Printed sliding dovetail with stop": [
    "prototype",
    "Repeatedly reconfigurable rails and tracks",
    "Only an ordinary sliding dovetail generator currently exists; separate locking stop is not implemented."
  ],
  "Printed T-slot with twist key": [
    "planned",
    "Modular rail grid with replaceable stop key",
    "Concept only; geometry and retention are not implemented."
  ],
  "Printed quarter-turn bayonet": [
    "planned",
    "Quick-release accessories and light-duty twist connectors",
    "Concept only; twisting loads, detent and tolerances require design and test."
  ],
  "Printed snap cantilever": [
    "planned",
    "Tool-less small removable panel or cover clips",
    "Concept only; fatigue and layer-oriented bending need validation."
  ],
  "Printed wedge cassette": [
    "planned",
    "Replaceable wedge lock in a modular connector",
    "Concept only; no printable generator yet."
  ],
  "Printed puzzle-lock block": [
    "planned",
    "Interlocking reusable modular blocks",
    "Concept only; release sequence needs clear design."
  ]
};

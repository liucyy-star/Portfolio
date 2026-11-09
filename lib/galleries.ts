export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  category: string;
  description: string;
};

export type Gallery = {
  kicker: string; // small label above the title
  title: string;
  intro: string;
  items: GalleryItem[];
};

export const graphicDesign: Gallery = {
  kicker: "beyond ux",
  title: "Graphic design",
  intro: "Posters, branding, and visual pieces where I get to play with color and type.",
  items: [
    {
      src: "/graphic-design/piece-01.jpg", width: 1314, height: 1842,
      title: "Fly with James & the Giant Peach", category: "Illustration · Poster",
      description: "A travel-poster take on James and the Giant Peach: the peach comes to rest on top of the Empire State Building, painted in soft, textured strokes with hand-lettered type.",
      alt: "Illustrated travel poster reading “Fly with James & the Giant Peach”, with a giant peach resting on top of the Empire State Building among clouds",
    },
    {
      src: "/graphic-design/piece-02.jpg", width: 1001, height: 716,
      title: "Giant Peach postcard", category: "Print · Postcard",
      description: "The back of a postcard made to go with the poster, kept quiet so the small peach mark can do the talking.",
      alt: "Postcard back with a small peach illustration above a dividing line and blank address lines",
    },
    {
      src: "/graphic-design/piece-03.png", width: 1225, height: 793,
      title: "Color schemes: Compound", category: "Color study",
      description: "One abstract composition, repeated in four color schemes. This version uses a compound scheme of teal and peach. The swatches used sit in the bottom corner.",
      alt: "Abstract geometric composition in a compound color scheme of teal and peach",
    },
    {
      src: "/graphic-design/piece-04.png", width: 1225, height: 792,
      title: "Color schemes: Triad", category: "Color study",
      description: "The same composition in a triad of blue, red, and yellow, the loudest of the four versions.",
      alt: "The same geometric composition in a triad color scheme of blue, red, and yellow",
    },
    {
      src: "/graphic-design/piece-05.png", width: 1224, height: 793,
      title: "Color schemes: Complementary", category: "Color study",
      description: "The same composition in a complementary scheme, letting yellow and magenta push against each other.",
      alt: "The same geometric composition in a complementary color scheme of yellow and magenta",
    },
    {
      src: "/graphic-design/piece-06.png", width: 1224, height: 792,
      title: "Color schemes: Analogous", category: "Color study",
      description: "The same composition in neighboring oranges and pinks, the warmest and calmest of the set.",
      alt: "The same geometric composition in an analogous color scheme of orange and pink",
    },
    {
      src: "/graphic-design/piece-07.jpg", width: 792, height: 1224,
      title: "Connect around the globe", category: "Collage",
      description: "A collage in the style of the early web: a globe, a beige keyboard, and a pile of pop-up windows asking yes or no, all carrying the line “connect with others around the globe”.",
      alt: "Retro web collage with a globe, a beige keyboard, stacked pop-up windows, and the words “connect with others around the globe”",
    },
    {
      src: "/graphic-design/piece-08.jpg", width: 792, height: 1224,
      title: "Azo Sans", category: "Type specimen",
      description: "A specimen poster for the typeface Azo Sans, with a pangram, the full character set, a short history, and one oversized lowercase a.",
      alt: "Orange type specimen poster for Azo Sans with a large navy lowercase a",
    },
    {
      src: "/graphic-design/piece-09.png", width: 775, height: 1190,
      title: "Spirit Night", category: "Event poster",
      description: "A poster for a Spirit Night on September 26th, built from a rainbow, a cloud, and a shower of candy.",
      alt: "Pink Spirit Night event poster with a rainbow, a cloud, and falling candy, dated September 26th",
    },
    {
      src: "/graphic-design/piece-10.jpg", width: 877, height: 877,
      title: "Common Typographic Diseases I", category: "Typography · Layout",
      description: "The first of three layouts of the same tongue-in-cheek text about typophilia, typophobia, and other type “diseases”. This one keeps everything small and lets the white space do the work.",
      alt: "Typographic layout of the text “Common Typographic Diseases” in small, widely spaced columns",
    },
    {
      src: "/graphic-design/piece-11.jpg", width: 978, height: 980,
      title: "Suspicion", category: "Type study",
      description: "The word “suspicion” as an image, with the p and i blown up until they look like a pair of watching eyes.",
      alt: "Black and white type study of the word “suspicion”, with oversized letters p and i",
    },
    {
      src: "/graphic-design/piece-12.jpg", width: 980, height: 980,
      title: "Transition", category: "Type study",
      description: "“Transition” repeated down the page and fading from black to almost nothing, so the word acts out what it means.",
      alt: "The word “transition” repeated in a stack, fading from black to near white",
    },
    {
      src: "/graphic-design/piece-13.jpg", width: 878, height: 879,
      title: "Common Typographic Diseases II", category: "Typography · Layout",
      description: "The second layout of the same text, with blocks turned on their side so the page has to be read at an angle.",
      alt: "Layout of “Common Typographic Diseases” with blocks of text rotated vertically",
    },
    {
      src: "/graphic-design/piece-14.jpg", width: 878, height: 880,
      title: "Common Typographic Diseases III", category: "Typography · Layout",
      description: "The third layout, led by a large, spaced-out headline with the definitions scattered around it.",
      alt: "Layout of “Common Typographic Diseases” with a large spaced-out headline and scattered text blocks",
    },
    {
      src: "/graphic-design/piece-15.jpg", width: 825, height: 824,
      title: "Words in space I", category: "Typography · Layout",
      description: "A passage about how print places words in space, set as a calm, centered column.",
      alt: "Centered serif text layout of a passage about how print situates words in space",
    },
    {
      src: "/graphic-design/piece-16.jpg", width: 823, height: 824,
      title: "Words in space II", category: "Typography · Layout",
      description: "The same passage again, with lines pushed left and right and letters spread apart so the layout follows what the text says.",
      alt: "The same passage about print and space, with lines pushed left and right and letters spaced apart",
    },
    {
      src: "/graphic-design/piece-17.gif", width: 361, height: 361,
      title: "Hello", category: "Motion · Type",
      description: "A small looping animation of “hello” in layered rainbow italics on pink.",
      alt: "Animated word “hello” in layered rainbow italic letters on a pink background",
    },
    {
      src: "/graphic-design/piece-18.jpg", width: 977, height: 977,
      title: "Compression", category: "Type study",
      description: "The letters of “compression” squeezed together until they merge into one dense shape.",
      alt: "Black letters of the word “compression” squeezed together into one overlapping shape",
    },
    {
      src: "/graphic-design/piece-19.jpg", width: 1168, height: 1496,
      title: "I love you", category: "Typography · Poetry layout",
      description: "A poem set with loose, drifting line breaks, using space and a few colored words to pace the refrain “I love you”.",
      alt: "Typeset poem with scattered line breaks and the refrain “I love you”, with a few words in color",
    },
    {
      src: "/graphic-design/piece-20.jpg", width: 1448, height: 2000,
      title: "Car & figure: color studies", category: "Illustration · Color study",
      description: "One illustration of a figure leaning on a vintage car, recolored in four different schemes side by side.",
      alt: "Four illustrations of a figure leaning on a vintage car, each in a different color scheme",
    },
    {
      src: "/graphic-design/piece-21.jpg", width: 1960, height: 2000,
      title: "Car & figure", category: "Illustration",
      description: "The full-size illustration in purple, magenta, and cherry red.",
      alt: "Illustration of a purple-haired figure in a magenta top and purple flares leaning on a red vintage car",
    },
    {
      src: "/graphic-design/piece-22.jpg", width: 612, height: 792,
      title: "Love the Self Club", category: "Collage · Poster",
      description: "A loud pink collage for a “Love the Self Club”, with friends piled together under stars and a burst of color.",
      alt: "Pink “Love the Self Club” collage of friends sitting together, with stars and a bright feathered burst",
    },
    {
      src: "/graphic-design/piece-23.jpg", width: 1197, height: 1559,
      title: "Everyday objects", category: "Illustration",
      description: "A grid of twelve line drawings of everyday things, including clogs, a camera, and a hat.",
      alt: "Grid of twelve black line drawings of everyday objects, including clogs, a camera, and a hat",
    },
    {
      src: "/graphic-design/piece-24.jpg", width: 1244, height: 1422,
      title: "Everyday objects in color", category: "Illustration · Color study",
      description: "The same objects filled in and repeated across four color schemes.",
      alt: "Rows of clogs, cameras, hats, and notebooks illustrated in four different color schemes",
    },
    {
      src: "/graphic-design/piece-25.jpg", width: 1546, height: 2000,
      title: "Little reminders", category: "Photo collage",
      description: "A photo of friends in a park, covered in paper labels with small prompts like “relax”, “have a picnic”, and “unleash your creativity”.",
      alt: "Photo collage of friends in a park with paper labels such as “relax”, “move about”, “have a picnic”, and “unleash your creativity”",
    },
  ],
};

export const photography: Gallery = {
  kicker: "beyond ux",
  title: "Photography",
  intro: "A collection of places and people seen through my lens. Each series shows my eye for composition growing over time.",
  items: [
    {
      src: "/photography/photo-01.jpg", width: 891, height: 1192,
      title: "Brick wall", category: "Portrait",
      description: "A bright, straight-on portrait in daylight against a speckled brick wall.",
      alt: "Portrait of a smiling person with long dark hair against a speckled brick wall",
    },
    {
      src: "/photography/photo-02.jpg", width: 2000, height: 1546,
      title: "Through the ring", category: "Portrait",
      description: "A face framed by a round playground window, with gym rings hanging in front and splitting the frame.",
      alt: "Face framed through a round playground opening, with gym rings hanging in front",
    },
    {
      src: "/photography/photo-03.jpg", width: 1429, height: 2000,
      title: "Half light", category: "Portrait",
      description: "A low-key portrait where most of the face falls into shadow, with just enough light to read the expression.",
      alt: "Low-key portrait of a person with long dark hair looking down, half in shadow",
    },
    {
      src: "/photography/photo-04.jpg", width: 2000, height: 1500,
      title: "Radiating", category: "Black & white",
      description: "Looking straight up at thin stems bursting from a single point, so the plant turns into a graphic pattern.",
      alt: "Black and white view looking up at thin plant stems radiating from a single point",
    },
    {
      src: "/photography/photo-05.jpg", width: 491, height: 737,
      title: "Hide and seek", category: "Portrait",
      description: "Two people and one big tree: one tucked behind the trunk, one looking out from the branches.",
      alt: "Person partly hidden behind a large tree trunk, with another figure looking out from its branches",
    },
    {
      src: "/photography/photo-06.jpg", width: 598, height: 737,
      title: "Film still", category: "Black & white · Composite",
      description: "A composite styled like a 1960s film still, with a couple in formal clothes posed on a chaise.",
      alt: "Black and white composite of a couple in formal 1960s clothes seated on a chaise",
    },
    {
      src: "/photography/photo-07.jpg", width: 2000, height: 1429,
      title: "Drumline", category: "Candid",
      description: "A snare drummer mid-beat, with the rest of the drumline and their blue tenor drums behind.",
      alt: "Marching band drummer playing a snare, with blue tenor drums behind",
    },
    {
      src: "/photography/photo-08.jpg", width: 1333, height: 2000,
      title: "Shaded path", category: "Portrait",
      description: "A candid laugh on a leafy path, caught while turning to the side.",
      alt: "Person in glasses and a denim jacket smiling to the side on a shaded path",
    },
    {
      src: "/photography/photo-09.jpg", width: 1333, height: 2000,
      title: "Graffiti pillar", category: "Portrait",
      description: "A crouched portrait on the sand beside a pillar covered in layers of graffiti.",
      alt: "Person in a denim jacket crouching on the beach beside a graffiti-covered pillar",
    },
    {
      src: "/photography/photo-10.jpg", width: 2000, height: 1333,
      title: "Canal footbridge", category: "Place",
      description: "A lone figure on a railed footbridge, with the railing leading the eye down a palm-lined canal.",
      alt: "Figure walking down a railed footbridge beside a palm-lined canal",
    },
    {
      src: "/photography/photo-11.jpg", width: 1600, height: 2000,
      title: "Still water", category: "Place",
      description: "Small boats tied up along a calm canal, under bright houses and palms.",
      alt: "Small boats docked on a still canal below colorful waterfront homes",
    },
    {
      src: "/photography/photo-12.jpg", width: 2000, height: 1333,
      title: "White bridge", category: "Place",
      description: "A white footbridge, moored boats, and a big white house stacked in layers across the canal.",
      alt: "White footbridge and moored boats on a canal in front of a large white house",
    },
    {
      src: "/photography/photo-13.jpg", width: 2000, height: 1428,
      title: "Sideline", category: "Candid",
      description: "A candid moment by the bleachers on a busy afternoon at the sports field.",
      alt: "Person with long red hair standing beside the bleachers at a school sports field",
    },
    {
      src: "/photography/photo-14.jpg", width: 2000, height: 1333,
      title: "Spotlit", category: "Portrait",
      description: "A wide-eyed reaction under hard light against a dark background, more character study than portrait.",
      alt: "Wide-eyed person in glasses and a soccer jersey lit against a dark background",
    },
    {
      src: "/photography/photo-15.jpg", width: 2000, height: 1429,
      title: "Window light", category: "Portrait",
      description: "A soft, backlit portrait by a bright window, looking up and away.",
      alt: "Soft backlit portrait of a person with long hair looking up by a bright window",
    },
    {
      src: "/photography/photo-16.jpg", width: 1429, height: 2000,
      title: "Studio floor", category: "Candid",
      description: "Painting on the floor of a cluttered room, surrounded by palettes, paint jars, and bookshelves.",
      alt: "Person sitting on the floor painting, surrounded by palettes and paint jars, with bookshelves behind",
    },
    {
      src: "/photography/photo-17.jpg", width: 1545, height: 2000,
      title: "Corner room", category: "Interior",
      description: "An empty corner of a wood-paneled room, where the door, table, and chairs make a quiet composition.",
      alt: "Corner of a room with wood-paneled walls, a closed door, and a white table with black chairs",
    },
    {
      src: "/photography/photo-18.jpg", width: 1546, height: 2000,
      title: "On the ledge", category: "Black & white",
      description: "A relaxed portrait on a low wall, with trees filling the frame behind.",
      alt: "Black and white photo of a person sitting on a low wall with trees behind",
    },
    {
      src: "/photography/photo-19.jpg", width: 1333, height: 2000,
      title: "Close up", category: "Portrait",
      description: "A tight, friendly portrait with warm greenery melting into the background.",
      alt: "Close-up portrait of a smiling person with swept-up dark hair and greenery behind",
    },
    {
      src: "/photography/photo-20.jpg", width: 1600, height: 2000,
      title: "Inside the lines", category: "Concept",
      description: "Shot from above: a figure lying on concrete inside the curves of painted court lines.",
      alt: "Overhead view of a person in a blue shirt lying on concrete inside curved white court lines",
    },
    {
      src: "/photography/photo-21.jpg", width: 2000, height: 1333,
      title: "Looking away", category: "Portrait",
      description: "A close profile resting on folded arms, with soft light along the face.",
      alt: "Close profile of a person resting on their arms, looking off to the side",
    },
    {
      src: "/photography/photo-22.jpg", width: 1429, height: 2000,
      title: "Top of the stairs", category: "Perspective",
      description: "Looking up a set of metal playground stairs at a face peering down from the top.",
      alt: "View up a set of metal playground stairs to a person peering down from the top",
    },
    {
      src: "/photography/photo-23.jpg", width: 2000, height: 2000,
      title: "Hand on metal", category: "Abstract",
      description: "A hand's silhouette pressed against a scratched, sunlit metal surface.",
      alt: "Silhouette of a hand pressed against a scratched, sunlit metal surface",
    },
    {
      src: "/photography/photo-24.jpg", width: 2000, height: 2000,
      title: "Round window", category: "Place",
      description: "A park and a blue sky framed through a round opening, like looking through a lens.",
      alt: "Park with green grass and trees under a blue sky, framed through a round opening",
    },
    {
      src: "/photography/photo-25.jpg", width: 1333, height: 2000,
      title: "Bench lines", category: "Detail",
      description: "Wooden bench slats running off into a soft blur, shot with a very shallow depth of field.",
      alt: "Close-up of wooden bench slats receding into a soft blurred background",
    },
  ],
};

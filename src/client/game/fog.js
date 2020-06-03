
// - = - = - = - = - = fog of war START = - = - = - = - = -
// create variables for fog of war
let darkness = 0.85;
let fogness = 0.8;
let dark_color = "black";
let fog_color = "black";
let global_vision = [];
let map_width = 1400;
let map_height = 788;

// entity variables for fog of war
let entity_size = 20;
let entities = [];
let entity_color = "yellow";
let entity_spacing = 100;
let entity_vision_radius = 150;

for (let i = 0; i < map_width / (entity_size + entity_spacing); i += 1) {
  for (let j = 0; j < map_height / (entity_size + entity_spacing); j += 1) {
    entities.push({
      x: i * (entity_size + entity_spacing) + entity_spacing / 2 - entity_size / 2,
      y: j * (entity_size + entity_spacing) + entity_spacing / 2 - entity_size / 2,
    });
  };
};

// get canvases
let canvases = {
  main: document.getElementById("ctx"),
  fog: document.getElementById("fog"),
  dark: document.getElementById("dark"),
}

// set size
canvases.main.width = canvases.fog.width = canvases.dark.width = map_width;
canvases.main.height = canvases.fog.height = canvases.dark.height = map_height;
// get contexts
let main = canvases.main.getContext("2d");
let fog = canvases.fog.getContext("2d");
let dark = canvases.dark.getContext("2d");

// get background image
// let image = new Image();
// image.src = "/client/images/background/bk_forest_night.png";

function draw(e) {
  let pos = { x: e.clientX, y: e.clientY };
  let x = pos.x;
  let y = pos.y;

  let default_gco = main.globalCompositeOperation; // source-over

  // draw things
  // main.clearRect(0, 0, map_width, map_height);
  fog.clearRect(0, 0, map_width, map_height);
  dark.clearRect(0, 0, map_width, map_height);

  // Main
  // *** NOTE *** instead of here, bg was added it in css
  // main.drawImage(image, 0, 0, map_width, map_height);
  // main.fillStyle = entity_color;
  // for (let i = 0; i < entities.length; i += 1) {
  //   // add if statement
  //   let entity = entities[i];
  //   if (getDistance(entity, pos) < entity_vision_radius)
  //     main.fillRect(entity.x, entity.y, entity_size, entity_size);
  // }

  // draw fog
  fog.globalAlpha = fogness;
  fog.fillStyle = fog_color;
  fog.fillRect(0, 0, map_width, map_height);
  fog.globalCompositeOperation = 'destination-out';
  let fog_gd = fog.createRadialGradient(x, y, entity_vision_radius, x, y, entity_vision_radius / 1.2);
  fog_gd.addColorStop(0, 'rgba(0,0,0,0)');
  fog_gd.addColorStop(1, 'rgba(0,0,0,1)');
  fog.fillStyle = fog_gd;
  fog.beginPath();
  fog.arc(x, y, entity_vision_radius, 0, 2 * Math.PI);
  fog.closePath();
  fog.fill();

  // draw darkness
  dark.globalAlpha = darkness;
  dark.fillStyle = dark_color;
  dark.fillRect(0, 0, map_width, map_height);
  dark.globalCompositeOperation = 'destination-out';

  let push = true;
  if (global_vision.length === 0)
    global_vision.push(pos);
  for (let i = 0; i < global_vision.length; i += 1) {
    let gv = global_vision[i];
    let dark_gd = dark.createRadialGradient(gv.x, gv.y, entity_vision_radius, gv.x, gv.y, entity_vision_radius / 1.2);
    dark_gd.addColorStop(0, 'rgba(0,0,0,0)');
    dark_gd.addColorStop(1, 'rgba(0,0,0,1)');
    dark.fillStyle = dark_gd;
    dark.beginPath();
    dark.arc(gv.x, gv.y, entity_vision_radius, 0, 2 * Math.PI);
    dark.closePath();
    dark.fill();

    if (getDistance(pos, gv) < entity_vision_radius) push = false;
  }

  if (push) global_vision.push(pos);

  fog.globalCompositeOperation = dark.globalCompositeOperation = default_gco;
}


function getDistance(pos1, pos2) {
  let dx = pos1.x - pos2.x;
  let dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}


canvases.dark.addEventListener("mousemove", draw);




// - = - = - = - = - = fog of war END = - = - = - = - = -

window.addEventListener("load", init);
var canvas = document.createElement('canvas');
canvas.width = 800; 
canvas.height = 600; 
var context;
context = canvas.getContext('2d');
document.body.appendChild(canvas);

// position & velocity
var pos= [canvas.width / 2, canvas.height / 2];
var vel=[0, 0];

var thrust = 0; 

// angle
var angle = 0;
var angle_vel = 0;
var to_radians = Math.PI/180;

var shipImage = new Image();
shipImage.src = "images/double_ship_base.png";

function init()
    {
    setInterval(draw, 20);
    }

function draw()
    { 
	context.clearRect(0, 0, canvas.width, canvas.height); 
	ship(shipImage, pos[0], pos[1], angle);
    where("#FFFFFF", "14px Arial", "pos: " + pos, 10, 20);
    where("#FFFFFF", "14px Arial", "ang: " + angle, 10, 35);
    where("#FFFFFF", "14px Arial", "vel: " + vel, 10, 50);
    angle += angle_vel;
    }


// HELPERS

// Draw coordinates
function where(text_color, text_font, objet, x, y)
    {
    context.fillStyle = text_color;
    context.font = text_font;
    context.fillText(objet, x, y);
    }

// Converts angle to vector
function angle_to_vector(angle)
    {
    return [Math.cos(angle), Math.sin(angle)];
    }

function ship(shipImage, x, y, angle)
{
    // declare variables
    //var ball_radius = 26;

    // Update ball position
    // ball_x += ball_x_vel; 
    // ball_y += ball_y_vel;

    // Update ball position with wrap  
    // usar esto para arreglar el problema del resto negativo
    // (a % b + b) % b
    pos[0] = ((pos[0] + vel[0]) % canvas.width + canvas.width) % canvas.width;
    pos[1] = ((pos[1] + vel[1]) % canvas.height + canvas.height) % canvas.height;
    
    if (thrust === 1)
        {
        //vel[0] += 1;
        var forward = angle_to_vector(angle);
        vel[0] += forward[0]* 0.2;
        vel[1] += forward[1]* 0.2;
        }
        
    // Friction
    vel[0] *= 0.95;
    vel[1] *= 0.95;
    
    // Draw ship
    context.save();
    context.translate(x, y);
    context.rotate(angle * to_radians);
    context.drawImage(shipImage, -(shipImage.width/2), -(shipImage.height/2));
    context.restore(); 

    // Draw a circle
    //context.arc(ball_pos[0],ball_pos[1],ball_radius,0,Math.PI*2,false);
    //context.closePath();
    //context.fillStyle ='black';
    //context.fill();
    //context.strokeStyle = 'white';
    //context.stroke();
    
    // Draw triangle
    //context.beginPath();
    //context.moveTo(ball_pos[0],ball_pos[1]-25);
    //context.lineTo(ball_pos[0]-23,ball_pos[1]+13);
    //context.lineTo(ball_pos[0]+23,ball_pos[1]+13);
    //context.closePath();
    //context.strokeStyle='white';
    //context.stroke();
}

// key handler
$(document).keydown(function(key) {
  if (key.which === 37) {angle_vel = -2;} // left
  if (key.which === 39) {angle_vel = 2;} // right
  if (key.which === 38) {thrust= 1;} // up
  if (key.which === 40) {thrust= 0;} // down 
});

$(document).keyup(function(key) {
  if (key.which === 37) {angle_vel = 0;} // left
  if (key.which === 39) {angle_vel = 0;} // right
  if (key.which === 38) {thrust= 0;} // up
  if (key.which === 40) {thrust= 0;} // down 
});
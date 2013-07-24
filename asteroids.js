var context;
var width = 800;
var height = 600;

var ball_pos= [width / 2,height / 2];
var ball_vel=[0,0];

function init()
{
    context = myCanvas.getContext('2d');
    setInterval(draw,10);
}

function draw()
{
    // declare variables
    var ball_radius = 26;
    var where_is_ball = ball_pos;    
    
    context.clearRect(0,0, width,height);    
    context.beginPath();
    context.fillStyle="#0000ff";
    context.font="14px Arial";
    context.fillText(where_is_ball,10,20);

    // Update ball position
    // ball_x += ball_x_vel; 
    // ball_y += ball_y_vel;

    // Update ball position with wrap  
    // usar esto para arreglar el problema del resto negativo
    // (a % b + b) % b
    ball_pos[0] = ((ball_pos[0] + ball_vel[0]) % width + width) % width;
    ball_pos[1] = ((ball_pos[1] + ball_vel[1]) % height + height) % height;
    
    // Friction
    // ball_pos.vel[0] *= 0.95;
    // ball_pos.vel[1] *= 0.95;

    // Draw a circle
    context.arc(ball_pos[0],ball_pos[1],ball_radius,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle ='black';
    context.fill();
    context.strokeStyle = 'white';
    context.stroke();
    
    // Draw triangle
    context.beginPath();
    context.moveTo(ball_pos[0],ball_pos[1]-25);
    context.lineTo(ball_pos[0]-23,ball_pos[1]+13);
    context.lineTo(ball_pos[0]+23,ball_pos[1]+13);
    context.closePath();
    context.strokeStyle='white';
    context.stroke();

}

// function keydown()
// {
//    var vel = 4;
//   if (key === simplegui.KEY_MAP["left"]){
//        ball_pos[0] -= vel}
//    else if key === simplegui.KEY_MAP["right"]:
//        ball_pos[0] += vel
//    else if key === simplegui.KEY_MAP["down"]:
//        ball_pos[1] += vel
//    else if key === simplegui.KEY_MAP["up"]:
//        ball_pos[1] -= vel
// }


// key handler
$(document).keydown(function(key) {
  if (key.which === 37) {ball_pos[0] -= 5;} // left
  if (key.which === 39) {ball_pos[0] += 5;} // right
  if (key.which === 38) {ball_pos[1] -= 5;} // up
  if (key.which === 40) {ball_pos[1] += 5;} // down 
});
const keystate = [];
const angle = { z: 0, x: Math.PI / 2 };
var dmge = document.getElementById("dmge").value;
var spd = 0.1;
var i;
document.addEventListener('keydown', e => {
  e.preventDefault();
  if (!keystate[e.keyCode]) {
    keystate[e.keyCode] = true;
    push();
  }
  if(e.keyCode == 81 || e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 69) {
    document.body.style.transform = "scale(2.5)";  
  }
});

document.addEventListener('keyup', e => {
  document.body.style.transform = "scale(1)";   
});

window.addEventListener('keyup', e => {
  e.preventDefault();
  delete keystate[e.keyCode];
  push();
});

const start = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

const startAngle = { x: 0, z: 0 };
canvas.addEventListener('mousedown', e => {
  dmge = document.getElementById("dmge").value;
  e.preventDefault();
  start[e.touches.length - 1].x = e.touches[e.touches.length - 1].pageX;
  start[e.touches.length - 1].y = e.touches[e.touches.length - 1].pageY;

  socket.emit('shoot', angle.z);
  shoot.play()
});



canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  let i, j, tmp = {};
  if (e.changedTouches[0].pageX < window.innerWidth / 2) {
    i = 0;
    if (e.changedTouches[1])
      if (e.changedTouches[1].pageX > window.innerWidth / 2) {
        j = 1;
      }
  } else {
    j = 0;
    if (e.changedTouches[1])
      if (e.changedTouches[1].pageX < window.innerWidth / 2) i = 1;
  }

  if (i !== undefined) {
    let x = start[i].x - e.changedTouches[i].pageX;
    let y = start[i].y - e.changedTouches[i].pageY;
    let moveAngle = Math.atan(x / -y);
    if (y < 0) moveAngle += Math.PI;
    socket.emit('move', { angle: angle.z + moveAngle, speed: spd, jump: false });
  }

  if (j !== undefined) {
    angle.z = startAngle.z + (e.changedTouches[j].pageX - start[j].x) / 100;
    angle.x = startAngle.x - (e.changedTouches[j].pageY - start[j].y) / 100;

    socket.emit('angle', angle.z);
    if (angle.x < 0) angle.x = 0;
    if (angle.x > Math.PI) angle.x = Math.PI;
    camera.position.set(
      x - Math.sin(angle.z) * Math.sin(angle.x) * distance,
      y - Math.cos(angle.z) * Math.sin(angle.x) * distance,
      z + Math.cos(angle.x) * distance
    );
    camera.rotation.set(0.8, 0, 0);
    camera.rotation.x = angle.x;
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -angle.z);

    me.mesh.rotation.z = -angle.z;
  }

});

window.addEventListener('touchend', e => {
  e.preventDefault();
  if (e.touches[0]) {
    if (e.touches[0].pageX < window.innerWidth / 2) {
      startAngle.x = angle.x;
      startAngle.z = angle.z;
    }
    else
      socket.emit('move', { angle: angle.z, speed: 0, jump: false });
  } else {
    startAngle.x = angle.x;
    startAngle.z = angle.z;
    socket.emit('move', { angle: angle.z, speed: 0, jump: false });
  }
  if(angle.x < 0.9) {
    angle.x = 0.90000000000000000001;
  }
  if(angle.x > 1.5) {
    angle.x = 1.5000000000000000001;
  }
});

function push() {
  let x = 0,
    y = 0,
    jump = false;
  let speed = spd;
  if (keystate[87] || keystate[38]) y++;
  if (keystate[65] || keystate[37]) x--;
  if (keystate[83] || keystate[40]) y--;
  if (keystate[68] || keystate[39]) x++;
  if (keystate[32]) jump = true;
  if (!x && !y) speed = 0;

  let moveAngle = Math.atan(x / y);
  if (y < 0) moveAngle += Math.PI;

  socket.emit('move', { angle: angle.z + moveAngle, speed: speed, jump });
}

document.addEventListener('click', e => {
  e.preventDefault();
  if(pl == 1 || pl == "1") {
    canvas.requestPointerLock();
  }
  for (i = 0; i < dmge * 5; i++) {
    socket.emit('shoot', angle.z);
    shoot.play()
  }
  socket.emit('shoot', angle.z);
  shoot.play()
});

document.addEventListener('touchend', e => {
  e.preventDefault();
  if(pl == 1 || pl == "1") {
    canvas.requestPointerLock();``
  }
  for (i = 0; i < dmge * 5; i++) {
    socket.emit('shoot', angle.z);
    shoot.play()
  }
  socket.emit('shoot', angle.z);
  shoot.play()
});

document.addEventListener('mousemove', e => {
  e.preventDefault();
  angle.z += e.movementX / 500;
  angle.x -= e.movementY / 2500;
  socket.emit('angle', angle.z);
  if (angle.x < 0) angle.x = 0;
  if (angle.x > Math.PI) angle.x = Math.PI;
  camera.position.set(
    x - Math.sin(angle.z) * Math.sin(angle.x) * distance,
    y - Math.cos(angle.z) * Math.sin(angle.x) * distance,
    z + Math.cos(angle.x) * distance
  );
  camera.rotation.set(0.8, 0, 0);
  camera.rotation.x = angle.x;
  camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -angle.z);
  e.preventDefault();
  delete keystate[e.keyCode];
  push();
  me.mesh.rotation.z = -angle.z;
  if(angle.x < 1) {
    angle.x = 1;
  }
  if(angle.x > 1.5) {
    angle.x = 1.5;
  }
});
function fix() {
  socket.emit('angle', angle.z);
  if (angle.x < 0) angle.x = 0;
  if (angle.x > Math.PI) angle.x = Math.PI;
camera.position.set(x - Math.sin(angle.z) * Math.sin(angle.x) * distance, y - Math.cos(angle.z) * Math.sin(angle.x) * distance, z + Math.cos(angle.x) * distance);
  camera.rotation.set(0.8, 0, 0);
  camera.rotation.x = angle.x;
  camera.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -angle.z);
  e.preventDefault();
  push();
}

setInterval(fix, 1);

import * as THREE from "three";

// basically the painter? creating a new objext, the antialias smooths outs edges.
const renderer = new THREE.WebGLRenderer({antialias: true});

//width and height of the viewport.
const w = window.innerWidth;
const h = window.innerHeight;

//tells renderer the size of the canvas.
//rn its telling it to fill the entire browser window. 
renderer.setSize(w,h)

//actually adding the canvas to the webpage.
//appendchild = adding the canvas as a child inside the body.
document.body.appendChild(renderer.domElement);


//field of veiw. controls zoom levels
// smaller num = really zoomed in and bigger = fisheye and distorted.
//aspect prevents the scene from looking stretched or squished. keeps it proportional.
// near and far = range of distance the camera can see. anything smaller than 0.1 or bigger than 10 will be invisible.
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;

//creates the camera.
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//positioning the camera z position. can see objects at origin.
camera.position.z = 2;
const scene = new THREE.Scene();

//creating a new geometry, giving it material and color.
const geo = new THREE.IcosahedronGeometry(1.0,3) //(1.0, 3) the 1.0 controls the radius, the 3 controls the subdivisions.
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});

const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

//new wireframe object
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001) //slightly bigger = less flickery.

//scene.add(wireMesh) = this would cause a problem with animation. only the sphere would move.
mesh.add(wireMesh) //groups the two together. so they both move in animation


//adding lighting.
const hemLight = new THREE.HemisphereLight(0xFFA6CD, 0xEB3B8B);
scene.add(hemLight);


//so we can reuse the animation.
function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0003; //every 10 secs.
    renderer.render(scene, camera)
};

animate();
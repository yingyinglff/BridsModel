import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import bird from "./bird";

const clock=new THREE.Clock();

let camera, scene, renderer, stats, gui, settings = {};
function init() {
    // 场景
    scene = new THREE.Scene();
    scene.background=new THREE.Color('skyblue');

    //添加物体
    scene.add(...bird);

    // 相机
    camera = new THREE.PerspectiveCamera(
        30, // 视野角度
        window.innerWidth / window.innerHeight, // 长宽比
        0.1, // 近截面（near）
        1000 // 远截面（far）
    );
    camera.position.set(200 ,200, 300);
    camera.lookAt(0, 0, 0);

    // 光源
    const ambientLight = new THREE.HemisphereLight(
        'white',
        'darkslategrey',
        5,
    );
    const mainLight=new THREE.DirectionalLight('white',4);
    mainLight.position.set(10,10,10);
    scene.add(ambientLight,mainLight);
    
    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
    window.onresize = onWindowResize;
    initHelper();
    initGUI();
}

function animate() {
    renderer.setAnimationLoop(()=>{
    // 浏览器刷新的时候渲染器重新渲染
    renderer.render(scene, camera);
    const delta=clock.getDelta();
    bird.forEach(bird=>bird.tick(delta))
    stats.update();
    });
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function initHelper() {
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  //创建stats对象
  stats = new Stats();
  document.body.appendChild(stats.domElement);
}

function initGUI() {
  gui = new GUI();
}

init();
animate();

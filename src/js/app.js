import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shaders/vertex.glsl?raw";
import fragmentShader from "../shaders/fragment.glsl?raw";

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  const textureLoader = new THREE.TextureLoader();

  const container = document.querySelector("#container");

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const addLight = () => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(2.65, 2.13, 1.02);
    scene.add(light);
  };

  const createEarth1 = () => {
    const material = new THREE.MeshStandardMaterial({
      // color: 0x1234ff,
      map: textureLoader.load("./earth_nightmap.jpg"),
    });
    const geometry = new THREE.SphereGeometry(1.3, 30, 30);

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  };

  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const addEvent = () => {
    window.addEventListener("resize", resize);
  };

  const draw = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw();
    });
  };

  const initialize = () => {
    addLight();
    createEarth1();
    addEvent();
    resize();
    draw();
  };

  initialize();
}
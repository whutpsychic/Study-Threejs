<!-- 画线 -->
<template>
  <main id="canvas"></main>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted } from 'vue';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x1e90ff });

const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

// init
onMounted(() => {
  const elemNode = document.getElementById('canvas');
  elemNode.appendChild(renderer.domElement);

  const line = new THREE.Line(geometry, material);
  scene.add(line);

  renderer.render(scene, camera);
})

</script>

<style scoped>
#canvas {
  width: 100vw;
  height: 100vh;
}
</style>
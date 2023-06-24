import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TweenLite } from "gsap";
import { ButtonView } from "../components/button.view";
import { ModleDetail } from "../components/modle.detail";

let camera: any;
let loadedModel: any;

export function PagePartModel() {
  const scene = new THREE.Scene();
  const loader = new GLTFLoader();
  const canvasRef = useRef<any>(null);
  const [sizeWindow, setSizeWindow] = useState({ width: 0, height: 0 });
  const [hoveredModel, setHoveredModel] = useState<any>(null);
  const [showDetail, setshowDetail] = useState(0);
  const [dataDetail, setdataDetail] = useState("");
  // const [clickModel, setclickModel] = useState(false);
  // const light = new THREE.PointLight("#FFFF", 0, 100);
  let renderer: any;
  let controls: any;
  let clickModel: boolean;

  useEffect(() => {
    scene.background = new THREE.Color("#FFF");
    camera = new THREE.PerspectiveCamera(
      60,
      sizeWindow.width / sizeWindow.height,
      0.1,
      1000
    );
    // camera ใช้สำหรับ
    camera.fov = 1; // Increase the field of view to make the model appear larger
    camera.position.set(-790, 280, 500);
    camera.lookAt(0, 0, 0);
    camera.rotation.x = -Math.PI / 2; // Adjust the camera rotation
    // camera.position.x = -30;
    // camera.position.y = -890;
    // camera.position.z = -180;
    camera.updateProjectionMatrix(); // Update the camera's projection matrix
    scene.add(camera);

    // add model
    loader.load("/models/7_TH_floor_Not_texture.glb", function (gltf) {
      const model = gltf.scene;
      loadedModel = model;
      scene.add(model);
    });
    //add ambientLight
    const ambientLight = new THREE.AmbientLight("#FFF", 0.6);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(sizeWindow.width, sizeWindow.height);
    renderer.setPixelRatio(2);
    renderer.shadowMap.enabled = true;
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 100; // Set the minimum distance (zoomed in)
    controls.maxDistance = 1000; // Set the maximum distance (zoomed out)

    animate();
    // const targetPosition = new THREE.Vector3(0, 0, 50);
    // const duration = 2;
    // moveCameraTo(targetPosition, duration);
  }, [sizeWindow]);

  useEffect(() => {
    setSizeWindow({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setSizeWindow({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  const moveCameraTo = (targetPosition: any, duration: number) => {
    if (camera) {
      const currentPosition: any = camera.position.clone();
      TweenLite.to(currentPosition, duration, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        onUpdate: () => {
          camera?.position?.copy(currentPosition);
        },
      });
    } else {
      console.log(camera);
    }
  };
  return (
    <div className="h-screen relative">
      <div className="p-8">poc lib 3D</div>
      <canvas ref={canvasRef} id="myThreeJsCanvasPart"></canvas>
      <p className="p-4">กดปุ่มเพื่อไปยังส่วนต่างๆ</p>
      <div className="grid grid-cols-4 gap-4 p-8 ">
        <ButtonView
          text="set color A"
          onClick={() => {
            console.log(loadedModel);
            loadedModel.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                if (obj.name == "7_TH_main_hall") {
                  obj.material.color.set("#DCFAF9");
                }
              }
            });
          }}
        />
        <ButtonView
          text="set color B"
          onClick={() => {
            console.log(loadedModel);
            loadedModel.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                if (obj.name == "7_TH_main_hall") {
                  obj.material.color.set("#DCFA");
                }
              }
            });
          }}
        />
        <ButtonView
          text="set color C"
          onClick={() => {
            console.log(loadedModel);
            loadedModel.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                if (obj.name == "7_TH_main_hall") {
                  obj.material.color.set("#DC9");
                }
              }
            });
          }}
        />
        <ButtonView
          text="reset color"
          onClick={() => {
            console.log(loadedModel);
            loadedModel.traverse((obj: any) => {
              if (obj.isMesh && obj.material) {
                if (obj.name == "7_TH_main_hall") {
                  obj.material.color.set("#FFFFFF");
                }
              }
            });
          }}
        />
      </div>
      {showDetail != 0 && (
        <div className="h-full top-0">
          <ModleDetail data={dataDetail} />
        </div>
      )}
    </div>
  );
}

export default PagePartModel;

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TweenLite } from "gsap";
import { ButtonView } from "../components/button.view";
import { ModleDetail } from "../components/modle.detail";

export function PageFullModel() {
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
  let camera: any;
  let controls: any;
  let loadedModel: any;
  let clickModel: boolean;

  useEffect(() => {
    scene.background = new THREE.Color("#FFF");
    camera = new THREE.PerspectiveCamera(
      45,
      sizeWindow.width / sizeWindow.height,
      0.1,
      10000
    );
    // camera ใช้สำหรับ
    camera.position.set(0, 900, 5);
    camera.position.x = 350;
    camera.position.y = 80;
    camera.position.z = -30;
    scene.add(camera);

    // add model
    loader.load("/models/GRM_.glb", function (gltf) {
      const model = gltf.scene;
      loadedModel = model;
      scene.add(model);
    });
    //add ambientLight
    const ambientLight = new THREE.AmbientLight("#FFF", 0.6);
    scene.add(ambientLight);

    // light.position.set(0, 10, 0);
    // light.castShadow = true;
    // scene.add(light);

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
    // controls.enableRotate = true;
    // controls.enableRotateSpeed = 50;
    // canvasRef.current.addEventListener("mousemove", handleMouseMove);
    // canvasRef.current.addEventListener("mouseout", handleMouseOut);
    canvasRef.current.addEventListener("click", handleClick);
    animate();
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

  useEffect(() => {
    const targetPosition = new THREE.Vector3(10, 20, -10);
    const duration = 4;
    moveCameraTo(targetPosition, duration);
  }, []);

  const handleClick = (event: any) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / sizeWindow.width) * 2 - 1;
    mouse.y = -(event.clientY / sizeWindow.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstIntersectedObject: any = intersects[0].object;
      setHoveredModel(firstIntersectedObject);
      console.log(firstIntersectedObject);

      // Retrieve children of the hovered model
      const modelChildren = firstIntersectedObject.parent.children;
      // setclickModel(!clickModel);

      //   const targetPosition = new THREE.Vector3(10, 60, -170);
      //   const duration = 2;
      //   moveCameraTo(targetPosition, duration);

      // console.log(modelChildren);
      // console.log(firstIntersectedObject);
      // firstIntersectedObject.traverse((obj: any) => {
      //   if (obj.isMesh && obj.material) {
      //     obj.material.color.set("#DCFAF9");
      //     // obj.material.opacity = 0.5; // Set the desired opacity value (between 0 and 1)
      //     // obj.material.transparent = true; // Enable transparency
      //   }
      // });
    } else {
    }
  };

  const handleMouseMove = (event: any) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / sizeWindow.width) * 2 - 1;
    mouse.y = -(event.clientY / sizeWindow.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstIntersectedObject: any = intersects[0].object;
      setHoveredModel(firstIntersectedObject);

      // Retrieve children of the hovered model
      const modelChildren = firstIntersectedObject.parent.children;
      console.log(firstIntersectedObject);
      // console.log(firstIntersectedObject);
      firstIntersectedObject.traverse((obj: any) => {
        if (obj.isMesh && obj.material) {
          obj.material.color.set("#DCFAF9");
          // obj.material.opacity = 0.5; // Set the desired opacity value (between 0 and 1)
          // obj.material.transparent = true; // Enable transparency
        }
      });
    } else {
      if (loadedModel) {
        loadedModel.traverse((obj: any) => {
          if (obj.isMesh && obj.material) {
            obj.material.color.set("#FFFFFF"); // Set the default color for the model
          }
        });
      }

      // setHoveredModel(null);
    }
  };

  const handleMouseOut = () => {
    setHoveredModel(null);
  };

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  const moveCameraTo = (targetPosition: THREE.Vector3, duration: number) => {
    try {
      const currentPosition = camera.position.clone();
      TweenLite.to(currentPosition, duration, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        onUpdate: () => {
          camera.position.copy(currentPosition);
        },
      });
    } catch (error) {}
  };
  return (
    <div className="h-screen relative">
      <div className="p-8">LSC</div>
      <canvas ref={canvasRef} id="myThreeJsCanvasFull"></canvas>
      <p className="p-4">กดปุ่มเพื่อไปยังส่วนต่างๆ</p>
      <div className="grid grid-cols-4 gap-4 p-8 ">
        <ButtonView
          text="ไปยังจุด A"
          onClick={() => {
            try {
              const targetPosition = new THREE.Vector3(10, 60, -170);
              const duration = 2;
              moveCameraTo(targetPosition, duration);
              setshowDetail(1);
              setdataDetail("ไปยังจุด A");
              loadedModel.traverse((obj: any) => {
                if (obj.isMesh && obj.material) {
                  if (obj.name == "GRM_A2") {
                    obj.material.color.set("#DCFAF9");
                  } else {
                    obj.material.color.set("#FFFFFF");
                  }
                }
              });
            } catch (error) {}
          }}
        />
        <ButtonView
          text="ไปยังจุด B"
          onClick={() => {
            try {
              const targetPosition = new THREE.Vector3(100, 130, 190);
              const duration = 2;
              moveCameraTo(targetPosition, duration);
              setshowDetail(2);
              setdataDetail("ไปยังจุด B");
              loadedModel.traverse((obj: any) => {
                if (obj.isMesh && obj.material) {
                  if (obj.name == "Cube") {
                    obj.material.color.set("#DCFAF9");
                  } else {
                    obj.material.color.set("#FFFFFF");
                  }
                }
              });
            } catch (error) {}
          }}
        />
        <ButtonView
          text="ไปยังจุด C"
          onClick={() => {
            try {
              const targetPosition = new THREE.Vector3(300, 330, 90);
              const duration = 2;
              moveCameraTo(targetPosition, duration);
              setshowDetail(3);
              setdataDetail("ไปยังจุด C");
              loadedModel.traverse((obj: any) => {
                if (obj.isMesh && obj.material) {
                  if (obj.name == "Grm_B1-2") {
                    obj.material.color.set("#DCFAF9");
                  } else {
                    obj.material.color.set("#FFFFFF");
                  }
                }
              });
            } catch (error) {}
          }}
        />
        <ButtonView
          text="ไปยังจุด D"
          onClick={() => {
            try {
              const targetPosition = new THREE.Vector3(100, 120, -120);
              const duration = 2;
              moveCameraTo(targetPosition, duration);
              setshowDetail(4);
              setdataDetail("ไปยังจุด D");
              loadedModel.traverse((obj: any) => {
                if (obj.isMesh && obj.material) {
                  if (obj.name == "Plane001") {
                    obj.material.color.set("#DCFAF9");
                  } else {
                    obj.material.color.set("#FFFFFF");
                  }
                }
              });
            } catch (error) {}
          }}
        />
        <ButtonView
          text="ไปยังจุด E"
          onClick={() => {
            try {
              const targetPosition = new THREE.Vector3(12, 1, 0);
              const duration = 2;
              moveCameraTo(targetPosition, duration);
              setshowDetail(4);
              setdataDetail("ไปยังจุด E");
            } catch (error) {}
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

export default PageFullModel;

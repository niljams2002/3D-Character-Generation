import propTypes from "prop-types";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

/*eslint-disable react/no-unknown-property*/
const Scene = ({ id }) => {
  const materials = useLoader(MTLLoader, "/api/generations/" + id + "/face.mtl");
  const texture = useLoader(THREE.TextureLoader, "/api/generations/" + id + "/face.png");
  materials.preload();
  const obj = useLoader(OBJLoader, "/api/generations/" + id + "/face.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return (<>
    <ambientLight intensity={1} />
    <mesh>
      <primitive object={obj} scale={15} />
      <meshStandardMaterial map={texture} />
    </mesh>
  </>)
};

const FaceModelRender = ({ generation }) => {
  return (
    <div className="h-100 mx-auto">
      <Canvas>
        { generation && generation._id ?
        <Suspense fallback={null}>
          <Scene id={generation._id}/> 
          <OrbitControls />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
        : null }
      </Canvas>
    </div>
  );
}
/*eslint-enable react/no-unknown-property*/

Scene.propTypes = {
  id: propTypes.string.isRequired,
};

FaceModelRender.propTypes = {
  generation: propTypes.object.isRequired,
};

export default FaceModelRender;

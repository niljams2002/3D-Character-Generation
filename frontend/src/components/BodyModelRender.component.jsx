import PropTypes from "prop-types";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { Suspense } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

/*eslint-disable react/no-unknown-property*/
const Scene = ({ id }) => {
  const obj = useLoader( OBJLoader, "/api/generations/" + id + "/body.obj");
  return (
    <>
      <ambientLight intensity={1} />
      <primitive object={obj} scale={3.5} />
    </>
  );
};

const BodyModelRender = ({ generation }) => {
  return (
    <div className="h-100 mx-auto">
      {generation && generation._id ? (
        <Canvas>
          <Suspense fallback={null}>
            <Scene id={generation._id} />
            <OrbitControls />
            {/* Environment presets: city, sunset, night, warehouse, forest, apartment, studio, city, park, lobby */}
            {/* <Environment preset="studio" background /> */}
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
};
/*eslint-enable react/no-unknown-property*/

Scene.propTypes = {
  id: PropTypes.string.isRequired,
};

BodyModelRender.propTypes = {
  generation: PropTypes.object.isRequired,
};

export default BodyModelRender;

import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

function setupMode(data){
    const model =data.scene.children[0];
    const clip=data.animations[0];
    
    //播放器：传入动画所属的对象
    const mixer =new THREE.AnimationMixer(model);
    const action =mixer.clipAction(clip);
    action.play();
    model.tick=(delta)=>mixer.update(delta);
    return model;
}

const loader=new GLTFLoader()
//1.基于callback回调
//2.基于async await

const [parrotData,flamingoData,storkData]=await Promise.all([
    loader.loadAsync('./src/assets/models/Parrot.glb'),
    loader.loadAsync('./src/assets/models/Flamingo.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb')
])

const parrot=setupMode(parrotData)
parrot.position.set(100,-10,-150)

const stork=setupMode(storkData)

const flamingo=setupMode(flamingoData)
flamingo.position.set(-100,-10,-150)

export default [stork,parrot,flamingo]
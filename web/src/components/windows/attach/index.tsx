import React, { useEffect } from "react";
import "./style.css";
import "react-json-view-lite/dist/index.css";
import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import Draggable from "react-draggable";
import pedBones from "./pedBones";
import { fetchNui } from "../../../utils/fetchNui";

interface Json {
  invokingResource: string;
  id: string;
  data: any;
  lastUpdated: number;
}

interface JsonCategory {
  name: string;
  count: number;
}

const AttachFinder = () => {
  const [model, setModel] = React.useState<string>("");
  const [bone, setBone] = React.useState<string>("SKEL_ROOT");
  const [offset, setOffset] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = React.useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [options, setOptions] = React.useState<{ softPin: boolean; collision: boolean; syncRot: boolean }>({ softPin: true, collision: true, syncRot: true });

  const onReset = () => {
    setModel("");
    setBone("SKEL_ROOT");
    setOffset({ x: 0, y: 0, z: 0 });
    setRotation({ x: 0, y: 0, z: 0 });
    setOptions({ softPin: true, collision: true, syncRot: true });
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchNui("attachFinder", {
        model,
        bone,
        offset,
        rotation,
        options
      });
    }, 100); 

    return () => clearTimeout(handler);
  }, [model, bone, offset, rotation, options]);

  return (
    <Draggable handle="header.attach-header" bounds="parent">
      <div className="attach-finder">
        <header className="attach-header">
          <h2>ATTACH FINDER</h2>
          <button onClick={onReset}>RESET</button>
        </header>
        <main>
          <form>
            <fieldset className="data">
              <legend>MODEL & BONE</legend>
              <div>
                <label htmlFor="model">Model:</label>
                <input 
                  type="text"
                  placeholder="MODEL" 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pedBone">Ped Bone:</label>
                <select 
                  name="bone"
                  id="bone"
                  value={bone}
                  onChange={(e) => setBone(e.target.value)}
                >
                  {pedBones.sort().map((bone) => (
                    <option value={bone} key={bone}>
                      {bone}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset className="offset">
              <legend>Offset</legend>
              <input type="number" placeholder="x" value={offset.x} onChange={(e) => setOffset(prev => ({...prev, x: +(e.target.value)}))} name="x" id="x" />
              <input type="number" placeholder="y" value={offset.y} onChange={(e) => setOffset(prev => ({...prev, y: +(e.target.value)}))} name="y" id="y" />
              <input type="number" placeholder="z" value={offset.z} onChange={(e) => setOffset(prev => ({...prev, z: +(e.target.value)}))} name="z" id="z" />
            </fieldset>
            <fieldset className="rotation">
              <legend>Rotation</legend>
              <input type="number" placeholder="x" value={rotation.x} onChange={(e) => setRotation(prev => ({...prev, x: +(e.target.value)}))} name="x" id="x" />
              <input type="number" placeholder="y" value={rotation.y} onChange={(e) => setRotation(prev => ({...prev, y: +(e.target.value)}))} name="y" id="y" />
              <input type="number" placeholder="z" value={rotation.z} onChange={(e) => setRotation(prev => ({...prev, z: +(e.target.value)}))} name="z" id="z" />
            </fieldset>
            <fieldset className="options">
              <legend>Options</legend>
              <label htmlFor="softPin">
                <input
                  type="checkbox"
                  name="softPin"
                  id="softPin"
                  checked={options.softPin}
                  onChange={(e) => setOptions(prev => ({...prev, softPin: e.target.checked}))}
                /> Soft Pinning 
              </label>
              <label htmlFor="collision">
                <input
                  type="checkbox"
                  name="collision"
                  id="collision"
                  checked={options.collision}
                  onChange={(e) => setOptions(prev => ({...prev, collision: e.target.checked}))}
                />Collision
              </label>
              <label htmlFor="syncRot">
                <input
                  type="checkbox"
                  name="syncRot"
                  id="syncRot"
                  checked={options.syncRot}
                  onChange={(e) => setOptions(prev => ({...prev, syncRot: e.target.checked}))}
                /> Sync Rotation
              </label>
            </fieldset>
          </form>
        </main>
      </div>
    </Draggable>
  );
};

export default AttachFinder;

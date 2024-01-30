import React, { useState } from 'react';
import { Color } from '@/interfaces/Color';

interface Props {
  color: Color;
  onUpdateColor?(player: Color): void;
}

export default function Card(props: Props) {
  const { color, onUpdateColor } = props;

  const [localColor, setLocalColor] = useState(color.color);
  const [isEditable, setIsEditable] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onUpdateColor?.({ ...color, color: localColor });
    setIsEditable(false);
  }

  function handleEnableEdit() {
    setLocalColor(color.color);
    setIsEditable(true);
  }

  return (
    <div
      key={color.id}
      className="card shadow-xl overflow-hidden"
      style={{ backgroundColor: color.color }}
    >
      <div className="card-body text-center">
        <h3 className="font-bold">{color.name}</h3>

        {isEditable ? (
          <form action="" onSubmit={handleSubmit} className="flex gap-1 items-center">
            <input
              type="color"
              value={localColor}
              onChange={(e) => setLocalColor(e.target.value)}
            />
            <input
              type="text"
              className="input input-bordered input-ghost w-full"
              value={localColor}
              onChange={(e) => setLocalColor(e.target.value)}
            />
            <button className="btn btn-ghost">
              <i className="fa fa-save"></i>
            </button>
          </form>
        ) : (
          <div className="flex gap-1 items-center">
            <p>{color.color}</p>
            <button onClick={handleEnableEdit} className="btn btn-ghost">
              <i className="fa fa-edit"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

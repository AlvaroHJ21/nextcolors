'use client';

import React, { useMemo, useState } from 'react';
import Card from './card';
import { Color } from '@/interfaces/Color';

export default function Board() {
  const [name, setName] = useState('');
  const [colorsMap, setColorsMap] = useState<Map<Color['id'], Color>>(new Map());
  const colors = useMemo(() => Array.from(colorsMap.values()), [colorsMap]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(name);
    setName('');

    //add player
    const id = Math.random().toString(36).slice(2, 9);
    const tempColorsMap = new Map(colorsMap);
    tempColorsMap.set(id, { id, name: name, color: '#FFFFFF' });
    setColorsMap(tempColorsMap);

    // setPlayersMap((prevPlayersMap) => {
    //   prevPlayersMap = new Map(prevPlayersMap);
    //   const id = Math.random().toString(36).slice(2, 9);
    //   prevPlayersMap.set(id, { id, name: playername });
    //   return prevPlayersMap;
    // });

  }

  function handleUpdatePlayer(player: Color) {
    if (colorsMap.has(player.id)) {
      const temColorsMap = new Map(colorsMap);
      temColorsMap.set(player.id, player);
      setColorsMap(temColorsMap);
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="mb-4">
        <div>
          <label htmlFor="" className="label">
            Nombre del color
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input input-bordered"
          />
        </div>
      </form>
      <section className="grid grid-cols-4 gap-2">
        {colors.map((player) => (
          <Card key={player.id} color={player} onUpdateColor={handleUpdatePlayer} />
        ))}
      </section>
    </div>
  );
}

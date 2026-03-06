'use client'

import GameOfLifeComponent from '@/app/components/effects/GameOfLife';
import TicTacToe2 from '@/app/components/effects/TicTacToe';
import { JSX, useState } from 'react';

const EffectDict = {
  GAME_OF_LIFE: "Game of life",
  TIC_TAC_TOE: "Tic Tac Toe"
}

const effectComponentMap: Record<string, JSX.Element> = {
  [EffectDict.GAME_OF_LIFE]: <GameOfLifeComponent />,
  [EffectDict.TIC_TAC_TOE]: <TicTacToe2 />,
};

export default function EffectsPage() {
  const [currentEffect, setCurrentEffect] = useState<string>(EffectDict.GAME_OF_LIFE);

  const effectComponent = effectComponentMap[currentEffect] ?? <></>

  return (
    <section className="flex-auto items-center h-fit w-full">
      <h1 className="mb-4 text-2xl font-bold tracking-tighter">
        A collection of interactive effects and visualizations to explore.
      </h1>

      Current Effect: <select id="effectSelect" className="animate-pulse" style={{WebkitAppearance: "menulist-button"}} onChange={(e) => setCurrentEffect(e.currentTarget.value)}>
        {Object.values(EffectDict).map((el, i) => {
          return <option key={i} value={el}>{el}</option>
        })}
      </select>

      <div className="grid gap-8 my-8 bg-black">
        {effectComponent}
      </div>

    </section>
  );
}

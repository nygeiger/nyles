import GameOfLifeComponent from '@/app/components/GameOfLife';

export default function EffectsPage() {
  return (
    <section className="flex-auto items-center h-fit w-full">
      <h1 className="mb-4 text-3xl font-bold tracking-tighter">
        Effects & Visualizations
      </h1>
      <p className="mb-8 text-gray-600 pb-6">
        A collection of interactive effects and visualizations to explore.
      </p>

      <div className="grid gap-8 my-8 bg-black">
        <GameOfLifeComponent />
      </div>

      <p className="text-sm text-gray-500 mt-12">
        More effects coming soon...
      </p>
    </section>
  );
}

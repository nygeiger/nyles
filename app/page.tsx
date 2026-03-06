import GitProjects from "./components/projects/GitProjects";

export default async function Page() {

  return (
    <section className="flex-auto items-center h-fit w-full">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Nyles Geiger
      </h1>
      <p className="mb-4">
        I’m a software engineer with a background in web development and software implementation. Here you’ll find projects I’ve worked on, along with others still taking shape. Most of what’s here is software-focused, but I may also share a few other projects as well.
      </p>
      <div className="my-40">
        <GitProjects />
      </div>
    </section>
  )
}

// ************** General Note taking ************** //
// TODO: Art of the Day: https://api.artic.edu/docs/

// *********************** *************************** //
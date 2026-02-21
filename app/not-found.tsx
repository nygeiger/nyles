export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <a className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank" rel="noopener noreferrer">
        <p className="mb-4 underline">Page has been relocated</p>
      </a>
    </section>
  )
}

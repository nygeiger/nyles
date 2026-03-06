import Image from "next/image"
export function ArrowIcon({ width, height }:
  {
    width?: number,
    height?: number
  }
) {
  return (
    <svg
      width={width ?? "12"}
      height={height ?? "12"}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-10 mt-4 pr-5">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 flex-row space-x-4 md:space-y-0 dark:text-neutral-300">
        <li className="min-w-32">
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/nygeiger"
          >
            <Image src="/images/github.png" alt="Github's icon" width={22} height={22} />
            <p className="ml-2 h-7">Nyles' github</p>
          </a>
        </li>
        <li className="min-w-42">
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/nygeiger/nyles"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">website source</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}

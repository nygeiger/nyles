type Project = {
  title: string,
  stack: string[],
  href: string,
  src: string,
  alt: string,
  description: string[],
}

export type GitProject = Project & {
  buttons:
  {
    demo: {
      title: "Demo",
      href: string,
      ariaLabel: string,
      src: string
    },
    git: {
      title: "Codebase",
      href: string,
      ariaLabel: string,
      src: string,
    }
  }
}

export type ArtApiResponse = {
  pagination: {
    total: number,
    limit: number,
    offset: number,
    total_pages: number,
    current_page: number,
    prev_url: string,
    next_url: string
  },
  data: {
    id: number,
    title: string,
    image_id: string,
    thumbnail: {
      lqip: string,
      width: number,
      height: number,
      alt_text: string
    },
  }[],
  info: {
    license_text: string,
    license_links: string[2],
    version: string
  },
  config: {
    iiif_url: string,
    website_url: string
  }
}

export type Artwork = {
  title: string,
  width: number,
  height: number,
  img_src: string,
  alt: string
}
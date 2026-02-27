

import { GitProject } from "../definitions";

export const gitProjects: GitProject[] = [
  {
    title: "Pop Kulture War",
    stack: ["Typescript", "CSS", "React", "Google Apps Script"],
    href: "https://pop-kulture.netlify.app/",
    src: "/images/pkThumbnail.png",
    alt: "The main menu of a Pop Kulture War Trivia Website.",
    description: [
      "A trivia app that tests your knowledge on decades worth of pop culture.",
      "Do you know more than those around you? Maybe even the world",
    ],
    buttons: [
      {
        title: "Demo",
        href: "https://pop-kulture.netlify.app/",
        ariaLabel: "View this project live, opens in a new window.",
        src: "/images/icons/new-window.svg",
      },
      {
        title: "Codebase",
        href: "https://github.com/nygeiger/PopKulture",
        ariaLabel: "View this project on github, opens in a new window.",
        src: "/images/icons/github-icon.svg",
      },
    ],
  }
];

// Credit to Brandi Cameron for inspiration: www.brandicameron.com
import { GitProject } from "@/app/lib/definitions";
import Image from "next/image";
import { ArrowIcon } from "../footer";

export type ProjectCardProps = {
    project: GitProject
}

export default function ProjectCard(props: ProjectCardProps) {
    const { project } = props;
    console.log("proj: " + project.src)
    return (
        <div className="flex flex-col items-center gap-16 w-full lg:flex-row lg:items-start ">
            <div className="items-center">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={project.src}
                        width={350}
                        height={350}
                        alt={project.alt}
                    />
                </a>
                <div className="flex flex-row gap-10 justify-center mt-4">
                    <a href={project.buttons.demo.href} className="flex flex-row gap-2 items-center justify-center w-fit" rel="noopener noreferrer" target="_blank">
                        <ArrowIcon width={14} height={14}/>
                        demo
                    </a>
                    <a href={project.buttons.git.href} className="flex flex-row gap-2 items-start w-fit" rel="noopener noreferrer" target="_blank">
                        <Image src={project.buttons.git.src} alt={project.buttons.git.title} width={24} height={24} />
                        github
                    </a>
                </div>
            </div>
            <div className="flex flex-col align-items gap-2 text-center">
                <div className="text-xl">
                    <b>{project.title}</b>
                </div>
                <hr className="w-50%" />
                <div className="text-sm">
                    <b>{project.stack.join(" ≎ ")}</b>
                </div>
                <hr />
                <div className="flex flex-col align-items gap-4">
                    {project.description.map((line, i) => {
                        return (
                            <p key={i}>{line}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
import { GitProject } from "@/app/lib/definitions";
import Image from "next/image";

export type ProjectCardProps = {
    project: GitProject
}

export default function ProjectCard(props: ProjectCardProps) {
    const { project } = props;
    console.log("proj: " + project.src)
        return(
            <div className="flex flex-col items-center gap-16 w-full lg:flex-row lg:items-start ">
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={project.src}
                        width={350}
                        height={350}
                        alt={project.alt}
                    />
                </a>
                <div className="flex flex-col align-items gap-2 text-center">
                    <div className="text-xl">
                        <b>{project.title}</b>
                    </div>
                    <hr className="w-50%"/>
                    <div className="text-sm">
                        <b>{project.stack.join(" ≎ ")}</b>
                    </div>
                    <hr/>
                    <div className=" flex flex-col align-items gap-4">
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
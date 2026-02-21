import { gitProjects } from "@/app/lib/data/gitProjectData";
import ProjectCard from "./ProjectCard";

export default function GitProjects() {
    return (
        <ul className="flex flex-col gap-40">
            {gitProjects.map((gProj, i) => {
                const projectCardProps = gProj;
                return (
                    <li key={i}>
                        <ProjectCard project={projectCardProps} />
                    </li>
                )
            })}
        </ul>
    )
}
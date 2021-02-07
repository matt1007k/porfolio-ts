import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { MyContext } from "../types";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  projects(): Promise<Project[]> {
    return Project.find();
  }

  @Query(() => Project, { nullable: true })
  project(@Arg("id") id: number): Promise<Project | undefined> {
    return Project.findOne(id);
  }

  @Mutation(() => Project)
  async createProject(@Arg("title") title: string): Promise<Project> {
    return Project.create({ title }).save();
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg("id") id: number,
    @Arg("title") title: string
  ): Promise<Project | null> {
    const project = await Project.findOne(id);
    if (!project) return null;

    if (typeof title !== "undefined") {
      await Project.update(id, { title });
    }
    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id") id: number): Promise<Boolean> {
    await Project.delete(id);
    return true;
  }
}

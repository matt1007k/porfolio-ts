import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { MyContext } from "../types";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  projects(@Ctx() { em }: MyContext): Promise<Project[]> {
    return em.find(Project, {});
  }

  @Query(() => Project, { nullable: true })
  project(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Project | null> {
    return em.findOne(Project, { id });
  }

  @Mutation(() => Project)
  async createProject(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Project> {
    const project = em.create(Project, { title });
    await em.persistAndFlush(project);
    return project;
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Project | null> {
    const project = await em.findOne(Project, { id });
    if (!project) return null;

    if (typeof title !== "undefined") {
      project.title = title;
      await em.persistAndFlush(project);
    }
    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    await em.nativeDelete(Project, { id });
    return true;
  }
}

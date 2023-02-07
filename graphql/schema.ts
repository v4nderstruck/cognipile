import { builder } from "./builder";
import "./types/project"
import "./types/task"

export const schema = builder.toSchema();
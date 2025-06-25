import type { ISubject, IModule, IModuleWithSubject, ITopic, ITask, ITheory } from '../listed'

type IProgress = {
  progress?: number
}

export type IDetailedModule = IProgress & IModule & IModuleWithSubject

export type IDetailedTopic = IProgress & ITopic & {
  module: IModuleWithSubject
  theories: ITheory[]
  tasks: ITask[]
  completedTheories: string[]
  completedTasks: string[]
}

export type IDetailedSubject = IProgress & ISubject & {
  modules: IModule[]
}
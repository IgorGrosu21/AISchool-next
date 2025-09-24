import type { IManual, IModule, IModuleWithManual, ITopic, ITask, ITheory } from '../listed'

type IProgress = {
  progress?: number
}

export type IDetailedModule = IProgress & IModule & IModuleWithManual

export type IDetailedTopic = IProgress & ITopic & {
  module: IModuleWithManual
  theories: ITheory[]
  tasks: ITask[]
  completedTasks: string[]
}

export type IDetailedManual = IProgress & IManual & {
  modules: IModule[]
}
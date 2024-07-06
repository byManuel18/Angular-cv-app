import { Network, SkillsNames } from "./cv.interface";


export type NetworkData = {[key in  Network]?: { label: string }}
export type SkillsData = {[key in  SkillsNames]?: { label: string }}


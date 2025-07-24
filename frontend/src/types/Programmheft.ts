import {ProgrammheftDTOWithSemesterField} from "./ProgrammheftDTOWithSemesterField.ts";

export type Programmheft = Omit<ProgrammheftDTOWithSemesterField, 'semester'>; // Use this where you don't need semester
import * as dash from "lodash";

export interface StepState {
    stepCode: string;
    state: string;
}

export interface ICloneable {
    clone(): ICloneable ;
}


export class Procedure implements ICloneable{

  stepState: Array<StepState> = [];
  
  constructor(stepState:Array<StepState>){
    this.stepState = [...stepState];
  }

  updateState(stepCode: string, stepState: string) {
      let step = this.stepState.find(step=> step.stepCode === stepCode);
      if ( step ) {
          step.state = stepState;
      }
  }

  clone():Procedure{
      return dash.cloneDeep(this);
  }
}
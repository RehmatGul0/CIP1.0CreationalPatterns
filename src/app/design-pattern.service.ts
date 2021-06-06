import { Injectable } from '@angular/core';
import { SmartElementTransformerFactory } from './abstractFactory-singleton-factoryMethod.class';
import { CivilEngineer, House, HouseBuilder, IglooHouseBuilder } from './builder.class';
import { StepState, Procedure } from './prototype.class';

@Injectable({
  providedIn: 'root'
})
export class AbstractFactoryService {
  valuesToTransform = [
    { type: 'date', value: '2021-04-12T06:31:00Z' },
    { type: 'date_time', value: '2021-04-12T06:31:00Z' },
    { type: 'date_time_difference_hours', value: '86400000' },
    { type: 'date_time_difference_seconds', value: '86400000' }];

  stepState: Array<StepState> = [
    { stepCode: '1.', state: 'Locked'},
    { stepCode: '2.', state: 'NA'}
  ];

  constructor(private smartElementTransformerFactory: SmartElementTransformerFactory) {
  }

  // Abstract factory and singleton patter..
  transformValues() : Array<string|number> {
    let result: Array<string|number> = [];
    this.valuesToTransform.forEach(item=>{
      result.push(this.smartElementTransformerFactory.createTransformer(item.type).transform(item.value));
    })
    return result;
  }

  // Prototype pattern..
  updateStepStates() {
    let procedure = new Procedure(this.stepState);
    let cachedProcedure = procedure.clone();
    procedure.updateState('1.', 'Unlocked');
    return { previousState: cachedProcedure.stepState, updatedState: procedure.stepState};
  }

  // Builder patter..
  buildIglooHouse() {
    let iglooBuilder: HouseBuilder = new IglooHouseBuilder();
    let engineer: CivilEngineer = new CivilEngineer(iglooBuilder);
    engineer.constructHouse();
    let house: House = engineer.getHouse();
  }
}

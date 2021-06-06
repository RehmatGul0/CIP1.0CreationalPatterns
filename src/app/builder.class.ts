export interface HousePlan
{
    setBasement(basement: string): void;
  
    setStructure(structure: string): void;
  
    setRoof(roof: string): void;
  
    setInterior(interior: string): void;
}
  
export class House implements HousePlan
{
    basement: string = '';
    structure: string = '';
    roof: string = '';
    interior: string = '';
  
    setBasement(basement: string): void 
    {
        this.basement = basement;
    }
  
    setStructure(structure: string): void 
    {
        this.structure = structure;
    }
  
    setRoof(roof: string) 
    {
        this.roof = roof;
    }
  
    setInterior(interior: string) 
    {
        this.interior = interior;
    }
}
  
  
export interface HouseBuilder
{
  
    buildBasement(): void;
  
    buildStructure(): void;
  
    buildRoof(): void;
  
    buildInterior(): void;
  
    getHouse(): House;
}
  
export class IglooHouseBuilder implements HouseBuilder
{
    house: House;
  
    constructor() 
    {
        this.house = new House();
    }
  
    buildBasement(): void 
    {
        this.house.setBasement("Ice Bars");
    }
  
    buildStructure(): void
    {
        this.house.setStructure("Ice Blocks");
    }
  
    buildInterior(): void
    {
        this.house.setInterior("Ice Carvings");
    }
  
    buildRoof(): void
    {
        this.house.setRoof("Ice Dome");
    }
  
    getHouse(): House 
    {
        return this.house;
    }
}

  
export class CivilEngineer 
{
  
    houseBuilder:HouseBuilder;
  
    constructor(houseBuilder: HouseBuilder)
    {
        this.houseBuilder = houseBuilder;
    }
  
    public getHouse(): House
    {
        return this.houseBuilder.getHouse();
    }
  
    constructHouse(): void
    {
        this.houseBuilder.buildBasement();
        this.houseBuilder.buildStructure();
        this.houseBuilder.buildRoof();
        this.houseBuilder.buildInterior();
    }
}

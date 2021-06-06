import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

export interface SmartElementNumericTransformer {
    transform(value: string): number;
    
}
export interface SmartElementStringTransformer {
    transform(value: string): string;
}

export interface AbstractFactory {
    createTransformer(type: string) : SmartElementNumericTransformer | SmartElementStringTransformer;
}


export class TransformDateValue implements SmartElementStringTransformer {
    transform(value: string): string {
        return formatDate(value, 'MM/dd/yyyy', 'en-US');
    }
}

export class TransformDateTimeValue implements SmartElementStringTransformer {
    transform(value: string): string {
        return formatDate(value, 'MM/dd/yyyy HH:mm', 'en-US');
    }
}

export class TransformDateTimeDifferenceInSeconds implements SmartElementNumericTransformer {
    transform( value: string): number {
        return Math.abs(Number(value) / 1000);
    }
}
export class TransformDateTimeDifferenceInHours implements SmartElementNumericTransformer {
    transform( value: string): number {
        let diffInHours = Number(value) / 1000;
        diffInHours /= (60 * 60);
        return Math.abs(diffInHours);
    }
}

export class TransformString implements SmartElementNumericTransformer {
    transform( value: string): number {
       return Number(value);
    }
}

export class TransformNumeric implements SmartElementStringTransformer {
    transform( value: string): string {
       return value.trim();
    }
}

export class TransformerFactory {
	
    static getNumericTransformer(type: string): SmartElementNumericTransformer {
        if( type === 'DateTimeDifferenceInHours') {
            return new TransformDateTimeDifferenceInHours();
        } else if (type === 'DateTimeDifferenceInSeconds') {
            return new TransformDateTimeDifferenceInSeconds()
        } else {
            return new TransformString();
        }
        
    }

    static getStringTransformer(type: string): SmartElementStringTransformer {
        if( type === 'DateValue') {
            return new TransformDateValue();
        } else if( type === 'DateTimeValue') {
            return new TransformDateTimeValue();
        } else {
            return new TransformNumeric();
        }
    }
 }

export class SingletonTransformer  {
    private static transFromDateValue: TransformDateValue;
    private static transformDateTimeValue: TransformDateTimeValue;
    private static transformDateTimeDifferenceInHours: TransformDateTimeDifferenceInHours;
    private static transformDateTimeDifferenceInSeconds: TransformDateTimeDifferenceInSeconds;
    private static transformString: TransformString;

    private constructor() {}

    public static getTransFromDateValueInstance() {
        if (!SingletonTransformer.transFromDateValue) {
            SingletonTransformer.transFromDateValue = TransformerFactory.getStringTransformer('DateValue');
        }
        return SingletonTransformer.transFromDateValue;
    }

    public static getTransformDateTimeValueInstance() {
        if (!SingletonTransformer.transformDateTimeValue) {
            SingletonTransformer.transformDateTimeValue = TransformerFactory.getStringTransformer('DateTimeValue');
        }
        return SingletonTransformer.transformDateTimeValue;
    }

    public static getTransformDateTimeDifferenceInHoursInstance() {
        if (!SingletonTransformer.transformDateTimeDifferenceInHours) {
            SingletonTransformer.transformDateTimeDifferenceInHours = TransformerFactory.getNumericTransformer('DateTimeDifferenceInHours');
        }
        return SingletonTransformer.transformDateTimeDifferenceInHours;
    }

    public static getTransformDateTimeDifferenceInSecondsInstance() {
        if (!SingletonTransformer.transformDateTimeDifferenceInSeconds) {
            SingletonTransformer.transformDateTimeDifferenceInSeconds = TransformerFactory.getNumericTransformer('DateTimeDifferenceInSeconds');
        }
        return SingletonTransformer.transformDateTimeDifferenceInSeconds;
    }

    public static getTransformStringInstance() {
        if (!SingletonTransformer.transformString) {
            SingletonTransformer.transformString = new TransformString();
        }
        return SingletonTransformer.transformString;
    }
}

@Injectable({
    providedIn: 'root'
})
export class SmartElementTransformerFactory implements AbstractFactory {
    createTransformer(type: string) : SmartElementNumericTransformer | SmartElementStringTransformer {
        if ( type.toLowerCase() === 'date') {
            return SingletonTransformer.getTransFromDateValueInstance();
        } else if ( type.toLowerCase() === 'date_time' ) {
            return SingletonTransformer.getTransformDateTimeValueInstance();
        } else if ( type.toLowerCase() === 'date_time_difference_hours') {
            return SingletonTransformer.getTransformDateTimeDifferenceInHoursInstance();
        } else if ( type.toLowerCase() === 'date_time_difference_seconds') {
            return SingletonTransformer.getTransformDateTimeDifferenceInSecondsInstance();
        } else {
            return SingletonTransformer.getTransformStringInstance();
        }
    };
}

export class StpError extends Error {

  parseObject: any;

  constructor(parseObject: any, msg: string) {
    super(msg);
    this.name = 'StpError';
    this.parseObject = parseObject;

    Object.setPrototypeOf(this, StpError.prototype);
  }
}


// type supTypes = Number|String|Boolean|Array|Object|Date;
type supTypes = typeof Number|typeof String|typeof Boolean|typeof Array|typeof Object|typeof Date;

type IsType = (value: any) => boolean;


export class Stp {

  private targetObj: object;

  constructor(obj: object) {
    if (!Stp.isObj(obj)) {
      throw new StpError(obj, 'Constructor param not object type.');
    }
    this.targetObj = obj;
  }

  get (keys: Array<string>, type?: supTypes, isRequired: boolean = false) {
    return Stp.getIsHas(this.targetObj, keys, type, isRequired);
  }

  // --- static --- //

  static getIsHas(obj: object, keys: Array<string>, type?: supTypes, isRequired: boolean = false): any {
    if (!Stp.isArr(keys) || keys.some(k => !Stp.isStr(k))) {
      return Stp._needThrow(isRequired, obj, 'Incorrect keys');
    }
    let targetValue: any = obj;
    for (let i = 0; i < keys.length; i++) {
      if (!Stp.isObj(targetValue)) {
        return Stp._needThrow(isRequired, obj, 'Incorrect keys path, not object');
      }
      targetValue = targetValue[keys[i]];
    }

    if (Stp.isFunc(type)) {
      const isTypeFunc: IsType = funcsIsType[type['name']];
      if (!isTypeFunc) {
        return Stp._needThrow(isRequired, obj, 'Incorrect param "type"');
      }
      if (!isTypeFunc(targetValue)) {
        return Stp._needThrow(isRequired, obj, 'Incorrect type value');
      }
    }

    return !Stp.isVoid(targetValue) ? targetValue : Stp._needThrow(isRequired, obj, 'Value is void');
  }

  private static _needThrow(isNeed: boolean, parseObj: any, msg?: string): never|null {
    if (isNeed) {
      throw new StpError(parseObj, msg);
    } else {
      return null;
    }
  }

  // --- supports --- //

  static isFunc(value: any): boolean {
    return typeof value === 'function';
  }

  static isVoid(value: any): boolean {
    return (value === null) ||  (value === undefined);
  }

  static isStr(value: any): boolean {
    return typeof value === 'string';
  }

  static isBool(value: any): boolean {
    return typeof value === 'boolean';
  }

  static isObj(value: any): boolean {
    return (typeof value === 'object') && (value !== null) && (!Stp.isArr(value));
  }

  static isArr(value: any): boolean {
    return Array.isArray(value);
  }

  static isRealNum(value: any): boolean {
    return (typeof value === 'number') && !isNaN(value) && isFinite(value);
  }

  static isDate(value: any): boolean {
    return (value instanceof Date) && !isNaN(value.valueOf());
  }

}


const funcsIsType = {
  [Number.name]: Stp.isRealNum,
  [String.name]: Stp.isStr,
  [Boolean.name]: Stp.isBool,
  [Array.name]: Stp.isArr,
  [Object.name]: Stp.isObj,
  [Date.name]: Stp.isDate,
};

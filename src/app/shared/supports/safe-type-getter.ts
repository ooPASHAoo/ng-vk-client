namespace stg {

  type IsType = (value: any) => boolean;

  export const isStr: IsType = (value: any): boolean => {
    return typeof value === 'string';
  };

  export const isBool: IsType = (value: any): boolean => {
    return typeof value === 'boolean';
  };

  export const isObj: IsType = (value: any): boolean => {
    return (typeof value === 'object') && (value !== null) && (!isArr(value));
  };

  export const isArr: IsType = (value: any): boolean => {
    return Array.isArray(value);
  };

  export const isRealNum: IsType = (value: any): boolean => {
    return (typeof value === 'number') && !isNaN(value) && isFinite(value);
  };

  export const isDate: IsType = (value: any): boolean => {
    return (value instanceof Date) && !isNaN(value.valueOf());
  };

  // --- binding func to type --- //

  export enum eType {
    Number = 'number',
    String = 'string',
    Boolean = 'boolean',
    Array = 'array',
    Object = 'object',
    Date = 'date'
  }

  // TODO: key type eType
  const funcsIsType: { [key: string]: IsType } = {
    [eType.Number]: isRealNum,
    [eType.String]: isStr,
    [eType.Boolean]: isBool,
    [eType.Array]: isArr,
    [eType.Object]: isObj,
    [eType.Date]: isDate,
  };

  /**
   * Возвращает значение из obj по цепочке keys, ?если его тип === type;
   * *
   * Если obj или keys не соответствуют типу, то вернется null
   * Если type не соответствует targetValue то вернется null
   */
  export function getIsHas(obj: object, keys: Array<string>, type?: eType): any {
    // TODO: isRequired, если нет значения, то throws
    if (!isArr(keys) || keys.some(k => !isStr(k))) {  // Проверка всех keys
      return null;
    }
    let targetValue: any = obj;
    for (let i = 0; i < keys.length; i++) {   // Начинаем с obj потом obj[keys[0]]...
      if (!isObj(targetValue)) {              // Если НЕ последнее значение не obj
        return null;
      }
      targetValue = targetValue[keys[i]];
    }

    if (isStr(type)) {                                // Если передали валидный type то
      const isTypeFunc: IsType = funcsIsType[type];   // берем функцию из биндинга
      return (isTypeFunc && isTypeFunc(targetValue)) ? targetValue : null;
    }

    return targetValue;
  }
}

export = stg;

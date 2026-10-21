import { Constraint } from "./base";

export interface LessThan<
    GenericValue extends number
> extends Constraint<`less-than-${GenericValue}`> {

}


export function lessThan<
    GenericValue extends number
>(
    input: number,
    value: GenericValue
): (
    | (number & LessThan<GenericValue>)
    | null
){
    if(input < value){
        return input as never
    }

    return null
}

import { Constraint } from "./base";

export interface GreaterThanOrEqual<
    GenericValue extends number
> extends Constraint<`greater-than-or-equal-${GenericValue}`> {

}


export function greaterThanOrEqual<
    GenericValue extends number
>(
    input: number,
    value: GenericValue
): (
    | (number & GreaterThanOrEqual<GenericValue>)
    | null
){
    if(input >= value){
        return input as never
    }

    return null
}

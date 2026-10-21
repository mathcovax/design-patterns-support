import { Constraint } from "./base";

export interface MaxCharacters<
    GenericMax extends number
> extends Constraint<`max-characters-${GenericMax}`> {

}

export function maxCharacters<
    GenericMax extends number
>(
    input: string,
    maxCharacters: GenericMax
): (
        | (string & MaxCharacters<GenericMax>)
        | null
    ) {
    if (input.length <= maxCharacters) {
        return input as never
    }

    return null
}

const result = maxCharacters("test", 12)

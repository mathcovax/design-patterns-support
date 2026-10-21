import { MaxCharacters } from "../constraints";

export interface User {
    name: string & MaxCharacters<12>
}
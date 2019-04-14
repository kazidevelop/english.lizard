import { environment } from "src/environments/environment";

export class Globals {
    public  static isSpelling(text: string) {
        return text === environment.spellingQuestionIdentifier;
    }
}

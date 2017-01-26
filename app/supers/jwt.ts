export class JWT
{
	public static _JWT: string;
	public static get JWT(): string { return this._JWT; }
	public static set JWT(x: string) { this._JWT = x; }
}
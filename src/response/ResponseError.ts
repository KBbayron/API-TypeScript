export default class ResponseError {
    private success?: Boolean;

    constructor(private code?: Number,
        private message?: String,
        private description?: String) {
        this.success = false;
        this.code = code;
        this.message = message;
        this.description = description;
        console.log(`Ocurrió un error
Code: ${code}
Message: ${message}
Description: ${description}`);
    }
}
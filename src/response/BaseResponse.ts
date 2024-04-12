export default class BaseResponse {
    private success?: Boolean;

    constructor (private message?: String,
        private description?: String,
        private data?: Object) {
            this.success = true;
            this.message = message;
            this.description = description;
            this.data = data;
        }
}

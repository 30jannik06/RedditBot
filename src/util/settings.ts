class Config {
    public token: string; 
    public prefix: string;

    constructor() {
        this.token =
            "BOT_TOKEN_HERE";
        this.prefix = "$";
    }
}

export const {token, prefix} = new Config()
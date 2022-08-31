class Config {
    public token: string; 
    public prefix: string;

    constructor() {
        this.token =
            "BOT_TOKEN_HERE";
        this.prefix = "PREFIX_HERE";
    }
}

export const {token, prefix} = new Config()
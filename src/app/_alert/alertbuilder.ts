import { Alert, AlertType } from ".";

export class AlertBuilder {

    private alert: Alert = new Alert();

    autoClose(value: boolean) {
        this.alert.autoClose = value;
        return this;
    }

    id(id: string) {
        this.alert.id = id;
        return this;
    }

    message(message: string) {
        this.alert.message = message;
        return this;
    }

    keepAfterRouteChange(value: boolean) {
        this.alert.keepAfterRouteChange = value;
        return this;
    }

    dump(dump: any) {
        this.alert.dump = dump;
        return this;
    }

    success() {
        this.alert.type = AlertType.Success;
        return this;
    }

    error() {
        this.alert.type = AlertType.Error;
        return this;
    }

    info() {
        this.alert.type = AlertType.Info;
        return this;
    }

    warning() {
        this.alert.type = AlertType.Warning;
        return this;
    }

    build(): Alert {
        return this.alert;
    }
}
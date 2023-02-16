import { Completer } from "./async";

export enum State {
    none = "none",
    load = "load",
    error = "error",
    ok = "ok"
}
export class ViewState<T> {
    private state_ = State.none
    private completer_?: Completer<T>
    private data_: any
    private error_: any
    get isOk(): boolean {
        return this.state_ == State.ok
    }
    get data(): T {
        if (this.state_ != State.ok) {
            throw new Error("state not be ok")
        }
        return this.data_
    }
    get error(): any {
        if (this.state_ != State.error) {
            throw new Error("state not be error")
        }
        return this.error_
    }
    loader?: () => Promise<T>
    get state(): State {
        return this.state_
    }
    reset() {
        if (this.state_ != State.none) {
            this.state_ = State.none
            if (this.completer_) {
                this.completer_ = undefined
            }
            this.data_ = undefined
            this.error_ = undefined
        }
    }
    resetValue(data: T) {
        this.state_ = State.ok
        this.data_ = data
        const completer = this.completer_
        if (completer) {
            this.completer_ = undefined
            completer.resolve(data)
        }
    }
    /**
     * 
     * @param refresh if true refresh else check cache at first
     * @returns 
     */
    get(refresh = false): Promise<T> {
        const state = this.state_
        if (state == State.load) {
            return (this.completer_ as Completer<T>).promise
        } else if (state == State.ok && !refresh) {
            return (this.completer_ as Completer<T>).promise
        }

        // check loader
        const loader = this.loader
        if (!loader) {
            const err = new Error('loader undefined, please set loader before calling load.')
            if (state == State.none) {
                this.state_ = State.error
                this.error_ = err
            }
            throw err
        }

        if (refresh) { // reset completer
            if (this.completer_) {
                this.completer_ = undefined
            }
        } else { // reset err
            if (state == State.error) {
                if (this.completer_) {
                    this.completer_ = undefined
                }
            } else if (state != State.none) {
                throw new Error(`unknow state='${state}'`)
            }
        }

        this.state_ = State.load
        const completer = new Completer<T>()
        this.completer_ = completer
        this._load(completer, loader)
        return completer.promise
    }
    private async _load(completer: Completer<T>, loader: () => Promise<T>) {
        try {
            const data = await loader()
            if (this.completer_ == completer && this.state == State.load) {
                this.state_ = State.ok
                this.data_ = data
            }
            completer.resolve(data)
        } catch (e) {
            if (this.completer_ == completer && this.state == State.load) {
                this.state_ = State.error
                this.error_ = e
            }
            completer.reject(e)
        }
    }
}

import { getUnix, testAll, testAny, testNone } from "src/internal/utils"

/**
 * 保存了與 session 關聯的用戶信息
 */
export interface Userdata {
    /**
     * 用戶唯一識別代碼
     */
    id: string // int64
    /**
     * 用戶登入名稱
     */
    name: string
    /**
     * 用戶登入昵稱
     */
    nickname?: string
    /**
     * 綁定電話
     */
    phone?: string
    /**
     * 用戶頭像
     */
    avatar?: string
    /**
     * 用戶所在組
     */
    groups?: Array<number>
    /**
     * 用戶擁有的權限
     */
    permissions?: Array<number>
}
function parseDeadline(v: number | string): number {
    if (typeof v === "string") {
        v = parseInt(v)
        if (Number.isSafeInteger(v)) {
            return v
        }
    } else if (typeof v === "number") {
        if (Number.isSafeInteger(v)) {
            return v
        }
    }
    return 0
}
/**
 * token 是訪問服務器的憑證，這裏採用了 access token 和 refresh token 的設計
 * 
 * @remarks
 * 通常爲了減少 access token 遺失引起的安全問題，access token 被設置的很快過期，
 * 但爲了避免用戶重複登入引起的操作體驗下降所以加入了 refresh token，refresh 會比
 * access 更晚過期，這樣當 access 過期後前端程序就可以自動使用 refresh 來更換新的 token
 * 
 * refresh 引入了新的問題就是可以一直更換 token，這樣如果當 access refresh 都被竊取時，
 * 惡意人員可以一直訪問系統，爲此引入了 deadline 的設計，服務器可以設置一個最終截止時間，
 * 當到達了最終截止時間，則不再允許使用 refresh token 執行的刷新
 */
export class Token {
    /**
     * 訪問 token
     */
    readonly access: string
    /**
    * 刷新 token
    */
    readonly refresh: string
    /**
     * 訪問 token 截止時間
     */
    readonly accessDeadline: number
    /**
     * 刷新 token 截止時間
     */
    readonly refreshDeadline: number
    /**
     * token 可刷新的截止時間
     */
    readonly deadline: number
    constructor(
        access: string,
        refresh: string,
        accessDeadline: string | number,
        refreshDeadline: string | number,
        deadline: string | number,
    ) {
        this.access = access
        this.refresh = refresh
        this.accessDeadline = parseDeadline(accessDeadline)
        this.refreshDeadline = parseDeadline(refreshDeadline)
        this.deadline = parseDeadline(deadline)
    }
    /**
     * 如果 access token 已經過期，則返回 true
     */
    get expired(): boolean {
        return getUnix() >= this.accessDeadline
    }
    /**
     * 如果 refresh token 已經過期，則返回 true
     */
    get deleted(): boolean {
        return getUnix() >= this.refreshDeadline
    }
    /**
     * 如果可以使用 refresh token 執行刷新，則返回 true
     */
    get canRefresh(): boolean {
        if (this.deadline == 0) {
            return true
        }
        return getUnix() < this.deadline
    }
}


export class Session {
    constructor(
        readonly token: Token,
        readonly userdata: Userdata,
    ) { }
    /**
     * 返回 nickname 或者 name
     */
    get name(): string {
        const userdata = this.userdata
        let val = userdata.nickname ?? ''
        if (val == '') {
            val = userdata.name
        }
        return val
    }
    /**
     * 如果 session 包含了 vals 指定的全部權限則返回 true，否則返回 false
     * 
     * @param vals 要對比的權限列表
     * @returns 
     */
    authAll(...vals: Array<number>): boolean {
        return testAll(this.userdata.permissions, vals)
    }
    /**
     * 如果 session 包含了 vals 指定的全部組則返回 true，否則返回 false
     * 
     * @param vals 要對比的組列表
     * @returns 
     */
    groupAll(...vals: Array<number>): boolean {
        return testAll(this.userdata.groups, vals)
    }
    /**
     * 如果 session 包含了 vals 指定的任意權限則返回 false，否則返回 true
     * 
     * @param vals 要對比的權限列表
     * @returns 
     */
    authNone(...vals: Array<number>): boolean {
        return testNone(this.userdata.permissions, vals)
    }
    /**
     * 如果 session 包含了 vals 指定的任意組則返回 false，否則返回 true
     * 
     * @param vals 要對比的組列表
     * @returns 
     */
    groupNone(...vals: Array<number>): boolean {
        return testNone(this.userdata.groups, vals)
    }

    /**
   * 如果 session 包含了 vals 指定的任意權限則返回 true，否則返回 false
   * 
   * @param vals 要對比的權限列表
   * @returns 
   */
    authAny(...vals: Array<number>): boolean {
        return testAny(this.userdata.permissions, vals)
    }
    /**
     * 如果 session 包含了 vals 指定的任意組則返回 true，否則返回 false
     * 
     * @param vals 要對比的組列表
     * @returns 
     */
    groupAny(...vals: Array<number>): boolean {
        return testAny(this.userdata.groups, vals)
    }
}

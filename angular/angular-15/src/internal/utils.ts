export const Millisecond = 1
export const Second = 1000 * Millisecond
export const Minute = 60 * Second
export const Hour = 60 * Minute
export const Day = 24 * Hour
/**
 * 返回當前時間的 unix 值
 * @returns 
 */
export function getUnix(): number {
    const dateTime = Date.now()
    return Math.floor(dateTime / 1000)
}
/**
 * 返回 keys 是否包含 vals 指定的每一個值
 * @param keys 要查找的源數組
 * @param vals 要比較的值
 * @param compare 如何比較相等，默認使用 == 比較
 * @returns 
 */
export function testAll<T>(
    keys: Array<T> | undefined,
    vals: Array<T>,
    compare?: (l: T, r: T) => boolean,
): boolean {
    if (!Array.isArray(keys) || keys.length == 0) {
        return false
    }
    let found: boolean
    for (const v of vals) {
        found = false
        for (const k of keys) {
            if ((compare && compare(v, k)) || v == k) {
                found = true
                break
            }
        }
        if (!found) {
            return false
        }
    }
    return true
}
/**
 * 返回 keys 是否不包含 vals 指定的任意一個值
 * @param keys 要查找的源數組
 * @param vals 要比較的值
 * @param compare 如何比較相等，默認使用 == 比較
 * @returns 
 */
export function testNone<T>(
    keys: Array<T> | undefined,
    vals: Array<T>,
    compare?: (l: T, r: T) => boolean,
): boolean {
    if (!Array.isArray(keys)) {
        return true
    }
    for (const k of keys) {
        for (const v of vals) {
            if ((compare && compare(k, v)) || k == v) {
                return false
            }
        }
    }
    return true
}
/**
 * 返回 keys 是否包含 vals 指定的任意一個值
 * @param keys 要查找的源數組
 * @param vals 要比較的值
 * @param compare 如何比較相等，默認使用 == 比較
 * @returns 
 */
export function testAny<T>(
    keys: Array<T> | undefined,
    vals: Array<T>,
    compare?: (l: T, r: T) => boolean,
): boolean {
    if (!Array.isArray(keys)) {
        return false
    }
    for (const v of vals) {
        for (const k of keys) {
            if ((compare && compare(v, k)) || v == k) {
                return true
            }
        }
    }
    return false
}
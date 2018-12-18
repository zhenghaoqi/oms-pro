let logger = console.log;

const interceptors = {
    logResponse(res) {
        try {
            const args = logger === console.log ? ['%c Request Success:', 'color: #4CAF50; font-weight: bold', res] : [res];
            logger(...args);
        } catch (e) {

        }
        return res;
    },
    logPromiseError(err) {
        try {
            const args = logger === console.log ? ['%c Request Success:', 'color: #4CAF50; font-weight: bold', err] : [err];
            logger(...args);
        } catch (e) {

        }
        return Promise.reject(err);
    }
}

export const setLogger = fn => logger = fn || console.log;

export default interceptors;

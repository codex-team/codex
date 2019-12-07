/**
 * Uils collection.
 */

/**
 * Check of passed entiry is an Object
 * @param {*} item
 * @return {boolean}
 */
export function isObject(item) {

    return (item && typeof item === 'object' && !Array.isArray(item));

}

/**
 * Simple deep merge for two object
 * @see https://stackoverflow.com/a/37164538/4190772
 *
 * @param {object} target
 * @param {object} source
 * @return {object}
 */
export function mergeDeep(target, source) {

    let output = Object.assign({}, target);

    if (isObject(target) && isObject(source)) {

        Object.keys(source).forEach(key => {

            if (isObject(source[key])) {

                if (!(key in target)) {

                    Object.assign(output, { [key]: source[key] });

                } else {

                    output[key] = mergeDeep(target[key], source[key]);

                }

            } else {

                Object.assign(output, { [key]: source[key] });

            }

        });

    }
    return output;

}
/**
 * It returns true if the email is valid, and false if it's not
 * @param {string} email - The email address to validate.
 * @returns A boolean value
 */
export const isValidEmail = (email: string): boolean => {
    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    return !!match;
};

/**
 * If the email is valid, return undefined, otherwise return a string
 * @param {string} email - string - the email to validate
 * @returns A function that takes an email and returns a string or undefined.
 */
export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email)
        ? undefined
        : 'The email does not seem to be valid';
}

